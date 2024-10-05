/* eslint-disable */
import * as React from 'react';
import { View, ScrollView, Image, StyleSheet} from 'react-native';
import { Text } from 'react-native-paper';



const HomeScreen = ({navigation}) => {
    return(
            <View>
                <Text variant="headlineLarge">Babycare Mobile Web App</Text>
                <Text>Welcome to our team's babycare web mobile app!</Text>
                <Text>Please take a minute to use our application for all of your
                    pregnancy and parental needs!!!
                </Text>
            </View>
    );
};



export default HomeScreen;
