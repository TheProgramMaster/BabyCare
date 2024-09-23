import logo from './logo.svg';
import './App.css';
import * as React from 'react';
import {Button} from 'react-native';
import {Text, View, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen.js';
import ProfileScreen from './ProfileScreen.js';
import NavigationBar from './NavigationBar.js';
import LoginPage from './LoginPage.js';
import AccountRegistrationPage from './AccountRegistrationPage.js';
import PasswordResetPage from './PasswordResetPage.js';
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
    <NavigationContainer initialRouteName="HomeScreen">
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Register" component={AccountRegistrationPage} />
        <Stack.Screen name="ResetPassword" component={PasswordResetPage} />
      </Stack.Navigator>
      <NavigationBar />
    </NavigationContainer>
  );
}

export default App;
