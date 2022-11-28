import express from 'express';

import {
	createOption,
	updateOption,
	deleteOption,
	getOptions,
	getOption,
} from '../controllers/options.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/create', auth, createOption);
router.get('/', auth, getOptions);
router.get('/:optionId', auth, getOption);
router.put('/:optionId', auth, updateOption);
router.delete('/:optionId', auth, deleteOption);

export default router;
