import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const answerEventSchema = Schema(
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
		answer_id: {
			type: Schema.Types.ObjectId,
			ref: 'answers',
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

export default mongoose.model('answer-events', answerEventSchema);
