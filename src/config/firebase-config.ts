import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyA0WeasYp6h_gU_i9wooHu8SFs49clCPmw",
  authDomain: "company-registration-80d96.firebaseapp.com",
  projectId: "company-registration-80d96",
  storageBucket: "company-registration-80d96.appspot.com",
  messagingSenderId: "64857856151",
  appId: "1:64857856151:web:67087b342de340ac9731d2",
  measurementId: "G-N578111S3X"
})

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp)

onAuthStateChanged(auth, user => {
  if(user != null) {
    console.log("logged in!")
  } else {
    console.log("No user")
  }
});

export default firebaseApp;