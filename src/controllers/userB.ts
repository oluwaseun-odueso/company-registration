import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import { signUpSchema, loginSchema } from "../schemes/accountSchema";
import UserBAccountRepository from "../repositories/userBRepo";
import UserAAccountRepository from "../repositories/userARepo";
import CompanyRepository from "../repositories/company";
import ImageRepository from "../repositories/images";
import { BadRequestError, FileTooLargeError, NotFoundError, ServerError } from "../middlewares/errorHandler";
import { BAD_REQUEST, CREATED, NOT_FOUND, OK } from "http-status";
import { SuccessResponse } from "../middlewares/res.util";
import {
  auth,
  createUserWithFirebase, 
  signInUserWithFirebase,
} from '../middlewares/firebase-config'
import { s3 } from "../utility/image.config";

const {
  saveImage
} = new ImageRepository()

const {
  create,
} = new UserBAccountRepository()

const {
  getRecentInputs,
  getCompany,
  userHasARegisteredCompany
} = new CompanyRepository()



export default class UserBAccountController {
  async signupUserB (req: Request, res: Response) {
    try {
      const { error } = await Promise.resolve(signUpSchema.validate(req.body));
      if (error?.details) return res.status(BAD_REQUEST).send({status: false, message: error.details[0].message})

      const { email, password, firstName, lastName } = req.body;
      const user = await createUserWithFirebase(email, password)

      const id = auth.currentUser?.uid as string
      await create({id, email, firstName, lastName, password})
      res.status(CREATED).send(SuccessResponse(`Your account has been created`, user))
    } catch (error: any) {
      if (error instanceof BadRequestError) {
        error.sendErrorResponse(res);
      } else {
        const error = new ServerError('Internal Server Error');
        error.sendErrorResponse(res);
      }
    }
  }

  async loginUserB (req: Request, res: Response) {
    try {
      const { error } = await Promise.resolve(loginSchema.validate(req.body));
      if (error?.details) return res.status(BAD_REQUEST).send({status: false, message: error.details[0].message})
      
      const {email, password} = req.body;
      const user = await signInUserWithFirebase(email, password)
      if (user == null) return res.status(BAD_REQUEST).send({status: false, message: "Invalid login credential"})
      res.status(OK).send(SuccessResponse("You have successfully logged in", user))
    } catch (error: any) {
      if (error instanceof NotFoundError || error instanceof BadRequestError) {
        error.sendErrorResponse(res);
      } else {
        const error = new ServerError('Internal Server Error');
        error.sendErrorResponse(res);
      }    
    }
  }

  async getRecentInputs (req: Request, res: Response) {
    try {
      const recentInputs = await getRecentInputs()
      res.status(OK).send(SuccessResponse("Recent inputs", recentInputs))
    } catch (error: any) {
      if (error instanceof NotFoundError ) error.sendErrorResponse(res);
      else {
        const error = new ServerError('Internal Server Error');
        error.sendErrorResponse(res);
      }      
    }
  }

  async uploadImages (req: Request, res: Response) {
    const files: any = req.files;
    const companyId = req.params.companyId
    const userId = req.params.userId
    
    const company = await getCompany(companyId)
    if (!company) return res.status(NOT_FOUND).send({status: false, message: "Company not found"})

    const user = await userHasARegisteredCompany(userId)
    if (!user) return res.status(NOT_FOUND).send({status: false, message: "User not found"})

    try {
        let Urls: string[] = [];
        if(files && files.length > 0) {
            for (let i = 0; i < files.length; i++) {
              const filename = `${Date.now()}-${files[i].originalname}`;
              const fileStream = files[i].buffer;
              const contentType = files[i].mimetype;
              const uploadParams = {
              Bucket: process.env.AWS_BUCKET_NAME!,
              Key: filename,
              Body: fileStream,
              ContentType: contentType,
              };

              const result: any = await s3.upload(uploadParams).promise();
              const imageKey = result.Key
              const imageUrl = result.Location
              const id = uuidv4()
              await saveImage({id, userId, companyId, imageKey, imageUrl})
              Urls.push(result.Location)
            }
        }
        res.status(CREATED).send(SuccessResponse("Image(s) uploaded successfully", Urls));
    } catch (error: any) {
      if (error instanceof FileTooLargeError) {
        error.sendErrorResponse(res);
      } else {
        const error = new ServerError('Internal Server Error');
        error.sendErrorResponse(res);
      }
    }
  }
};
