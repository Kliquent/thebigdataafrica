import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const rolePermissionSchema = Schema(
	{
		role_id: {
			type: Schema.Types.ObjectId,
			ref: 'roles',
			required: [true, 'Role id is required'],
		},
		permission_id: {
			type: Schema.Types.ObjectId,
			ref: 'permissions',
			required: [true, 'Permission id is required'],
		},
	},
	{ timestamps: true }
);

export default mongoose.model('rolePermission', rolePermissionSchema);
