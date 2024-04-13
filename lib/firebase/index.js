// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDv_zP_zkwTeNZbFh7-d7Z2SPeLiBNvhto",
  authDomain: "expense-ease-8c918.firebaseapp.com",
  projectId: "expense-ease-8c918",
  storageBucket: "expense-ease-8c918.appspot.com",
  messagingSenderId: "234823979668",
  appId: "1:234823979668:web:ddc5e36fc290adf3245a81"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {app, db, auth}