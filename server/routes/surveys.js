import express from 'express';

import {
	createSurvey,
	updateSurvey,
	deleteSurvey,
	getSurveys,
	getSurvey,
} from '../controllers/surveys.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/create', auth, createSurvey);
router.get('/', getSurveys);
router.get('/:surveyId', getSurvey);
router.put('/:surveyId', auth, updateSurvey);
router.delete('/:surveyId', auth, deleteSurvey);

export default router;
