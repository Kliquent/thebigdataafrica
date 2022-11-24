import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const questionEventSchema = Schema(
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

export default mongoose.model('question-events', questionEventSchema);
