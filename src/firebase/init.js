import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyAUutwE1w6hW-eoezdtlbQBgXV07tE-UMc",
    authDomain: "auth-dc077.firebaseapp.com",
    projectId: "auth-dc077",
    storageBucket: "auth-dc077.appspot.com",
    messagingSenderId: "713388378668",
    appId: "1:713388378668:web:aa2360c80d282457615f89"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export {auth, app, db}