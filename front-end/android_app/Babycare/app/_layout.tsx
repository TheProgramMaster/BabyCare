import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen 
          name="Chat"
          options={{
            headerShown: true,
            presentation: 'modal'
          }}
        />
        <Stack.Screen 
          name="VideoChat"
          options={{
            headerShown: true,
            presentation: 'modal'
          }}
        />
        <Stack.Screen 
          name="Appointments"
          options={{
            headerShown: true,
            presentation: 'modal'
          }}
        />
        <Stack.Screen 
          name="Babysitter"
          options={{
            headerShown: true,
            presentation: 'modal'
          }}
        />
        <Stack.Screen 
          name="BabyGrowthTracker"
          options={{
            headerShown: true,
            presentation: 'modal'
          }}
        />        
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
