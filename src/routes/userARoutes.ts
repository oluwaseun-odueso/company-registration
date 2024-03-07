import express from 'express';
import AccountController from '../controllers/user';
import CompanyRepository from '../repositories/company';
import AccountRepository from '../repositories/account';
import { isLoggedIn } from '../config/firebase-config';
const {signupUserA, loginUserA, getRecentInputs, registerCompany} = new AccountController(new AccountRepository(), new CompanyRepository())

const router = express.Router();

router.post('/signup', isLoggedIn, signupUserA)
router.get('/login', loginUserA)
router.post('/submit', isLoggedIn, registerCompany);
router.get('/recent', isLoggedIn, getRecentInputs);

export default router;
