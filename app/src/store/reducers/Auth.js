import {
	AUTH_USER,
	USER_LOADING,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT_SUCCESS,
} from '../actions/Types';

const initialState = {
	isAuthenticated: null,
	user: null,
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
		case LOGIN_SUCCESS:
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				isLoading: false,
			};
		case AUTH_ERROR:
		case LOGIN_FAIL:
		case LOGOUT_SUCCESS:
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
