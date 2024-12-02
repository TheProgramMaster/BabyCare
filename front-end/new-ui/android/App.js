/* eslint-disable */
import * as React from 'react';
import { SafeAreaView } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import BottomNavigationMenu from './BottomNavigationMenu';
import { HMSRoomProvider } from "@100mslive/react-sdk";


export default function App() {
  return (
    <HMSRoomProvider>
    <PaperProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <BottomNavigationMenu />
        </SafeAreaView>
      </PaperProvider>
    </HMSRoomProvider>
  );
}
