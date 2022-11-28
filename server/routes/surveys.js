import express from 'express';

import {
	createSurvey,
	updateSurvey,
	deleteSurvey,
	getSurveys,
	getSurvey,
	getQuestionsBySurvey,
	getSurveysByResearcher,
} from '../controllers/surveys.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/create', auth, createSurvey);
router.get('/', auth, getSurveys);
router.get(
	'/get-surveys-by-researcher/:surveyId',
	auth,
	getSurveysByResearcher
);
router.get('/get-questions-by-survey/:surveyId', auth, getQuestionsBySurvey);
router.get('/:surveyId', auth, getSurvey);
router.put('/:surveyId', auth, updateSurvey);
router.delete('/:surveyId', auth, deleteSurvey);

export default router;
