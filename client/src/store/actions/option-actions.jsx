import axios from 'axios';
import toast from 'react-hot-toast';
import {
	OPTION_LOADING,
	CREATE_OPTION,
	GET_OPTION,
	GET_OPTIONS,
	UPDATE_OPTION,
	DELETE_OPTION,
} from '../../constants/types';
import { returnErrors, clearErrors } from './error-actions';

const OPTION_SERVER = 'https://apis.thebigdataafrica.com/api/v1/options';

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

export const createOption = (payload) => async (dispatch) => {
	const token = tokenConfig();
	const { select_type, type, name, description, question_id } = payload;

	try {
		await dispatch({ type: OPTION_LOADING });
		// Request body
		const body = JSON.stringify({
			select_type,
			type,
			name,
			description,
			question_id,
		});

		const response = await axios.post(`${OPTION_SERVER}/create`, body, token);
		const data = await response.data;

		await dispatch({
			type: CREATE_OPTION,
			payload: data,
		});

		await dispatch(clearErrors());

		toast.success(`Success! create option success.`);
	} catch (error) {
		console.log(error.response);
		toast.error('Error! create option failed.');
		dispatch(
			returnErrors(error.response.data, error.response.status, 'CREATE_OPTION')
		);
	}
};

export const updateOption = (payload) => async (dispatch) => {
	const token = tokenConfig();
	const { _id, select_type, type, name, description, question_id } = payload;

	try {
		await dispatch({ type: OPTION_LOADING });
		// Request body
		const body = JSON.stringify({
			select_type,
			type,
			name,
			description,
			question_id,
		});

		const response = await axios.put(`${OPTION_SERVER}/${_id}`, body, token);
		const data = await response.data;

		await dispatch({
			type: UPDATE_OPTION,
			payload: data,
		});

		await dispatch(clearErrors());

		toast.success(`Success! update option success.`);
	} catch (error) {
		console.log(error.response);
		toast.error('Error! update option failed.');
		dispatch(
			returnErrors(error.response.data, error.response.status, 'UPDATE_OPTION')
		);
	}
};

export const deleteOption = (payload) => async (dispatch) => {
	const token = tokenConfig();
	const { _id } = payload;

	try {
		await dispatch({ type: OPTION_LOADING });

		const response = await axios.delete(`${OPTION_SERVER}/${_id}`, token);
		const data = await response.data;

		await dispatch({
			type: DELETE_OPTION,
			payload: data,
		});

		await dispatch(clearErrors());

		toast.success(`Success! delete option success.`);
	} catch (error) {
		console.log(error.response);
		toast.error('Error! delete option failed.');
		dispatch(
			returnErrors(error.response.data, error.response.status, 'DELETE_OPTION')
		);
	}
};

export const getOptions = () => async (dispatch) => {
	const token = tokenConfig();

	try {
		await dispatch({ type: OPTION_LOADING });
		const response = await axios.get(`${OPTION_SERVER}`, token);
		const data = await response.data;

		await dispatch({
			type: GET_OPTIONS,
			payload: data,
		});

		await dispatch(clearErrors());
	} catch (error) {
		console.log(error.response);
		toast.error('Error! get options failed.');
		dispatch(
			returnErrors(error.response.data, error.response.status, 'GET_OPTIONS')
		);
	}
};

export const getOption = (optionId) => async (dispatch) => {
	const token = tokenConfig();

	try {
		await dispatch({ type: OPTION_LOADING });
		const response = await axios.get(`${OPTION_SERVER}/${optionId}`, token);
		const data = await response.data;

		await dispatch({
			type: GET_OPTION,
			payload: data,
		});

		await dispatch(clearErrors());
	} catch (error) {
		console.log(error.response);
		toast.error('Error! get option failed.');
		dispatch(
			returnErrors(error.response.data, error.response.status, 'GET_OPTION')
		);
	}
};
