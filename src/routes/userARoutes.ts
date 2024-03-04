// userARoutes.ts
import express from 'express';
import { authenticateUser } from '../middlewares/authMiddleware';
import { UserAController } from '../controllers/company';

const { submitFormData, getRecentInputs} = new UserAController();
const router = express.Router();

router.post('/submit', authenticateUser, submitFormData);
router.get('/recent', authenticateUser, getRecentInputs);

export default router;
