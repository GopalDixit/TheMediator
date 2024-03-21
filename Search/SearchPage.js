import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import COLORS from '../constants/color';
import { useNavigation } from '@react-navigation/native';
import TOKEN from '../Token/Token';
const { width } = Dimensions.get('window');

const window = Dimensions.get('window');
export default function SearchPage() {
    const [selectedIcon, setSelectedIcon] = useState('home'); 
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState(''); // State to store search term
  const [allItems, setAllItems] = useState([]); // State to store all items
  const [searchResults, setSearchResults] = useState([]); // State to store search results
  const token = TOKEN; // Replace with your actual token

  const districtId = 14; // Replace with your actual district ID

  const fetchData = async () => {
    try {
      const response = await fetch(`https://apimediator.mimamsalabs.com/api/ClientConnect/SearchCategoryByKey?districtId=${districtId}&key=`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, // Include token in Authorization header
        },
      });
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.status}`);
      }
      const data = await response.json();
      if (data.didError === false) {
        setAllItems(data.data.map((item) => item.name));
      } else {
        console.error('Error in API response:', data.message);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Fetch data on component mount

  const navigateToScreen = (screenName, icon, itemName) => {
    setSelectedIcon(icon);
    navigation.navigate(screenName, { icon, itemName }); 
};

  const handleSearch = (text) => {
    setSearchText(text);
    if (text) {
      const filteredResults = allItems.filter((item) =>
        item.toLowerCase().includes(text.toLowerCase())
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults(allItems); // Reset to all items if search text is empty
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigateToScreen('Dashboard')}>
            <Ionicons name="arrow-back" size={24} style={styles.arrow} />
          </TouchableOpacity>
          <Icon style={{ color: 'black' }} name="map-marker" size={18} />
          <Text style={{ color: COLORS.darkGrey, fontSize: 17, paddingLeft: 5, fontWeight: '500' }}>
            Azamgarh
          </Text>
        </View>
        <View style={styles.hindiBox}>
          <Text style={{ color: 'white' }}>हिंदी</Text>
        </View>
      </View>

      <TextInput
        style={styles.search}
        placeholder="Search Here"
        placeholderTextColor="#343434"
        onChangeText={handleSearch} // Call handleSearch on text change
      />
      <Icon name="search" size={24} style={styles.searchIcon} />

      {/* Conditionally render search results or all items */}
      {searchText.length > 0 ? (
        searchResults.map((result, index) => (
          <TouchableOpacity key={index} >
            <Text style={styles.searchResult}>
              {result}
            </Text>
          </TouchableOpacity>
        ))
      ) : (
        allItems.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => navigateToScreen('WomenHospital','home',item)}>
            <Text style={styles.searchResult}>
              {item}
            </Text>
          </TouchableOpacity>
        ))
      )}
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
        // backgroundColor: COLORS.white,
        paddingTop: 16,
        paddingRight: 12,
        paddingBottom: 16,
        paddingLeft: 12,
        flexDirection: 'row',
        display: 'flex',
    },
    arrow: {
        color: 'black',
        paddingLeft: 15,
        paddingRight: 5,
        marginRight: '40%'
    },
    hindiBox: {
        width: 50,
        height: 30,
        backgroundColor: COLORS.blue,
        borderColor: COLORS.blue,
        borderRadius: 5,
        paddingTop: 8,
        marginLeft: 52,
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 0
    },
    search: {
        backgroundColor: COLORS.white,
        color: COLORS.darkGrey,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 1,
        shadowRadius: 7,
        paddingTop: 10,
        paddingRight: 16,
        paddingBottom: 10,
        paddingLeft: 48,
        elevation: 4,
        marginLeft: 15,
        marginRight: 15,
    },
    searchIcon: {
        position: 'absolute',
        left: 35,
        top: 102,
        color: 'black'
    },
    searchResult: {
        color: 'grey',
        fontSize: 18,
        lineHeight: 13,
        fontWeight: '500',
        paddingTop: 6,
        marginTop: 30,
        marginLeft: 15
    }

});
