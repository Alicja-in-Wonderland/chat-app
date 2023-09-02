import { useState } from 'react';
import { ImageBackground, StyleSheet, View, Text, Button, TextInput, TouchableOpacity } from 'react-native';

const Start = ({ navigation }) => {
    const [name, setName] = useState('');
    const [colour, setColour] = useState('');

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
                        <Text style={styles.bgText}>Select</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bg2} onPress={() => setColour("#474056")}>
                        <Text style={styles.bgText}>Select</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bg3} onPress={() => setColour("#B79880")}>
                        <Text style={styles.bgText}>Select</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bg4} onPress={() => setColour("#8DA7C8")}>
                        <Text style={styles.bgText}>Select</Text>
                    </TouchableOpacity>
                </View>
                <Button color="#667F97"
                    title="Go to chatroom"
                    //Passes name and colour data to Chat screen on transition
                    onPress={() => navigation.navigate('Chat', { name: name, colour: colour })}
                />
            </ImageBackground>
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
    bgText: {
        color: 'white'
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
        padding: 10,
        margin: 10,
        marginBottom: 25,
        borderRadius: 15
    },
    bg2: {
        alignItems: 'center',
        backgroundColor: '#474056',
        padding: 10,
        margin: 10,
        marginBottom: 25,
        borderRadius: 15
    },
    bg3: {
        alignItems: 'center',
        backgroundColor: '#B79880',
        padding: 10,
        margin: 10,
        marginBottom: 25,
        borderRadius: 15
    },
    bg4: {
        alignItems: 'center',
        backgroundColor: '#8DA7C8',
        padding: 10,
        margin: 10,
        marginBottom: 25,
        borderRadius: 15
    }
});

export default Start;