import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import COLORS from '../constants/color'
import { useNavigation } from '@react-navigation/native';
import TOKEN from '../Token/Token';

const { width } = Dimensions.get('window');

const window = Dimensions.get('window');
export default function Notification() {
  const navigation = useNavigation();
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);
  const fetchNotifications = async () => {
    try {
      const token = TOKEN;
      const response = await fetch('https://apimediator.mimamsalabs.com/api/ClientConnect/Notifications', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (!data.didError && Array.isArray(data.data)) {
        setNotifications(data.data);
      } else {
        // Handle error or empty response
        console.error('Error fetching notifications:', data.message || 'Empty response');
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };


  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/logo.png')} style={{ width: 120, height: 15 }} />
        <View style={{ flexDirection: 'row' }}>
          <Icon name="map-marker" size={18} color={'black'} />
          <Text style={{ color: COLORS.darkGrey, fontSize: 17, paddingLeft: 5, fontWeight: 500 }}>
            Azamgarh
          </Text>
        </View>
      </View>
      <ScrollView style={{  flex: 1 }}>
        <View style={styles.wrapper}>
          <Image source={require('../assets/banner.jpg')} style={styles.banner} />
          <Text style={{ color: COLORS.darkGrey, fontSize: 14, lineHeight: 13, fontWeight: '500', paddingTop: 20 }}>
            Notification
          </Text>
          {notifications.map((notification, index) => (
            <View style={styles.notification} key={index}>
              <View style={styles.notificationIcnon}>
                <Fontisto name="bell" size={18} style={{ color: '#4a5cff' }} />
              </View>
              <View style={{ borderBottomWidth: 1, borderBottomColor: 'rgba(112, 112, 112, 0.18)', paddingBottom: 18, flexGrow: 1, width: width * 0.44 }}>
                <Text style={{ color: COLORS.darkGrey, fontSize: 12, lineHeight: 13, fontWeight: '500', paddingTop: 2 }}>
                  {notification.title}
                </Text>
                <Text style={{ color: '#535353', fontSize: 12, lineHeight: 13, fontWeight: '500', paddingTop: 7 }}>
                  {notification.description}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
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

        <TouchableOpacity style={styles.notificationIcon} onPress={() => navigateToScreen('Notification')}>
          <View style={[styles.iconContainer, selectedIcon === 'bell' && styles.selectedIcon]}>
            <Icon name="bell" style={[styles.icon, { color: 'white' }]} />
            <Text style={[styles.footerText, { color: 'white' }]}>Notification</Text>
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
    alignItems: 'center'
  },
  wrapper: {
    backgroundColor: '#F5F5F5',
    paddingTop: 12,
    paddingRight: 15,
    paddingLeft: 15,
    // height: window.height - 120,
  },
  banner: {
    width: '100%',
    borderRadius: 8
  },
  notification: {
    paddingTop: 12,
    flexDirection: 'row'
  },
  notificationIcnon: {
    display: 'flex',
    backgroundColor: '#dce0ff',
    width: 40,
    height: 40,
    borderRadius: 40,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationIcon: {
    width: 65,
    height: 50,
    backgroundColor: COLORS.green,
    borderColor: COLORS.green,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingTop: -3
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: -8,
    height: 60,
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
  selectedIcon: {
    borderRadius: 25,
    backgroundColor: COLORS.green,
    padding: 8,
  },
})