import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { KeyboardAvoidingView, Platform } from "react-native";

const Chat = ({ route, navigation }) => {
    //Gets name and colour selection from Start component
    const { name } = route.params;
    const { colour } = route.params;
    const [messages, setMessages] = useState([]);
    //Custom function called when a user sends a message
    const onSend = (newMessages) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
    }
    //Adds two preloaded messages
    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: "Hello!",
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: "React Native",
                    avatar: "https://placeimg.com/140/140/any",
                },
            },
            {
                _id: 2,
                text: "Welcome! You've entered the chat",
                createdAt: new Date(),
                system: true,
            },
        ]);
    }, []);

    useEffect(() => {
        navigation.setOptions({ title: name });
    }, []);
    // Returns an altered version of Gifted Chat’s speech bubble
    const renderBubble = (props) => {
        return <Bubble
            {...props}
            wrapperStyle={{
                right: {
                    backgroundColor: "#A6A6A6"
                },
                left: {
                    backgroundColor: "#F4E7C5"
                }
            }}
        />
    }
    //Renders the chat interface
    return (
        <View style={[styles.container, { backgroundColor: colour }]}>
            <GiftedChat
                messages={messages}
                //Adds the renderBubble prop
                renderBubble={renderBubble}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 1
                }}
            />
            {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});

export default Chat;