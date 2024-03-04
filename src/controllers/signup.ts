import { Request, Response } from "express";
import { accountSchema } from "../schemes/signup";
import { registrationSchema } from "../schemes/company";
import AccountRepository from "../repositories/account";
import CompanyRepository from "../repositories/company";
import { v4 as uuidv4 } from 'uuid'
import { BadRequestError, ServerError } from "../middlewares/errorHandler";
import { CREATED, OK } from "http-status";
import { SuccessResponse } from "../middlewares/res.util";

export default class AccountController {
  constructor (
    private readonly accountRepository: AccountRepository,
    private readonly companyRepository: CompanyRepository
  ){}

  async signup (req: Request, res: Response): Promise<void> {
    try {
      const { error } = await Promise.resolve(accountSchema.validate(req.body));
      if (error?.details) throw new BadRequestError(error.details[0].message, "Signup() method error")

      const { email, password } = req.body;
      const checkIfUserExist = await this.accountRepository.findOne(email)
      if (checkIfUserExist) throw new BadRequestError('Email already exist', 'SignUp() method error')

      const id = uuidv4();
      const hashedPassword = await this.accountRepository.hashPassword(password)
      const user = await this.accountRepository.create({id, email, hashedPassword})
      res.status(CREATED).send(SuccessResponse(`Your account has been created`))
    } catch (error: any) {
      throw new ServerError(`Error signing user: ${error.message}`, 'SignUp() method error')
    }
  }

  async login (req: Request, res: Response) {
    try {
      const { error } = await Promise.resolve(accountSchema.validate(req.body))
      if (error?.details) throw new BadRequestError(error.details[0].message, "Login() method error")
      
      const { email, password } = req.body;
      const user = await this.accountRepository.findOne(email)
      if (!user) throw new BadRequestError('Email not registered', 'SignUp() method error')

      const hashedPassword = await this.accountRepository.retrievePassword(email)
      if (hashedPassword !== password) throw new BadRequestError('You have entered an incorrect password', 'Login() method error')

      const token = await generateUserToken(user)
      res.status(OK).send(SuccessResponse("You have successfully logged in", user, token))
    } catch (error: any) {
      throw new ServerError(`Error logging in: ${error.message}`, 'Login() method error')
    }
  }

  async registerCompany (req: Request, res: Response) {
    try {
      const { error } = await Promise.resolve(registrationSchema.validate(req.body));
      if (error?.details) throw new BadRequestError(error.details[0].message, "registerCompany() method error")

      const { companyName, numberOfUsers, numberOfProducts } = req.body
      const percentage = (numberOfUsers / numberOfProducts) * 100;
      const payload = {req.user.id, companyName, numberOfUsers, numberOfProducts, percentage }
      const registeredCompany = await this.companyRepository.create(payload)
      console.log(registeredCompany)
      res.status(CREATED).send(SuccessResponse("Your company has been registered", registeredCompany))
    } catch (error: any) {
      throw new ServerError(`Error registering company: ${error.message}`, 'registerCompany() method error')
    }
  }

  async getRecentInputs (req: Request, res: Response) {
    try {
      const recentInputs = await this.companyRepository.getRecentInputs(req.user.id)
    } catch (error: any) {
      throw new ServerError(`Error fetching recent inputs: ${error.message}`, 'getRecentInputs() method error')
    }
  }
}