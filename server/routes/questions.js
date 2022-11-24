import express from 'express';

import { createQuestion, updateQuestion } from '../controllers/questions.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/create', auth, createQuestion);
router.put('/:roleId', auth, updateQuestion);
// router.delete('/:roleId', auth, deleteRole);

export default router;
