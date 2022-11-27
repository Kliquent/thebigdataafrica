import {
	CLIENT_LOADING,
	CREATE_CLIENT,
	GET_CLIENT,
	GET_CLIENTS,
	UPDATE_CLIENT,
	DELETE_CLIENT,
} from '../../constants/types';

const initialState = {
	isLoading: false,
	isAuthenticated: !!localStorage.getItem('userToken'),
	client: null,
	clients: [],
	totalSearchClients: null,
};

export default function ClientReducer(state = initialState, action) {
	switch (action.type) {
		case CLIENT_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case GET_CLIENT:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				client: action.payload,
			};
		case GET_CLIENTS:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				clients: action.payload,
				totalSearchClients: action.totalSearchClients,
			};
		case CREATE_CLIENT:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				client: action.payload,
			};
		case UPDATE_CLIENT:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				client: action.payload,
			};
		case DELETE_CLIENT:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				client: action.payload,
			};
		default:
			return state;
	}
}
