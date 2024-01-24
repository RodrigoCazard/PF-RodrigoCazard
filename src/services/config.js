// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY_FIREBASE_CONFIG,
  authDomain: "pfcoderhouse-cazard.firebaseapp.com",
  projectId: "pfcoderhouse-cazard",
  storageBucket: "pfcoderhouse-cazard.appspot.com",
  messagingSenderId: "163063913672",
  appId: "1:163063913672:web:1c7b2fa0fb2db77b7019fd",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
