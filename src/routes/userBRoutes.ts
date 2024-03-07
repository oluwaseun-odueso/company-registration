import express from 'express';
import { upload } from "../utility/image.config";
import UserBAccountController from "../controllers/userB"
import AccountRepository from '../repositories/userBRepo';
import CompanyRepository from '../repositories/company';
import { isLoggedIn } from '../config/firebase-config';
const {signupUserB, loginUserB, getRecentInputs} = new UserBAccountController(new AccountRepository(), new CompanyRepository())

const router = express.Router();


router.post('/signup', isLoggedIn, signupUserB)
router.get('/login', isLoggedIn, loginUserB)
// router.post('/upload-image/:id', authenticateUserB, upload.single('images'), uploadImages)
router.get('/view-recent', isLoggedIn, getRecentInputs)

export default router 