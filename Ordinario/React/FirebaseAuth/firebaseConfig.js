
import { initializeApp } from "firebase/app";
import{getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAIvQNIFasez7t_kXyjP9ZuxdNIZhYv2cA",
  authDomain: "demofirebaseauth-c55cb.firebaseapp.com",
  projectId: "demofirebaseauth-c55cb",
  storageBucket: "demofirebaseauth-c55cb.firebasestorage.app",
  messagingSenderId: "768055572056",
  appId: "1:768055572056:web:17034d246fbf7439cfbc2d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);