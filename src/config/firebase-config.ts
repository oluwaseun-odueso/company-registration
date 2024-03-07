import {Request, Response, NextFunction} from "express"
import { UNAUTHORIZED } from 'http-status'
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
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

export const auth = getAuth(firebaseApp);
// const db = getFirestore(firebaseApp)

onAuthStateChanged(auth, user => {
  if(user != null) {
    const uid = user.uid;
    console.log("logged in!")
    console.log(`active user ${uid}, ${user.email}`)
  } else {
    console.log("No active user")
  }
});

export const createUserWithFirebase = async(email: string, password: string) => {
  try {
    const createUser = await createUserWithEmailAndPassword(auth, email, password)
    const user = createUser.user
    return user
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return {errorCode, errorMessage}
  }
}

export const signInUserWithFirebase = async (email: string, password: string) => {
  try {
    const signedInUser = await signInWithEmailAndPassword(auth, email, password)
    const user = signedInUser.user
    return user
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return {errorCode, errorMessage}
  }
}

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  const currentUser = auth.currentUser;
  // const userId = auth.currentUser?.uid
  if(currentUser) next()
  else res.status(UNAUTHORIZED).send({status: false, message: "Please login to perform operation"})
}


export default firebaseApp;