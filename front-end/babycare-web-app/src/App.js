import logo from './logo.svg';
import './App.css';
import * as React from 'react';
import {Button} from 'react-native';
import {Text, View, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen.js';
import ProfileScreen from './ProfileScreen.js';
import LoginPage from './LoginPage.js';
import AccountRegistrationPage from './AccountRegistrationPage.js';
/*function HomeScreen() {
  return (
    <View style={{alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}
<Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />  
*/
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Account Registration Page" component={AccountRegistrationPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
