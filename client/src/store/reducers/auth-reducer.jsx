import {
	AUTH_USER,
	GET_USERS,
	USER_LOADING,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT_SUCCESS,
	REGISTER_SUCCESS,
	CREATE_USER,
	RESET_PASSWORD_SUCCESS,
	RESET_FAIL,
	REGISTER_FAIL,
} from '../../constants/types';

const initialState = {
	isAuthenticated: !!localStorage.getItem('userToken'),
	isResetPassword: false,
	isLoading: false,
	user: null,
	users: null,
};

export default function AuthReducer(state = initialState, action) {
	switch (action.type) {
		case USER_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case AUTH_USER:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				user: action.payload,
			};
		case GET_USERS:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				users: action.payload,
			};
		case CREATE_USER:
		case LOGIN_SUCCESS:
		case REGISTER_SUCCESS:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				user: action.payload,
			};
		case RESET_PASSWORD_SUCCESS:
			return {
				...state,
				...action.payload,
				isResetPassword: true,
				isAuthenticated: false,
				isLoading: false,
			};
		case AUTH_ERROR:
		case LOGIN_FAIL:
		case LOGOUT_SUCCESS:
		case REGISTER_FAIL:
		case RESET_FAIL:
			return {
				...state,
				user: null,
				isAuthenticated: false,
				isLoading: false,
			};
		default:
			return state;
	}
}
