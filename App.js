import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import Dashboard from './dashboard/dashboard';
import MyProfile from './myProfile/myProfile';
import Events from './events/events';
import EventDetail from './events/eventDetail';
import Notification from './notification/notification';
import Menu from './menu/Menu';
import AddOwnBuisness from './AddOwnBuisness/AddOwnBuisness';
import Administrator from './Administrator/Administrator';
import AdministratorDirect from './Administrator/AdministratorDirect';
import About from './About/About';
import SearchPage from './Search/SearchPage';
import WomenHospital from './WomenHospital/WomenHospital';
import HospitalToProfile from './HospitalToProfile/HospitalToProfile';
const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();
export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MyProfile"
          component={MyProfile}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Events"
          component={Events}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EventDetail"
          component={EventDetail}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Menu"
          component={Menu} 
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AddOwnBuisness"
          component={AddOwnBuisness}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Administrator"
          component={Administrator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AdministratorDirect"
          component={AdministratorDirect}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="About"
          component={About}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SearchPage"
          component={SearchPage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="WomenHospital"
          component={WomenHospital}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="HospitalToProfile"
          component={HospitalToProfile}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
