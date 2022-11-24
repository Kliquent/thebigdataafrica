import slugify from 'slugify';

import Roles from '../models/Roles.js';
import RoleEvent from '../models/RoleEvent.js';

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
	let userId = req.userId;
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
		const newRole = await Roles.create({
			title,
			slug: slugify(`${titleLowercase}`),
			description,
			active: true,
			created_by: userId,
			updated_by: userId,
		});

		await RoleEvent.create({
			event: 'CREATE',
			description: 'This role has been created by administrator',
			role_id: newRole._id,
			created_by: userId,
			updated_by: userId,
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

		const currentRole = await Roles.findOne({ _id: roleId });

		if (!currentRole)
			return res.status(403).json({ message: 'No role found.' });

		const updatedRoleInfo = {
			title,
			description,
			updated_by: userId,
		};

		await Roles.findByIdAndUpdate(
			{
				_id: roleId,
			},
			{ $set: updatedRoleInfo },
			{ new: true }
		);

		await RoleEvent.create({
			event: 'UPDATE',
			description: 'This role has been updated by administrator',
			role_id: roleId,
			created_by: userId,
			updated_by: userId,
		});

		res.status(200).json({ message: 'Role updated successfully!' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error });
	}
};
