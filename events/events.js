import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../constants/color';
import { Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import TOKEN from '../Token/Token'; // Assuming TOKEN is defined elsewhere
import EventDetail from './eventDetail'

const window = Dimensions.get('window');

export default function Events({ route }) {
  const navigation = useNavigation();
  const [selectedIcon, setSelectedIcon] = useState(route.params?.icon || 'home');
  const [eventData, setEventData] = useState(null);
  const [eventId, setEventId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Assuming JSON data is expected by the API
        const body = JSON.stringify({ /* Your data here, if required */ }); // Replace with your data structure if necessary

        const response = await fetch('https://apimediator.mimamsalabs.com/api/ClientConnect/TopEvents', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            'Content-Type': 'application/json', // Set Content-Type header if sending JSON
          },
          body, // Include the request body if required
        });

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        if (!data['didError']) {
          setEventData(data['data'][0]); // Assuming the first event
          const id = data.data[0].id;
          setEventId(id);

        } else {
          console.error('API error:', data['message']);
        }
      } catch (error) {
        if (error.name === 'SyntaxError') {
          console.error('Error parsing JSON response:', error);
        } else {
          console.error(error);
        }
      }
    };

    fetchData();
  }, []);

  const navigateToScreen = (screenName, params = {}) => {
    setSelectedIcon(params?.icon || 'home'); // Keep icon handling logic
    navigation.navigate(screenName, params); // Pass the params object
  };
  
  const gradientColors = ['#9B30FF', '#007FFF'];
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/logo.png')} style={{ width: 120, height: 15 }} />
        <View style={{ flexDirection: 'row' }}>
          <Ionicons name="location-outline" size={18} color={'black'} />
          <Text style={{ color: COLORS.darkGrey, fontSize: 17, paddingLeft: 5, fontWeight: 500 }}>
            Azamgarh
          </Text>
        </View>
      </View>
      <ScrollView style={{ height: 500 }}>
        <View style={styles.wrapper}>
          <Image source={require('../assets/banner.jpg')} style={styles.banner} />
          <Text style={{ color: COLORS.darkGrey, fontSize: 14, lineHeight: 13, fontWeight: 500, paddingTop: 20 }}>
            Top Events
          </Text>
          {eventData && (
            <View style={styles.event}>
              <TouchableOpacity onPress={() => navigateToScreen('EventDetail', { eventId })}>
                <Feather name="chevron-right" size={24} style={[styles.arrow, { position: 'absolute', right: -28, top: 8 }]} />
                <View style={styles.newText} >{eventData.new && <LinearGradient
                  colors={gradientColors}
                  style={styles.newText}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                ><Text style={{ color: 'white', fontSize: 12 }} >NEW</Text></LinearGradient>}</View>
                <Text style={{ color: COLORS.darkGrey, fontSize: 25, lineHeight: 25, fontWeight: 500, paddingBottom: 12, marginTop: 0 }}>
                  {eventData.eventName}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: '#606060', fontSize: 15, lineHeight: 16, fontWeight: 400 }}>
                    Date & Time:
                  </Text>
                  <Text style={{ color: '#606060', fontSize: 15, lineHeight: 16, fontWeight: 500, paddingLeft: 5, paddingRight: 9 }}>
                    {eventData.eventDate}
                  </Text>
                  <Text style={{ color: '#606060', fontSize: 15, lineHeight: 16, fontWeight: 500 }}>
                    {eventData.eventTime}
                  </Text>
                </View>

              {/* {eventData && <EventDetail eventId={eventId} />} */}
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
      <View style={styles.footer}>

        <TouchableOpacity onPress={() => navigateToScreen('Dashboard')}>
          <View style={[styles.iconContainer, selectedIcon === 'home' && styles.selectedIcon]}>
            <Icon name="home" style={styles.icon} />
            <Text style={styles.footerText}>Home</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.eventIcon} onPress={() => navigateToScreen('Events')}>
          <View style={[styles.iconContainer, selectedIcon === 'calendar' && styles.selectedIcon]}>
            <Icon name="calendar" style={[styles.icon, { color: 'white' }]} />
            <Text style={[styles.footerText, { color: 'white' }]}>Events</Text>
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

        <TouchableOpacity onPress={() => navigateToScreen('Administrator')}>
          <View style={[styles.iconContainer, selectedIcon === 'user' && styles.selectedIcon]}>
            <Icon name="user" style={styles.icon} />
            <Text style={styles.footerText}>Administrator</Text>
          </View>
        </TouchableOpacity>


      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    paddingTop: 28,
    flex: 1,
    justifyContent: 'space-between', // Align children with space between
  },
  header: {
    backgroundColor: COLORS.white,
    paddingTop: 16,
    paddingRight: 12,
    paddingBottom: 16,
    paddingLeft: 12,
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wrapper: {
    backgroundColor: '#F5F5F5',
    paddingTop: 12,
    paddingRight: 15,
    paddingLeft: 15,
    flex: 1, // Allow wrapper to take remaining space
    height: window.height - 120,
  },
  banner: {
    width: '100%',
    borderRadius: 8,
  },
  event: {
    backgroundColor: COLORS.white,
    marginTop: 10,
    paddingTop: 20,
    paddingRight: 46,
    paddingBottom: 20,
    paddingLeft: 12,
    borderRadius: 8,
  },
  arrow: {
    position: 'absolute',
    right: 18,
    top: 28,
  },
  eventIcon: {
    width: 60,
    height: 50,
    backgroundColor: COLORS.green,
    borderColor: COLORS.green,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingTop: -3
  },
  newText: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -8,
    paddingTop: 0,
    paddingLeft: 0,
    marginLeft: -4,
    marginBottom: 2,
    height: 20,
    width: 45,
    borderRadius: 40,
    // backgroundColor: LinearGradient(),
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: -8,
    height: 60, // Adjust the value according to your needs
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: COLORS.lightgrey,
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
});