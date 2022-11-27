import {
	RESEARCHER_LOADING,
	CREATE_RESEARCHER,
	GET_RESEARCHER,
	GET_RESEARCHERS,
	UPDATE_RESEARCHER,
	DELETE_RESEARCHER,
} from '../../constants/types';

const initialState = {
	isLoading: false,
	isAuthenticated: !!localStorage.getItem('userToken'),
	researcher: null,
	researchers: [],
	totalSearchResearchers: null,
};

export default function ClientReducer(state = initialState, action) {
	switch (action.type) {
		case RESEARCHER_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case GET_RESEARCHER:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				researcher: action.payload,
			};
		case GET_RESEARCHERS:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				researchers: action.payload,
				totalSearchResearchers: action.totalSearchResearchers,
			};
		case CREATE_RESEARCHER:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				researcher: action.payload,
			};
		case UPDATE_RESEARCHER:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				researcher: action.payload,
			};
		case DELETE_RESEARCHER:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				researcher: action.payload,
			};
		default:
			return state;
	}
}
