import { Request, Response, NextFunction } from 'express';
import AuthService from '../services/authService';

const authService = new AuthService();

export const authenticateUserA = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('No token provided');

    const decodedToken = await authService.verifyToken(token);
    if (decodedToken.userType !== "userA") {
      throw new Error("Unauthorized")
    }
    const email = decodedToken.email; 
    const password = decodedToken.password;
    if (!email || !password) throw new Error('Email or password not found in token');
    req.user = { email, password }; 
    next();
  
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

export const authenticateUserB = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('No token provided');

    const decodedToken = await authService.verifyToken(token);
    if (decodedToken.userType !== "userB") {
      throw new Error("Unauthorized")
    }
    const email = decodedToken.email; 
    const password = decodedToken.password;
    if (!email || !password) throw new Error('Email or password not found in token');
    req.user = { email, password };     
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};