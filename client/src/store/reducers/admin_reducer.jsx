import {
	ADMIN_LOADING,
	CREATE_ADMIN,
	GET_ADMIN,
	GET_ADMINS,
	UPDATE_ADMIN,
	DELETE_ADMIN,
} from '../../constants/types';

const initialState = {
	isLoading: false,
	isAuthenticated: !!localStorage.getItem('userToken'),
	admin: null,
	admins: [],
	totalSearchClients: null,
};

export default function ClientReducer(state = initialState, action) {
	switch (action.type) {
		case ADMIN_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case GET_ADMIN:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				admin: action.payload,
			};
		case GET_ADMINS:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				admins: action.payload,
				totalSearchClients: action.totalSearchClients,
			};
		case CREATE_ADMIN:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				admin: action.payload,
			};
		case UPDATE_ADMIN:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				admin: action.payload,
			};
		case DELETE_ADMIN:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				admin: action.payload,
			};
		default:
			return state;
	}
}
