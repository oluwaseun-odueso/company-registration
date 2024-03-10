import express from 'express';
import UserAAccountController from '../controllers/userA';
import { isLoggedIn } from '../config/firebase-config';
const {signupUserA, loginUserA, getRecentInputs, registerCompany} = new UserAAccountController()

const router = express.Router();

router.post('/signup', signupUserA)
router.get('/login', loginUserA)
router.post('/submit', isLoggedIn, registerCompany);
router.get('/recent', isLoggedIn, getRecentInputs);

export default router;
