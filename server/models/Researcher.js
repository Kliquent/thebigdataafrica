import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const researcherSchema = Schema(
	{
		survey_id: {
			type: Schema.Types.ObjectId,
			ref: 'surveys',
			required: false,
		},
		researcher_id: {
			type: Schema.Types.ObjectId,
			ref: 'users',
			required: false,
		},
		location: {
			type: String,
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

export default mongoose.model('researcher', researcherSchema);
