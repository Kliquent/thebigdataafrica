import mongoose from 'mongoose';
import Users from '../models/Users.js';
import Surveys from '../models/Survey.js';
import Questions from '../models/Questions.js';
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
