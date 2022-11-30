import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const answerSchema = Schema(
	{
		type: {
			type: String,
			default: 'Answer',
		},
		survey_question_id: {
			type: String,
			default: '',
		},
		question_id: {
			type: Schema.Types.ObjectId,
			ref: 'questions',
			required: false,
		},
		option_id: {
			type: Schema.Types.ObjectId,
			ref: 'options',
			required: false,
		},
		answerText: {
			type: String,
			required: false,
		},
		location: {
			type: Array,
			default: [],
		},
		surveyee: {
			type: Array,
			default: [],
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

export default mongoose.model('answers', answerSchema);
