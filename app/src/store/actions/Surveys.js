import axios from 'axios';
import Toast from 'react-native-toast-message';
import { save, getValueFor } from '../../utils/secureStore';
import {
	SURVEY_LOADING,
	GET_SURVEY,
	CURRENT_SURVEY,
	GET_QUESTIONS_BY_SURVEY,
	GET_OPTIONS_BY_QUESTION,
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
		await dispatch({
			type: SURVEY_LOADING,
		});

		const response = await axios.get(
			`${NIKIAI_URL}/surveys/get-surveys-by-researcher`,
			token
		);
		const data = await response.data;

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

// Get current survey
export const getCurrentSurvey = (surveyId) => async (dispatch) => {
	const token = await tokenConfig();

	try {
		await dispatch({
			type: SURVEY_LOADING,
		});

		const response = await axios.get(
			`${NIKIAI_URL}/surveys/${surveyId}`,
			token
		);
		const data = await response.data;
		// console.log(data);

		if (data) {
			await dispatch({
				type: CURRENT_SURVEY,
				payload: data,
			});
		} else {
			await dispatch({
				type: CLEAR_CURRENT_SURVEY,
				payload: data,
			});
		}
	} catch (error) {
		console.log(error.response);
		dispatch(
			returnErrors(error.response.data, error.response.status, 'SURVEY_ERROR')
		);
		dispatch(surveyError());
	}
};

// Get questions by Survey
export const getSurveyQuestions = (surveyId) => async (dispatch) => {
	const token = await tokenConfig();

	try {
		await dispatch({
			type: SURVEY_LOADING,
		});

		const response = await axios.get(
			`${NIKIAI_URL}/surveys/get-questions-by-survey/${surveyId}`,
			token
		);
		const data = await response.data;

		await dispatch({
			type: GET_QUESTIONS_BY_SURVEY,
			payload: data,
		});
	} catch (error) {
		dispatch(
			returnErrors(
				error.response.data,
				error.response.status,
				'GET_QUESTIONS_BY_SURVEY'
			)
		);
		dispatch(surveyError());
	}
};

// Get options by Question
export const getOptionsByQuestion = (questionId) => async (dispatch) => {
	const token = await tokenConfig();

	try {
		await dispatch({ type: SURVEY_LOADING });

		const response = await axios.get(
			`${NIKIAI_URL}/questions/get-options-by-question/${questionId}`,
			token
		);
		const data = await response.data;

		await dispatch({
			type: GET_OPTIONS_BY_QUESTION,
			payload: data,
		});

		await dispatch(clearErrors());
	} catch (error) {
		dispatch(
			returnErrors(
				error.response.data,
				error.response.status,
				'GET_OPTIONS_BY_QUESTION'
			)
		);
	}
};

// Post answer/choice from the surveyee
export const postSurveyeeResponse = (payload) => async (dispatch) => {
	const token = await tokenConfig();
	const {
		survey_question_id,
		question_id,
		option_id,
		answerText,
		surveyee_id,
	} = payload;

	try {
		await dispatch({
			type: SURVEY_LOADING,
		});

		const body = JSON.stringify({
			survey_question_id,
			question_id,
			option_id,
			answerText,
			surveyee_id,
		});

		const response = await axios.post(
			`${NIKIAI_URL}/answers/create`,
			body,
			token
		);

		const data = await response.data;
		// console.log(data);

		await dispatch({
			type: POST_SURVEYEE_RESPONSE,
			payload: data,
		});
		dispatch(resetSurveyeeResponseSuccess());
		dispatch(clearErrors());
	} catch (error) {
		dispatch(
			returnErrors(
				error.response.data,
				error.response.status,
				'SURVEY_RESPONSE_ERROR'
			)
		);
	}
};

// Save surveyee in redux state ( = Surveyee to be submitted with options = )
export const postSurveyee = (payload) => async (dispatch) => {
	const token = await tokenConfig();

	const { first_name, last_name, email, phone } = payload;

	try {
		await dispatch({
			type: SURVEY_LOADING,
		});

		const body = JSON.stringify({
			name: `${first_name} ${last_name}`,
			email,
			phone,
		});

		const response = await axios.post(
			`${NIKIAI_URL}/surveyee/create`,
			body,
			token
		);

		const data = await response.data;
		console.log(data);

		await dispatch({
			type: POST_SURVEYEE,
			payload: data?.surveyee,
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
