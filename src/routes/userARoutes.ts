// userARoutes.ts
import express from 'express';
import { authenticateUser } from '../middlewares/authMiddleware';
import { submitFormData, getRecentInputs } from '../controllers/userAController';

const router = express.Router();

router.post('/submit', authenticateUser, submitFormData);
router.get('/recent', authenticateUser, getRecentInputs);

export default router;
