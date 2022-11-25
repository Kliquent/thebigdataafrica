import Options from '../models/Options.js';
import OptionEvent from '../models/OptionEvent.js';

// Create option controller & capture events
export const createOption = async (req, res) => {
	let userId = req.userId;
	const { select_type, type, name, description, question_id } = req.body;
	try {
		// Simple validation
		if (!select_type || !type || !name || !description)
			return res.status(400).json({ message: 'Please enter all fields!' });

		if (!question_id)
			return res.status(400).json({ message: 'Question id is required!' });

		// Create new option
		const newOption = await Options.create({
			select_type, // Single or Multi Select
			type, // Dropdown Select, Radio, Checkbox, Range
			name,
			description,
			question_id,
			created_by: userId,
			updated_by: userId,
		});

		// Log event
		await OptionEvent.create({
			event: 'CREATE',
			content: newOption,
			description: 'This option has been created by the administrator',
			option_id: newOption._id,
			created_by: userId,
			updated_by: userId,
		});

		res.status(200).json({ message: 'Option created successfully!' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error });
	}
};

// Update option controller & capture events
export const updateOption = async (req, res) => {
	let userId = req.userId;
	let optionId = req.params.optionId;

	const { name, description, question_id } = req.body;

	try {
		// Simple validation
		if (!select_type || !type || !name || !description)
			return res.status(400).json({ message: 'Please enter all fields!' });

		if (!question_id)
			return res.status(400).json({ message: 'Question id is required!' });

		const currentOption = await Surveys.findOne({ _id: optionId });

		if (!currentOption)
			return res.status(403).json({ message: 'No option found.' });

		const updatedOptionInfo = {
			select_type, // Single or Multi Select
			type, // Dropdown Select, Radio, Checkbox, Range
			name,
			description,
			question_id,
			updated_by: userId,
		};

		// Update existing option
		const updatedOption = await Options.findByIdAndUpdate(
			{
				_id: optionId,
			},
			{ $set: updatedOptionInfo },
			{ new: true }
		);

		// Log event
		await OptionEvent.create({
			event: 'UPDATE',
			content: updatedOption,
			description: 'This option has been updated by the administrator',
			option_id: optionId,
			created_by: userId,
			updated_by: userId,
		});

		res.status(200).json({ message: 'Option updated successfully!' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error });
	}
};
