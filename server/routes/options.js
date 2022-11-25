import express from 'express';

import { createOption, updateOption } from '../controllers/options.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/create', auth, createOption);
router.put('/:optionId', auth, updateOption);
// router.delete('/:optionId', auth, deleteSurvey);

export default router;
