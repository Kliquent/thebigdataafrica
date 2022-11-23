import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const permissionSchema = Schema(
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
	},
	{ timestamps: true }
);

export default mongoose.model('permissions', permissionSchema);
