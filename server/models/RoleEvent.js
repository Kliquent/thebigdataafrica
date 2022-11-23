import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const roleEventSchema = Schema(
	{
		event: {
			type: String,
			required: [true, 'Event is required'],
		},
		description: {
			type: String,
			required: false,
		},
		roleId: {
			type: Schema.Types.ObjectId,
			ref: 'roles',
			required: false,
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

export default mongoose.model('roleEvent', roleEventSchema);
