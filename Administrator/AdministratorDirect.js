import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import TOKEN from '../Token/Token';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import COLORS from '../constants/color';
import { useNavigation } from '@react-navigation/native';

const AdministratorDirect = ({ route }) => {
  console.log("Route params:", route.params);
  const categoryId = route.params?.categoryId;
  const categoryName = route.params?.categoryName;
  console.log("Category ID:", categoryId);
  console.log("Category Name:", categoryName);
  const [selectedIcon, setSelectedIcon] = useState('home');
  const [telephoneData, setTelephoneData] = useState([]);
  const navigation = useNavigation();
  const navigateToScreen = (screenName, icon) => {
    setSelectedIcon(icon);
    navigation.navigate(screenName, { icon });
  };
  useEffect(() => {
    fetchTelephoneData(categoryId);
  }, [categoryId]);

  const fetchTelephoneData = async (categoryId) => {
    try {
      const token = TOKEN;
      const response = await fetch(`https://apimediator.mimamsalabs.com/api/ClientConnect/TelephoneDirectories?categoryId=${categoryId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const responseData = await response.json();
      console.log('Response Data:', responseData); 
      if (!responseData.didError) {
        setTelephoneData(responseData.data);
      } else {
        console.error('Failed to fetch telephone data:', responseData.message);
      }
    } catch (error) {
      console.error('Error fetching telephone data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigateToScreen('Administrator')}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerContainer}>
        <Text style={[styles.headerText]}>{categoryName}</Text>
        </Text>
      </View>


      <TextInput
        style={styles.search}
        placeholder="Search Here"
        placeholderTextColor="#343434"
      />
      <Icon name="search" size={24} style={styles.searchIcon} > </Icon>
      {telephoneData.map(item => (
        <View key={item.id}>
          {item.name && <Text style={[styles.name, { color: 'grey' }]}>{item.name}</Text>}
          {item.telNumber && <Text style={[styles.number, { color: 'blue' }]}>{item.telNumber}</Text>}
        </View>
      ))}


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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    backgroundColor: 'white',
    position: 'relative',
    marginTop: 15,
    paddingTop: 15,
    paddingLeft: 25,
    paddingHorizontal: 16,
    flexDirection: 'row',
    height: 60,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#797979'
  },
  backButton: {
    marginRight: 16,
    marginTop:-7
  },
  headerText: {
    color:'#696969',
    fontSize: 18,
    fontWeight: 'bold',
  },
  search: {
    backgroundColor: COLORS.white,
    color: COLORS.darkGrey,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowRadius: 7,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 10,
    paddingTop: 8,
    paddingRight: 16,
    paddingBottom: 8,
    paddingLeft: 48,
    elevation: 4
  },
  searchIcon: {
    color: 'black',
    position: 'absolute',
    left: 30,
    top: 95
  },
  name: {
    marginTop: 10,
    marginLeft: 16,
    fontSize: 16,
    fontWeight: 'bold',
  },
  number: {
    marginLeft: 16,
    fontSize: 14,
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
});

export default AdministratorDirect;
