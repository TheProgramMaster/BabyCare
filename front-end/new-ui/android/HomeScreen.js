/* eslint-disable */
import * as React from 'react';
import { View, ImageBackground, ScrollView, Image, StyleSheet} from 'react-native';
import { Text } from 'react-native-paper';



const HomeScreen = ({navigation}) => {
    return(
            <ImageBackground
              source={require('./assets/bg3.png')}
              style={styles.background}
            >
              <View style={styles.overlayContainer}>
                <View style={styles.logoContainer}>
                <Image
                    source={require('./assets/baby-care-logo.jpg')}
                    alt="BabyCare Logo"
                    style={styles.logoStyle}
                  />
                </View>
                <View style={styles.textContainer}>
                    <Text variant="headlineLarge" style={{color: '#4B0082'}}> Babycare Mobile Web App</Text>
                    <Text style={{ color: '#4B0082', fontSize: 20 }}>Welcome!</Text>
                    <Text style={{ color: '#4B0082', fontSize: 20 }}>
                      Please take a minute to use our application for all of your
                      pregnancy and parental needs!!!
                    </Text>
                </View>
                </View>
            </ImageBackground>
    );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlayContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },
  logoContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  textContainer: {
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoStyle: {
    width: '100%',
    height: '150',
    resizeMode: 'contain',
  },
});

export default HomeScreen;
