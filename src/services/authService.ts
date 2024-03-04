// authService.ts
import * as firebaseAdmin from 'firebase-admin';
import { firebaseConfig } from '../config/config';

class AuthService {
  private firebaseApp: firebaseAdmin.app.App;

  constructor() {
    this.firebaseApp = firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(firebaseConfig),
    });
  }

  async verifyToken(token: string) {
    try {
      const decodedToken = await this.firebaseApp.auth().verifyIdToken(token);
      return decodedToken;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}

export default AuthService;
