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