import { StyleSheet, Text, View, TouchableOpacity, Animated, Dimensions, Image, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import COLORS from '../constants/color';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import TOKEN from '../Token/Token';
import { color } from 'react-native-elements/dist/helpers';
const { width } = Dimensions.get('window');

const window = Dimensions.get('window');

export default function WomenHospital({ route }) {
    const itemName = route.params?.itemName;
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [districts, setDistricts] = useState([]);
    const [ownersData, setOwnersData] = useState([]);
    const [drawerAnimation] = useState(new Animated.Value(Dimensions.get('window').height));
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [chosenDistrictName, setChosenDistrictName] = useState('Gautam Buddha Nagar');
    const [totalCount, setTotalCount] = useState(0);

    const navigation = useNavigation();
    const token = TOKEN;


    const navigateToScreen = (screenName, ownerId, businessName) => {
        navigation.navigate(screenName, { ownerId, businessName });
    };



    useEffect(() => {
        fetchDistrictsData(); // Fetch districts data when the component mounts
    }, []);

    const fetchDistrictsData = async () => {
        try {
            const response = await fetch('https://apimediator.mimamsalabs.com/api/ClientConnect/SearchOwnerByKey?districtId=14&key=&categoryId=4&pageNumber=1&pageSize=1', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();


            if (!data.didError) {
                setDistricts(data.data.districts);
            } else {
                console.error('Error fetching districts data:', data.message);
            }
        } catch (error) {
            console.error('Error fetching districts data:', error);
        }
    };
    const openDrawer = () => {
        setDrawerVisible(true);
        Animated.timing(drawerAnimation, {
            toValue: Dimensions.get('window').height * 0.2,
            duration: 300,
            useNativeDriver: true
        }).start();
    };

    const closeDrawer = () => {
        Animated.timing(drawerAnimation, {
            toValue: Dimensions.get('window').height,
            duration: 300,
            useNativeDriver: true
        }).start(() => setDrawerVisible(false));
    };

    const fetchOwnersData = async (selectedDistrictId) => {
        try {
            const response = await fetch(`https://apimediator.mimamsalabs.com/api/ClientConnect/SearchOwnerByKey?districtId=${selectedDistrictId}&key=&categoryId=4&pageNumber=1&pageSize=1`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (!data.didError) {
                setOwnersData(data.data.owners);
                setTotalCount(data.data.totalCount);
            } else {
                console.error('Error fetching owners data:', data.message);
            }
        } catch (error) {
            console.error('Error fetching owners data:', error);
        }
    };

    useEffect(() => {
        fetchOwnersData(14); // Initial fetch for default district (Gautam Buddha Nagar)
    }, []);

    const renderDrawer = () => {
        if (!drawerVisible) {
            return null;
        }
        return (
            <View style={styles.drawerContainer}>
                <TouchableOpacity style={styles.overlay} onPress={closeDrawer} />
                <Animated.View style={[styles.drawer, { transform: [{ translateY: drawerAnimation }] }]}>
                    <View style={styles.drawerHeader}>
                        <Text style={styles.drawerHeaderText}>Select Location</Text>
                        <TouchableOpacity onPress={closeDrawer}>
                            <Ionicons name="close-outline" size={24} style={styles.closeIcon} />
                        </TouchableOpacity>
                    </View>
                    <Picker
                        selectedValue={selectedLocation}
                        onValueChange={(itemValue, itemIndex) => {
                            setSelectedLocation(itemValue);
                            // Find the district with the corresponding ID
                            const chosenDistrict = districts.find(district => district.id.toString() === itemValue);
                            // Set the chosen district name
                            if (chosenDistrict) {
                                setChosenDistrictName(chosenDistrict.districtName);
                            }
                            fetchOwnersData(itemValue);
                        }}
                        style={styles.picker}
                    >
                        {districts.map((district) => (
                            <Picker.Item style={styles.districtOptions} key={district.id} label={district.districtName} value={district.id.toString()}  />
                        ))}
                    </Picker>

                    {selectedLocation && (
                        <View style={styles.districtData}>
                            <Text style={{color:'black'}}>Data for {selectedLocation}</Text>
                            {/* {ownersData.length > 0 ? (
                                <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                                    {ownersData.map((owner) => (
                                        <View key={owner.id} style={styles.event}>
                                            <TouchableOpacity onPress={() => navigateToScreen('HospitalToProfile', { ownerId: owner.id, hospitalName: owner.businessName })}>

                                                <View style={styles.HospitalContainer}>
                                                    <Image
                                                        source={{ uri: owner.thumbnailAddress }} // Use dynamic image URL from API response
                                                        style={styles.image}
                                                        resizeMode="cover"
                                                    />
                                                    <Text style={styles.hospitalName}>
                                                        {owner.businessName}
                                                    </Text>
                                                </View>
                                                <View style={styles.detailsContainer}>
                                                    <Text style={styles.addressText}>
                                                        {owner.businessAddress}
                                                    </Text>
                                                    <Text style={styles.phoneText}>
                                                        {owner.mobileNumber}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                </ScrollView>
                            ) : (
                                <Text>No owners found in {selectedLocation}</Text>
                            )} */}
                        </View>
                    )}
                </Animated.View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigateToScreen('SearchPage')}>
                        <Ionicons name="arrow-back" size={24} style={styles.arrow} />
                    </TouchableOpacity>
                    <Text style={{ color: COLORS.darkGrey, fontSize: 17, paddingLeft: 5, fontWeight: '500' }}>
                        {itemName}
                    </Text>
                </View>
                <View style={styles.hindiBox}>
                    <Text style={{ color: 'white' }} >हिंदी</Text>
                </View>
            </View>
            <View style={styles.locationBar}>
                <Text style={styles.location}>Location : </Text>
                <TouchableOpacity onPress={openDrawer} style={styles.pickerContainer}>
                    <Text>{chosenDistrictName}</Text>
                    <Ionicons name="chevron-down-outline" size={24} />
                </TouchableOpacity>
            </View>


            {renderDrawer()}
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Text style={[{ marginTop: 15, marginBottom: -15, marginLeft: 15, color: COLORS.darkGrey, fontWeight: 'bold' }]}>{totalCount} Women's Hospital Found</Text>
                {/* Render event data dynamically */}
                {ownersData.map((owner) => (
                    <View key={owner.id} style={styles.event}>
                        <TouchableOpacity key={owner.id} onPress={() => navigateToScreen('HospitalToProfile', owner.id, owner.businessName)}>


                            <View style={styles.HospitalContainer}>
                                <Image
                                    source={{ uri: owner.thumbnailAddress }} // Use dynamic image URL from API response
                                    style={styles.image}
                                    resizeMode="cover"
                                />
                                <Text style={styles.hospitalName}>
                                    {owner.businessName}
                                </Text>
                            </View>
                            <View style={styles.detailsContainer}>
                                <Text style={styles.addressText}>
                                    {owner.businessAddress}
                                </Text>
                                <Text style={styles.phoneText}>
                                    {owner.mobileNumber}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
            <View style={styles.footerBanner}>
                <Image source={require('../assets/banner.jpg')} style={{ width: '100%', borderRadius: 10, marginTop: 0 }} />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '##f0f0f0',
        paddingTop: 28,
        flex: 1,
    },
    header: {
        backgroundColor: COLORS.white,
        paddingTop: 16,
        paddingRight: 12,
        paddingBottom: 16,
        paddingLeft: 12,
        flexDirection: 'row',
        display: 'flex',
    },
    arrow: {
        color: 'black',
        paddingLeft: 8,
        paddingRight: 5,
        marginRight: 1
    },
    hindiBox: {
        width: 50,
        height: 30,
        backgroundColor: COLORS.blue,
        borderColor: COLORS.blue,
        borderRadius: 5,
        paddingTop: 8,
        marginLeft: width * 0.39,
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 0
    },
    locationBar: {
        display: 'flex',
        backgroundColor: '#b2c1d9',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row',
        alignItems: 'center',
    },
    location: {
        marginLeft: -5,
        marginRight: 5, // Add margin to separate text and picker
    },
    pickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        fontWeight: '200',
    },

    drawerContainer: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#807e7f', // Green semi-transparent overlay
    },
    drawer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: Dimensions.get('window').height * 1, // Adjust the height as needed
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        paddingTop: 30,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    drawerHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    drawerHeaderText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#696969'
    },
    closeIcon: {
        color: 'black',
    },
    picker: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 20,
    },
    districtData: {
        marginTop: 10,
    },
    event: {
        backgroundColor: COLORS.white,
        marginTop: 40,
        paddingTop: 20,
        paddingRight: 46,
        paddingBottom: 10,
        paddingLeft: 12,
        borderRadius: 8,
        marginBottom: -20,
        marginLeft: 10,
        marginRight: 10
    },
    HospitalContainer: {
        flexDirection: 'row',
    },
    image: {
        width: 50, // Adjust width as needed
        height: 50, // Adjust height as needed
        marginBottom: 12,
        borderRadius: 8,
        marginRight: 8
    },
    hospitalName: {
        color: COLORS.darkGrey,
        fontSize: 20,
        lineHeight: 25,
        fontWeight: '500',
        paddingBottom: 12,
        marginTop: 0,
    },
    detailsContainer: {
        flexDirection: 'column',
        marginLeft: 55,
        marginTop: -25
    },
    addressText: {
        color: '#606060',
        fontSize: 15,
        lineHeight: 16,
        fontWeight: '400',
        paddingLeft: 5,
    },
    phoneText: {
        color: '#606060',
        fontSize: 15,
        lineHeight: 16,
        fontWeight: '500',
        paddingLeft: 5,
        paddingRight: 9,
        paddingTop: 8,
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: 20, // Add padding bottom to prevent the last item from being partially hidden
    },
    footerBanner: {
        backgroundColor: '#f5f6f7',
        borderColor: '#f5f6f7',
        borderWidth: 8,
        borderRadius: 15,
        elevation: 15
    },
    districtOptions:{
        color:'black',
        backgroundColor:'white'
      }
});
