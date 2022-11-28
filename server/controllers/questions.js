import Questions from '../models/Questions.js';
import SurveyQuestion from '../models/SurveyQuestion.js';
import QuestionEvent from '../models/QuestionEvent.js';

// Create question controller & capture events
export const createQuestion = async (req, res) => {
	let userId = req.userId;
	const { name, description, survey_id } = req.body;

	try {
		// Simple validation
		if (!name || !description)
			return res.status(400).json({ message: 'Please enter all fields!' });

		if (!survey_id)
			return res.status(403).json({ message: 'Survey id is required!' });

		// Create new question
		const newQuestion = await Questions.create({
			name,
			description,
			active: true,
			created_by: userId,
			updated_by: userId,
		});

		// Reference question to survey
		await SurveyQuestion.create({
			survey_id,
			question_id: newQuestion._id,
		});

		// Log event
		await QuestionEvent.create({
			event: 'CREATE',
			content: newQuestion,
			description: 'This question has been created by the administrator',
			question_id: newQuestion._id,
			created_by: userId,
			updated_by: userId,
		});

		res.status(200).json({ message: 'Question created successfully!' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error });
	}
};

// Update question controller & capture events
export const updateQuestion = async (req, res) => {
	let userId = req.userId;
	let questionId = req.params.questionId;

	const { name, description, survey_id } = req.body;

	try {
		// Simple validation
		if (!name || !description)
			return res.status(400).json({ message: 'Please enter all fields!' });

		if (!survey_id)
			return res.status(403).json({ message: 'Survey id is required!' });

		const currentQuestion = await Questions.findOne({ _id: questionId });

		if (!currentQuestion)
			return res.status(403).json({ message: 'No question found.' });

		const updatedQuestionInfo = {
			name,
			description,
			updated_by: userId,
		};

		// Update existing question
		const updatedQuestion = await Questions.findByIdAndUpdate(
			{
				_id: questionId,
			},
			{ $set: updatedQuestionInfo },
			{ new: true }
		);

		// Search survey_question_id using survey_id & questionId
		const currentSurveyQuestionId = await SurveyQuestion.findOne({
			$and: [{ survey_id }, { question_id: questionId }],
		});

		// Update reference question to survey
		await SurveyQuestion.findByIdAndUpdate(
			{
				_id: currentSurveyQuestionId._id,
			},
			{
				$set: {
					survey_id,
					question_id: questionId,
				},
			},
			{ new: true }
		);

		// Log event
		await QuestionEvent.create({
			event: 'UPDATE',
			content: updatedQuestion,
			description: 'This question has been updated by the administrator',
			question_id: questionId,
			created_by: userId,
			updated_by: userId,
		});

		res.status(200).json({ message: 'Question updated successfully!' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error });
	}
};

// Delete question controller & capture events
export const deleteQuestion = async (req, res) => {
	let userId = req.userId;
	let questionId = req.params.questionId;

	try {
		const currentQuestion = await Questions.findOne({ _id: questionId });

		if (!currentQuestion)
			return res.status(403).json({ message: 'No question found.' });

		// Prevent delete if the survey is referenced
		const surveyQuestion = await SurveyQuestion.find({
			question_id: questionId,
		});

		// If the survey is referenced more than once (many to many)
		// Then don't delete else it can be deleted as it is (one to many)
		if (surveyQuestion.length > 1) {
			return res.status(403).json({
				message: `Resource can't be deleted due attached resources.`,
			});
		}

		// If survey question is one, then delete survey_id & question_id
		if (surveyQuestion.length < 1) {
			await SurveyQuestion.findByIdAndDelete({
				_id: surveyQuestion[0]._id,
			});
		}

		// Log event
		await QuestionEvent.create({
			event: 'DELETE',
			content: currentQuestion,
			description: 'This question has been deleted by the administrator',
			question_id: questionId,
			created_by: userId,
			updated_by: userId,
		});

		// await Questions.findByIdAndDelete({ _id: questionId });

		res.status(200).json({ message: 'Question deleted successfully!' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error });
	}
};

export const getQuestions = async (req, res) => {
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
			const questions = await Questions.find({
				$text: { $search: `"${searchTerm}"` },
			});
			res
				.status(200)
				.json({ questions, totalSearchQuestions: questions.length });
		} else {
			const questions = await Questions.find()
				.sort([[orderBy, order]])
				.skip(skipIndex)
				.limit(limit);

			res.status(200).json(questions);
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error });
	}
};

export const getQuestion = async (req, res) => {
	let questionId = req.params.questionId;

	try {
		const currentQuestion = await Questions.findOne({ _id: questionId });

		if (!currentQuestion)
			return res.status(403).json({ message: 'No question found.' });

		const question = await Questions.findOne({
			_id: questionId,
		});

		res.status(200).json(question);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error });
	}
};
