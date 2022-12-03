import express from 'express';

import {
	Analytics,
	responseAnalyticsByQuestion,
} from '../controllers/analytics.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/response-analytics', auth, responseAnalyticsByQuestion);
router.get('/', auth, Analytics);

export default router;
