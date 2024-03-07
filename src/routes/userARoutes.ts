import express from 'express';
import UserAAccountController from '../controllers/userA';
import CompanyRepository from '../repositories/company';
import AccountRepository from '../repositories/userARepo';
import { isLoggedIn } from '../config/firebase-config';
const {signupUserA, loginUserA, getRecentInputs, registerCompany} = new UserAAccountController(new AccountRepository(), new CompanyRepository())

const router = express.Router();

router.post('/signup', signupUserA)
router.get('/login', loginUserA)
router.post('/submit', isLoggedIn, registerCompany);
router.get('/recent', isLoggedIn, getRecentInputs);

export default router;
