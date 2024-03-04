// authenticationMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../services/authService';

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('Token not provided');

    const decodedToken = await verifyToken(token);
    req.body.userId = decodedToken.uid;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};
