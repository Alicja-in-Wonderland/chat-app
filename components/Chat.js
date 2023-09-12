import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { KeyboardAvoidingView, Platform } from "react-native";
import { addDoc, onSnapshot, collection, orderBy, query } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';

const Chat = ({ db, isConnected, route, navigation }) => {
    //Gets user ID, name and colour selection from Start component
    const { name, colour, userID } = route.params;
    const [messages, setMessages] = useState([]);
    //Custom function called when a user sends a message
    const onSend = (newMessages) => {
        addDoc(collection(db, "messages"), newMessages[0])
    }

    let unsubMessages;

    useEffect(() => {
        // Sets screen title according to the name entered
        navigation.setOptions({ title: name });
        /**
        * If the user is connected to the internet, register a listener to the database
        * to read messages. If the user is offline, load messages from offline storage.
        */
        if (isConnected === true) {
            // Unregister current onSnapshot() listener to avoid registering multiple
            // listeners when useEffect code is re-executed.
            if (unsubMessages) unsubMessages();
            unsubMessages = null;

            //Fetches messages from the database in real-time
            const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
            unsubMessages = onSnapshot(q, (docs) => {
                let newMessages = [];
                docs.forEach(doc => {
                    newMessages.push({
                        id: doc.id,
                        ...doc.data(),
                        createdAt: new Date(doc.data().createdAt.toMillis())
                    });
                });
                cacheMessages(newMessages);
                setMessages(newMessages);
            })
        } else {
            loadCachedMessages();
        }
        //Cleans up the returned function
        return () => {
            if (unsubMessages) unsubMessages();
        }
    }, [isConnected]);

    //Gets messages from offline storage
    const loadCachedMessages = async () => {
        const cachedMessages = (await AsyncStorage.getItem("messages")) || [];
        setMessages(JSON.parse(cachedMessages));
    };

    //Saves messages to offline storage
    const cacheMessages = async (messagesToCache) => {
        try {
            await AsyncStorage.setItem("messages", JSON.stringify(messagesToCache));
        } catch (error) {
            console.log(error.message);
        }
    };
    //Prevents Gifted Chat from rendering the InputToolbar when offline
    const renderInputToolbar = (props) => {
        if (isConnected) {
            return <InputToolbar {...props} />;
        } else {
            return null;
        }
    };

    //Returns an altered version of Gifted Chat’s speech bubble
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

    //Creates a circle button
    const renderCustomActions = (props) => {
        return <CustomActions {...props} />;
    };

    //Renders the chat interface
    return (
        <View style={[styles.container, { backgroundColor: colour }]}>
            <GiftedChat
                messages={messages}
                //Adds the renderBubble prop
                renderBubble={renderBubble}
                renderInputToolbar={renderInputToolbar}
                onSend={messages => onSend(messages)}
                renderActions={renderCustomActions}
                user={{ _id: userID, name }}
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