import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDs5ecYTiVVOwHwNfyu5nSWHCUJ8SS55AU",
    authDomain: "chathub-76512.firebaseapp.com",
    databaseURL: "https://chathub-76512-default-rtdb.firebaseio.com",
    projectId: "chathub-76512",
    storageBucket: "chathub-76512.firebasestorage.app",
    messagingSenderId: "724912275673",
    appId: "1:724912275673:web:3bd199736dcb02976b7ec8",
    measurementId: "G-FZ8FJE5TT8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getDatabase(app);