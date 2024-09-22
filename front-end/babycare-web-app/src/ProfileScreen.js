import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, View, Image} from 'react-native';

//const Stack = createNativeStackNavigator();

const ProfileScreen = ({navigation, route}) => {
    return <Text>This is {route.params.name}'s profile</Text>
};

export default ProfileScreen;