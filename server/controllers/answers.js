import Answers from '../models/Answers.js';
import AnswerEvent from '../models/AnswerEvent.js';

// Create answer controller & capture events
export const createAnswer = async (req, res) => {
	let userId = req.userId;
	const { survey_question_id, option_id, location, surveyee } = req.body;

	try {
		// Simple validation
		if (!surveyee)
			return res.status(400).json({ message: 'Surveyee is required!' });

		if (!survey_question_id)
			return res
				.status(400)
				.json({ message: 'Survey question id is required!' });

		if (!option_id)
			return res.status(400).json({ message: 'Option id is required!' });

		// if (!location)
		// 	return res.status(400).json({ message: 'Location is required!' });

		// Create new answer
		const newAnswer = await Answers.create({
			survey_question_id,
			option_id,
			surveyee,
			location,
			created_by: userId,
			updated_by: userId,
		});

		// Log event
		await AnswerEvent.create({
			event: 'CREATE',
			content: newAnswer,
			description: 'This answer has been created by the administrator',
			answer_id: newAnswer._id,
			created_by: userId,
			updated_by: userId,
		});

		res.status(200).json({ message: 'Answer created successfully!' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error });
	}
};

// Update answer controller & capture events
export const updateAnswer = async (req, res) => {
	let userId = req.userId;
	let answerId = req.params.answerId;

	const { survey_question_id, option_id, location, surveyee } = req.body;

	try {
		// Simple validation
		if (!surveyee)
			return res.status(400).json({ message: 'Surveyee is required!' });

		if (!survey_question_id)
			return res
				.status(400)
				.json({ message: 'Survey question id is required!' });

		if (!option_id)
			return res.status(400).json({ message: 'Option id is required!' });

		const currentAnswer = await Answers.findOne({ _id: answerId });

		if (!currentAnswer)
			return res.status(403).json({ message: 'No answer found.' });

		const updatedAnswerInfo = {
			survey_question_id,
			option_id,
			surveyee,
			location,
			updated_by: userId,
		};

		// Update existing answer
		const updatedAnswer = await Answers.findByIdAndUpdate(
			{
				_id: answerId,
			},
			{ $set: updatedAnswerInfo },
			{ new: true }
		);

		// Log event
		await AnswerEvent.create({
			event: 'UPDATE',
			content: updatedAnswer,
			description: 'This answer has been updated by the administrator',
			answer_id: answerId,
			created_by: userId,
			updated_by: userId,
		});

		res.status(200).json({ message: 'Answer updated successfully!' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error });
	}
};
