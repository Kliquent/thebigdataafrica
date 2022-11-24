import Surveys from '../models/Survey.js';
import SurveyEvent from '../models/SurveyEvent.js';

// Create survey controller & capture events
export const createSurvey = async (req, res) => {
	let userId = req.userId;
	const { title, description } = req.body;

	try {
		// Simple validation
		if (!title || !description)
			return res.status(400).json({ message: 'Please enter all fields!' });

		// Create new survey
		const newSurvey = await Surveys.create({
			title,
			description,
			active: true,
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
