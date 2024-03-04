// userARoutes.ts
import express from 'express';
import { authenticateUser } from '../middlewares/authMiddleware';
import AccountController from '../controllers/signup';
// import { UserAController } from '../controllers/company';

const {signup, login} = new AccountController()
const { submitFormData, getRecentInputs} = new UserAController();
const router = express.Router();

router.post('/signup', authenticateUser, signup)
router.post('/submit', authenticateUser, submitFormData);
router.get('/recent', authenticateUser, getRecentInputs);

export default router;

// const userAController = new UserAController();
// const router = express.Router();

// router.post('/submit', authenticateUser, userAController.submitFormData);
// router.get('/recent', authenticateUser, userAController.getRecentInputs);

// export default router;