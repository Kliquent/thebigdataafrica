import {
	QUESTION_LOADING,
	CREATE_QUESTION,
	GET_QUESTION,
	GET_QUESTIONS,
	GET_OPTIONS_BY_QUESTION,
	UPDATE_QUESTION,
	DELETE_QUESTION,
} from '../../constants/types';

const initialState = {
	isLoading: false,
	isAuthenticated: !!localStorage.getItem('userToken'),
	question: null,
	questions: [],
	optionsByQuestion: [],
	totalSearchQuestions: null,
};

export default function SurveyReducer(state = initialState, action) {
	switch (action.type) {
		case QUESTION_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case GET_QUESTION:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				question: action.payload,
			};
		case GET_QUESTIONS:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				questions: action.payload,
				totalSearchQuestions: action.totalSearchQuestions,
			};
		case GET_OPTIONS_BY_QUESTION:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				optionsByQuestion: action.payload,
			};
		case CREATE_QUESTION:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				question: action.payload,
			};
		case UPDATE_QUESTION:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				question: action.payload,
			};
		case DELETE_QUESTION:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				question: action.payload,
			};
		default:
			return state;
	}
}
