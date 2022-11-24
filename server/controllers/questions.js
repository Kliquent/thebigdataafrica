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
			title,
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

		const currentQuestion = await Surveys.findOne({ _id: questionId });

		if (!currentQuestion)
			return res.status(403).json({ message: 'No question found.' });

		const updatedQuestionInfo = {
			name,
			description,
			updated_by: userId,
		};

		// Update existing question
		const updatedSurvey = await Surveys.findByIdAndUpdate(
			{
				_id: questionId,
			},
			{ $set: updatedQuestionInfo },
			{ new: true }
		);

		// Search survey_question_id using survey_id & questionId
		const currentSurveyQuestionId = await SurveyQuestion.find({
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
			content: updatedSurvey,
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
