import { useState } from 'react';
import { Alert, ImageBackground, KeyboardAvoidingView, StyleSheet, View, Text, Button, TextInput, TouchableOpacity } from 'react-native';
import { getAuth, signInAnonymously } from "firebase/auth";

const Start = ({ navigation }) => {
    const auth = getAuth();
    const [name, setName] = useState('');
    const [colour, setColour] = useState('');

    const signInUser = () => {
        signInAnonymously(auth)
            .then(result => {
                //Passes name and colour data to Chat screen on transition
                navigation.navigate("Chat", { userID: result.user.uid, name: name, colour: colour });
                Alert.alert("Signed in Successfully!");
            })
            .catch((error) => {
                Alert.alert("Unable to sign in, try later again.");
            })
    }

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={require('../assets/background-img.png')} style={styles.image}>
                <Text style={styles.text} >Enter your name</Text>
                <TextInput
                    style={styles.textInput}
                    value={name}
                    onChangeText={setName}
                    placeholder='Type your name here'
                />
                <Text style={styles.text}>Choose the background colour</Text>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.bg1} onPress={() => setColour("#090C08")}>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bg2} onPress={() => setColour("#474056")}>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bg3} onPress={() => setColour("#B79880")}>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bg4} onPress={() => setColour("#8DA7C8")}>
                    </TouchableOpacity>
                </View>
                <Button color="#667F97"
                    title="Go to chatroom"
                    onPress={signInUser}
                />
            </ImageBackground>
            {Platform.OS === "ios" ? <KeyboardAvoidingView behavior="padding" /> : null}
        </View >
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        fontWeight: '500',
        color: 'white',
        textAlign: 'center',
        marginBottom: 15
    },
    textInput: {
        color: 'white',
        padding: 15,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 15,
        marginBottom: 15,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    image: {
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        height: "100%",
    },
    bg1: {
        alignItems: 'center',
        backgroundColor: '#090C08',
        width: 50,
        height: 50,
        padding: 10,
        margin: 10,
        marginBottom: 25,
        borderRadius: 25
    },
    bg2: {
        alignItems: 'center',
        backgroundColor: '#474056',
        width: 50,
        height: 50,
        padding: 10,
        margin: 10,
        marginBottom: 25,
        borderRadius: 25
    },
    bg3: {
        alignItems: 'center',
        backgroundColor: '#B79880',
        width: 50,
        height: 50,
        padding: 10,
        margin: 10,
        marginBottom: 25,
        borderRadius: 25
    },
    bg4: {
        alignItems: 'center',
        backgroundColor: '#8DA7C8',
        width: 50,
        height: 50,
        padding: 10,
        margin: 10,
        marginBottom: 25,
        borderRadius: 25
    }
});

export default Start;