import {
	RESEARCHER_LOADING,
	CREATE_RESEARCHER,
	GET_RESEARCHER,
	GET_RESEARCHERS,
	GET_CLIENT_RESEARCHERS,
	GET_RESEARCHER_SURVEYEE_LOCATION,
	UPDATE_RESEARCHER,
	DELETE_RESEARCHER,
} from '../../constants/types';

const initialState = {
	isLoading: false,
	isAuthenticated: !!localStorage.getItem('userToken'),
	researcher: null,
	researchers: [],
	getClientResearchers: [],
	getResearcherSurveyeeLocation: [],
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
		case GET_CLIENT_RESEARCHERS:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				getClientResearchers: action.payload,
			};
		case GET_RESEARCHER_SURVEYEE_LOCATION:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				getResearcherSurveyeeLocation: action.payload,
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
