import React, { useState } from 'react';
import { View, ScrollView, Image, TextInput, Button, StyleSheet} from 'react-native';
import { Text } from 'react-native-paper';
import axios from 'axios';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        marginBottom: 12,
        fontSize: 14,
        color: '#666',
    },
    chatContainer: {
        flex: 1,
        marginBottom: 16,
    },
    messageContainer: {
        marginVertical: 4,
        padding: 8,
        borderRadius: 8,
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#d1e7dd',
    },
    botMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#f8d7da',
    },
    messageText: {
        fontSize: 16,
        color: 'ffffff',
    },
    inputContainer: {
        flexDescription: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 8,
        marginRight: 8,
        color: 'white',
    },
});


    
const ChatBotPage = () => {
    const [message, setMessage] = useState('');
    const [conversation, setConversation] = useState([])

    const handleChat =  async() => {
        if(!message.trim()) return;
        const newMessage = { sender: 'user', text: message };
        setConversation((prev) => [...prev,newMessage]);
        try {
            const response = await axios.post('http://localhost:3001/chat', {
                message
            });
            const botReply = response.data.reply;
            const botMessage = { sender: 'bot', text: botReply };
            setConversation((prev) => [...prev, botMessage]);
        } catch(error) {
            console.error('Error sending message:',error);
            const errorMessage = { sender: 'bot', text: 'Sorry, I am having trouble responding right now.'};
            setConversation((prev) => [...prev, errorMessage]);
        }
        setMessage('');
    };
    return(
        <View>
            <Text>Welcome to our ChatBot AI page!</Text>
            <Text>This AI ChatBot was built using wit.ai.</Text>
            <Text>This ChatBot allows you as the patient to
                seek guidance and information 24/7, when doctor care is unavailable.
            </Text>
            <ScrollView style={StyleSheet.chatContainer}>
                {conversation.map((msg, index) => (
                    <View
                        key={index}
                        style={[
                            styles.messageContainer,
                            msg.sender === 'user' ? styles.userMessage : styles.botMessage
                        ]}
                    >
                        <Text style={styles.messageText}>{msg.sender === 'user' ? 'You: ' : 'Bot: '}{msg.text}</Text>
                    </View>
                ))}
            </ScrollView>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={message}
                    onChangeText={setMessage}
                    placeholder="Type your message here..."
                />
                <Button title="send" onPress={handleChat} />
            </View>
        </View>
    );
}

export default ChatBotPage;