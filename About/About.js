import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image,TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import COLORS from '../constants/color';
import TOKEN from '../Token/Token';
import { useNavigation } from '@react-navigation/native';

export default function About() {
  const [aboutText, setAboutText] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('home'); 
  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const token = TOKEN; // Your token value
      const response = await fetch('https://apimediator.mimamsalabs.com/api/Admin/About', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log('Response status:', response.status);
      const responseData = await response.json();
      console.log('Response data:', responseData);
      if (responseData.data && responseData.data.aboutUs) {
        setAboutText(responseData.data.aboutUs);
      } else {
        console.error('Failed to fetch about data:', responseData.message);
      }
    } catch (error) {
      console.error('Error fetching about data:', error);
    }
  };

  const navigation = useNavigation();
    const navigateToScreen = (screenName, icon) => {
        setSelectedIcon(icon);
        navigation.navigate(screenName, { icon });
      };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/logo.png')} style={{ width: 120, height: 15 }} />
        <View style={{ flexDirection: 'row' }}>
          <Icon name="map-marker" size={18} />
          <Text style={{ color: COLORS.darkGrey, fontSize: 17, paddingLeft: 5, fontWeight: 500 }}>
            Azamgarh
          </Text>
        </View>
      </View>
      <View style={styles.paraContainer}>
        <Text style={{ fontWeight: 'bold', fontSize:15,color:'black' }}>About us</Text>
        <Text style={{ color: COLORS.darkGrey, fontSize: 14, lineHeight: 27, fontWeight: '400', paddingTop: 20, paddingBottom: 28 }}>
          {aboutText}
        </Text>
      </View>

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
            <Icon name="bell" style={[styles.icon]} />
            <Text style={[styles.footerText]}>Notification</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.aboutIcon} onPress={() => navigateToScreen('About')}>
          <View style={[styles.iconContainer, selectedIcon === 'info-circle' && styles.selectedIcon]}>
            <Icon name="info-circle" style={[styles.icon, { color: 'white' }]} />
            <Text style={[styles.footerText, { color: 'white' }]}>About</Text>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#F5F5F5',
    paddingTop: 28,
  },
  header: {
    backgroundColor: COLORS.white,
    paddingTop: 16,
    paddingRight: 12,
    paddingBottom: 16,
    paddingLeft: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paraContainer:{
    marginTop:15,
    marginLeft:15,
  },
  
  aboutIcon:{
    width:50,
    height:50,
    backgroundColor:COLORS.green,
    borderColor: COLORS.green,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingTop:-3
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
});
