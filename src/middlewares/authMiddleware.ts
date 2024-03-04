// authenticationMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import AuthService from '../services/authService';

const authService = new AuthService();

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      if (!token) throw new Error('Token not provided');
  
      const payload = await authService.verifyToken(token);
      req.body.userId = payload;
    }
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};
