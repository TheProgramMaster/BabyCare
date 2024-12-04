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
                <View>
                    <Text variant="headlineLarge">Babycare Mobile Web App</Text>
                    <Text style={{ fontSize: 20 }}>Welcome!</Text>
                    <Text style={{ fontSize: 20 }}>
                      Please take a minute to use our application for all of your
                      pregnancy and parental needs!!!
                    </Text>
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
});

export default HomeScreen;
