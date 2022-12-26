import axios from 'axios';
import toast from 'react-hot-toast';
import {
	RESEARCHER_LOADING,
	CREATE_RESEARCHER,
	GET_RESEARCHER,
	GET_RESEARCHERS,
	GET_CLIENT_RESEARCHERS,
	GET_RESEARCHER_SURVEYEE_LOCATION,
	UPDATE_RESEARCHER,
	DELETE_RESEARCHER,
} from '../../constants/types';
import { returnErrors, clearErrors } from './error-actions';

const RESEARCHER_SERVER = 'https://apis.thebigdataafrica.com/api/v1/auth';

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

export const createResearcher = (payload) => async (dispatch) => {
	const token = tokenConfig();
	const { name, email, phone, gender, password } = payload;

	try {
		await dispatch({ type: RESEARCHER_LOADING });
		// Request body
		const body = JSON.stringify({
			name,
			email,
			phone,
			gender,
			role_id: '638321784a197589eeedf7fa', // client role_id from DB
			password,
			password_confirmation: password,
		});

		const response = await axios.post(
			`${RESEARCHER_SERVER}/user/signup`,
			body,
			token
		);
		const data = await response.data;

		await dispatch({
			type: CREATE_RESEARCHER,
			payload: data,
		});

		await dispatch(clearErrors());

		toast.success(`Success! create researcher success.`);
	} catch (error) {
		console.log(error.response.data);
		toast.error('Error! create researcher failed.');
		dispatch(
			returnErrors(
				error.response.data,
				error.response.status,
				'CREATE_RESEARCHER'
			)
		);
	}
};

export const updateResearcher = (payload) => async (dispatch) => {
	const token = tokenConfig();
	const { _id, name, email, phone, gender, password } = payload;

	try {
		await dispatch({ type: RESEARCHER_LOADING });
		// Request body
		const body = JSON.stringify({
			_id,
			name,
			email,
			phone,
			gender,
			password,
		});

		const response = await axios.put(
			`${RESEARCHER_SERVER}/admin/update-user-info`,
			body,
			token
		);
		const data = await response.data;

		await dispatch({
			type: UPDATE_RESEARCHER,
			payload: data,
		});

		await dispatch(clearErrors());

		toast.success(`Success! update researcher success.`);
	} catch (error) {
		console.log(error.response);
		toast.error('Error! update researcher failed.');
		dispatch(
			returnErrors(
				error.response.data,
				error.response.status,
				'UPDATE_RESEARCHER'
			)
		);
	}
};

// Change researcher password

export const deleteResearcher = (payload) => async (dispatch) => {
	const token = tokenConfig();
	const { _id } = payload;

	try {
		await dispatch({ type: RESEARCHER_LOADING });

		const body = JSON.stringify({
			deleteUserId: _id,
		});

		const response = await axios.delete(
			`${RESEARCHER_SERVER}/admin/delete-user`,
			body,
			token
		);

		const data = await response.data;

		await dispatch({
			type: DELETE_RESEARCHER,
			payload: data,
		});

		await dispatch(clearErrors());

		toast.success(`Success! delete researcher success.`);
	} catch (error) {
		console.log(error.response);
		toast.error('Error! delete client failed.');
		dispatch(
			returnErrors(error.response.data, error.response.status, 'DELETE_CLIENT')
		);
	}
};

export const getResearchers = () => async (dispatch) => {
	const token = tokenConfig();
	let roleId = '638321784a197589eeedf7fa'; // researcher roleId

	try {
		await dispatch({ type: RESEARCHER_LOADING });
		const response = await axios.get(
			`${RESEARCHER_SERVER}/users-by-role/${roleId}`,
			token
		);
		const data = await response.data?.users;

		await dispatch({
			type: GET_RESEARCHERS,
			payload: data,
		});

		await dispatch(clearErrors());
	} catch (error) {
		console.log(error);
		toast.error('Error! get researchers failed.');
		dispatch(
			returnErrors(
				error.response.data,
				error.response.status,
				'GET_RESEARCHERS'
			)
		);
	}
};

export const getResearcher = (payload) => async (dispatch) => {
	const token = tokenConfig();
	const { _id } = payload;

	try {
		await dispatch({ type: RESEARCHER_LOADING });

		const body = JSON.stringify({
			_id,
		});

		const response = await axios.get(
			`${RESEARCHER_SERVER}/admin/get-user`,
			body,
			token
		);
		const data = await response.data;

		await dispatch({
			type: GET_RESEARCHER,
			payload: data,
		});

		await dispatch(clearErrors());
	} catch (error) {
		console.log(error.response);
		toast.error('Error! get researcher failed.');
		dispatch(
			returnErrors(error.response.data, error.response.status, 'GET_RESEARCHER')
		);
	}
};

export const getClientResearchers = (clientId) => async (dispatch) => {
	const token = tokenConfig();

	try {
		await dispatch({ type: RESEARCHER_LOADING });

		const response = await axios.get(
			`${RESEARCHER_SERVER}/get-client-survey-researchers/?clientId=${clientId}`,
			token
		);
		const data = await response.data;

		await dispatch({
			type: GET_CLIENT_RESEARCHERS,
			payload: data,
		});

		await dispatch(clearErrors());
	} catch (error) {
		console.log(error.response);
		toast.error('Error! get client researchers failed.');
		dispatch(
			returnErrors(
				error.response.data,
				error.response.status,
				'GET_CLIENT_RESEARCHER'
			)
		);
	}
};

export const getResearcherSurveyeeLocation = (clientId) => async (dispatch) => {
	const token = tokenConfig();

	try {
		await dispatch({ type: RESEARCHER_LOADING });

		const response = await axios.get(
			`https://apis.thebigdataafrica.com/api/v1/surveyee/get-researcher-surveyee-location/?clientId=${clientId}`,
			token
		);
		const data = await response.data;

		await dispatch({
			type: GET_RESEARCHER_SURVEYEE_LOCATION,
			payload: data,
		});

		await dispatch(clearErrors());
	} catch (error) {
		console.log(error.response);
		toast.error('Error! get researcher surveyee location failed.');
		dispatch(
			returnErrors(
				error.response.data,
				error.response.status,
				'GET_RESEARCHER_SURVEYEE_LOCATION'
			)
		);
	}
};
