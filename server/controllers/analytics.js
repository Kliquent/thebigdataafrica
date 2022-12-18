import mongoose from 'mongoose';
import Users from '../models/Users.js';
import Researchers from '../models/Researcher.js';
import Surveys from '../models/Survey.js';
import Questions from '../models/Questions.js';
import SurveyQuestion from '../models/SurveyQuestion.js';
import Options from '../models/Options.js';
import Answers from '../models/Answers.js';

import SurveyEvent from '../models/SurveyEvent.js';
import QuestionEvent from '../models/QuestionEvent.js';
import OptionEvent from '../models/OptionEvent.js';
import AnswerEvent from '../models/AnswerEvent.js';

export const Analytics = async (req, res) => {
	try {
		// Users
		const clients = await Users.find({
			role_id: mongoose.Types.ObjectId('638321904a197589eeedf7ff'),
		});
		const researchers = await Users.find({
			role_id: mongoose.Types.ObjectId('638321784a197589eeedf7fa'),
		});

		// Survey Stats
		const surveys = await Surveys.find();
		const questions = await Questions.find();
		const options = await Options.find();
		const answers = await Answers.find();

		// Events actions
		const surveyEvent = await SurveyEvent.find();
		const questionEvent = await QuestionEvent.find();
		const optionEvent = await OptionEvent.find();
		const answerEvent = await AnswerEvent.find();

		res.status(200).json({
			totalClients: clients.length,
			totalResearchers: researchers.length,
			totalSurveys: surveys.length,
			totalQuestions: questions.length,
			totalOptions: options.length,
			totalAnswers: answers.length,
			totalSurveyEvent: surveyEvent.length,
			totalQuestionEvent: questionEvent.length,
			totalOptionEvent: optionEvent.length,
			totalAnswerEvent: answerEvent.length,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error });
	}
};

// Client Analytics
export const clientAnalytics = async (req, res) => {
	let clientId = req.params.clientId;

	try {
		const surveys = await Surveys.find({ owner: clientId });
		const surveyIds = surveys.map((survey) => {
			return survey._id;
		});

		// Find researchers based on surveyIds from client surveys
		const researchers = await Researchers.find({
			survey_id: { $in: surveyIds },
		});

		// Find distinct locations from researchers
		const locations = await Researchers.find({
			survey_id: { $in: surveyIds },
		}).distinct('location');

		// Find all questions based on surveyIds from client surveys
		const questions = await SurveyQuestion.find({
			survey_id: { $in: surveyIds },
		});
		const questionIds = questions.map((question) => {
			return question.question_id;
		});

		// Find all options based on questionIds from client surveys
		const options = await Options.find({ question_id: { $in: questionIds } });

		// Find all answers based on questionIds from client surveys
		const answers = await Answers.find({ question_id: { $in: questionIds } });
		const answerIds = answers.map((answer) => {
			return answer._id;
		});

		const surveyee = await Answers.find({
			$and: [
				{ surveyee_id: { $exists: true } },
				{ question_id: { $in: questionIds } },
			],
		});

		const answerEvent = await AnswerEvent.find({
			answer_id: { $in: answerIds },
		});

		res.status(200).json({
			totalResearchers: researchers.length,
			totalSurveyee: surveyee.length,
			totalSurveys: surveys.length,
			totalQuestions: questions.length,
			totalOptions: options.length,
			totalAnswers: answers.length,
			totalAnswerEvents: answerEvent.length,
			totalLocations: locations.length,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error });
	}
};

export const clientResponseAnalyticsByQuestion = async (req, res) => {
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
		console.log(clientId);

		const answers = await Answers.aggregate([
			{
				$match: {
					question_id: { $in: questionIds },
				},
			},
			{
				// Populate question_id
				$lookup: {
					from: 'questions',
					localField: 'question_id',
					foreignField: '_id',
					as: 'question_id',
				},
			},
			{
				// Populate option_id
				$lookup: {
					from: 'options',
					localField: 'option_id',
					foreignField: '_id',
					as: 'option_id',
				},
			},
			{
				$group: {
					_id: { question_id: '$question_id', option_id: '$option_id' }, // Group By field
					count: { $sum: 1 },
				},
			},
			{
				$group: {
					_id: '$_id.question_id', // Group By field
					options: {
						$push: {
							option_id: '$_id.option_id',
							count: '$count',
						},
					},
					totalQuestionOptions: { $sum: 1 },
				},
			},
		]);

		res.status(200).json(answers);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error });
	}
};

// To be rendered on charts
export const responseAnalyticsByQuestion = async (req, res) => {
	try {
		const answers = await Answers.aggregate([
			{
				// Populate question_id
				$lookup: {
					from: 'questions',
					localField: 'question_id',
					foreignField: '_id',
					as: 'question_id',
				},
			},
			{
				// Populate option_id
				$lookup: {
					from: 'options',
					localField: 'option_id',
					foreignField: '_id',
					as: 'option_id',
				},
			},
			{
				$group: {
					_id: { question_id: '$question_id', option_id: '$option_id' }, // Group By field
					count: { $sum: 1 },
				},
			},
			{
				$group: {
					_id: '$_id.question_id', // Group By field
					options: {
						$push: {
							option_id: '$_id.option_id',
							count: '$count',
						},
					},
					totalQuestionOptions: { $sum: 1 },
				},
			},
		]);

		res.status(200).json(answers);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error });
	}
};
