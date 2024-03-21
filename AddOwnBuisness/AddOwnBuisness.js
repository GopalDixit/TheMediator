import React, { useState, useEffect, Component } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Button, PermissionsAndroid, Image } from 'react-native';
// import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import { launchImageLibrary } from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import COLORS from '../constants/color';
import TOKEN from '../Token/Token';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

export default function AddOwnBusiness() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [shopName, setShopName] = useState('');
  const [pincode, setPincode] = useState('');
  const [tahsil, setTahsil] = useState('');
  const [post, setPost] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [businessCategory, setBusinessCategory] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const [photo, setPhoto] = useState(null);
  // State API
  useEffect(() => {
    fetchStates();
  }, []);

  // District API
  useEffect(() => {
    if (selectedState) {
      fetchDistricts(selectedState);
    }
  }, [selectedState]);

  const fetchStates = async () => {
    try {
      const token = TOKEN;
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      const response = await fetch('https://apimediator.mimamsalabs.com/api/Admin/GetStates', { headers });
      const responseData = await response.text();

      if (responseData) {
        // Parse the response data
        const data = JSON.parse(responseData);

        // Check if the 'data' property exists in the response
        if ('data' in data) {
          setStates(data.data);

          // Log state names to the console
          console.log('State Names:', data.data.map((state) => state.stateName));
        } else {
          console.error('Error fetching states:', 'Data property not found in the response');
        }
      } else {
        console.error('Empty response received from the server');
      }
    } catch (error) {
      console.error('Error fetching states:', error.message);
    }
  };



  const fetchDistricts = async (stateId) => {
    try {
      const token = TOKEN;
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      const response = await fetch(`https://apimediator.mimamsalabs.com/api/Admin/GetDistricts?stateId=${stateId}`, { headers });
      const data = await response.json();

      if (!data.didError) {
        setDistricts(data.data);
      } else {
        console.error('Error fetching districts:', data.message);
      }
    } catch (error) {
      console.error('Error fetching districts:', error.message);
    }
  };

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  const [images, setImages] = useState([]);

  const handleChoosePhoto = async () => {
    try {
      const permissionStatus = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);

      if (permissionStatus === RESULTS.GRANTED) {
        const options = {
          mediaType: 'photo',
          includeBase64: false, // Avoid unnecessary base64 encoding
          maxWidth: 300,
          maxHeight: 300,
        };

        if (images.length >= 5) {
          console.log('Maximum image limit reached (5 images)');
          return;
        }

        const response = await new Promise((resolve, reject) => {
          launchImageLibrary(options, (response) => {
            if (response.didCancel) {
              reject(new Error('User cancelled image picker'));
            } else if (response.error) {
              reject(new Error(`ImagePicker Error: ${response.error}`));
            } else {
              resolve(response);
            }
          });
        });

        if (response.fileSize && response.fileSize > 1024 * 1024) {
          console.log('Image size exceeds 1MB limit');
          return;
        }

        // Check if the file type is supported
        const supportedFileTypes = ['jpeg', 'png', 'img', 'jpg'];
        const fileType = response?.uri?.split('.').pop().toLowerCase();

        if (!supportedFileTypes.includes(fileType)) {
          console.log('Unsupported file type');
          return;
        }

        // Resize image if needed (adjust dimensions as per your requirements)
        const resizedImage = await ImageResizer.createResizedImage(
          response.uri,
          800, // width
          800, // height
          'JPEG', // format
          100, // quality
          0, // rotation
        );

        const newImages = [...images, resizedImage.uri]; // Add resized URI to the images array
        setImages(newImages);
        setSelectedImage(resizedImage.uri); // Update currently selected image URI for immediate display
      } else {
        console.log('Permission denied');
      }
    } catch (error) {
      console.error('Error in handleChoosePhoto:', error.message);
    }
  };


  const handleThumbnail = async () => {
    try {
      const permissionStatus = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);

      if (permissionStatus === RESULTS.GRANTED) {
        const options = {
          mediaType: 'photo',
          includeBase64: false, // Avoid unnecessary base64 encoding
          maxWidth: 150,
          maxHeight: 150,
        };

        if (images.length > 1) {
          console.log('Maximum image limit reached (1 images)');
          return;
        }

        const response = await new Promise((resolve, reject) => {
          launchImageLibrary(options, (response) => {
            if (response.didCancel) {
              reject(new Error('User cancelled image picker'));
            } else if (response.error) {
              reject(new Error(`ImagePicker Error: ${response.error}`));
            } else {
              resolve(response);
            }
          });
        });

        if (response.fileSize && response.fileSize > 512 * 1024) {
          console.log('Image size exceeds 512KB limit');
          return;
        }

        // Check if the file type is supported
        const supportedFileTypes = ['jpeg', 'png', 'img', 'jpg'];
        const fileType = response?.uri?.split('.').pop().toLowerCase();

        if (!supportedFileTypes.includes(fileType)) {
          console.log('Unsupported file type');
          return;
        }

        // Resize image if needed (adjust dimensions as per your requirements)
        const resizedImage = await ImageResizer.createResizedImage(
          response.uri,
          800, // width
          800, // height
          'JPEG', // format
          100, // quality
          0, // rotation
        );

        const newImages = [...images, resizedImage.uri]; // Add resized URI to the images array
        setImages(newImages);
        setSelectedImage(resizedImage.uri); // Update currently selected image URI for immediate display
      } else {
        console.log('Permission denied');
      }
    } catch (error) {
      console.error('Error in handleThumbnail:', error.message);
    }
  };

  const handleBanner = async () => {
    try {
      const permissionStatus = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);

      if (permissionStatus === RESULTS.GRANTED) {
        const options = {
          mediaType: 'photo',
          includeBase64: false, // Avoid unnecessary base64 encoding
          maxWidth: 150,
          maxHeight: 150,
        };

        if (images.length > 1) {
          console.log('Maximum image limit reached (1 images)');
          return;
        }

        const response = await new Promise((resolve, reject) => {
          launchImageLibrary(options, (response) => {
            if (response.didCancel) {
              reject(new Error('User cancelled image picker'));
            } else if (response.error) {
              reject(new Error(`ImagePicker Error: ${response.error}`));
            } else {
              resolve(response);
            }
          });
        });

        if (response.fileSize && response.fileSize > 1024 * 1024) {
          console.log('Image size exceeds 1MB limit');
          return;
        }

        // Check if the file type is supported
        const supportedFileTypes = ['jpeg', 'png', 'img', 'jpg'];
        const fileType = response?.uri?.split('.').pop().toLowerCase();

        if (!supportedFileTypes.includes(fileType)) {
          console.log('Unsupported file type');
          return;
        }

        // Resize image if needed (adjust dimensions as per your requirements)
        const resizedImage = await ImageResizer.createResizedImage(
          response.uri,
          800, // width
          800, // height
          'JPEG', // format
          100, // quality
          0, // rotation
        );

        const newImages = [...images, resizedImage.uri]; // Add resized URI to the images array
        setImages(newImages);
        setSelectedImage(resizedImage.uri); // Update currently selected image URI for immediate display
      } else {
        console.log('Permission denied');
      }
    } catch (error) {
      console.error('Error in handleThumbnail:', error.message);
    }
  };

  const renderImages = () => {
    return images.map((imageUri, index) => (
      <Image
        key={index}
        source={{ uri: imageUri }}
        style={styles.image} // Apply styling for row-based display
      />
    ));
  };


  const handleSubmit = () => {
    // Handle the form submission logic here
    console.log('Selected Images:', images);
    console.log('Send Request Button Pressed', {
      name,
      mobileNumber,
      shopName,
      businessCategory,
      selectedState,
      selectedDistrict,
    });
  };

  return (

    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigateToScreen('Dashboard')}>
          <Text style={[styles.buttonText, styles.headerbtn]}>Add Own Business</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollContainer}>
        <Text style={[styles.label, { marginTop: 10, color: 'black' }]}>Do You want to add your business</Text>

        <View style={styles.formContainer}>
          <Text style={[styles.label, { marginTop: 20, color: 'black' }]}>Enter Your Name:</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter Here"
            placeholderTextColor="black"
            value={name}
            onChangeText={(text) => setName(text)}
          />

          <Text style={styles.label}>Enter Mobile Number:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Here"
            placeholderTextColor="black"
            keyboardType="numeric"
            value={mobileNumber}
            onChangeText={(text) => setMobileNumber(text)}
          />

          <Text style={styles.label}>Enter Your Shop Name or Business Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Here"
            placeholderTextColor="black"
            value={shopName}
            onChangeText={(text) => setShopName(text)}
          />

          <Text style={styles.label}>Select Your Business Category:</Text>
          <Picker
            style={[styles.input]}
            selectedValue={businessCategory}
            onValueChange={(itemValue) => setBusinessCategory(itemValue)}
          >
            <Picker.Item style={{ color: '#a8a8a8' }} label="Business Category" value="" />
            <Picker.Item label="Option 1" value="Option 1" />
            <Picker.Item label="Option 2" value="Option 2" />
            <Picker.Item label="Option 3" value="Option 3" />
            <Picker.Item label="Option 4" value="Option 4" />
            <Picker.Item label="Option 5" value="Option 5" />
          </Picker>

          <Text style={[styles.label, { marginTop: 10 }]}>Enter Address</Text>

          {/* <Text style={styles.label}>Select Your State:</Text> */}

          <Picker
            style={styles.dropdown}
            selectedValue={selectedState}
            onValueChange={(itemValue) => {
              setSelectedState(itemValue);
              fetchDistricts(itemValue);
            }}
          >
            <Picker.Item style={{ color: '#black' }} label="Select State" value="" />
            {states.map((state) => (
              <Picker.Item key={state.id} label={state.stateName} value={state.id.toString()} />
            ))}
          </Picker>

          <Picker
            style={styles.dropdown}
            selectedValue={selectedDistrict}
            onValueChange={(itemValue) => setSelectedDistrict(itemValue)}
          >
            <Picker.Item style={{ color: '#a8a8a8' }} label="Select District" value="" />
            {districts.map((district) => (
              <Picker.Item key={district.id} label={district.districtName} value={district.id.toString()} />
            ))}
          </Picker>

          <TextInput
            style={styles.input}
            placeholder="Pincode"
            placeholderTextColor="black"
            value={pincode}
            onChangeText={(text) => setPincode(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Tahsil"
            placeholderTextColor="black"
            value={tahsil}
            onChangeText={(text) => setTahsil(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Post"
            placeholderTextColor="black"
            value={post}
            onChangeText={(text) => setPost(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Street Address"
            placeholderTextColor="black"
            value={streetAddress}
            onChangeText={(text) => setStreetAddress(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Address Line 1"
            placeholderTextColor="black"
            value={addressLine1}
            onChangeText={(text) => setAddressLine1(text)}
          />
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {photo && (
              <Image
                source={{ uri: photo.uri }}
                style={{ width: 300, height: 300 }}
              />
            )}
            <Button title="Choose Photo" onPress={handleChoosePhoto} />

            <Button title="Choose Thumbnail" onPress={handleThumbnail} />

            <Button title="Choose Banner" onPress={handleBanner} />

          </View>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {renderImages()}
          </View>

          <Text style={styles.blank}> </Text>
          <Text> </Text>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleSubmit}>
          <Text style={styles.buttonText}>Send Request</Text>
        </TouchableOpacity>
      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: 8,
    padding: 10,
    backgroundColor: COLORS.blue,
    alignItems: 'left',
  },
  headerbtn: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  scrollContainer: {
    flex: 1,
    padding: 10,
  },
  formContainer: {
    paddingBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
    color: 'black'
  },
  input: {
    // backgroundColor:'white',
    color: 'black',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  dropdown: {
    backgroundColor: 'white',
    color: 'black',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  footer: {
    padding: 10,
    backgroundColor: COLORS.blue,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  blank: {
    paddingTop: 28
  }
});