import express from 'express';

import {
	createAnswer,
	getAnswers,
	// deleteAnswer,
} from '../controllers/answers.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/create', auth, createAnswer);
router.get('/', auth, getAnswers);
// router.delete('/:answerId', auth, deleteAnswer);

export default router;
