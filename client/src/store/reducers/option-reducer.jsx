import {
	OPTION_LOADING,
	CREATE_OPTION,
	GET_OPTION,
	GET_OPTIONS,
	UPDATE_OPTION,
	DELETE_OPTION,
} from '../../constants/types';

const initialState = {
	isLoading: false,
	isAuthenticated: !!localStorage.getItem('userToken'),
	option: null,
	options: [],
	totalSearchOptions: null,
};

export default function SurveyReducer(state = initialState, action) {
	switch (action.type) {
		case OPTION_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case GET_OPTION:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				option: action.payload,
			};
		case GET_OPTIONS:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				options: action.payload,
				totalSearchOptions: action.totalSearchOptions,
			};
		case CREATE_OPTION:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				option: action.payload,
			};
		case UPDATE_OPTION:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				option: action.payload,
			};
		case DELETE_OPTION:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				option: action.payload,
			};
		default:
			return state;
	}
}
