import axios from 'axios';
import toast from 'react-hot-toast';
import {
	ADMIN_LOADING,
	CREATE_ADMIN,
	GET_ADMIN,
	GET_ADMINS,
	UPDATE_ADMIN,
	DELETE_ADMIN,
} from '../../constants/types';
import { returnErrors, clearErrors } from './error-actions';

const ADMIN_SERVER = 'https://apis.thebigdataafrica.com/api/v1/auth';

// Setup config headers and token
export const tokenConfig = () => {
	// Get token from localStorage
	const token = localStorage.getItem('userToken');

	// Headers
	const config = {
		headers: {
			'content-Type': 'application/json',
		},
	};

	// if token, add to headers
	if (token) {
		config.headers['Authorization'] = `Bearer ${token}`;
	}

	return config;
};

export const createAdmin = (payload) => async (dispatch) => {
	const token = tokenConfig();
	const { name, email, phone, gender, password } = payload;

	try {
		await dispatch({ type: ADMIN_LOADING });
		// Request body
		const body = JSON.stringify({
			name,
			email,
			phone,
			gender,
			role_id: '638321424a197589eeedf7f7', // admin role_id (Not super admin)
			password,
			password_confirmation: password,
		});

		const response = await axios.post(
			`${ADMIN_SERVER}/admin/signup`,
			body,
			token
		);
		const data = await response.data;

		await dispatch({
			type: CREATE_ADMIN,
			payload: data,
		});

		await dispatch(clearErrors());

		toast.success(`Success! create admin success.`);
	} catch (error) {
		console.log(error.response.data);
		toast.error('Error! create admin failed.');
		dispatch(
			returnErrors(error.response.data, error.response.status, 'CREATE_ADMIN')
		);
	}
};

export const updateAdmin = (payload) => async (dispatch) => {
	const token = tokenConfig();
	const { _id, name, email, phone, gender } = payload;

	try {
		await dispatch({ type: ADMIN_LOADING });
		// Request body
		const body = JSON.stringify({
			_id,
			name,
			email,
			phone,
			gender,
		});

		const response = await axios.put(
			`${ADMIN_SERVER}/admin/update-user-info`,
			body,
			token
		);
		const data = await response.data;

		await dispatch({
			type: UPDATE_ADMIN,
			payload: data,
		});

		await dispatch(clearErrors());

		toast.success(`Success! update admin success.`);
	} catch (error) {
		console.log(error);
		toast.error('Error! update admin failed.');
		dispatch(
			returnErrors(error.response.data, error.response.status, 'UPDATE_ADMIN')
		);
	}
};

export const deleteAdmin = (payload) => async (dispatch) => {
	const token = tokenConfig();
	const { _id } = payload;

	try {
		await dispatch({ type: ADMIN_LOADING });

		const body = JSON.stringify({
			deleteUserId: _id,
		});

		const response = await axios.delete(
			`${ADMIN_SERVER}/admin/delete-user`,
			body,
			token
		);

		const data = await response.data;

		await dispatch({
			type: DELETE_ADMIN,
			payload: data,
		});

		await dispatch(clearErrors());

		toast.success(`Success! delete admin success.`);
	} catch (error) {
		console.log(error.response);
		toast.error('Error! delete admin failed.');
		dispatch(
			returnErrors(error.response.data, error.response.status, 'DELETE_ADMIN')
		);
	}
};

export const getAdmins = () => async (dispatch) => {
	const token = tokenConfig();
	let roleId = '638321424a197589eeedf7f7'; // admin roleId (Not super admin)

	try {
		await dispatch({ type: ADMIN_LOADING });
		const response = await axios.get(
			`${ADMIN_SERVER}/users-by-role/${roleId}`,
			token
		);
		const data = await response.data?.users;

		await dispatch({
			type: GET_ADMINS,
			payload: data,
		});

		await dispatch(clearErrors());
	} catch (error) {
		console.log(error.response);
		toast.error('Error! get admins failed.');
		dispatch(
			returnErrors(error.response.data, error.response.status, 'GET_ADMINS')
		);
	}
};
