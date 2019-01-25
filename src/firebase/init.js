import firebase from 'firebase';
import firestore from 'firebase/firestore';

// Initialize Firebase configuration
const config = {
  apiKey: 'AIzaSyA-M4tjwRdQl-skJu4SsJV-_ma4vxKjDkw',
  authDomain: 'vue-geolocation-f180d.firebaseapp.com',
  databaseURL: 'https://vue-geolocation-f180d.firebaseio.com',
  projectId: 'vue-geolocation-f180d',
  storageBucket: 'vue-geolocation-f180d.appspot.com',
  messagingSenderId: '823312103733'
};
// Initializing the firebase application
const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore();

export default firebaseApp.firestore();
