import React, {useState} from 'react';
import {Text, TextInput,View, Image, StyleSheet, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const AccountRegistrationPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    return (
        <View>
            <View style={{alignItems: 'center',borderColor:'black',borderWidth:5}}>
                <Text>Account Registration Page</Text>
            </View>
            <View style={{alignItems: 'center',borderColor:'black',borderWidth:5}}>
            <TextInput
                style={{height:40}}
                placeholder="new username"
                onChangeText={newUsername => setUsername(newUsername)}
                defaultValue={username}
                />
            </View>
            <View style={{alignItems: 'center',borderColor:'black',borderWidth:5}}>
            <TextInput
                style={{height:40}}
                placeholder="new password"
                onChangeText={newPassword => setPassword(newPassword)}
                defaultValue={password}
                />
            </View>
            <View style={{alignItems: 'center',borderColor:'black',borderWidth:5}}>
            <TextInput
                style={{height:40}}
                placeholder="confirm password"
                onChangeText={newConfirmPassword => setConfirmPassword(newConfirmPassword)}
                defaultValue={confirmPassword}
                />
            </View>
            <Button
            title="Sign-Up"
            color="lightblue"
            onPress={() => console.log("Username is: " + username + ". Password is: " + password + ". Confirmed Password is: " + confirmPassword + ".")}
            />
        </View>
    );
}

export default AccountRegistrationPage;