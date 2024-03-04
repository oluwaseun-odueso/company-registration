import { Request, Response } from "express";
import { signupSchema } from "../schemes/signup"
import AccountRepository from "../repositories/account";
import { v4 as uuidv4 } from 'uuid'
import { BadRequestError } from "../middlewares/errorHandler";
import { User } from "../models/userModel";

export default class AccountController {
  constructor (
    private readonly accountRepository: AccountRepository
  ){}

  async signup (req: Request, res: Response): Promise<void> {
    try {
      const { error } = await Promise.resolve(signupSchema.validate(req.body));
      if (error?.details) {
        throw new BadRequestError(error.details[0].message, "Signup create() method error")
      }

      const { email, password } = req.body;
      const checkIfUserExist: Partial<User> = await this.accountRepository.findOne(email)
      if (checkIfUserExist) throw new BadRequestError('Email already exist', 'SignUp create() method error')

      const id = uuidv4();
      const hashedPassword = await this.accountRepository.hashPassword(password)

    } catch (error: any) {
      
    }
  }
}