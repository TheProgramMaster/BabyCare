import React, {useState} from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import { TextInput } from 'react-native-paper';
import { Avatar, Button, Card, Text } from 'react-native-paper';

const LoginPage = () => {
    const [username,setUsername] = useState('');
    const [password, setPassword] = useState('');

    return(
        <ImageBackground
            source={require('./assets/bg3.png')}
            style={styles.background}
        >
            <View style={styles.container}>
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
                      <Button mode="default" onPress={() => console.log("Navigate to Register Page")}>
                        Register
                      </Button>
                    </Card.Actions>
                </Card>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginPage;