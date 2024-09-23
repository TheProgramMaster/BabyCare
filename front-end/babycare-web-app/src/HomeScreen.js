import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, View, ScrollView, Image, StyleSheet} from 'react-native';
import {Button} from 'react-native';
import NavigationBar from './NavigationBar.js';

const Stack = createNativeStackNavigator();

const HomeScreen = ({navigation}) => {
    return(
        <View style={styles.container}>
            <NavigationBar />
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Text style={styles.content}>Babycare Mobile Web App</Text>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        paddingTop: 60,
    },
    content: {
        fontSize: 24,
        padding: 20,
    },
});

export default HomeScreen;