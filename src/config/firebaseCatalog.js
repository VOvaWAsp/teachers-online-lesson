import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyB5GoNc-Z75y1fHAmGvyG7QTwPXrTmuHTc",
  authDomain: "trachers-online-lesson.firebaseapp.com",
  databaseURL: "https://trachers-online-lesson-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "trachers-online-lesson",
  storageBucket: "trachers-online-lesson.appspot.com",
  messagingSenderId: "805499915866",
  appId: "1:805499915866:web:ce6b4eacc3ad919f135263",
  measurementId: "G-VSHW043C3Q"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
};

const database = firebase.database();