import express from 'express';

import {
	userSignup,
	adminSignup,
	signin,
	adminUpdateUserInfo,
	updateUserInfo,
	changePassword,
	forgotPassword,
	adminGetUser,
	adminDeleteUser,
	// storeExponentPushToken,
	getUsersByRole,
	getClient,
} from '../controllers/users.js';
import { profile } from '../controllers/profile.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/profile', auth, profile);
router.get('/client', auth, getClient);
router.get('/admin/get-user', auth, adminGetUser);
router.post('/signin', signin);
router.post('/user/signup', userSignup);
router.post('/admin/signup', adminSignup);
router.put('/admin/update-user-info', auth, adminUpdateUserInfo);
router.put('/update-user-info', auth, updateUserInfo);
router.put('/update-password', auth, changePassword);
router.put('/forgot-password', forgotPassword);
router.delete('/admin/delete-user', adminDeleteUser);
router.get('/users-by-role/:roleId', auth, getUsersByRole);

export default router;
