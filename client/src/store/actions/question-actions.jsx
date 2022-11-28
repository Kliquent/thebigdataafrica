import axios from 'axios';
import toast from 'react-hot-toast';
import {
	QUESTION_LOADING,
	CREATE_QUESTION,
	GET_QUESTION,
	GET_QUESTIONS,
	GET_OPTIONS_BY_QUESTION,
	UPDATE_QUESTION,
	DELETE_QUESTION,
} from '../../constants/types';
import { returnErrors, clearErrors } from './error-actions';

const QUESTION_SERVER = 'https://apis.thebigdataafrica.com/api/v1/questions';

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

export const createQuestion = (payload) => async (dispatch) => {
	const token = tokenConfig();
	const { name, description, survey_id } = payload;

	try {
		await dispatch({ type: QUESTION_LOADING });
		// Request body
		const body = JSON.stringify({
			name,
			description,
			survey_id,
		});

		const response = await axios.post(`${QUESTION_SERVER}/create`, body, token);
		const data = await response.data;

		await dispatch({
			type: CREATE_QUESTION,
			payload: data,
		});

		await dispatch(clearErrors());

		toast.success(`Success! create question success.`);
	} catch (error) {
		console.log(error.response);
		toast.error('Error! create question failed.');
		dispatch(
			returnErrors(
				error.response.data,
				error.response.status,
				'CREATE_QUESTION'
			)
		);
	}
};

export const updateQuestion = (payload) => async (dispatch) => {
	const token = tokenConfig();
	const { _id, name, description, survey_id } = payload;

	try {
		await dispatch({ type: QUESTION_LOADING });
		// Request body
		const body = JSON.stringify({
			_id,
			name,
			description,
			survey_id,
		});

		const response = await axios.put(`${QUESTION_SERVER}/${_id}`, body, token);
		const data = await response.data;

		await dispatch({
			type: UPDATE_QUESTION,
			payload: data,
		});

		await dispatch(clearErrors());

		toast.success(`Success! update question success.`);
	} catch (error) {
		console.log(error.response);
		toast.error('Error! update question failed.');
		dispatch(
			returnErrors(
				error.response.data,
				error.response.status,
				'UPDATE_QUESTION'
			)
		);
	}
};

export const deleteQuestion = (payload) => async (dispatch) => {
	const token = tokenConfig();
	const { _id } = payload;

	try {
		await dispatch({ type: QUESTION_LOADING });

		const response = await axios.delete(`${QUESTION_SERVER}/${_id}`, token);
		const data = await response.data;

		await dispatch({
			type: DELETE_QUESTION,
			payload: data,
		});

		await dispatch(clearErrors());

		toast.success(`Success! delete question success.`);
	} catch (error) {
		console.log(error.response);
		toast.error('Error! delete question failed.');
		dispatch(
			returnErrors(
				error.response.data,
				error.response.status,
				'DELETE_QUESTION'
			)
		);
	}
};

export const getOptionsByQuestion = (questionId) => async (dispatch) => {
	const token = tokenConfig();

	try {
		await dispatch({ type: SURVEY_LOADING });

		const response = await axios.get(
			`${QUESTION_SERVER}/get-options-by-question/${questionId}`,
			token
		);
		const data = await response.data;

		await dispatch({
			type: GET_OPTIONS_BY_QUESTION,
			payload: data,
		});

		await dispatch(clearErrors());
	} catch (error) {
		console.log(error.response);
		toast.error('Error! get options by question failed.');
		dispatch(
			returnErrors(
				error.response.data,
				error.response.status,
				'GET_OPTIONS_BY_QUESTION'
			)
		);
	}
};

export const getQuestions = () => async (dispatch) => {
	const token = tokenConfig();

	try {
		await dispatch({ type: QUESTION_LOADING });
		const response = await axios.get(`${QUESTION_SERVER}`, token);
		const data = await response.data;

		await dispatch({
			type: GET_QUESTIONS,
			payload: data,
		});

		await dispatch(clearErrors());
	} catch (error) {
		console.log(error.response);
		toast.error('Error! get questions failed.');
		dispatch(
			returnErrors(error.response.data, error.response.status, 'GET_QUESTIONS')
		);
	}
};

export const getQuestion = (questionId) => async (dispatch) => {
	const token = tokenConfig();

	try {
		await dispatch({ type: QUESTION_LOADING });
		const response = await axios.get(`${QUESTION_SERVER}/${questionId}`, token);
		const data = await response.data;

		await dispatch({
			type: GET_QUESTION,
			payload: data,
		});

		await dispatch(clearErrors());
	} catch (error) {
		console.log(error.response);
		toast.error('Error! get question failed.');
		dispatch(
			returnErrors(error.response.data, error.response.status, 'GET_QUESTION')
		);
	}
};
