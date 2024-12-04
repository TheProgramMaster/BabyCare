import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen'; // Adjust the path according to your project structure
import ChatScreen from './screens/ChatScreen';
import VideoChatScreen from './screens/VideoChatScreen';
import AppointmentsScreen from './screens/AppointmentsScreen';
import BabysitterScreen from './screens/BabysitterScreen';
import BabyGrowthTrackerScreen from './screens/BabyGrowthTrackerScreen';

// Define the type for the navigation stack
type RootStackParamList = {
  Home: undefined;
  Chat: undefined;
  VideoChat: undefined;
  Appointments: undefined;
  Babysitter: undefined;
  BabyGrowthTracker: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="VideoChat" component={VideoChatScreen} />
        <Stack.Screen name="Appointments" component={AppointmentsScreen} />
        <Stack.Screen name="Babysitter" component={BabysitterScreen} />
        <Stack.Screen name="BabyGrowthTracker" component={BabyGrowthTrackerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
