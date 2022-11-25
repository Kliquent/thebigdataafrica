import express from 'express';

import {
	createAnswer,
	updateAnswer,
	// deleteAnswer,
} from '../controllers/answers.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/create', auth, createAnswer);
router.put('/:answerId', auth, updateAnswer);
// router.delete('/:answerId', auth, deleteAnswer);

export default router;
