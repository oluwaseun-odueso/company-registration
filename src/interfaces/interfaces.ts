declare global {
  namespace Express {
    interface Request {
      user?: UserAAuthPayload;
      admin?: UserBAuthPayload
    }
  }
}

export interface UserAAuthPayload {
  id: string;
  companyName: string;
  numberOfUsers: number; 
  numberOfProducts: number;
  Percentage: number;
}

export interface UserBAuthPayload {
  id: string;
}

export type CompanyType = {
  userId: string;
  companyName: string;
  numberOfUsers: number;
  numberOfProducts: number;
  Percentage: number;
}

export type AccountType = {
  email: string;
  password: string
}