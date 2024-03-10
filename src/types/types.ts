export type CompanyType = {
  id: string;
  userId: string;
  companyName: string;
  numberOfUsers: number;
  numberOfProducts: number;
  percentage: number;
}

export type AccountType = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string
}

export type ImageType = {
  id: string;
  userId: string;
  companyId: string;
  imageKey: string;
  imageUrl: string;
}