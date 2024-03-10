import express from 'express';
import { upload } from "../utility/image.config";
import UserBAccountController from "../controllers/userB"
import { isLoggedIn } from '../config/firebase-config';
const {signupUserB, loginUserB, getRecentInputs, uploadImages} = new UserBAccountController()

const router = express.Router();


router.post('/signup', isLoggedIn, signupUserB)
router.get('/login', isLoggedIn, loginUserB)
router.post('/upload-image/:userId/:companyId', isLoggedIn, upload.array('images', 30), uploadImages)
router.get('/view-recent/:userId', isLoggedIn, getRecentInputs)

export default router 