import {Request, Response, NextFunction} from "express"
import { UNAUTHORIZED } from 'http-status'
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
require('dotenv').config()

const firebaseApp = initializeApp({
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
})

export const auth = getAuth(firebaseApp);

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
  if(currentUser) next()
  else res.status(UNAUTHORIZED).send({status: false, message: "Please login to perform operation"})
}


export default firebaseApp;