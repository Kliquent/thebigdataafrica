import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const surveyQuestionSchema = Schema(
	{
		survey_id: {
			type: Schema.Types.ObjectId,
			ref: 'surveys',
			required: false,
		},
		question_id: {
			type: Schema.Types.ObjectId,
			ref: 'questions',
			required: false,
		},
		created_by: {
			type: Schema.Types.ObjectId,
			ref: 'users',
			required: false,
		},
		updated_by: {
			type: Schema.Types.ObjectId,
			ref: 'users',
			required: false,
		},
	},
	{ timestamps: true }
);

export default mongoose.model('survey-question', surveyQuestionSchema);
