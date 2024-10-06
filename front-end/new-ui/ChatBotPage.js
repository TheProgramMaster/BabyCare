import * as React from 'react';
import { View, ScrollView, Image, StyleSheet} from 'react-native';
import { Text } from 'react-native-paper';

const ChatBotPage = () => {
    return(
        <>
            <Text>Welcome to our ChatBot AI page!</Text>
            <Text>This AI ChatBot was built using wit.ai.</Text>
            <Text>This ChatBot allows you as the patient to
                seek guidance and information 24/7, when doctor care is unavailable.
            </Text>
        </>
    );
}

export default ChatBotPage;