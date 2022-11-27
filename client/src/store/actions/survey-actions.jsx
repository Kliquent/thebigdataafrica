import axios from 'axios';
import toast from 'react-hot-toast';
import {
	SURVEY_LOADING,
	CREATE_SURVEY,
	GET_SURVEY,
	GET_SURVEYS,
	UPDATE_SURVEY,
	DELETE_SURVEY,
} from '../../constants/types';
import { returnErrors, clearErrors } from './error-actions';

const SURVEY_SERVER = 'https://apis.thebigdataafrica.com/api/v1/surveys';

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

export const createSurvey = (payload) => async (dispatch) => {
	const token = tokenConfig();
	const { title, description, researcher_id, client_id } = payload;

	try {
		await dispatch({ type: SURVEY_LOADING });
		// Request body
		const body = JSON.stringify({
			title,
			description,
			researcher_id,
			client_id,
		});

		const response = await axios.post(`${SURVEY_SERVER}/create`, body, token);
		const data = await response.data;

		await dispatch({
			type: CREATE_SURVEY,
			payload: data,
		});

		await dispatch(clearErrors());

		toast.success(`Success! create survey success.`);
	} catch (error) {
		console.log(error.response);
		toast.error('Error! create survey failed.');
		dispatch(
			returnErrors(error.response.data, error.response.status, 'CREATE_SURVEY')
		);
	}
};

export const updateSurvey = (payload) => async (dispatch) => {
	const token = tokenConfig();
	const { _id, title, description, researcher_id, client_id } = payload;

	try {
		await dispatch({ type: SURVEY_LOADING });
		// Request body
		const body = JSON.stringify({
			title,
			description,
			researcher_id,
			client_id,
		});

		const response = await axios.put(`${SURVEY_SERVER}/${_id}`, body, token);
		const data = await response.data;

		await dispatch({
			type: UPDATE_SURVEY,
			payload: data,
		});

		await dispatch(clearErrors());

		toast.success(`Success! update survey success.`);
	} catch (error) {
		console.log(error.response);
		toast.error('Error! update survey failed.');
		dispatch(
			returnErrors(error.response.data, error.response.status, 'UPDATE_SURVEY')
		);
	}
};

export const deleteSurvey = (payload) => async (dispatch) => {
	const token = tokenConfig();
	const { _id } = payload;

	try {
		await dispatch({ type: SURVEY_LOADING });

		const response = await axios.delete(`${SURVEY_SERVER}/${_id}`, token);
		const data = await response.data;

		await dispatch({
			type: DELETE_SURVEY,
			payload: data,
		});

		await dispatch(clearErrors());

		toast.success(`Success! delete survey success.`);
	} catch (error) {
		console.log(error.response);
		toast.error('Error! delete survey failed.');
		dispatch(
			returnErrors(error.response.data, error.response.status, 'DELETE_SURVEY')
		);
	}
};

export const getSurveys = () => async (dispatch) => {
	const token = tokenConfig();

	try {
		await dispatch({ type: SURVEY_LOADING });
		const response = await axios.get(`${SURVEY_SERVER}`, token);
		const data = await response.data;

		await dispatch({
			type: GET_SURVEYS,
			payload: data,
		});

		await dispatch(clearErrors());
	} catch (error) {
		console.log(error.response);
		toast.error('Error! get surveys failed.');
		dispatch(
			returnErrors(error.response.data, error.response.status, 'GET_SURVEYS')
		);
	}
};

export const getSurvey = (surveyId) => async (dispatch) => {
	const token = tokenConfig();

	try {
		await dispatch({ type: SURVEY_LOADING });
		const response = await axios.get(`${SURVEY_SERVER}/${surveyId}`, token);
		const data = await response.data;

		await dispatch({
			type: GET_SURVEY,
			payload: data,
		});

		await dispatch(clearErrors());
	} catch (error) {
		console.log(error.response);
		toast.error('Error! get survey failed.');
		dispatch(
			returnErrors(error.response.data, error.response.status, 'GET_SURVEY')
		);
	}
};
