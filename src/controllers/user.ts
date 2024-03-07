import { Request, Response } from "express";
import { accountSchema } from "../schemes/signup";
import { registrationSchema } from "../schemes/company";
import AccountRepository from "../repositories/account";
import CompanyRepository from "../repositories/company";
import { v4 as uuidv4 } from 'uuid'
import { BadRequestError, ServerError } from "../middlewares/errorHandler";
import { CREATED, OK } from "http-status";
import { SuccessResponse } from "../middlewares/res.util";
// import * as admin from 'firebase-admin';
import firebaseApp from "../config/firebase-config";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

import { s3 } from "../utility/image.config";

const auth = getAuth(firebaseApp);

const createUserWithFirebase = async(email: string, password: string) => {
  try {
    const createUser = await createUserWithEmailAndPassword(auth, email, password)
    const user = createUser.user
    console.log(user)
    return user
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log({errorCode, errorMessage})
    return {errorCode, errorMessage}
  }
}

const signInUserWithFirebase = async (email: string, password: string) => {
  try {
    const signedInUser = await signInWithEmailAndPassword(auth, email, password)
    const user = signedInUser.user
    console.log(user)
    return user
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log({errorCode, errorMessage})
    return {errorCode, errorMessage}
  }
}

export default class AccountController {
  constructor (
    private readonly accountRepository: AccountRepository,
    private readonly companyRepository: CompanyRepository
  ){}

  // async signup (req: Request, res: Response): Promise<void> {
  //   try {
  //     const { error } = await Promise.resolve(accountSchema.validate(req.body));
  //     if (error?.details) throw new BadRequestError(error.details[0].message, "Signup() method error")

  //     const { email, password } = req.body;
  //     const checkIfUserExist = await this.accountRepository.findOne(email)
  //     if (checkIfUserExist) throw new BadRequestError('Email already exist', 'SignUp() method error')

  //     const id = uuidv4();
  //     const hashedPassword = await this.accountRepository.hashPassword(password)
  //     const user = await this.accountRepository.create({id, email, hashedPassword})
  //     res.status(CREATED).send(SuccessResponse(`Your account has been created`))
  //   } catch (error: any) {
  //     throw new ServerError(`Error signing user: ${error.message}`, 'SignUp() method error')
  //   }
  // }

  // async signup (req: Request, res: Response) {
  //   try {
  //     const { error } = await Promise.resolve(accountSchema.validate(req.body));
  //     if (error?.details) throw new BadRequestError(error.details[0].message, "Signup() method error")

  //     const { email, password } = req.body;
  //     const checkIfUserExist = await this.accountRepository.findOne(email)
  //     if (checkIfUserExist) throw new BadRequestError('Email already exist', 'SignUp() method error')

  //     const userResponse = await admin.auth().createUser({email, password})
  //     res.status(CREATED).send(SuccessResponse(`Your account has been created`, userResponse))
  //   } catch (error: any) {
  //     throw new ServerError(`Error signing user: ${error.message}`, 'SignUp() method error')
  //   }
  // }

  // async login (req: Request, res: Response) {
  //   try {
  //     const { error } = await Promise.resolve(accountSchema.validate(req.body))
  //     if (error?.details) throw new BadRequestError(error.details[0].message, "Login() method error")
      
  //     const { email, password } = req.body;
  //     const user = await this.accountRepository.findOne(email)
  //     if (!user) throw new BadRequestError('Email not registered', 'SignUp() method error')

  //     const hashedPassword = await this.accountRepository.retrievePassword(email)
  //     if (hashedPassword !== password) throw new BadRequestError('You have entered an incorrect password', 'Login() method error')

  //     // const token = await generateUserToken(user)
  //     res.status(OK).send(SuccessResponse("You have successfully logged in", user))
  //   } catch (error: any) {
  //     throw new ServerError(`Error logging in: ${error.message}`, 'Login() method error')
  //   }
  // }

  async signupUserA (req: Request, res: Response) {
    try {
      const { error } = await Promise.resolve(accountSchema.validate(req.body));
      if (error?.details) throw new BadRequestError(error.details[0].message, "SignupUserA() method error")

      const { email, password } = req.body;
      const user = await createUserWithFirebase(email, password)
      res.status(CREATED).send(SuccessResponse(`Your account has been created`, user))
    } catch (error: any) {
      throw new ServerError(`Could not sign up user: ${error.message}`, 'SignUp() method error')
    }
  }

  async loginUserA (req: Request, res: Response) {
    try {
      const { error } = await Promise.resolve(accountSchema.validate(req.body));
      if (error?.details) throw new BadRequestError(error.details[0].message, "LoginUserA() method error")

      const {email, password} = req.body;
      const user = await signInUserWithFirebase(email, password)
      console.log(user)
      res.status(OK).send(SuccessResponse("You have successfully logged in", user))
    } catch (error: any) {
      throw new ServerError(`Could not log in up user: ${error.message}`, 'Login() method error')
    }
  }

  // async registerCompany (req: Request, res: Response) {
  //   try {
  //     const { error } = await Promise.resolve(registrationSchema.validate(req.body));
  //     if (error?.details) throw new BadRequestError(error.details[0].message, "registerCompany() method error")

  //     const { companyName, numberOfUsers, numberOfProducts } = req.body
  //     const id = uuidv4();
  //     const percentage = (numberOfUsers / numberOfProducts) * 100;
  //     const payload = {id, req.user.uid, companyName, numberOfUsers, numberOfProducts, percentage }
  //     const registeredCompany = await this.companyRepository.create(payload)
  //     console.log(registeredCompany)
  //     res.status(CREATED).send(SuccessResponse("Your company has been registered", registeredCompany))
  //   } catch (error: any) {
  //     throw new ServerError(`Error registering company: ${error.message}`, 'registerCompany() method error')
  //   }
  // }

  async getRecentInputs (req: Request, res: Response) {
    try {
      const recentInputs = await this.companyRepository.getRecentInputs()
      res.status(OK).send(SuccessResponse("Recent inputs", recentInputs))
    } catch (error: any) {
      throw new ServerError(`Error fetching recent inputs: ${error.message}`, 'getRecentInputs() method error')
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
