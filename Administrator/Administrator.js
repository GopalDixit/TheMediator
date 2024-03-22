// Add a log statement to check if the component renders
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import COLORS from '../constants/color';
import { Picker } from '@react-native-picker/picker';
import TOKEN from '../Token/Token';

const { width } = Dimensions.get('window');

const window = Dimensions.get('window');

export default function Administrator() {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const navigation = useNavigation();
  const [responseData, setResponseData] = useState(null);


  const navigateToScreen = (screenName, params = {}) => {
    setSelectedIcon(params?.icon || 'home'); // Keep icon handling logic
    navigation.navigate(screenName, params); // Pass the params object
  };
  const handleCall = (number) => {
    Linking.openURL(`tel:${number}`);
  };

  const [emergencyNumbers] = useState([
    { name: 'Ambulance', number: '102' },
    { name: 'Fire Station', number: '101' },
    { name: 'Women Help', number: '1090' },
    { name: 'Police', number: '100' },

  ]);
  const cardColors = ['blue', 'red', 'purple', '#45aaf2'];

  const [selectedValue, setSelectedValue] = useState(8);
  const [districts, setDistricts] = useState([]);
  const [location, setLocation] = useState('Gautam Buddha Nagar')

  useEffect(() => {
    fetchDistricts();
  }, [selectedValue, location]);

  const fetchDistricts = async () => {
    try {
      const token = TOKEN;
      const response = await fetch(`https://apimediator.mimamsalabs.com/api/ClientConnect/Administrator?districtId=${selectedValue}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const responseData = await response.json();
      console.log('Response Data:', responseData); // Log entire response data
      if (!responseData.didError) {
        // Check responseData structure and access districts accordingly
        if (responseData.data && responseData.data.districts) {
          setDistricts(responseData.data.districts); // Update districts state
          setResponseData(responseData); // Update responseData state
          // console.log("Directory IDs:", responseData.data.directories.map(directory => directory.id));
        } else {
          console.error('Failed to find districts in response data');
        }
      } else {
        console.error('Failed to fetch districts:', responseData.message);
      }
    } catch (error) {
      console.error('Error fetching districts:', error);
    }
  };

  const handlePickerChange = (value) => {
    const selectedDistrict = districts.find(district => district.id.toString() === value);
    if (selectedDistrict) {
      console.log('Selected District:', selectedDistrict.district);
      setSelectedValue(value);
      setLocation(selectedDistrict.district);
    }
  };

  // console.log("Districts:", districts);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigateToScreen('Dashboard')}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerContainer}>
          <Text style={[styles.headerText, { color: 'black' }]}>Administrator</Text>
          <Text style={styles.location}>{'\n'}{location}</Text>
        </Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.tapToCall}>Tap to call</Text>
        <ScrollView horizontal={true} contentContainerStyle={styles.cardContainer} showsHorizontalScrollIndicator={false}>
          {emergencyNumbers.map((emergencyNumber, index) => (
            <TouchableOpacity
              key={emergencyNumber.name}
              style={[styles.card, styles.elevatedCards, { backgroundColor: cardColors[index % cardColors.length] }, { marginLeft: 0 }]}
              onPress={() => handleCall(emergencyNumber.number)}
            >
              <Text style={{ color: 'white', fontSize: 14, fontFamily: 'sans-serif', paddingBottom: 4, fontWeight: 'bold' }}>
                {emergencyNumber.number}
              </Text>
              <Text style={{ color: 'white', fontSize: 10, fontFamily: 'sans-serif' }}>
                {emergencyNumber.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <Picker
        style={[styles.input]}
        selectedValue={selectedValue}
        onValueChange={handlePickerChange}
        mode="dialog" // Ensure the dropdown mode
        dropdownIconColor="black" // Set the color of the dropdown icon
      >
        {districts.map(district => (
          <Picker.Item style={styles.districtOptions} key={district.id} label={district.district} value={district.id.toString()} />
        ))}
      </Picker>

      {responseData && (
        <View style={styles.event}>
          {responseData.data.directories.map(directory => (
            <TouchableOpacity
              key={directory.id}
              onPress={() => {
                navigateToScreen('AdministratorDirect', { categoryId: directory.id, categoryName: directory.categoryName });
              }}
            >
              <Feather name="chevron-right" size={24} style={[styles.arrow, { position: 'absolute', right: -28, top: 12 }]} />
              <Text style={{ color: '#696969', borderBottomWidth: 1, borderBottomColor: 'rgba(112, 112, 112, 0.18)', fontSize: 18, lineHeight: 25, fontWeight: 500, paddingBottom: 12, marginTop: 18 }}>
                {directory.categoryName}
              </Text>
            </TouchableOpacity>
          ))}
          {responseData.data.directories.length > 0 && (
            console.log("Directory IDs:", responseData.data.directories.map(directory => directory.id))
          )}
        </View>
      )}



      <View style={styles.footer}>

        <TouchableOpacity onPress={() => navigateToScreen('Dashboard')}>
          <View style={[styles.iconContainer, selectedIcon === 'home' && styles.selectedIcon]}>
            <Icon name="home" style={styles.icon} />
            <Text style={styles.footerText}>Home</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigateToScreen('Events')}>
          <View style={[styles.iconContainer, selectedIcon === 'calendar' && styles.selectedIcon]}>
            <Icon name="calendar" style={styles.icon} />
            <Text style={styles.footerText}>Events</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigateToScreen('Notification')}>
          <View style={[styles.iconContainer, selectedIcon === 'bell' && styles.selectedIcon]}>
            <Icon name="bell" style={styles.icon} />
            <Text style={styles.footerText}>Notification</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigateToScreen('About')}>
          <View style={[styles.iconContainer, selectedIcon === 'info-circle' && styles.selectedIcon]}>
            <Icon name="info-circle" style={styles.icon} />
            <Text style={styles.footerText}>About</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.AdministratorIcon} onPress={() => navigateToScreen('Administrator')}>
          <View style={[styles.iconContainer, selectedIcon === 'user' && styles.selectedIcon]}>
            <Icon name="user" style={[styles.icon, { color: 'white' }]} />
            <Text style={[styles.footerText, { color: 'white' }]}>Administrator</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    backgroundColor: 'white',
    marginTop: 15,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
  },
  headerContainer: {
    paddingTop: -2,
    paddingLeft: 4
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: -40,
  },
  location: {
    color: '#696969',
    position: 'relative',
    paddingTop: 15,
    marginLeft: 40,
    fontSize: 12
  },
  backButton: {
    marginRight: 16,
  },
  content: {
    // flex: 1,
    paddingTop: 15,
    paddingLeft: 15,
  },
  tapToCall: {
    color: '#242424',
    marginBottom: 10,
  },
  cardContainer: {
    flexDirection: 'row',
  },
  card: {
    // flex: 'wrap',
    borderRadius: 4,
    width: 90,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
  },
  elevatedCards: {
    backgroundColor: '#CAD5E2',
  },
  input: {
    marginTop: 15,
    backgroundColor: 'white',
    marginLeft: 15,
    marginRight: 15,
  },
  administrator: {
    paddingTop: 15,
    flexDirection: 'row',
    marginLeft: 15
  },
  arrow: {
    position: 'absolute',
    right: 18,
    top: 45,
  },
  event: {
    marginTop: 4,
    paddingTop: 4,
    paddingRight: 46,
    paddingBottom: 20,
    paddingLeft: 12,
    borderRadius: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 5, // Adjusted padding
    position: 'absolute',
    bottom: 0, // Positioned at the bottom
    left: 0,
    right: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: 'white',
  },
  footerText: {
    color: COLORS.darkGrey,
    fontSize: 12,
  },
  iconContainer: {
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
    color: COLORS.darkGrey,
  },
  AdministratorIcon: {
    width: 75,
    height: 50,
    backgroundColor: COLORS.green,
    borderColor: COLORS.green,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingTop: -3
  },
  districtOptions:{
    color:'black',
    backgroundColor:'white'
  }
});
