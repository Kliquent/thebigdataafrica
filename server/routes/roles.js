import express from 'express';

import { systemCreateRole, createRole } from '../controllers/roles.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/system-create', systemCreateRole);
router.post('/create', auth, createRole);

export default router;
