// Imports react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNetInfo } from '@react-native-community/netinfo';

// Imports the screens we want to navigate to
import Start from './components/Start';
import Chat from './components/Chat';

// Creates the navigator
const Stack = createNativeStackNavigator();

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// The app’s main Chat component that renders the chat UI
const App = () => {
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

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Welcome!" component={Start} />
        <Stack.Screen name="Chat" >
          {props => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;