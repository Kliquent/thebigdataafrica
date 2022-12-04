import {
	ANSWER_LOADING,
	GET_ANSWER,
	GET_ANSWERS,
	GET_ANSWER_ANALYTICS,
} from '../../constants/types';

const initialState = {
	isLoading: false,
	isAuthenticated: !!localStorage.getItem('userToken'),
	answer: null,
	answers: [],
	getAnswerAnalytics: [],
};

export default function SurveyReducer(state = initialState, action) {
	switch (action.type) {
		case ANSWER_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case GET_ANSWER:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				answer: action.payload,
			};
		case GET_ANSWERS:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				answers: action.payload,
			};
		case GET_ANSWER_ANALYTICS:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				getAnswerAnalytics: action.payload,
			};
		default:
			return state;
	}
}
