/**
 * To find your Firebase config object:
 *
 * 1. Go to your [Project settings in the Firebase console](https://console.firebase.google.com/project/_/settings/general/)
 * 2. In the "Your apps" card, select the nickname of the app for which you need a config object.
 * 3. Select Config from the Firebase SDK snippet pane.
 * 4. Copy the config object snippet, then add it here.
 */
const config = {
  apiKey: 'AIzaSyCBKPK73JM6y3ztJWND4JOnYlp1GA7Ibgw',
  authDomain: 'libreria-c768f.firebaseapp.com',
  projectId: 'libreria-c768f',
  storageBucket: 'libreria-c768f.appspot.com',
  messagingSenderId: '18438604171',
  appId: '1:18438604171:web:f5095ea38af1595b2bdb8e',
};

export default function getFirebaseConfig() {
  if (!config || !config.apiKey) {
    throw new Error('No Firebase configuration object provided.' + '\n'
    + 'Add your web app\'s configuration object to firebase-config.js');
  } else {
    return config;
  }
}
