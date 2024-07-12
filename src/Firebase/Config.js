// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKaSeNmJxUe1uuDiDjW4Z46ojYIquTss8",
  authDomain: "react-crud-b323b.firebaseapp.com",
  projectId: "react-crud-b323b",
  storageBucket: "react-crud-b323b.appspot.com",
  messagingSenderId: "876345414811",
  appId: "1:876345414811:web:055194f93b6026bdf9e23e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
export const auth=getAuth(app)
export const storage=getStorage()