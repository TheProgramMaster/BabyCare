import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, View, Image} from 'react-native';
import {Button} from 'react-native';

//const Stack = createNativeStackNavigator();

const HomeScreen = ({navigation}) => {
    return(
        <Button
        title = "Go to Jane's profile"
        onPress={() => navigation.navigate('Profile',{name: 'Jane'})}
        />
    );
};

export default HomeScreen;