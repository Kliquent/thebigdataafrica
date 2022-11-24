import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const surveySchema = Schema(
	{
		type: {
			type: String,
			default: 'Survey',
		},
		title: {
			type: String,
			required: [true, 'Title is required'],
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

export default mongoose.model('surveys', surveySchema);
