import {
	SURVEY_LOADING,
	CREATE_SURVEY,
	GET_SURVEY,
	GET_SURVEYS,
	GET_CLIENT_SURVEYS,
	GET_QUESTIONS_BY_SURVEY,
	UPDATE_SURVEY,
	DELETE_SURVEY,
} from '../../constants/types';

const initialState = {
	isLoading: false,
	isAuthenticated: !!localStorage.getItem('userToken'),
	survey: null,
	surveys: [],
	getClientSurveys: [],
	questionsBySurvey: [],
	totalSearchSurveys: null,
};

export default function SurveyReducer(state = initialState, action) {
	switch (action.type) {
		case SURVEY_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case GET_SURVEY:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				survey: action.payload,
			};
		case GET_SURVEYS:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				surveys: action.payload,
				totalSearchSurveys: action.totalSearchSurveys,
			};
		case GET_CLIENT_SURVEYS:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				getClientSurveys: action.payload,
			};
		case GET_QUESTIONS_BY_SURVEY:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				questionsBySurvey: action.payload,
			};
		case CREATE_SURVEY:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				survey: action.payload,
			};
		case UPDATE_SURVEY:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				survey: action.payload,
			};
		case DELETE_SURVEY:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				survey: action.payload,
			};
		default:
			return state;
	}
}
