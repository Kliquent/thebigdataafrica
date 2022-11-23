import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const roleSchema = Schema(
	{
		title: {
			type: String,
			required: [true, 'Title is required'],
		},
		slug: {
			type: String,
			unique: 1,
			required: [true, 'Slug is required'],
		},
		description: {
			type: String,
			required: false,
		},
		active: {
			type: Boolean,
			default: false,
		},
		createdBy: {
			type: Schema.Types.ObjectId,
			ref: 'users',
			required: false,
		},
		updatedBy: {
			type: Schema.Types.ObjectId,
			ref: 'users',
			required: false,
		},
	},
	{ timestamps: true }
);

export default mongoose.model('roles', roleSchema);
