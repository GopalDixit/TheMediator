import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import COLORS from '../constants/color';
import TOKEN from '../Token/Token';
import { useNavigation } from '@react-navigation/native';

const window = Dimensions.get('window');

export default function EventDetail({ route }) {
    const eventId = route.params?.eventId;

    const [eventData, setEventData] = useState(null);
    const [headerImg, setHeaderImg] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        if (eventId) {
            fetch(`https://apimediator.mimamsalabs.com/api/ClientConnect/EventById?Id=${eventId}`, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                    'Content-Type': 'application/json',
                },
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Data received:', data);
                setEventData(data.data);
                setHeaderImg(data.data.headerImg);
            })
            .catch(error => console.error('Error fetching data:', error));
        }
    }, [eventId]);

    const stripHTMLTags = (html) => {
        return html.replace(/<[^>]*>?/gm, '');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Events')}>
                <View style={styles.header}>
                    <Ionicons name="arrow-back" size={24} />
                    <Text style={{ color: COLORS.darkGrey, fontSize: 17 }}>Azamgarh Events</Text>
                </View>
            </TouchableOpacity>
            <ScrollView>
                {eventData && (
                    <View style={styles.wrapper}>
                        {headerImg && <Image source={{ uri: headerImg }} style={{ width: window.width - 28, height: 200, borderRadius:10 }} />}
                        <Text style={{ color: COLORS.darkGrey, fontSize: 17, fontWeight: '500', paddingBottom: 9, paddingTop: 9 }}>
                            {eventData.eventName}
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: '#606060', fontSize: 12, lineHeight: 16, fontWeight: '400' }}>Date & Time: </Text>
                            <Text style={{ color: '#606060', fontSize: 12, lineHeight: 16, fontWeight: '500', paddingLeft: 5, paddingRight: 9 }}>
                                {eventData.eventDate}
                            </Text>
                            <Text style={{ color: '#606060', fontSize: 12, lineHeight: 16, fontWeight: '500' }}>
                                {eventData.eventTime}
                            </Text>
                        </View>
                        <Text style={{ color: COLORS.darkGrey, fontSize: 14, lineHeight: 27, fontWeight: '400', paddingTop: 20, paddingBottom: 28 }}>
                        {stripHTMLTags(eventData.description)}
                        </Text>
                        {/* You can add more dynamic content here based on your API response */}
                    </View>
                )}
            </ScrollView>
        </View>
    );
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
        paddingTop: 12,
        paddingRight: 15,
        paddingLeft: 15
    },
    banner: {
        width: '100%',
        borderRadius: 8
    },
})