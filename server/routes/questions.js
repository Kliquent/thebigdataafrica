import express from 'express';

import {
	createQuestion,
	updateQuestion,
	getQuestions,
	getQuestion,
	deleteQuestion,
	getOptionsByQuestion,
} from '../controllers/questions.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/create', auth, createQuestion);
router.get('/', auth, getQuestions);
router.get('/get-options-by-question/:questionId', auth, getOptionsByQuestion);
router.get('/:questionId', auth, getQuestion);
router.put('/:questionId', auth, updateQuestion);
router.delete('/:questionId', auth, deleteQuestion);

export default router;
