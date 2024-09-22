import React, {useState} from 'react';
import {Text, TextInput,View, Image, StyleSheet, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const PasswordResetPage = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    return (
        <View>
            <View style={{alignItems: 'center',borderColor:'black',borderWidth:5}}>
                <Text>Reset Password</Text>
            </View>
            <View style={{alignItems: 'center',borderColor:'black',borderWidth:5}}>
            <TextInput
                style={{height:40}}
                placeholder="Email Address"
                onChangeText={newEmail => setEmail(newEmail)}
                defaultValue={email}
                />
            </View>
            <View>
            <TextInput
                style={{height:40}}
                placeholder="new password"
                onChangeText={newNewPassword => setPassword(newNewPassword)}
                defaultValue={newPassword}
                />
            </View>
            <View>
            <TextInput
                style={{height:40}}
                placeholder="confirm new password"
                onChangeText={newConfirmNewPassword => setConfirmNewPassword(newConfirmNewPassword)}
                defaultValue={confirmNewPassword}
                />
            </View>
            <Button
            title="Sign-Up"
            color="lightblue"
            onPress={() => console.log("Email Addres is: " + email + ". New Password is: " + newPassword + ". Confirmed New Password is: " + confirmNewPassword + ".")}
            />
        </View>
    )
}

export default PasswordResetPage;