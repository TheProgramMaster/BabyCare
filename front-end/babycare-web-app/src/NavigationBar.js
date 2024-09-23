import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, View, ScrollView, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native';

const NavigationBar = () => {
    const navigation =  useNavigation();
    return (
        <View style={styles.navBar}>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.navItem}>Account Registration</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.navItem}>Sign-In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
                <Text style={styles.navItem}>Forgot Password?</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    navBar: {
        flexDirection: 'row',
        justifyContent:'space-around',
        backgroundColor: '#fff',
        padding:10,
        position: 'absolute',
        top:0,
        width:'100%',
        zIndex:1000,
    },
    navItem: {
        fontSize: 18,
    },
});

export default NavigationBar;