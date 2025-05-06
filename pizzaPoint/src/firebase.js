// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Add additional services that you want to use
// require("firebase/auth");
// require("firebase/messaging");

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUNSDcdTk7uDbtn0kRZL37fyWimGo73vU",
  authDomain: "pizzapoint-bfefb.firebaseapp.com",
  projectId: "pizzapoint-bfefb",
  storageBucket: "pizzapoint-bfefb.firebasestorage.app",
  messagingSenderId: "197378912124",
  appId: "1:197378912124:web:eded51d5353674a3933ef9",
  measurementId: "G-SHF2E63N9M"
};

// Initialize Firebase

  const app = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);
  

export const auth = getAuth(app);
export default app;
