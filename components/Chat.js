import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Chat = ({ route, navigation }) => {
    //Gets name and colour selection from Start component
    const { name } = route.params;
    const { colour } = route.params;

    useEffect(() => {
        navigation.setOptions({ title: name });
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: colour }]}>
            <Text style={styles.textColour}>Welcome to the chatroom!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textColour: {
        color: 'white',
        fontSize: 25
    }
});

export default Chat;