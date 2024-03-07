import express, {Request, Response, NextFunction} from 'express'
import * as admin from 'firebase-admin';
// import { firebaseConfig } from '../config/config';
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})


// class AuthService {
//   private firebaseApp: firebaseAdmin.app.App;

//   constructor() {
//     this.firebaseApp = firebaseAdmin.initializeApp({
//       credential: firebaseAdmin.credential.cert(serviceAccount),
//     });
//   }

//   async verifyToken(token: string) {
//     try {
//       const decodedToken = await this.firebaseApp.auth().verifyIdToken(token);
//       return decodedToken;
//     } catch (error) {
//       throw new Error('Invalid token');
//     }
//   }
// }        

// export default AuthService;
