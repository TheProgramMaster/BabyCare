import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, Image, TextInput, Button, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import axios from 'axios';

// Define types for the messages in the conversation
type Message = {
  sender: 'user' | 'bot';  // 'user' or 'bot'
  text: string;
};

// Define types for the ChatBotPage component props (if any)
interface ChatBotPageProps {}

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
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
    color: 'black',
  },
});

const Chat = () => {
  const [message, setMessage] = useState<string>(''); // message input from user
  const [conversation, setConversation] = useState<Message[]>([]); // array of messages
  const scrollViewRef = useRef<ScrollView>(null); // reference to the ScrollView

  // Function to handle sending a message and getting a response from the bot
  const handleChat = async () => {
    if (!message.trim()) return; // If message is empty, do nothing
    const newMessage: Message = { sender: 'user', text: message }; // new user message
    setMessage(''); // clear input field
    setConversation((prev) => [...prev, newMessage]); // add user message to conversation

    try {
      // Send message to the server
      const response = await axios.post('http://localhost:3001/chat', {
        message,
      });

      const botReply: string | string[] = response.data.reply;

      // Add bot's response to the conversation
      if (Array.isArray(botReply)) {
        botReply.forEach((replyText) => {
          const botMessage: Message = { sender: 'bot', text: replyText };
          setConversation((prev) => [...prev, botMessage]);
        });
      } else {
        const botMessage: Message = { sender: 'bot', text: botReply };
        setConversation((prev) => [...prev, botMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = { sender: 'bot', text: 'Sorry, I am having trouble responding right now.' };
      setConversation((prev) => [...prev, errorMessage]);
    }
  };

  // Scroll to the bottom of the chat when a new message is added
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [conversation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to our ChatBot AI page!</Text>
      <Text style={styles.description}>
        This AI ChatBot was built using GPT-4.
      </Text>
      <Text style={styles.description}>
        This ChatBot allows you as the patient to seek guidance and information 24/7, when doctor care is unavailable.
      </Text>

      <ScrollView
        style={styles.chatContainer}
        contentContainerStyle={{ flexGrow: 1 }}
        ref={scrollViewRef}>
        {conversation.map((msg, index) => (
          <View
            key={index}
            style={[
              styles.messageContainer,
              msg.sender === 'user' ? styles.userMessage : styles.botMessage,
            ]}>
            <Text style={styles.messageText}>
              {msg.sender === 'user' ? 'You: ' : 'Bot: '}{msg.text}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type your message here..."
          placeholderTextColor="#888"
        />
        <Button title="send" onPress={handleChat} />
      </View>
    </View>
  );
};

export default Chat;
