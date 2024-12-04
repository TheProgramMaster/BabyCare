import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { HelmetProvider } from 'react-native-helmet-async';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Import your components and screens
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import Chat from '../Chat';
import VideoChatScreen from '../VideoChat';
import AppointmentsScreen from '../Appointments';
import BabysitterScreen from '../Babysitter';
import BabyGrowthTrackerScreen from '../BabyGrowthTracker';

// Define the types for your navigation stack
type RootStackParamList = {
  Home: undefined;
  Chat: undefined;
  VideoChat: undefined;
  Appointments: undefined;
  Babysitter: undefined;
  BabyGrowthTracker: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

// HomeScreen component
function HomeScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleNavigation = (screen: keyof RootStackParamList) => {
    try {
      navigation.navigate(screen);
    } catch (error) {
      console.error(`Navigation Error: Unable to navigate to ${screen}`, error);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('../../assets/images/baby.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.container}>
        <TouchableOpacity style={styles.block} onPress={() => handleNavigation('Chat')}>
          <ThemedText type="title">Chat</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.block} onPress={() => handleNavigation('VideoChat')}>
          <ThemedText type="title">Video Chat</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.block} onPress={() => handleNavigation('Appointments')}>
          <ThemedText type="title">Appointments</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.block} onPress={() => handleNavigation('Babysitter')}>
          <ThemedText type="title">Find a Babysitter</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.block} onPress={() => handleNavigation('BabyGrowthTracker')}>
          <ThemedText type="title">Baby Growth Tracker</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
  },
  block: {
    backgroundColor: 'rgba(161, 206, 220, 0.3)',
    borderRadius: 12,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 150,
  },
  reactLogo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  }
});

// App component to wrap the whole app inside NavigationContainer
export default function App() {
  return (
    <HelmetProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="VideoChat" component={VideoChatScreen} />
          <Stack.Screen name="Appointments" component={AppointmentsScreen} />
          <Stack.Screen name="Babysitter" component={BabysitterScreen} />
          <Stack.Screen name="BabyGrowthTracker" component={BabyGrowthTrackerScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </HelmetProvider>
  );
}
