// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// My web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCpcbE89abBxoWR71yEoVm5a4h9MrnfiH4",
    authDomain: "my-chat-app-25e34.firebaseapp.com",
    projectId: "my-chat-app-25e34",
    storageBucket: "my-chat-app-25e34.firebasestorage.app",
    messagingSenderId: "352611930182",
    appId: "1:352611930182:web:4c163657b09cf632bfba47"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
