import axios from 'axios';
import toast from 'react-hot-toast';
import {
	CLIENT_LOADING,
	CREATE_CLIENT,
	GET_CLIENT,
	GET_CLIENTS,
	GET_CLIENT_SURVEYEES,
	UPDATE_CLIENT,
	DELETE_CLIENT,
} from '../../constants/types';
import { returnErrors, clearErrors } from './error-actions';

const CLIENT_SERVER = 'https://apis.thebigdataafrica.com/api/v1/auth';

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

export const createClient = (payload) => async (dispatch) => {
	const token = tokenConfig();
	const { name, email, phone, gender, password } = payload;

	try {
		await dispatch({ type: CLIENT_LOADING });
		// Request body
		const body = JSON.stringify({
			name,
			email,
			phone,
			gender,
			role_id: '638321904a197589eeedf7ff', // client role_id from DB
			password,
			password_confirmation: password,
		});

		const response = await axios.post(
			`${CLIENT_SERVER}/user/signup`,
			body,
			token
		);
		const data = await response.data;

		await dispatch({
			type: CREATE_CLIENT,
			payload: data,
		});

		await dispatch(clearErrors());

		toast.success(`Success! create client success.`);
	} catch (error) {
		console.log(error.response.data);
		toast.error('Error! create client failed.');
		dispatch(
			returnErrors(error.response.data, error.response.status, 'CREATE_CLIENT')
		);
	}
};

export const updateClient = (payload) => async (dispatch) => {
	const token = tokenConfig();
	const { _id, name, email, phone, gender } = payload;

	try {
		await dispatch({ type: CLIENT_LOADING });
		// Request body
		const body = JSON.stringify({
			_id,
			name,
			email,
			phone,
			gender,
		});

		const response = await axios.put(
			`${CLIENT_SERVER}/admin/update-user-info`,
			body,
			token
		);
		const data = await response.data;

		await dispatch({
			type: UPDATE_CLIENT,
			payload: data,
		});

		await dispatch(clearErrors());

		toast.success(`Success! update client success.`);
	} catch (error) {
		console.log(error.response);
		toast.error('Error! update client failed.');
		dispatch(
			returnErrors(error.response.data, error.response.status, 'UPDATE_CLIENT')
		);
	}
};

// Change client password

export const deleteClient = (payload) => async (dispatch) => {
	const token = tokenConfig();
	const { _id } = payload;

	try {
		await dispatch({ type: CLIENT_LOADING });

		const body = JSON.stringify({
			deleteUserId: _id,
		});

		const response = await axios.delete(
			`${CLIENT_SERVER}/admin/delete-user`,
			body,
			token
		);

		const data = await response.data;

		await dispatch({
			type: DELETE_CLIENT,
			payload: data,
		});

		await dispatch(clearErrors());

		toast.success(`Success! delete client success.`);
	} catch (error) {
		console.log(error.response);
		toast.error('Error! delete client failed.');
		dispatch(
			returnErrors(error.response.data, error.response.status, 'DELETE_CLIENT')
		);
	}
};

export const getClients = () => async (dispatch) => {
	const token = tokenConfig();
	let roleId = '638321904a197589eeedf7ff'; // client roleId

	try {
		await dispatch({ type: CLIENT_LOADING });
		const response = await axios.get(
			`${CLIENT_SERVER}/users-by-role/${roleId}`,
			token
		);
		const data = await response.data?.users;

		await dispatch({
			type: GET_CLIENTS,
			payload: data,
		});

		await dispatch(clearErrors());
	} catch (error) {
		console.log(error.response);
		toast.error('Error! get clients failed.');
		dispatch(
			returnErrors(error.response.data, error.response.status, 'GET_CLIENTS')
		);
	}
};

export const getClient = (payload) => async (dispatch) => {
	const token = tokenConfig();
	const { _id } = payload;

	try {
		await dispatch({ type: CLIENT_LOADING });

		const body = JSON.stringify({
			_id,
		});

		const response = await axios.get(
			`${CLIENT_SERVER}/admin/get-user`,
			body,
			token
		);
		const data = await response.data;

		await dispatch({
			type: GET_CLIENT,
			payload: data,
		});

		await dispatch(clearErrors());
	} catch (error) {
		console.log(error.response);
		toast.error('Error! get client failed.');
		dispatch(
			returnErrors(error.response.data, error.response.status, 'GET_CLIENT')
		);
	}
};

export const getClientSurveyees = (clientId) => async (dispatch) => {
	const token = tokenConfig();

	try {
		await dispatch({ type: CLIENT_LOADING });

		const response = await axios.get(
			`https://apis.thebigdataafrica.com/api/v1/surveyee/get-client-surveyees?clientId=${clientId}`,
			token
		);
		const data = await response.data;

		await dispatch({
			type: GET_CLIENT_SURVEYEES,
			payload: data,
		});

		await dispatch(clearErrors());
	} catch (error) {
		console.log(error);
		toast.error('Error! get client surveyees failed.');
		dispatch(
			returnErrors(
				error.response.data,
				error.response.status,
				'GET_CLIENT_SURVEYEES'
			)
		);
	}
};
