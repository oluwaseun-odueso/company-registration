// authService.ts
import * as firebaseAdmin from 'firebase-admin';
import { firebaseConfig } from '../config';

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(firebaseConfig),
});

export const verifyToken = async (token: string) => {
  try {
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    throw new Error('Invalid token');
  }
};
