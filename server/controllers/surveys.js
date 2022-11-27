import Surveys from '../models/Survey.js';
import SurveyEvent from '../models/SurveyEvent.js';

// Create survey controller & capture events
export const createSurvey = async (req, res) => {
	let userId = req.userId;
	const { title, description, researcher_id, client_id } = req.body;

	try {
		// Simple validation
		if (!title || !description)
			return res.status(400).json({ message: 'Please enter all fields!' });

		// Create new survey
		const newSurvey = await Surveys.create({
			title,
			description,
			active: true,
			researcher: researcher_id,
			owner: client_id ? client_id : userId, // can be admin/client based on role
			created_by: userId,
			updated_by: userId,
		});

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

	const { title, description, client_id } = req.body;

	try {
		// Simple validation
		if (!title || !description)
			return res.status(400).json({ message: 'Please enter all fields!' });

		const currentSurvey = await Surveys.findOne({ _id: surveyId });

		if (!currentSurvey)
			return res.status(403).json({ message: 'No survey found.' });

		const updatedSurveyInfo = {
			title,
			description,
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
				.populate('researcher', 'name email phone gender')
				.populate('created_by', 'name email phone gender')
				.populate('updated_by', 'name email phone gender');

			res.status(200).json({ surveys, totalSearchSurveys: surveys.length });
		} else {
			const surveys = await Surveys.find()
				.sort([[orderBy, order]])
				.skip(skipIndex)
				.limit(limit)
				.populate('owner', 'name email phone gender')
				.populate('researcher', 'name email phone gender')
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

		const survey = await Surveys.find({
			_id: surveyId,
		})
			.populate('owner', 'name email phone gender')
			.populate('researcher', 'name email phone gender')
			.populate('created_by', 'name email phone gender')
			.populate('updated_by', 'name email phone gender');

		res.status(200).json(survey);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error });
	}
};
