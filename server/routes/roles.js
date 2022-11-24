import express from 'express';

import {
	systemCreateRole,
	createRole,
	updateRole,
	deleteRole,
} from '../controllers/roles.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/system-create', systemCreateRole);
router.post('/create', auth, createRole);
router.put('/:roleId', auth, updateRole);
router.delete('/:roleId', auth, deleteRole);

export default router;
