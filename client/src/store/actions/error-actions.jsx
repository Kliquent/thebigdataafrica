import {
	GET_ERRORS,
	CLEAR_ERRORS,
	LOGIN_FAIL,
	USERS_ERROR,
	REGISTER_FAIL,
	AUTH_ERROR,
} from '../../constants/types';

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

// Register Fail
export const registerFail = () => {
	return {
		type: REGISTER_FAIL,
	};
};

// Auth Error
export const authError = () => {
	return {
		type: AUTH_ERROR,
	};
};

// Users Error
export const usersError = () => {
	return {
		type: USERS_ERROR,
	};
};
