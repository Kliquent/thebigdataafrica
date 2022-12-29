import Users from '../models/Users.js';
import Surveys from '../models/Survey.js';
import Researcher from '../models/Researcher.js';
import SurveyQuestion from '../models/SurveyQuestion.js';
import Questions from '../models/Questions.js';
import SurveyEvent from '../models/SurveyEvent.js';

// Create survey controller & capture events
export const createSurvey = async (req, res) => {
	let userId = req.userId;
	const { title, description, researcher_id, client_id, location } = req.body;

	try {
		// Simple validation
		if (!title)
			return res.status(400).json({ message: 'Please enter title field!' });

		// Create new survey
		const newSurvey = await Surveys.create({
			title,
			description,
			active: true,
			owner: client_id ? client_id : userId, // can be admin/client based on role
			created_by: userId,
			updated_by: userId,
		});

		// Add researcher to survey
		if (researcher_id) {
			await Researcher.create({
				survey_id: newSurvey._id,
				researcher_id: researcher_id,
				location,
				created_by: userId,
				updated_by: userId,
			});
		}

		// Log event
		await SurveyEvent.create({
			event: 'CREATE',
			content: newSurvey,
			description: 'This survey has been created by the administrator',
			survey_id: newSurvey._id,
			created_by: userId,
			updated_by: userId,
		});

		res.status(200).json({ message: 'Survey created successfully!' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error });
	}
};

// Update survey controller & capture events
export const updateSurvey = async (req, res) => {
	let userId = req.userId;
	let surveyId = req.params.surveyId;

	const { title, description, researcher_id, client_id, location } = req.body;

	try {
		const currentSurvey = await Surveys.findOne({ _id: surveyId });

		if (!currentSurvey)
			return res.status(403).json({ message: 'No survey found.' });

		const updatedSurveyInfo = {
			title: title || currentSurvey.title,
			description: description || currentSurvey.description,
			owner: client_id || currentSurvey.owner,
			updated_by: userId,
		};

		// Update existing survey
		const updatedSurvey = await Surveys.findByIdAndUpdate(
			{
				_id: surveyId,
			},
			{ $set: updatedSurveyInfo },
			{ new: true }
		);

		const existingResearcher = await Researcher.findOne({
			researcher_id: researcher_id,
		});

		if (researcher_id && !existingResearcher) {
			// Add researcher to survey if researcher doesn't exist
			await Researcher.create({
				survey_id: surveyId,
				researcher_id: researcher_id,
				location,
				created_by: userId,
				updated_by: userId,
			});
		}

		// Log event
		await SurveyEvent.create({
			event: 'UPDATE',
			content: updatedSurvey,
			description: 'This survey has been updated by the administrator',
			survey_id: surveyId,
			created_by: userId,
			updated_by: userId,
		});

		res.status(200).json({ message: 'Survey updated successfully!' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error });
	}
};

// Delete survey controller & capture events
export const deleteSurvey = async (req, res) => {
	let userId = req.userId;
	let surveyId = req.params.surveyId;

	try {
		const currentSurvey = await Surveys.findOne({ _id: surveyId });

		if (!currentSurvey)
			return res.status(403).json({ message: 'No survey found.' });

		// Prevent delete if the question is referenced
		const surveyQuestion = await SurveyQuestion.find({
			survey_id: surveyId,
		});

		if (surveyQuestion.length > 0) {
			return res.status(403).json({
				message: `Resource can't be deleted due attached resources.`,
			});
		}

		// Find all referenced researchers
		const researchersToDelete = await Researcher.find({ survey_id: surveyId });

		const researchers = researchersToDelete.map((user) => {
			return user.researcher_id;
		});

		// Delete referenced researchers
		await Researcher.deleteMany({ researcher_id: researchers });

		// Log event
		await SurveyEvent.create({
			event: 'DELETE',
			content: currentSurvey,
			description: 'This survey has been deleted by the administrator',
			survey_id: surveyId,
			created_by: userId,
			updated_by: userId,
		});

		await Surveys.findByIdAndDelete({ _id: surveyId });

		res.status(200).json({ message: 'Survey deleted successfully!' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error });
	}
};

export const getSurveyResearchers = async () => {
	let surveyId = req.params.surveyId;

	try {
		// Find researchers based on surveyIds from client surveys
		const researchers = await Researcher.find({
			survey_id: surveyId,
		}).populate('researcher_id');

		res.status(200).json({ researchers });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error });
	}
};

// Delete survey researcher
export const deleteSurveyResearcher = async (req, res) => {
	const { survey_id, researcher_id } = req.body;

	try {
		// Search researcherSchemaId using survey_id & researcher_id
		const currentResearcherSchemaId = await Researcher.findOne({
			$and: [{ survey_id }, { researcher_id }],
		});

		// Delete reference survey to researcher
		await Researcher.findByIdAndDelete({
			_id: currentResearcherSchemaId._id,
		});

		res
			.status(200)
			.json({ message: 'Survey researcher deleted successfully!' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error });
	}
};

export const getSurveysByResearcherToken = async (req, res) => {
	let userId = req.userId;

	try {
		const currentUser = await Users.findById(userId);

		// Admin can view all surveys when login in the app
		if (currentUser.isAdmin) {
			const surveys = await Surveys.find().limit(100);

			res.status(200).json(surveys);
		} else {
			const existingResearcher = await Users.findOne({ _id: userId });

			// Check existing researcher
			if (!existingResearcher)
				return res.status(404).json({ message: "User doesn't exist!" });

			const surveysByResearcher = await Researcher.find({
				researcher_id: userId,
			}).populate('survey_id');

			const surveys = surveysByResearcher.map((survey) => {
				return survey.survey_id;
			});

			res.status(200).json(surveys);
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error });
	}
};

export const getSurveysByResearcher = async (req, res) => {
	const userId = req.userId;
	let researcherId = req.params.researcherId;

	try {
		const currentUser = await Users.findById(userId);

		// Admin can view all surveys when login in the app
		if (currentUser.isAdmin) {
			const surveys = await Surveys.find().limit(100);

			res.status(200).json(surveys);
		} else {
			const existingResearcher = await Users.findOne({ _id: researcherId });

			// Check existing researcher
			if (!existingResearcher)
				return res.status(404).json({ message: "User doesn't exist!" });

			const surveysByResearcher = await Researcher.find({
				researcher_id: researcherId,
			}).populate('survey_id');

			const surveys = surveysByResearcher.map((survey) => {
				return survey.survey_id;
			});

			res.status(200).json(surveys);
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error });
	}
};

export const getQuestionsBySurvey = async (req, res) => {
	// let userId = req.userId;
	let surveyId = req.params.surveyId;

	try {
		// Check referenced survey
		const surveyQuestion = await SurveyQuestion.find({
			survey_id: surveyId,
		});

		let surveyQuestionIds = surveyQuestion.map((item) => {
			return item.question_id;
		});

		let questions = await Questions.aggregate([
			{ $match: { _id: { $in: surveyQuestionIds } } },
		]);

		res.status(200).json(questions);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error });
	}
};

export const getSurveys = async (req, res) => {
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
			const surveys = await Surveys.find({
				$text: { $search: `"${searchTerm}"` },
			})
				.populate('owner', 'name email phone gender')
				.populate('created_by', 'name email phone gender')
				.populate('updated_by', 'name email phone gender');

			res.status(200).json({ surveys, totalSearchSurveys: surveys.length });
		} else {
			const surveys = await Surveys.find()
				.sort([[orderBy, order]])
				.skip(skipIndex)
				.limit(limit)
				.populate('owner', 'name email phone gender')
				.populate('created_by', 'name email phone gender')
				.populate('updated_by', 'name email phone gender');

			res.status(200).json(surveys);
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error });
	}
};

export const getSurvey = async (req, res) => {
	let surveyId = req.params.surveyId;

	try {
		const currentSurvey = await Surveys.findOne({ _id: surveyId });

		if (!currentSurvey)
			return res.status(403).json({ message: 'No survey found.' });

		const survey = await Surveys.findOne({
			_id: surveyId,
		})
			.populate('owner', 'name email phone gender')
			.populate('created_by', 'name email phone gender')
			.populate('updated_by', 'name email phone gender');

		res.status(200).json(survey);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error });
	}
};

// Get survey by survey question to allow effective referencing
export const getSurveyBySurveyQuestion = async (req, res) => {
	let surveyId = req.params.surveyId;

	try {
		const currentSurvey = await Surveys.findOne({ _id: surveyId });

		if (!currentSurvey)
			return res.status(403).json({ message: 'No survey found.' });

		// Search survey_question_id using survey_id.
		// Match survey_id & questionId on mobile app
		const currentSurveyQuestionId = await SurveyQuestion.find({
			survey_id: surveyId,
		});

		const survey = await Surveys.findOne({
			_id: surveyId,
		})
			.populate('owner', 'name email phone gender')
			.populate('researcher', 'name email phone gender')
			.populate('created_by', 'name email phone gender')
			.populate('updated_by', 'name email phone gender');

		res.status(200).json({ survey, currentSurveyQuestionId });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error });
	}
};

// Get client surveys
export const getClientSurveys = async (req, res) => {
	let clientId = req.params.clientId;

	// let searchTerm = req.query.searchTerm;
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
		const surveys = await Surveys.find({ owner: clientId })
			.sort([[orderBy, order]])
			.skip(skipIndex)
			.limit(limit);

		res.status(200).json(surveys);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error });
	}
};
