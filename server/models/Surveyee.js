import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const surveyeeSchema = Schema(
	{
		uniqueID: {
			type: String,
			required: [true, 'Unique is required'],
		},
		name: {
			type: String,
			required: [true, 'Name is required'],
		},
		email: {
			type: String,
			trim: true,
			unique: 1,
			required: false,
		},
		phone: {
			type: Number,
			required: false,
			default: 0,
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

export default mongoose.model('surveyee', surveyeeSchema);
