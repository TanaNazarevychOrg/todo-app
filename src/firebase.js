import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIvffDQ_GourmtTAMWKJubbIuVvIdkfMw",
  authDomain: "todo-app-87f2b.firebaseapp.com",
  projectId: "todo-app-87f2b",
  storageBucket: "todo-app-87f2b.firebasestorage.app",
  messagingSenderId: "1035565021510",
  appId: "1:1035565021510:web:f08f09eb00173498420d47",
  measurementId: "G-SXSRBKWB3H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Authentication
const auth = getAuth(app);

export { db, auth };