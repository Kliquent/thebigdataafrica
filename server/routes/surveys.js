import express from 'express';

import {
	createSurvey,
	updateSurvey,
	deleteSurvey,
	getSurveys,
	getSurvey,
	// getQuestionBySurveyQuestion,
	getClientSurveys,
	getSurveyResearchers,
	getQuestionsBySurvey,
	getSurveysByResearcher,
	getSurveysByResearcherToken,
	deleteSurveyResearcher,
} from '../controllers/surveys.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/create', auth, createSurvey);
router.get('/get-surveys-by-researcher', auth, getSurveysByResearcherToken);
router.get('/', auth, getSurveys);
router.get(
	'/get-surveys-by-researcher/:researcherId',
	auth,
	getSurveysByResearcher
);
router.get('/get-questions-by-survey/:surveyId', auth, getQuestionsBySurvey);
router.get('/get-survey-researchers/:surveyId', auth, getSurveyResearchers);
router.get('/get-client-surveys/:clientId', auth, getClientSurveys);
router.get('/:surveyId', auth, getSurvey);
router.put('/:surveyId', auth, updateSurvey);
router.delete('/delete-survey-researchers', auth, deleteSurveyResearcher);
router.delete('/:surveyId', auth, deleteSurvey);

export default router;
