// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC5mFSd4FAQmQ0agYuy4eio0_ui4qjmtFI",
    authDomain: "llumemall.firebaseapp.com",
    projectId: "llumemall",
    storageBucket: "llumemall.appspot.com",
    messagingSenderId: "973991152748",
    appId: "1:973991152748:web:4db8948160360d4ac39c49"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;