import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCmoVHHG9w84djO16gWe1I-P5KiB1JrIYw",
    authDomain: "crm-bowmans.firebaseapp.com",
    projectId: "crm-bowmans",
    storageBucket: "crm-bowmans.firebasestorage.app",
    messagingSenderId: "814634026614",
    appId: "1:814634026614:web:b8053ffca9058d383f4157",
    measurementId: "G-X9R6MRB70W",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore

export { db }; // Export Firestore instance
export default app;
