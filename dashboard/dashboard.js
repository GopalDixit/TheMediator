import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import COLORS from '../constants/color';
import { useNavigation } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Menu from '../menu/Menu';
import TOKEN from '../Token/Token';


export default function Dashboard() {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [selectedIcon, setSelectedIcon] = useState('home'); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = TOKEN;
        const response = await fetch('https://apimediator.mimamsalabs.com/api/ClientConnect/DashBoard', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (data.didError) {
          setError(data.message);
        } else {
          setCategories(data.data.categories);
        }
      } catch (error) {
        setError(`Error fetching data: ${error.message}`);
      }
    };

    fetchData();
  }, []);

  const navigateToScreen = (screenName, icon) => {
    setSelectedIcon(icon)
    navigation.navigate(screenName, { icon });
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuIcon} onPress={() => navigateToScreen('Menu')}>
        <Ionicons name="menu-outline" size={30} color={COLORS.darkGrey} />
      </TouchableOpacity>


      <View style={styles.header}>
        <Image source={require('../assets/logo.png')} style={{ width: 120, height: 15, marginTop: 8 }} />
      </View>
      <View>
        <Image source={require('../assets/banner1.jpg')} style={{ height:175, width: '100%', marginTop: 35, borderRadius: 6 }} />
      </View>
      <View style={styles.greySection}>
        <ScrollView style={{ height: 500 }}>
          <TouchableOpacity onPress={() => navigateToScreen('SearchPage')}>
          <View style={styles.search}>
              <Icon name="search" size={24} style={styles.searchIcon} />
              <Text style={styles.searchText}>Search Business in Azamgarh</Text>
            </View>
          </TouchableOpacity >
          <View style={{ display: 'flex', gap: 15, marginTop: 30, marginBottom: 36, flexDirection: 'row', flexWrap: 'wrap' }}>
            {categories.map((category) => (
              <View key={category.id} style={styles.categoryIcon}>
                <View style={{ backgroundColor: category.backgroundColor, width: 50, height: 50, borderRadius: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Image source={{ uri: category.img }} style={styles.iconSize} />
                </View>
                <Text style={styles.categoryText}>{category.categoryName}</Text>
              </View>
            ))}
          </View>
          <View>
            <Image source={require('../assets/banner_footer.jpg')} style={{ width: '100%', borderTopLeftRadius: 10,borderTopRightRadius: 10, marginTop:0 }} />
          </View>
        </ScrollView>
      </View>
      <View style={styles.footer}>

          <TouchableOpacity style={styles.homeIcon} onPress={() => navigateToScreen('Dashboard')}>
            <View style={[styles.iconContainer, selectedIcon === 'home' && styles.selectedIcon]}>
              <Icon name="home" style={[styles.icon,{color:'white'}]} />
              <Text style={[styles.footerText,{color:'white'}]}>Home</Text>
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
    backgroundColor: COLORS.white,
    paddingTop: 48,
    flex: 1,
  },
  menuIcon: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 1,
  },
  greySection: {
    backgroundColor: COLORS.lightgrey,
    paddingTop: 20,
    paddingRight: 12,
    paddingBottom: 30,
    paddingLeft: 12,
    borderRadius: 15,
    position: 'relative',
    top: -8
  },
  search: {
    backgroundColor: COLORS.white,
    color: COLORS.darkGrey,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 1,
    // shadowOffset: {
    //   width: 4,
    //   height: 4
    // },
    shadowRadius: 7,
    paddingTop: 17,
    paddingRight: 16,
    paddingBottom: 17,
    paddingLeft: 48,
    elevation: 4
  },
  searchIcon: {
    position: 'absolute',
    left: 18,
    top: 12,
    color:'black'
  },
  searchText:{
    color:'#696969'
  },
  categoryIcon: {
    width: '21.5%',
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 5
  },
  iconSize: {
    width: 45,
    height: 45,
  },
  categoryText: {
    width: '100%',
    color: COLORS.darkGrey,
    fontSize: 12,
    lineHeight: 18,
    paddingTop: 6,
    textAlign: 'center'
  },
  header: {
    backgroundColor: COLORS.white,
    paddingRight: 12,
    paddingLeft: 52,
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: -25,
  },
  homeIcon:{
    width:60,
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
  iconBg: {
    // Adjust height to fit image and text
    width: 50, // Adjust width to fit image and text
    height: 50,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center',
  },
  selectedIcon: {
     // Rounded border for the selected icon
    // backgroundColor: COLORS.green,
   
    padding: 4,
  },
});
