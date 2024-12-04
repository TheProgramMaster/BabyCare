import { Image, StyleSheet, Platform, TouchableOpacity, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const navigation = useNavigation();

  const goToChat = () => {
    navigation.navigate('Chat');
  };

  const goToVideoChat = () => {
    navigation.navigate('VideoChat');
  };

  const goToAppointments = () => {
    navigation.navigate('Appointments');
  };

  // baby sitter
  const goToFindBabysitter = () => {
    navigation.navigate('Babysitter');
  }
  //tracker
  const goToBabyGrowthTracker = () => {
    navigation.navigate('BabyGrowthTracker');
  }

  return (

    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/baby.png')}
          // style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.container}>
        <TouchableOpacity 
          style={styles.block}
          onPress={goToChat}
        >
          <ThemedText type="title">Chat</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.block}
          onPress={goToVideoChat}
        >
          <ThemedText type="title">Video Chat</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.block}
          onPress={goToAppointments}
        >
          <ThemedText type="title">Appointments</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.block}
          onPress={goToFindBabysitter}
        >
          <ThemedText type="title">Find a Babysitter</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.block}
          onPress={goToBabyGrowthTracker}
        >
          <ThemedText type="title">BabyGrowthTracker</ThemedText>
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
