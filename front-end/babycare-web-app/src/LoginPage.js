import React, {useState} from 'react';
import {Text, TextInput,View, Image, StyleSheet, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
});

const LoginPage = () => {
    const [username,setUsername] = useState('');
    const [password, setPassword] = useState('');
    return(
        <View>
            <View style={{alignItems: 'center', borderColor: 'black', borderWidth: 5}}>
                <Text>Login</Text>
            </View>
            <View style={{alignItems: 'center', borderColor: 'black', borderWidth: 5}}>
                <TextInput
                style={{height:40}}
                placeholder="username"
                onChangeText={newUsername => setUsername(newUsername)}
                defaultValue={username}
                />
            </View>
            <View style={{alignItems: 'center', borderColor: 'black', borderWidth: 5}}>
                <TextInput
                style={{height:40}}
                placeholder="password"
                onChangeText={newPassword => setPassword(newPassword)}
                defaultValue = {password} />
            </View>
            <Button
            title="Login"
            color="lightblue"
            onPress={() => console.log("Username is: " + username + ". Password is: " + password + ".")}
            />
        </View>
    );
};

export default LoginPage;