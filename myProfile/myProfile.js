import { StyleSheet, Text, View, Image, Pressable, ScrollView } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import COLORS from '../constants/color'

export default function MyProfile() { 
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Ionicons name="arrow-back" size={30} /> 
                <Text style={{ color: COLORS.darkGrey, fontSize: 17 }}>My Profile</Text>
            </View>
            <ScrollView style={{ height: 500 }}>
                <View style={styles.wrapper}>
                    <View style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <Image source={require('../assets/banner.jpg')} />
                        <View style={styles.user}>
                            <Image source={require('../assets/user.png')} style={styles.userimg} />
                        </View>
                    </View> 
                    <Text style={{ color: COLORS.black, fontSize: 18, lineHeight: 24, textAlign: 'center', fontWeight: 500, paddingTop: 7, paddingBottom: 21 }}>
                        Maha Pandit Rahul Sanskrityayn District Female Hospital
                    </Text>
                    <View style={styles.whiteBox}>
                        <Text style={{ color: COLORS.darkGrey, fontSize: 14, fontWeight: 500 }}>About</Text>
                        <Text style={{ color: COLORS.darkGrey, fontSize: 12, lineHeight: 20, paddingTop: 5 }}>
                            Maha Pandit Rahul Sanskrityayn District Female Hospital is known for providing timely intensive care to patients and you can get in touch with them to check
                        </Text>
                    </View>
                    <View style={styles.whiteBox}>
                        <Text style={{ color: COLORS.darkGrey, fontSize: 14, fontWeight: 500, paddingBottom: 7 }}>Contact & Address</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 7 }}>
                            <Ionicons name="call-outline" size={18} />
                            <Text style={{ color: COLORS.darkGrey, fontSize: 12, fontWeight: 500, paddingLeft: 12 }}>
                                +91 54458454511
                            </Text>
                            <Pressable style={styles.callBtn}>
                                <Ionicons name="call-outline" size={12} style={{ color: COLORS.white }} />
                                <Text style={{ color: COLORS.white, fontSize: 12, paddingLeft: 8 }}>Call</Text>
                            </Pressable>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 7 }}>
                            <Ionicons name="mail-outline" size={18} />
                            <Text style={{ color: COLORS.darkGrey, fontSize: 12, fontWeight: 500, paddingLeft: 12 }}>
                                ddindex56@gmail.com
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 7 }}>
                            <Ionicons name="location-outline" size={18} />
                            <Text style={{ color: COLORS.darkGrey, fontSize: 12, fontWeight: 500, paddingLeft: 12 }}>
                                Ailwal, Azamgarh, Uttar Pradesh 276001
                            </Text>
                        </View>                    
                    </View>
                    <View style={styles.whiteBox}>
                        <Text style={{ color: COLORS.darkGrey, fontSize: 14, fontWeight: 500, paddingBottom: 7 }}>Photos</Text>
                        <Image source={require('../assets/palace.jpg')} style={{ width: '100%' }} />
                    </View>
                </View>
            </ScrollView>            
        </View>
    )
}

const styles = StyleSheet.create({ 
    container: {
        backgroundColor: '#F5F5F5',
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
        gap: 12,
    },
    wrapper: {
        backgroundColor: '#F5F5F5',
        paddingTop: 36,
        paddingRight: 15,
        paddingLeft: 15
    },
    user: {
        width: 100,
        height: 100,
        position: 'absolute',
        top: -20
    },
    userimg: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    whiteBox: {
        backgroundColor: COLORS.white,
        marginBottom: 10,
        padding: 12
    },
    callBtn: {
        backgroundColor: '#4A5CFF',
        width: 60,
        paddingTop: 4,
        paddingRight: 12,
        paddingBottom: 4,
        paddingLeft: 12,
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 10
    }
})