import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { KeyboardAvoidingView, Platform } from "react-native";
import { addDoc, onSnapshot, collection, orderBy, query } from "firebase/firestore";

const Chat = ({ db, route, navigation }) => {
    //Gets user ID, name and colour selection from Start component
    const { name, colour, userID } = route.params;
    const [messages, setMessages] = useState([]);
    //Custom function called when a user sends a message
    const onSend = (newMessages) => {
        addDoc(collection(db, "messages"), newMessages[0])
    }

    useEffect(() => {
        // Sets screen title according to the name entered
        navigation.setOptions({ title: name });
        //Fetches messages from the database in real time
        const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
        const unsubMessages = onSnapshot(q, (docs) => {
            let newMessages = [];
            docs.forEach(doc => {
                newMessages.push({
                    id: doc.id,
                    ...doc.data(),
                    createdAt: new Date(doc.data().createdAt.toMillis())
                })
            })
            setMessages(newMessages);
        })
        //Cleans up the returned function
        return () => {
            if (unsubMessages) unsubMessages();
        }
    }, []);

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