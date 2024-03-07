import * as admin from 'firebase-admin';
import firebaseCredentials from './serviceAccountKey.json';

const serviceAccount = firebaseCredentials as admin.ServiceAccount

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})


class AuthService {
  private firebaseApplication: admin.app.App;

  constructor() {
    this.firebaseApplication = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  async verifyToken(token: string) {
    try {
      const decodedToken = await this.firebaseApplication.auth().verifyIdToken(token);
      return decodedToken;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}        

export default AuthService;
