import express from 'express';

import { createSurveyee, getClientSurveyees } from '../controllers/surveyee.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/get-client-surveyees', auth, getClientSurveyees);
router.post('/create', auth, createSurveyee);

export default router;
