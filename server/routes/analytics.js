import express from 'express';

import { Analytics } from '../controllers/analytics.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, Analytics);

export default router;
