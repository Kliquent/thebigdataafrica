import Surveys from '../models/Survey.js';
import SurveyQuestion from '../models/SurveyQuestion.js';
import Answers from '../models/Answers.js';
import Surveyee from '../models/Surveyee.js';

// Create Surveyee controller
export const createSurveyee = async (req, res) => {
	let userId = req.userId;

	const { name, email, phone } = req.body;

	try {
		// Create new surveyee
		const surveyee = await Surveyee.create({
			uniqueID: uniqueID(),
			name,
			email,
			phone,
			created_by: userId,
			updated_by: userId,
		});

		res.status(200).json({ surveyee });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error });
	}
};

export const getClientSurveyees = async (req, res) => {
	let clientId = req.query.clientId;

	try {
		const surveys = await Surveys.find({ owner: clientId });
		const surveyIds = surveys.map((survey) => {
			return survey._id;
		});

		// Find all questions based on surveyIds from client surveys
		const questions = await SurveyQuestion.find({
			survey_id: { $in: surveyIds },
		});
		const questionIds = questions.map((question) => {
			return question.question_id;
		});

		const surveyee = await Answers.aggregate([
			{
				$match: {
					$and: [
						{ surveyee_id: { $exists: true } },
						{ question_id: { $in: questionIds } },
					],
				},
			},
			{
				// Populate surveyee_id
				$lookup: {
					from: 'surveyees',
					localField: 'surveyee_id',
					foreignField: '_id',
					as: 'surveyee',
				},
			},
			{
				$group: {
					_id: { surveyee_id: '$surveyee_id' }, // Group By field
					surveyee_response: {
						$push: '$$ROOT',
					},
					count: { $sum: 1 },
				},
			},
		]);

		res.status(200).json(surveyee);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error });
	}
};

function uniqueID() {
	let dt = new Date().getTime();
	let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
		/[xy]/g,
		function (c) {
			let r = (dt + Math.random() * 16) % 16 | 0;
			dt = Math.floor(dt / 16);
			return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
		}
	);
	return uuid;
}
