import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAr7dMWUpjbth--pvm8PgD6D_XyqT_t_ME",
    authDomain: "reactfirebasedemo-3c1ef.firebaseapp.com",
    projectId: "reactfirebasedemo-3c1ef",
    storageBucket: "reactfirebasedemo-3c1ef.appspot.com",
    messagingSenderId: "46098941194",
    appId: "1:46098941194:web:b9c9f484355313df3766f3",
    measurementId: "G-TCEPCBWBLP"
}

// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore();