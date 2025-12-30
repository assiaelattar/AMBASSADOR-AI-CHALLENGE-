
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAdFbh7c_Y_jn6pBL92D3NQ6qaXmE7egfQ",
  authDomain: "studentsapp-8af1d.firebaseapp.com",
  projectId: "studentsapp-8af1d",
  storageBucket: "studentsapp-8af1d.firebasestorage.app",
  messagingSenderId: "377000467382",
  appId: "1:377000467382:web:914555411cbd3c128d7f17",
  measurementId: "G-F7NLTME223"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
