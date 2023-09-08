// Imports react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Alert } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { useEffect } from "react";

// Imports the screens we want to navigate to
import Start from './components/Start';
import Chat from './components/Chat';

// Creates the navigator
const Stack = createNativeStackNavigator();

import { initializeApp } from "firebase/app";
import { disableNetwork, enableNetwork, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBHqJnOicoS9mtSvnCVQsDHyqQm_evFCBM",
  authDomain: "chat-app-5d6ef.firebaseapp.com",
  projectId: "chat-app-5d6ef",
  storageBucket: "chat-app-5d6ef.appspot.com",
  messagingSenderId: "291357923119",
  appId: "1:291357923119:web:c684e33f65c09e135c73da"
};

// Initialise Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// The app’s main Chat component that renders the chat UI
const App = () => {
  const connectionStatus = useNetInfo();

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Welcome!" component={Start} />
        <Stack.Screen name="Chat" >
          {props => <Chat isConnected={connectionStatus.isConnected} db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;