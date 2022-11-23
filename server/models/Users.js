import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = Schema(
	{
		name: {
			type: String,
			required: [true, 'Name is required'],
		},
		email: {
			type: String,
			trim: true,
			unique: 1,
			required: [true, 'Email address is required'],
		},
		phone: {
			type: Number,
			required: [true, 'Phone number is required'],
			default: 0,
		},
		countryCode: {
			type: Number,
			default: 254,
		},
		image: {
			data: String,
			default: '',
		},
		password: {
			type: String,
			minlength: 8,
			required: [true, 'Password is required'],
		},
		gender: {
			type: String,
			required: [true, 'Gender is required'],
		},
		isAdmin: {
			type: Boolean,
			default: false,
			required: [true, 'Admin boolean is required'],
		},
		isUserActive: {
			type: Boolean,
			default: false,
		},
		isEmailVerified: {
			type: Boolean,
			default: false,
		},
		isPhoneVerified: {
			type: Boolean,
			default: false,
		},
		isProfileCompleted: {
			type: Boolean,
			default: false,
		},
		resetLink: {
			data: String,
			default: '',
		},
		exponentPushToken: {
			data: String,
			default: '',
		},
		role_id: {
			type: Schema.Types.ObjectId,
			ref: 'roles',
			required: [true, 'Role id is required'],
		},
	},
	{ timestamps: true }
);

export default mongoose.model('users', userSchema);
