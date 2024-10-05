/* eslint-disable */
import React, {useState} from 'react';
import {View} from 'react-native';
import { TextInput } from 'react-native-paper';
import { Avatar, Button, Card, Text } from 'react-native-paper';


const LoginPage = () => {
    const [username,setUsername] = useState('');
    const [password, setPassword] = useState('');

    return(
        <Card>
            <Card.Title title="Log in"/>
            <Card.Content>
                <TextInput
                  label={"Username"}
                  placeholder="Input your username"
                  onChangeText={newUsername => setUsername(newUsername)}
                  defaultValue={username}
                />
            </Card.Content>

            <Card.Content>
                <TextInput
                label={"Password"}
                placeholder="Input your password"
                onChangeText={newPassword => setPassword(newPassword)}
                defaultValue = {password}
                />
            </Card.Content>
            <Card.Actions>
              <Button mode="default" onPress={() => console.log("Username is: " + username + ". Password is: " + password + ".")}>
                Login
              </Button>
            </Card.Actions>

        </Card>
    );
};

export default LoginPage;
