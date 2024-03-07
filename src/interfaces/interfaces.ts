declare global {
  namespace Express {
    export interface Request {
      user?: UserAAuthPayload;
      admin?: UserBAuthPayload
    }
  }
}

export interface UserAAuthPayload {
  email: string;
  password: string;
  // numberOfUsers: number; 
  // numberOfProducts: number;
  // Percentage: number;
}

export interface UserBAuthPayload {
  id: string;
}

export type CompanyType = {
  id: string;
  userId: string;
  companyName: string;
  numberOfUsers: number;
  numberOfProducts: number;
  Percentage: number;
}

export type AccountType = {
  id: string;
  email: string;
  hashedPassword: string
}

export type ImageType = {
  id: string;
  companyId: string;
  imageKey: string;
  imageUrl: string;
}