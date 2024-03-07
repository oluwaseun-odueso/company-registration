import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import { accountSchema } from "../schemes/signup";
import { registrationSchema } from "../schemes/company";
import UserAAccountRepository from "../repositories/userARepo";
import CompanyRepository from "../repositories/company";
import { BadRequestError, ServerError } from "../middlewares/errorHandler";
import { BAD_REQUEST, CREATED, OK, UNAUTHORIZED } from "http-status";
import { SuccessResponse } from "../middlewares/res.util";
import {
  auth,
  createUserWithFirebase, 
  signInUserWithFirebase,
} from '../config/firebase-config'
import { s3 } from "../utility/image.config";




export default class UserAAccountController {
  constructor (
    private readonly accountRepository: UserAAccountRepository,
    private readonly companyRepository: CompanyRepository
  ){}

  async signupUserA (req: Request, res: Response) {
    try {
      const { error } = await Promise.resolve(accountSchema.validate(req.body));
      if (error?.details) return res.status(BAD_REQUEST).send(new BadRequestError(error.details[0].message))

      const { email, password, firstName, lastName } = req.body;
      const user = await createUserWithFirebase(email, password)
      if (!user) return res.status(BAD_REQUEST).send({status: false, message: "Invalid credential"})

      const id = auth.currentUser?.uid as string
      await this.accountRepository.create({id, email, firstName, lastName, password})
      res.status(CREATED).send(SuccessResponse(`Your account has been created`, user))
    } catch (error: any) {
      throw new ServerError(`Could not sign up user: ${error.message}`)
    }
  }

  async loginUserA (req: Request, res: Response) {
    try {
      const { error } = await Promise.resolve(accountSchema.validate(req.body));
      if (error?.details) return res.status(BAD_REQUEST).send(new BadRequestError(error.details[0].message))
      
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
      if (error?.details) throw new BadRequestError(error.details[0].message)

      const { companyName, numberOfUsers, numberOfProducts } = req.body
      const id = uuidv4()
      const userId = auth.currentUser?.uid as string
      const percentage = (numberOfUsers / numberOfProducts) * 100;

      const payload = {id, userId, companyName, numberOfUsers, numberOfProducts, percentage }
      console.log(payload)
      console.log('Before')
      const registeredCompany = await this.companyRepository.create(payload)
      console.log(registeredCompany)
      res.status(CREATED).send(SuccessResponse("Your company has been registered", registeredCompany))
    } catch (error: any) {
      throw new ServerError(`Error registering company: ${error.message}`)
    }
  }

  async getRecentInputs (req: Request, res: Response) {
    try {
      const recentInputs = await this.companyRepository.getRecentInputs()
      res.status(OK).send(SuccessResponse("Recent inputs", recentInputs))
    } catch (error: any) {
      throw new ServerError(`Error fetching recent inputs: ${error.message}`)
    }
  }

  // async uploadImages (req: Request, res: Response) {
  //   const files: any = req.files;
  //   const companyId = req.params.id
  //   try {
  //       let Keys: string[] = [];
  //       let Urls: string[] = [];
  //       if(files && files.length > 0) {
  //           for (let i = 0; i < files.length; i++) {
  //             const filename = `${Date.now()}-${files[i].originalname}`;
  //             const fileStream = files[i].buffer;
  //             const contentType = files[i].mimetype;
  //             const uploadParams = {
  //             Bucket: process.env.AWS_BUCKET_NAME!,
  //             Key: filename,
  //             Body: fileStream,
  //             ContentType: contentType,
  //             };

  //             const result: any = await s3.upload(uploadParams).promise();
  //             const imageKey = result.Key
  //             const imageUrl = result.Location
  //             await this.companyRepository.addImage({companyId, imageKey, imageUrl})
  //             Keys.push(result.Key);
  //             Urls.push(result.Location)
  //           }
  //       }
  //       res.status(CREATED).send(SuccessResponse{"Image(s) uploaded successfully", Keys, urls: Urls});
  //   } catch (error: any) {
  //     throw new ServerError(`Error uploading image(s): ${error.message}`, 'uploadImages() method error')
  //   }
  // }
};