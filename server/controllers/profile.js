import User from '../models/Users.js';

export const profile = async (req, res) => {
	const id = req.userId;
	try {
		const currentUser = await User.findById(id).populate('role_id', 'title');

		if (!currentUser)
			return res.status(403).json({ message: 'No user found.' });

		res.status(200).json({ current_user: currentUser });
	} catch (error) {
		res.status(403).json({ message: error });
	}
};
