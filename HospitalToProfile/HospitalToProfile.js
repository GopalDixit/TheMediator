import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView, Linking ,FlatList} from 'react-native'
import React, { useState, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import COLORS from '../constants/color';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native-elements';
import TOKEN from '../Token/Token';

const { width } = Dimensions.get('window');
const token = TOKEN;
export default function HospitalToProfile({ route }) {
    const { ownerId, businessName } = route.params;
    const [ownersData, setOwnersData] = useState('')
    useEffect(() => {
        if (ownerId) {
            fetchOwnerData(ownerId);
        } else {
            console.error('Owner ID is missing');
        }
    }, [ownerId]);

    const fetchOwnerData = async (ownerId) => {
        try {
            const response = await fetch(`https://apimediator.mimamsalabs.com/api/ClientConnect/MyProfileById?Id=${ownerId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            console.log('Owner Data:', data);
            setOwnersData(data)
            // Process the fetched data as needed
            console.log();
        } catch (error) {
            console.error('Error fetching owner data:', error);
        }
    };


    const navigation = useNavigation();
    const [selectedIcon, setSelectedIcon] = useState('home');
    const navigateToScreen = (screenName, icon) => {
        setSelectedIcon(icon)
        navigation.navigate(screenName, { icon });
    };

    const handleCall = (phoneNumber) => {
        Linking.openURL(`tel:${phoneNumber}`);
    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigateToScreen('WomenHospital')}>
                        <Ionicons name="arrow-back" size={24} style={styles.arrow} />
                    </TouchableOpacity>
                    <Text style={{ color: COLORS.darkGrey, fontSize: 17, paddingLeft: 5, fontWeight: '500' }}>
                        My Profile
                    </Text>
                </View>
            </View>
            <ScrollView>
                <View style={styles.bannerImage}>
                    {ownersData && ownersData.data && ownersData.data.photos ? (
                        ownersData.data.photos.map((photo, index) => {
                            if (photo.category === "Banner") {
                                return (
                                    <Image
                                        key={index}
                                        source={{ uri: photo.imgAddress }}
                                        style={styles.image}
                                        resizeMode="cover"
                                    />
                                );
                            }
                        })
                    ) : null}
                    <View style={styles.overlay}>
                        {ownersData && ownersData.data && ownersData.data.profileImg ? ( // Add conditional check
                            <Image
                                source={{ uri: ownersData.data.profileImg }}
                                style={styles.roundImage}
                                resizeMode="cover"
                            />
                        ) : null}
                    </View>
                </View>

                <View style={styles.HospitalNameContainer}>
                    <Text style={styles.hospitalName}>
                        {businessName}
                    </Text>
                </View>


                <View style={styles.event}>
                    <Text style={{ color: COLORS.darkGrey, fontSize: 15, lineHeight: 25, fontWeight: 'bold', paddingBottom: 6, color: 'grey', marginTop: 0 }}>
                        About
                    </Text>
                    {ownersData && ownersData.data && ownersData.data.about ? (
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: '#606060', fontSize: 12, lineHeight: 16, fontWeight: 400 }}>
                                {ownersData.data.about}
                            </Text>
                        </View>
                    ) : (
                        <Text>No information available</Text>
                    )}
                </View>


                <View style={styles.event}>
                    <Text style={{ color: COLORS.darkGrey, fontSize: 15, lineHeight: 25, fontWeight: 'bold', paddingBottom: 6, color: 'grey', marginTop: 0 }}>
                        Contact & Address
                    </Text>
                    {ownersData && ownersData.data ? (
                        <View>
                            <View style={{ flexDirection: 'row', paddingTop: 15, color: "black" }}>
                                <Text style={{ color: '#606060', fontSize: 15, lineHeight: 16, fontWeight: '400' }}>
                                    <Icon name="phone" size={15} color="black" /> {ownersData.data.mobileNumber}
                                </Text>
                                <TouchableOpacity onPress={() => handleCall(ownersData.data.mobileNumber)}>
                                    <View style={styles.callContainer}>
                                        <Text style={styles.callBox}><Icon name="phone" size={15} color='white' />  Call</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', paddingTop: 15 }}>
                                <Icon name="envelope" size={15} color="black" />
                                <Text style={{ color: 'black' }}> {ownersData.data.emailAddress}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', paddingTop: 15 }}>
                                <Icon name="map-marker" size={15} color="black" />
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={{ color: 'black' }}> {ownersData.data.businessAddress},{ownersData.data.district},{ownersData.data.state}</Text>
                                    <Text style={{ color: 'black', marginTop: -10 }}>{'\n'}{ownersData.data.pinCode}</Text>
                                </View>
                            </View>
                        </View>
                    ) : (
                        <Text>No contact information available</Text>
                    )}
                </View>


                <View style={styles.event}>
                    <Text style={{ color: COLORS.darkGrey, fontSize: 15, lineHeight: 25, fontWeight: 'bold', paddingBottom: 6, color: 'grey', marginTop: 0 }}>
                        Photos
                    </Text>
                    <ScrollView horizontal={true}>
                        {ownersData && ownersData.data && ownersData.data.photos ? (
                            ownersData.data.photos.map((photo, index) => {
                                if (photo.category === 'Gallery') {
                                    return (
                                        <View key={index} style={styles.photos}>
                                            <Image
                                                source={{ uri: photo.imgAddress }}
                                                style={styles.imageFooter}
                                                resizeMode="cover"
                                            />
                                        </View>
                                    );
                                }
                                return null;
                            })
                        ) : null}
                    </ScrollView>
                </View>

            </ScrollView>

        </View>
    )
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
    bannerImage: {
        marginRight: 15,
        marginLeft: 15,
        position: 'relative',
        marginTop: 40
    },
    image: {
        width: width * 1, // Adjust width as needed
        height: 160, // Adjust height as needed
        marginBottom: 12,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        marginTop: -20,
        marginLeft: 130
    },
    roundImage: {
        height: 100,
        width: 100,
        borderRadius: 50,
    },
    hospitalName: {
        color: COLORS.darkGrey,
        fontSize: 20,
        lineHeight: 25,
        fontWeight: '500',
        paddingBottom: 12,
        textAlign: 'center',
    },
    HospitalNameContainer: {
        alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center',
    },
    event: {
        backgroundColor: COLORS.white,
        marginTop: 10,
        paddingTop: 0,
        // paddingRight: 46,
        paddingBottom: 20,
        paddingLeft: 12,
        borderRadius: 8,
        marginLeft: 15,
        marginRight: 15
    },
    callContainer: {
        // paddingTop:5,
        // paddingLeft:15,
        // pad
        // justifyContent:'center',
        // alignContent:'center',
        // alignItems:'center'
    },
    callBox: {
        // paddingRight:1,
        marginLeft: 165,
        color: COLORS.white,
        height: 30,
        width: 70,
        borderRadius: 6,
        borderColor: COLORS.blue,
        backgroundColor: COLORS.blue,
        paddingLeft: 15,
        paddingTop: 5,
        marginTop: -10
    },
    imageFooter: {
        width: width * 1,
        height: 200,
        paddingRight: 25
    },
    photos: {
        marginRight: 15
    }

})
