import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, View, ScrollView, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native';

const BulletPoint = ({ item }) => {
    return (
        <Text style={StyleSheet.listItem}>
            <Text style={styles.bulletPoint}>• </Text>
            <Text>{item}</Text>
        </Text>
    );
};

const GeneralFAQPage = () => {
    const fact1 = "Pregnancy takes 9 months to deliver.";
    const fact2 = "Consumption of drugs and alcohol must be limited in time of pregnancy.";
    const fact3 = "Seek care of child shortly after pregnancy is delivered.";
    const items = [fact1,fact2,fact3];
    return (
        <View style={styles.container}>
            {items.map((item, index) => (
                <BulletPoint key={index} item={item} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    listItem: {
        fontSize: 20,
        marginBottom: 10,
    },
    bulletPoint: {
        fontSize: 20,
    },
});

export default GeneralFAQPage;