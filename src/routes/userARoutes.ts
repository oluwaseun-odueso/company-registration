import express from 'express';
import { authenticateUserA} from '../middlewares/authMiddleware';
import AccountController from '../controllers/user';
import CompanyRepository from '../repositories/company';
import AccountRepository from '../repositories/account';
const {signupUserA, loginUserA, getRecentInputs} = new AccountController(new AccountRepository(), new CompanyRepository())

const router = express.Router();

router.post('/signup', signupUserA)
router.get('/login', loginUserA)
// router.post('/submit', authenticateUserA, registerCompany);
router.get('/recent', authenticateUserA, getRecentInputs);

export default router;
