import express from 'express';
import { authenticateUserB} from '../middlewares/authMiddleware';
import { upload } from "../utility/image.config";
import AccountController from "../controllers/user"
import AccountRepository from '../repositories/account';
import CompanyRepository from '../repositories/company';
const {getRecentInputs} = new AccountController(new AccountRepository(), new CompanyRepository())

const router = express.Router();


// router.post('/signup', authenticateUserB, signup)
// router.get('/login', authenticateUserB, login)
// router.post('/upload-image/:id', authenticateUserB, upload.single('images'), uploadImages)
router.get('/view-recent', authenticateUserB, getRecentInputs)

export default router 