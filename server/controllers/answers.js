import Answers from '../models/Answers.js';
import AnswerEvent from '../models/AnswerEvent.js';

// Create answer controller & capture events
export const createAnswer = async (req, res) => {
	let userId = req.userId;
	const {
		survey_question_id,
		question_id,
		option_id,
		answerText,
		location,
		surveyee,
	} = req.body;

	try {
		// Simple validation
		if (!surveyee)
			return res.status(400).json({ message: 'Surveyee is required!' });

		// survey_question_id can also be used to reference both Survey & Question
		if (!question_id)
			return res.status(400).json({ message: 'Question id is required!' });

		if (!option_id)
			return res.status(400).json({ message: 'Option id is required!' });

		// if (!location)
		// 	return res.status(400).json({ message: 'Location is required!' });

		// Create new answer
		const newAnswer = await Answers.create({
			survey_question_id, // please provide field
			question_id,
			option_id,
			answerText,
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

	const {
		survey_question_id,
		question_id,
		option_id,
		answerText,
		location,
		surveyee,
	} = req.body;

	try {
		// Simple validation
		if (!surveyee)
			return res.status(400).json({ message: 'Surveyee is required!' });

		if (!question_id)
			return res.status(400).json({ message: 'Question id is required!' });

		if (!option_id)
			return res.status(400).json({ message: 'Option id is required!' });

		const currentAnswer = await Answers.findOne({ _id: answerId });

		if (!currentAnswer)
			return res.status(403).json({ message: 'No answer found.' });

		const updatedAnswerInfo = {
			survey_question_id,
			question_id,
			option_id,
			answerText,
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

export const getAnswers = async (req, res) => {
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
			const answers = await Answers.find({
				$text: { $search: `"${searchTerm}"` },
			});
			res.status(200).json({ answers });
		} else {
			const answers = await Answers.find()
				.sort([[orderBy, order]])
				.skip(skipIndex)
				.limit(limit);

			res.status(200).json(answers);
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error });
	}
};
