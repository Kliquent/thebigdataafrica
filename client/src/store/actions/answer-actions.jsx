import axios from 'axios';
import toast from 'react-hot-toast';
import { ANSWER_LOADING, GET_ANSWERS } from '../../constants/types';
import { returnErrors, clearErrors } from './error-actions';

const ANSWER_SERVER = 'https://apis.thebigdataafrica.com/api/v1/answers';

// Setup config headers and token
export const tokenConfig = () => {
	// Get token from localStorage
	const token = localStorage.getItem('userToken');

	// Headers
	const config = {
		headers: {
			'content-Type': 'application/json',
		},
	};

	// if token, add to headers
	if (token) {
		config.headers['Authorization'] = `Bearer ${token}`;
	}

	return config;
};

export const getAnswers = (payload) => async (dispatch) => {
	const token = tokenConfig();

	try {
		if (payload) {
			const { page, limit, order, orderBy } = payload;
			let currentPage = page + 1;
			await dispatch({ type: ANSWER_LOADING });
			const response = await axios.get(
				`${ANSWER_SERVER}?page=${currentPage}&limit=${limit}&order=${order}&orderBy=${orderBy}`,
				token
			);
			const data = await response.data;

			await dispatch({
				type: GET_ANSWERS,
				payload: data,
			});

			await dispatch(clearErrors());
		} else {
			await dispatch({ type: ANSWER_LOADING });
			const response = await axios.get(`${ANSWER_SERVER}`, token);
			const data = await response.data;

			await dispatch({
				type: GET_ANSWERS,
				payload: data,
			});

			await dispatch(clearErrors());
		}
	} catch (error) {
		console.log(error.response);
		toast.error('Error! get answers failed.');
		dispatch(
			returnErrors(error.response.data, error.response.status, 'GET_ANSWERS')
		);
	}
};
