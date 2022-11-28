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
			type, // Dropdown Select, Radio, Checkbox, Range, Text Field
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

	const { select_type, type, name, description, question_id } = req.body;

	try {
		// Simple validation
		if (!select_type || !type || !name || !description)
			return res.status(400).json({ message: 'Please enter all fields!' });

		if (!question_id)
			return res.status(400).json({ message: 'Question id is required!' });

		const currentOption = await Options.findOne({ _id: optionId });

		if (!currentOption)
			return res.status(403).json({ message: 'No option found.' });

		// Select Type & Type can be changed on update
		const updatedOptionInfo = {
			select_type, // Single or Multi Select
			type, // Dropdown Select, Radio, Checkbox, Range, Text Field
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

// Delete option controller & capture events
export const deleteOption = async (req, res) => {
	let userId = req.userId;
	let optionId = req.params.optionId;

	try {
		const currentOption = await Surveys.findOne({ _id: optionId });

		if (!currentOption)
			return res.status(403).json({ message: 'No option found.' });

		// Prevent delete if option is referenced to answer/response
		// const surveyQuestion = await SurveyQuestion.find({
		// 	survey_id: surveyId,
		// });

		// if (surveyQuestion.length > 0) {
		// 	return res.status(403).json({
		// 		message: `Resource can't be deleted due attached resources.`,
		// 	});
		// }

		// Log event
		await OptionEvent.create({
			event: 'DELETE',
			content: currentOption,
			description: 'This option has been deleted by the administrator',
			option_id: optionId,
			created_by: userId,
			updated_by: userId,
		});

		await Options.findByIdAndDelete({ _id: optionId });

		res.status(200).json({ message: 'Option deleted successfully!' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error });
	}
};

export const getOptions = async (req, res) => {
	let searchTerm = req.query.searchTerm;
	let order = req.query.order ? req.query.order : 'desc';
	let orderBy = req.query.orderBy ? req.query.orderBy : '_id';

	const page = parseInt(req.query.page)
		? parseInt(req.query.page)
		: parseInt(1);
	let limit = parseInt(req.query.limit)
		? parseInt(req.query.limit)
		: parseInt(20);
	const skipIndex = (page - 1) * limit;

	try {
		if (searchTerm) {
			const options = await Options.find({
				$text: { $search: `"${searchTerm}"` },
			});
			res.status(200).json({ options, totalSearchOptions: options.length });
		} else {
			const options = await Options.find()
				.sort([[orderBy, order]])
				.skip(skipIndex)
				.limit(limit);

			res.status(200).json(options);
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error });
	}
};

export const getOption = async (req, res) => {
	let optionId = req.params.optionId;

	try {
		const currentOption = await Options.findOne({ _id: optionId });

		if (!currentOption)
			return res.status(403).json({ message: 'No option found.' });

		const option = await Options.findOne({
			_id: optionId,
		});

		res.status(200).json(option);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error });
	}
};
