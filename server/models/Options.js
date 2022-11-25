import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const optionSchema = Schema(
	{
		select_type: {
			type: String,
			default: 'Single Select', // Multi Select, Input Text
			required: [true, 'Select type is required'],
		},
		type: {
			type: String,
			default: 'Text Field', // Dropdown Select, Radio, Checkbox, Range
			required: [true, 'Type is required'],
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
