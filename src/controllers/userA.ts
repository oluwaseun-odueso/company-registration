import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import { signUpSchema, loginSchema } from "../schemes/accountSchema";
import { registrationSchema } from "../schemes/company";
import CompanyRepository from "../repositories/company";
import { BadRequestError, ServerError } from "../middlewares/errorHandler";
import { BAD_REQUEST, CREATED, OK, UNAUTHORIZED } from "http-status";
import { SuccessResponse } from "../middlewares/res.util";
import UserAAccountRepository from "../repositories/userARepo";
import {
  auth,
  createUserWithFirebase, 
  signInUserWithFirebase,
} from '../middlewares/firebase-config'
const {register, getRecentInputs} = new CompanyRepository()
const {create, } = new UserAAccountRepository()



export default class UserAAccountController {
  async signupUserA (req: Request, res: Response) {
    try {
      const { error } = await Promise.resolve(signUpSchema.validate(req.body));
      if (error?.details) return res.status(BAD_REQUEST).send({status: false, message: error.details[0].message})

      const { email, password, firstName, lastName } = req.body;
      const user = await createUserWithFirebase(email, password)
      if (!user) return res.status(BAD_REQUEST).send({status: false, message: "Invalid credential"})

      const id = auth.currentUser?.uid as string
      await create({id, email, firstName, lastName, password})
      res.status(CREATED).send(SuccessResponse(`Your account has been created`, user))
    } catch (error: any) {
      throw new ServerError(`Could not sign up user: ${error.message}`)
    }
  }

  async loginUserA (req: Request, res: Response) {
    try {
      const { error } = await Promise.resolve(loginSchema.validate(req.body));
      if (error?.details) return res.status(BAD_REQUEST).send({status: false, message: error.details[0].message})
      
      const {email, password} = req.body;
      const user = await signInUserWithFirebase(email, password)
      if (user == null) return res.status(BAD_REQUEST).send({status: false, message: "Invalid login credential"})
      res.status(OK).send(SuccessResponse("You have successfully logged in", user))
    } catch (error: any) {
      throw new ServerError(`Could not log in up user: ${error.message}`)
    }
  }

  async registerCompany (req: Request, res: Response) {
    try {
      const { error } = await Promise.resolve(registrationSchema.validate(req.body));
      if (error?.details) return res.status(BAD_REQUEST).send({status: false, message: error.details[0].message})

      const { companyName, numberOfUsers, numberOfProducts } = req.body
      const id = uuidv4()
      const userId = auth.currentUser?.uid as string
      const percentage = (numberOfUsers / numberOfProducts) * 100;

      const payload = {id, userId, companyName, numberOfUsers, numberOfProducts, percentage }
      const registeredCompany = await register(payload)
      res.status(CREATED).send(SuccessResponse("Your company has been registered", registeredCompany))
    } catch (error: any) {
      throw new ServerError(`Error registering company: ${error.message}`)
    }
  }

  async getRecentInputs (req: Request, res: Response) {
    try {
      const recentInputs = await getRecentInputs()
      res.status(OK).send(SuccessResponse("Recent inputs", recentInputs))
    } catch (error: any) {
      throw new ServerError(`Error fetching recent inputs: ${error.message}`)
    }
  }
};
