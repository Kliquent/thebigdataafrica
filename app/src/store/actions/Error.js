import {
	GET_ERRORS,
	CLEAR_ERRORS,
	LOGIN_FAIL,
	AUTH_ERROR,
	SURVEY_ERROR,
} from './Types';

// RETURN ERRORS from server
export const returnErrors = (msg, status, id = null) => {
	return {
		type: GET_ERRORS,
		payload: {
			msg,
			status,
			id,
		},
	};
};

// CLEAR ERRORS
export const clearErrors = () => {
	return {
		type: CLEAR_ERRORS,
	};
};

// Login Fail
export const loginFail = () => {
	return {
		type: LOGIN_FAIL,
	};
};

// Auth Error
export const authError = () => {
	return {
		type: AUTH_ERROR,
	};
};

export const surveyError = () => {
	return {
		type: SURVEY_ERROR,
	};
};
