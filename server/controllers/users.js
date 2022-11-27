import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Roles from '../models/Roles.js';
import Users from '../models/Users.js';

// signin controller handles signin of all users i.e admin, researcher & client
export const signin = async (req, res) => {
	const { email, password } = req.body;

	const emailLowercase = email.toLowerCase(); // sanitize: convert email to lowercase

	try {
		const existingUser = await Users.findOne({ email: emailLowercase });

		// Check existing user
		if (!existingUser)
			return res.status(404).json({ message: "User doesn't exist!" });

		// Simple validation
		if (!emailLowercase || !password)
			return res.status(400).json({ message: 'Please enter all fields!' });

		const isPasswordCorrect = await bcrypt.compare(
			password,
			existingUser.password
		);

		// Validate password
		if (!isPasswordCorrect)
			return res.status(401).json({ message: 'Invalid credentials!' });

		// Authenticate user
		const token = jwt.sign(
			{
				email: existingUser.email,
				id: existingUser._id,
			},
			process.env.JWT_SECRET,
			{ expiresIn: '28 days' }
		);

		res.status(200).json({
			current_user: existingUser.name,
			isAdmin: existingUser.isAdmin,
			token,
		});

		res.end();
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error });
	}
};

// userSignup controller
export const userSignup = async (req, res) => {
	const {
		role_id,
		name,
		email,
		phone,
		gender,
		password,
		password_confirmation,
	} = req.body;

	const emailLowercase = email.toLowerCase(); // sanitize: convert email to lowercase

	try {
		const existingUser = await Users.findOne({ email: emailLowercase });

		const existingPhoneNumber = await Users.findOne({ phone });

		// Check existing user
		if (existingUser)
			return res.status(409).json({ message: 'User already exists!' });

		// Check existing phone number
		if (existingPhoneNumber)
			return res.status(401).json({ message: 'Phone number already exists!' });

		// Simple validation
		if (
			!name ||
			!emailLowercase ||
			!phone ||
			!gender ||
			!password ||
			!password_confirmation
		)
			return res.status(400).json({ message: 'Please enter all fields!' });

		// Role validation
		if (!role_id)
			return res.status(400).json({ message: 'Please provide user role id!' });

		// Check password strength
		if (password.length < 8)
			return res
				.status(400)
				.json({ message: 'Password should be atleast 8 characters.' });

		// Compare passwords
		if (password !== password_confirmation)
			return res.status(400).json({ message: 'Passwords do not match!' });

		// Hash user password
		const hashedPassword = await bcrypt.hash(
			password,
			parseInt(process.env.SALT_ROUNDS)
		);

		// Create user
		await Users.create({
			name,
			email: emailLowercase, // sanitize: convert email to lowercase
			phone,
			gender,
			isAdmin: false,
			isUserActive: true,
			role_id,
			isEmailVerified: false,
			password: hashedPassword,
		});

		const newUser = await Users.findOne({ email: emailLowercase });

		// Authenticate user
		const token = jwt.sign(
			{
				email: newUser.email,
				id: newUser._id,
			},
			process.env.JWT_SECRET,
			{ expiresIn: '28 days' }
		);

		res.status(200).json({ message: 'New user created!', token });
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

// adminSignup controller
export const adminSignup = async (req, res) => {
	const {
		role_id,
		name,
		email,
		phone,
		gender,
		password,
		password_confirmation,
	} = req.body;

	const emailLowercase = email.toLowerCase(); // sanitize: convert email to lowercase

	try {
		const existingUser = await Users.findOne({ email: emailLowercase });

		const existingPhoneNumber = await Users.findOne({ phone });

		// Check existing user
		if (existingUser)
			return res.status(409).json({ message: 'User already exists!' });

		// Check existing phone number
		if (existingPhoneNumber)
			return res.status(401).json({ message: 'Phone number already exists!' });

		// Simple validation
		if (
			!name ||
			!emailLowercase ||
			!phone ||
			!gender ||
			!password ||
			!password_confirmation
		)
			return res.status(400).json({ message: 'Please enter all fields!' });

		// Role validation
		if (!role_id)
			return res.status(400).json({ message: 'Please provide user role id!' });

		// Check password strength
		if (password.length < 8)
			return res
				.status(400)
				.json({ message: 'Password should be atleast 8 characters.' });

		// Compare passwords
		if (password !== password_confirmation)
			return res.status(400).json({ message: 'Passwords do not match!' });

		// Hash user password
		const hashedPassword = await bcrypt.hash(
			password,
			parseInt(process.env.SALT_ROUNDS)
		);

		// Create user
		await Users.create({
			name,
			email: emailLowercase, // sanitize: convert email to lowercase
			phone,
			gender,
			isAdmin: true,
			isUserActive: true,
			role_id,
			isEmailVerified: false,
			password: hashedPassword,
		});

		const newUser = await Users.findOne({ email: emailLowercase });

		// Authenticate user
		const token = jwt.sign(
			{
				email: newUser.email,
				id: newUser._id,
			},
			process.env.JWT_SECRET,
			{ expiresIn: '28 days' }
		);

		res.status(200).json({ message: 'New user admin created!', token });
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

// adminUpdateUserInfo by admin controller
export const adminUpdateUserInfo = async (req, res) => {
	const userId = req.userId;

	const { _id, name, email, phone, gender } = req.body;

	const emailLowercase = email.toLowerCase(); // sanitize: convert email to lowercase

	try {
		// Simple validation
		if (!name || !emailLowercase || !phone)
			return res.status(400).json({ message: 'Please enter all fields!' });

		const currentUser = await Users.findById(userId);

		if (currentUser.isAdmin) {
			const updatedUserInfo = {
				name,
				email: emailLowercase,
				phone,
				gender,
			};

			await Users.findByIdAndUpdate(
				{
					_id: _id, // user can be researcher, client or admin
				},
				{ $set: updatedUserInfo },
				{ new: true }
			);

			res.status(200).json({ message: 'User details updated successfully!' });
		} else {
			return res.status(401).json({
				message: `You're not an admin, resource can't be created`,
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error });
	}
};

// updateUserInfo personal controller
export const updateUserInfo = async (req, res) => {
	const userId = req.userId;
	const { name, email, phone } = req.body;

	const emailLowercase = email.toLowerCase(); // sanitize: convert email to lowercase

	try {
		// Simple validation
		if (!name || !emailLowercase || !phone)
			return res.status(400).json({ message: 'Please enter all fields!' });

		const currentUser = await Users.findById(userId);

		if (!currentUser)
			return res.status(403).json({ message: 'No user found.' });

		const updatedUserInfo = {
			name,
			email: emailLowercase,
			phone,
		};

		await Users.findByIdAndUpdate(
			{
				_id: userId,
			},
			{ $set: updatedUserInfo },
			{ new: true }
		);

		res.status(200).json({ message: 'User details updated successfully!' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error });
	}
};

// User change password controller
export const changePassword = async (req, res) => {
	const userId = req.userId;
	const { current_password, new_password } = req.body;

	try {
		const existingUser = await Users.findOne({ _id: userId });

		// Check existing user
		if (!existingUser)
			return res.status(404).json({ message: "User doesn't exist!" });

		// Check password strength
		if (new_password.length < 8)
			return res
				.status(400)
				.json({ message: 'Password should be atleast 8 characters.' });

		const isPasswordCorrect = await bcrypt.compare(
			current_password,
			existingUser.password
		);

		// Validate password
		if (!isPasswordCorrect)
			return res.status(401).json({ message: 'Invalid credentials!' });

		// Hash user password
		const hashedPassword = await bcrypt.hash(
			new_password,
			parseInt(process.env.SALT_ROUNDS)
		);

		// Update user password
		await Users.updateOne(
			{ _id: existingUser._id },
			{
				password: hashedPassword,
			}
		);

		res.status(200).json({ message: 'User password updated successfully!' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error });
	}
};

// fogotPassword controller handles reset passwords of all users i.e admin, seller & customer
export const forgotPassword = async (req, res) => {
	const { email, newPassword } = req.body;

	const emailLowercase = email.toLowerCase(); // sanitize: convert email to lowercase

	try {
		const existingUser = await Users.findOne({ email: emailLowercase });

		// Simple validation
		if (!emailLowercase || !newPassword)
			return res.status(403).json({ message: 'Please enter all fields!' });

		// Check existing user
		if (!existingUser)
			return res.status(403).json({ message: 'User does not exist!' });

		// Check password strength
		if (newPassword.length < 8)
			return res
				.status(400)
				.json({ message: 'Password should be atleast 8 characters.' });

		// Hash user password
		const hashedPassword = await bcrypt.hash(
			newPassword,
			parseInt(process.env.SALT_ROUNDS)
		);

		// Update user password
		await Users.updateOne(
			{ _id: existingUser._id },
			{
				password: hashedPassword,
			}
		);

		res.status(200).json({ message: 'User password updated successfully!' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error });
	}
};

export const getUsersByRole = async (req, res) => {
	let roleId = req.params.roleId;

	try {
		const currentRole = await Roles.findOne({ _id: roleId });

		if (!currentRole)
			return res.status(403).json({ message: 'No role found.' });

		const users = await Users.find({
			role_id: roleId,
		}).populate('role_id', 'title');

		res.status(200).json({ role: `${currentRole.title}`, users });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error });
	}
};

export const adminGetUser = async (req, res) => {
	// admin
	let userId = req.userId;
	// current viewed user
	const { _id } = req.body;

	try {
		// This is admin user
		const currentUser = await Users.findById(userId);

		if (currentUser.isAdmin) {
			// This is currently viewed user
			const getUser = await Users.findById(_id).populate('role', 'title');

			if (!getUser) return res.status(403).json({ message: 'No user found.' });

			res.status(200).json({ current_user: currentUser });
		} else {
			return res.status(401).json({
				message: `You're not an admin, resource can't be created`,
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error });
	}
};

export const adminDeleteUser = async (req, res) => {
	// const userId = req.userId;
	const { _id } = req.body;

	try {
		// const currentUser = await Users.findById(userId);

		// if (currentUser.isAdmin) {
		const userToBeDeleted = await Users.findOne({ _id: _id });

		if (!userToBeDeleted)
			return res.status(403).json({ message: 'No user found.' });

		// Prevent delete if the user has attached resources

		// Log event

		await Users.findByIdAndDelete({ _id: userToBeDeleted._id });

		res.status(200).json({ message: 'User deleted successfully!' });
		// } else {
		// 	return res.status(401).json({
		// 		message: `You're not an admin, resource can't be created`,
		// 	});
		// }
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error });
	}
};
