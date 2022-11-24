import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const questionSchema = Schema(
	{
		type: {
			type: String,
			default: 'Question',
		},
		name: {
			type: String,
			required: [true, 'Name is required'],
		},
		description: {
			type: String,
			required: false,
		},
		active: {
			type: Boolean,
			default: false,
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

export default mongoose.model('questions', questionSchema);
