import express from 'express';

import { createSurveyee } from '../controllers/surveyee.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/create', auth, createSurveyee);

export default router;
