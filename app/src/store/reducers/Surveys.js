import {
	GET_SURVEY,
	SURVEY_LOADING,
	CURRENT_SURVEY,
	GET_QUESTIONS_BY_SURVEY,
	GET_OPTIONS_BY_QUESTION,
	CLEAR_CURRENT_SURVEY,
	POST_SURVEYEE_RESPONSE,
	POST_SURVEYEE,
	RESET_SURVEYEE_SUCCESS,
	RESET_SURVEYEE_RESPONSE_SUCCESS,
	SURVEY_ERROR,
} from '../actions/Types';

const initialState = {
	isAuthenticated: null,
	surveys: null,
	responseSuccess: false,
	postSurveyeeSuccess: false,
	currentSurvey: null,
	getSurveyQuestions: [],
	optionsByQuestion: [],
	currentSurveyee: null,
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
				surveys: action.payload,
			};
		case CURRENT_SURVEY:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				currentSurvey: action.payload,
			};
		case GET_QUESTIONS_BY_SURVEY:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				getSurveyQuestions: action.payload,
			};
		case GET_OPTIONS_BY_QUESTION:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				optionsByQuestion: action.payload,
			};
		case POST_SURVEYEE:
			return {
				...state,
				isAuthenticated: true,
				postSurveyeeSuccess: true,
				isLoading: false,
				currentSurveyee: action.payload,
			};
		case POST_SURVEYEE_RESPONSE:
			return {
				...state,
				...action.payload,
				responseSuccess: true,
				isAuthenticated: true,
				isLoading: false,
			};
		case RESET_SURVEYEE_SUCCESS:
			return {
				...state,
				isAuthenticated: true,
				postSurveyeeSuccess: false,
				isLoading: false,
			};
		case RESET_SURVEYEE_RESPONSE_SUCCESS:
			return {
				...state,
				isAuthenticated: true,
				responseSuccess: false,
				isLoading: false,
			};
		case CLEAR_CURRENT_SURVEY:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				currentSurvey: null,
				currentSurveyee: null,
			};
		case SURVEY_ERROR:
			return {
				...state,
				isAuthenticated: true,
				surveys: null,
				isLoading: false,
			};
		default:
			return state;
	}
}
