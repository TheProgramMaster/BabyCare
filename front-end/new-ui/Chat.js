import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, ScrollView, StatusBar, View, Button } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Message from './Message';
//import './message-styling.css';
import {
    selectHMSMessages,
    selectBroadcastMessages,
    selectMessagesByRole,
    selectMessagesByPeerID,
    useHMSStore,
    useHMSActions
} from '@100mslive/react-sdk';
import { TextInput } from 'react-native-web';

function Chat(){
    const allMessages = useHMSStore(selectHMSMessages);
    const broadcastMessages = useHMSStore(selectBroadcastMessages);
    const groupMessagesByRole = useHMSStore(selectMessagesByRole('guest'));
    const hmsActions = useHMSActions();
    const [messageContent, setMessageContent] = useState("");
    const [localMessages, setLocalMessages] = useState([]);
    const [isUserScrolling, setIsUserScrolling] = useState(false);

    const scrollViewRef = useRef(null);
    const handleScroll = (event) => {
        const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
        const distanceFromBottom = contentSize.height - contentOffset.y - layoutMeasurement.height;
        setIsUserScrolling(distanceFromBottom > 50);
    }
    useEffect(() => {
        if (!isUserScrolling) {
            scrollViewRef.current?.scrollToEnd({ animated: true });
        }
    }, [allMessages, localMessages, isUserScrolling]);
    //const [updateKey, setUpdateKey] = useState(0);
    const handleSendMessage = async() => {
        if (messageContent.trim()) {
            try {
                await hmsActions.sendBroadcastMessage(messageContent);
                const newMessage = {
                    id: Date.now().toString(),
                    senderName: "You",
                    content: messageContent,
                    timestamp: Date.now(),
                    role: "guest",
                };
                setLocalMessages(prevMessages => [...prevMessages, newMessage]);
                setMessageContent("");
            } catch (error) {
                console.error("Failed to send message:",error);
            }
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: StatusBar.currentHeight,
            backgroundColor: 'white',
        },
        scrollView: {
            flex: 1,
            backgroundColor: '#f8f8f8',
            color: '#000000',
        },
        text: {
            fontSize: 42,
            padding: 12,
        },
        buttonStyle: {
            padding: '8px',
            marginLeft: '10px',
        },
        messageInput: {
            flex: 1,
            padding: 10,
            backgroundColor: '#fff',
            borderWidth: 1,
            borderRadius: 5,
            borderColor: '#ccc',
            marginRight: 10,
            color: '#000000',
        },
        messageInputContainer: {
            flexDirection: 'row',
            padding: 10,
            backgroundColor: '#f1f1f1',
            borderTopWidth: 1,
            borderColor: '#ddd',
            alignItems: 'center',
        },
        chatContainer: {
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
        },
    });
    //const directMessages = useHMSStore(selectMessagesByPeerID(peer.id));
    /*
        {allMessages.map((msg) => (
                <Message key={msg.id} message={msg} />
            ))}
    */
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                ref={scrollViewRef}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                {[...allMessages, ...localMessages].map((msg) => (
                    msg.content ? (
                        <Message key={msg.id} message={msg} />
                    ) : null
                ))}
            </ScrollView>
            <View style={styles.messageInputContainer}>
                <TextInput
                    style={styles.messageInput}
                    value={messageContent}
                    onChangeText={setMessageContent}
                    placeholder="Type a message..."
                    onSubmitEditing={handleSendMessage}
                    onKeyDown={handleKeyDown}
                />
                <Button title="Send" onPress={handleSendMessage} />
            </View>
        </SafeAreaView>
    );
}

export default Chat;