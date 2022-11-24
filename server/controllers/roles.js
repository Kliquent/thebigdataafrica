import slugify from 'slugify';

import Roles from '../models/Roles.js';

// System level actions
export const systemCreateRole = async (req, res) => {
	const { title, description } = req.body;

	try {
		// Simple validation
		if (!title || !description)
			return res.status(400).json({ message: 'Please enter all fields!' });

		const titleLowercase = title.toLowerCase();

		const existingRole = await Roles.findOne({
			slug: slugify(`${titleLowercase}`),
		});

		// Check existing role
		if (existingRole)
			return res.status(409).json({ message: 'Role already exists!' });

		// Create user
		await Roles.create({
			title,
			slug: slugify(`${titleLowercase}`),
			description,
			active: true,
		});

		res.status(200).json({ message: 'System:Role created successfully!' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error });
	}
};

// Create role controller & capture events
export const createRole = async (req, res) => {
	const { title, description } = req.body;

	try {
		// Simple validation
		if (!title || !description)
			return res.status(400).json({ message: 'Please enter all fields!' });

		const titleLowercase = title.toLowerCase();

		const existingRole = await Roles.findOne({
			slug: slugify(`${titleLowercase}`),
		});

		// Check existing role
		if (existingRole)
			return res.status(409).json({ message: 'Role already exists!' });

		// Create user
		await Roles.create({
			title,
			slug: slugify(`${titleLowercase}`),
			description,
			active: true,
		});

		res.status(200).json({ message: 'Role created successfully!' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error });
	}
};

export const updateRole = async (req, res) => {
	let userId = req.userId;
	let roleId = req.params.roleId;

	const { title, description } = req.body;

	try {
		// Simple validation
		if (!title || !description)
			return res.status(400).json({ message: 'Please enter all fields!' });

		const currentUser = await Users.findById(userId);
		const currentRole = await Roles.findOne({ _id: roleId });

		if (!currentRole)
			return res.status(403).json({ message: 'No role found.' });

		const updatedRoleInfo = {
			title,
			description,
		};

		await Roles.findByIdAndUpdate(
			{
				_id: currentRole._id,
			},
			{ $set: updatedRoleInfo },
			{ new: true }
		);

		res.status(200).json({ message: 'Role updated successfully!' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error });
	}
};
