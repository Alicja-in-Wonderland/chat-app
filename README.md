# chat-app

![Screenshot 2023-09-12 at 21 57 36](https://github.com/Alicja-in-Wonderland/chat-app/assets/129612148/7b06cd72-f916-4122-b573-3560d5beb7f0)


## Project Description
A mobile app that provides users with a chat interface and options to share images and their location.

## Tech stack
- React Native
- JavaScript
- Expo
- Android Studio

## Key Features
- A page where users can enter their name and choose a background color for the chat screen before joining the chat
- A page displaying the conversation, as well as an input field and submit button
- Users can send images and location data
- Data gets stored online and offline

## Requirements
- Node.js
- Expo
- Firebase Account
- Mobile OS Emulator (Android Studio)
- Mobile device (smartphone or tablet)

## To Get The App Running
The app an be downloaded locally and started with `npm start` or `expo start`.

1. Clone the repository
2. Navigate to project directory in the terminal
3. Run `npm install 16.19.0` to install the base dependencies
4. Run `npm use 16.19.0`
5. Run `npm i firebase`
6. Run `npm i expo`
7. Sign up for and set up Firebase
8. Download and install Android Studio
9. Sign up for Expo and install Expo Go on your mobile device
10. Back in the terminal run `expo login` and go through the login process.

## Firebase Set Up
1. Navigate to 'https://firebase.google.com/'
2. Navigate to the console ('Go To Console' in the top right)
3. Add project
4. Once in the project use 'Build->Firestore Database' on the left sid eof the screen under product categories
5. Create Database, Start in production mode, hit next and then enable.
6. Once in Firestore Database navigate to rules and change 'allow read, write: if false;' to 'allow read, write: if true;' and publish.
7. Navigate to 'Project Settings->General'
8. Under 'Your apps' select webapp (</>)
9. Select a name (you don't have to setup Firebase Hosting) and follow the prompts.
10. Copy the section of code starting with 'const firebaseConfig =' and paste it into App.js replacing what is in there already.
11. Set up Android Studio

## Android Studio Set Up
1. Navigate to 'https://developer.android.com/studio'
2. Download Android Studio Giraffe
3. Follow the installation process
4. Once you get to the main screen navigate to More Actions->Virtual Device Manager
5. Set up and install the device you prefer to use (for this project I used Pixel 7 Pro)

## Expo Set Up
1. Navigate to 'https://expo.dev/'
2. Create an account
3. Open the device you installed with Android Studio
4. Navigate to the Google Play Store and install Expo Go and log in
5. Repeat steps for your mobile device to test there as well
