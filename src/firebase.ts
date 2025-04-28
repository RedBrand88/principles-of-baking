import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAA5Klr2w9qBtamNQbgv19SO97zB-zEaNo",
  authDomain: "bread-machine-a72fa.firebaseapp.com",
  projectId: "bread-machine-a72fa",
  storageBucket: "bread-machine-a72fa.firebasestorage.app",
  messagingSenderId: "1086621924315",
  appId: "1:1086621924315:web:9d67513338c82a98a905fe"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Export the auth instance
export const auth = getAuth(app);
