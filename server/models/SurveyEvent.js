import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const surveyEventSchema = Schema(
	{
		event: {
			type: String,
			required: [true, 'Event is required'],
		},
		content: {
			type: Array,
			default: [],
		},
		description: {
			type: String,
			required: false,
		},
		survey_id: {
			type: Schema.Types.ObjectId,
			ref: 'surveys',
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

export default mongoose.model('survey-events', surveyEventSchema);
