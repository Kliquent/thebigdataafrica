import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const optionSchema = Schema(
	{
		type: {
			type: String,
			default: 'Text Field',
		},
		name: {
			type: String,
			required: [true, 'Name is required'],
		},
		description: {
			type: String,
			required: false,
		},
		question_id: {
			type: Schema.Types.ObjectId,
			ref: 'questions',
			required: [true, 'Question id is required'],
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

export default mongoose.model('options', optionSchema);
