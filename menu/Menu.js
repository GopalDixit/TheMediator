import { StyleSheet, Text, View, Image, Button, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import COLORS from '../constants/color';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function Menu() {
  const navigation = useNavigation();

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/logo.png')} style={{ width: 120, height: 15, marginTop: 8 }} />
      </View>
      <Text style={styles.numb}>+9154458454511</Text>
      <Text style={styles.email}>ddindex56@gmail.com</Text>
      <TouchableOpacity onPress={() => navigateToScreen('AddOwnBuisness')} style={[styles.btn, { width: width * 0.50 }]}>
        <Text style={styles.btnText}> +    Add Own Business</Text>
      </TouchableOpacity>

      <View style={styles.option}>
        <TouchableOpacity onPress={() => navigateToScreen('Dashboard')}style={styles.optionItem}>
          <Text style={styles.optText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigateToScreen('Events')}style={styles.optionItem}>
          <Text style={styles.optText}>Events</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigateToScreen('Notification')}style={styles.optionItem}>
          <Text style={styles.optText}>Notification</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigateToScreen('About')}style={styles.optionItem}>
          <Text style={styles.optText}>About</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigateToScreen('Administrator')}style={styles.optionItem}>
          <Text style={styles.optText}>Administrator</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigateToScreen('Administrator')}style={styles.optionItem}>
          <Text style={styles.optText}>Feedback</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
  },
  header: {
    paddingRight: 12,
    paddingLeft: 12,
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  numb: {
    marginTop: 15,
    paddingLeft: 12,
    color: 'black'
  },
  email: {
    marginTop: 8,
    paddingLeft: 12,
    color: 'black'
  },
  btn: {
    backgroundColor: COLORS.blue,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    paddingLeft: 12,
    marginTop: 22,
    marginRight: 185,
  },
  btnText: {
    color: COLORS.white,
  },
  option: {
    paddingHorizontal: 12,
    flexDirection: 'column',
    marginTop: 40,
    color:'black'
  },
  optText: {
    marginBottom: 12,
    fontWeight: 'bold',
    paddingVertical: 8,
    paddingHorizontal: 16,
    paddingLeft: 12,
    marginTop: 22,
    marginRight: 185,
    color:'black',
  },
  optionItem: {
    marginBottom:-8,
  },

})