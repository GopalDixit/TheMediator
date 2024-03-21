import { StyleSheet, Text, View, TouchableOpacity, Dimensions,ScrollView,Linking } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import COLORS from '../constants/color';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native-elements';

const { width } = Dimensions.get('window');

export default function HospitalToProfile() {
    const navigation = useNavigation();
    const [selectedIcon, setSelectedIcon] = useState('home');
    const navigateToScreen = (screenName, icon) => {
        setSelectedIcon(icon)
        navigation.navigate(screenName, { icon });
    };

    const handleCall = () => {
        const phoneNumber = '+915445514875'; 
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
                    <Image
                        source={require('../assets/banner.jpg')}
                        style={styles.image}
                        resizeMode="cover"
                    />
                    <View style={styles.overlay}>
                        <Image
                            source={require('../assets/1_YMJDp-kqus7i-ktWtksNjg.jpg')}
                            style={styles.roundImage}
                            resizeMode="cover"
                        />
                    </View>
                </View>
                <View style={styles.HospitalNameContainer}>
                    <Text style={styles.hospitalName}>
                        Maha Pandit Rahul Sanskratiy District Female Hospital
                    </Text>
                </View>


                <View style={styles.event}>
                    <Text style={{ color: COLORS.darkGrey, fontSize: 15, lineHeight: 25, fontWeight: 'bold', paddingBottom: 6, color: 'grey', marginTop: 0 }}>
                        About
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: '#606060', fontSize: 12, lineHeight: 16, fontWeight: 400 }}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </Text>
                    </View>
                </View>

                <View style={styles.event}>
                    <Text style={{ color: COLORS.darkGrey, fontSize: 15, lineHeight: 25, fontWeight: 'bold', paddingBottom: 6, color: 'grey', marginTop: 0 }}>
                        Contact & Address
                    </Text>
                    <View style={{ flexDirection: 'row', paddingTop: 15, color: "black" }}>
                        <Text style={{ color: '#606060', fontSize: 15, lineHeight: 16, fontWeight: '400' }}>
                            <Icon name="phone" size={15} color="black" /> +91 5445514875
                        </Text>
                        <TouchableOpacity onPress={handleCall}>
                        <View style={styles.callContainer}><Text style={styles.callBox}><Icon name="phone" size={15} color='white' />  Call</Text></View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', paddingTop: 15 }}>
                        <Icon name="envelope" size={15} color="black" />
                        <Text style={{ color: 'black' }}> ddindex56@gmail.com</Text>
                    </View>

                    <View style={{ flexDirection: 'row', paddingTop: 15 }}>
                        <Icon name="map-marker" size={15} color="black" />
                        <Text style={{ color: 'black' }}> Ailwal, Azamgarh, Uttar Pradesh</Text>
                    </View>
                </View>

                <View style={styles.event}>
                    <Text style={{ color: COLORS.darkGrey, fontSize: 15, lineHeight: 25, fontWeight: 'bold', paddingBottom: 6, color: 'grey', marginTop: 0 }}>
                        Photos
                    </Text>
                    <View style={styles.photos}>
                    <Image
                        source={require('../assets/banner.jpg')}
                        style={styles.imageFooter}
                        resizeMode="cover"
                    />
                    </View>
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
        height: 150, // Adjust height as needed
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
        marginLeft: 140,
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
    imageFooter:{
        width:width*1,
        height:200,
        paddingRight:15
    }

})
