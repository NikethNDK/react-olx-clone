import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCCjifokcSRJoBJWVvOQ3okHYzB7LT3LdU",
    authDomain: "olxclone-2024.firebaseapp.com",
    projectId: "olxclone-2024",
    storageBucket: "olxclone-2024.firebasestorage.app",
    messagingSenderId: "729458189502",
    appId: "1:729458189502:web:cfbb9d450c8c670efcaaef",
    measurementId: "G-5N6HEZJVVQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); 
export { auth,db,storage };