import axios from 'axios';
import Toast from 'react-native-toast-message';
import { save, getValueFor } from '../../utils/secureStore';
import {
	SURVEY_LOADING,
	GET_SURVEY,
	CURRENT_SURVEY_QUIZ,
	CLEAR_CURRENT_SURVEY,
	POST_SURVEYEE_RESPONSE,
	RESET_SURVEYEE_SUCCESS,
	RESET_SURVEYEE_RESPONSE_SUCCESS,
	POST_SURVEYEE,
} from './Types';
import { returnErrors, clearErrors, surveyError } from './Error';
import { NIKIAI_URL } from '../Config';

// Setup config headers and token
export const tokenConfig = async () => {
	// Get token from secureStore
	const token = await getValueFor('userToken');

	// Headers
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	// if token, add to headers
	if (token) {
		config.headers['Authorization'] = `Bearer ${token}`;
	}

	return config;
};

export const getSurveys = (researcherId) => async (dispatch) => {
	const token = await tokenConfig();

	try {
		const response = await axios.get(
			`${NIKIAI_URL}/surveys/get-surveys-by-researcher/${researcherId}`,
			token
		);
		const data = await response.data;

		await dispatch({
			type: SURVEY_LOADING,
		});

		await dispatch({
			type: GET_SURVEY,
			payload: data,
		});
		dispatch(clearErrors());
	} catch (error) {
		dispatch(
			returnErrors(error.response.data, error.response.status, 'SURVEY_ERROR')
		);
		dispatch(surveyError());
	}
};

export const getCurrentSurveyQuiz = (payloadId) => async (dispatch) => {
	const token = await tokenConfig();

	try {
		const response = await axios.get(
			`${NIKIAI_URL}/surveys/${payloadId}`,
			token
		);
		const data = await response.data;

		await dispatch({
			type: SURVEY_LOADING,
		});

		if (data) {
			await dispatch({
				type: CURRENT_SURVEY_QUIZ,
				payload: data,
			});
		} else {
			await dispatch({
				type: CLEAR_CURRENT_SURVEY,
				payload: data,
			});
		}
	} catch (error) {
		dispatch(
			returnErrors(error.response.data, error.response.status, 'SURVEY_ERROR')
		);
		dispatch(surveyError());
	}
};

export const postSurveyeeResponse = (payload) => async (dispatch) => {
	const token = await tokenConfig();
	const { surveyee_id, question_id, option_id, option_title } = payload;
	try {
		const body = JSON.stringify({
			surveyee_id,
			question_id,
			option_id,
			option_title,
		});

		const response = await axios.post(`${NIKIAI_URL}/responses`, body, token);

		const data = await response.data;
		console.log(data);
		await dispatch({
			type: SURVEY_LOADING,
		});

		await dispatch({
			type: POST_SURVEYEE_RESPONSE,
			payload: data,
		});
		dispatch(resetSurveyeeResponseSuccess());
		dispatch(clearErrors());
	} catch (error) {
		console.log(error.response.data);
		dispatch(
			returnErrors(
				error.response.data,
				error.response.status,
				'SURVEY_RESPONSE_ERROR'
			)
		);
		// Remove dispatch error to avoid clear survey redux state
		// dispatch(surveyError());
	}
};

export const postSurveyee = (payload) => async (dispatch) => {
	const token = await tokenConfig();
	const { first_name, last_name, phone, email } = payload;

	try {
		const body = JSON.stringify({
			first_name,
			last_name,
			email,
			phone,
			role: 'surveyee',
		});

		const response = await axios.post(`${NIKIAI_URL}/users`, body, token);
		const data = await response.data;

		await dispatch({
			type: SURVEY_LOADING,
		});

		await dispatch({
			type: POST_SURVEYEE,
			payload: data,
		});
		dispatch(resetSurveyeeSuccess());
		dispatch(clearErrors());
	} catch (error) {
		dispatch(
			returnErrors(
				error.response.data,
				error.response.status,
				'SURVEY_RESPONSE_ERROR'
			)
		);
		// Remove dispatch error to avoid clear survey redux state
		// dispatch(surveyError());
	}
};

export const resetSurveyeeSuccess = () => async (dispatch) => {
	await dispatch({
		type: RESET_SURVEYEE_SUCCESS,
	});
};

export const resetSurveyeeResponseSuccess = () => async (dispatch) => {
	await dispatch({
		type: RESET_SURVEYEE_RESPONSE_SUCCESS,
	});
};

export const clearCurrentSurvey = () => async (dispatch) => {
	await dispatch({
		type: CLEAR_CURRENT_SURVEY,
	});
};
