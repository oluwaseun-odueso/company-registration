import {Request, Response, NextFunction} from "express"
import { UNAUTHORIZED } from 'http-status'
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { BadRequestError, NotFoundError, ServerError } from "../middlewares/errorHandler";
import { firebaseConfig } from "../config/config";
require('dotenv').config()

const firebaseApp = initializeApp(firebaseConfig)
export const auth = getAuth(firebaseApp);

onAuthStateChanged(auth, user => {
  if(user != null) {
    const uid = user.uid;
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
    throw new BadRequestError(`Could not signup user: ${error.code}`)
  }
}

export const signInUserWithFirebase = async (email: string, password: string) => {
  try {
    const signedInUser = await signInWithEmailAndPassword(auth, email, password)
    const user = signedInUser.user
    return user
  } catch (error: any) {
    throw new BadRequestError(`Could not signin user: ${error.code}`)
  }
}

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  const currentUser = auth.currentUser;
  if(currentUser) next()
  else res.status(UNAUTHORIZED).send({status: false, message: "Please login to perform operation"})
}


export default firebaseApp;