/* eslint-disable */
import * as React from 'react';
import { SafeAreaView } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import BottomNavigationMenu from './BottomNavigationMenu';


export default function App() {
  return (
    <PaperProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <BottomNavigationMenu />
      </SafeAreaView>
    </PaperProvider>
  );
}
