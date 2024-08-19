import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, get, child } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB5GoNc-Z75y1fHAmGvyG7QTwPXrTmuHTc",
  authDomain: "trachers-online-lesson.firebaseapp.com",
  databaseURL: "https://trachers-online-lesson-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "trachers-online-lesson",
  storageBucket: "trachers-online-lesson.appspot.com",
  messagingSenderId: "805499915866",
  appId: "1:805499915866:web:ce6b4eacc3ad919f135263",
  measurementId: "G-VSHW043C3Q"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };
