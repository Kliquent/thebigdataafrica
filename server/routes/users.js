import express from 'express';

import {
	// getUsers,
	// customerSignup,
	// sellerSignup,
	adminSignup,
	updateUserInfo,
	signin,
	// getSellers,
	changePassword,
	forgotPassword,
	// storeExponentPushToken,
	getUsersByRole,
} from '../controllers/users.js';
import { profile } from '../controllers/profile.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/profile', auth, profile);
router.post('/signin', signin);
router.post('/admin/signup', adminSignup);
router.put('/update-user-info', auth, updateUserInfo);
router.put('/update-password', auth, changePassword);
router.put('/forgot-password', forgotPassword);
router.get(':roleId', auth, getUsersByRole);

export default router;
