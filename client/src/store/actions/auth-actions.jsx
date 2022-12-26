import axios from 'axios';
import toast from 'react-hot-toast';
import {
	USER_LOADING,
	AUTH_USER,
	GET_USERS,
	UPDATE_USER_INFO,
	CHANGE_PASSWORD,
	CREATE_USER,
	LOGIN_SUCCESS,
	LOGOUT_SUCCESS,
	REGISTER_SUCCESS,
	RESET_PASSWORD_SUCCESS,
} from '../../constants/types';
import {
	returnErrors,
	clearErrors,
	registerFail,
	loginFail,
	usersError,
	authError,
} from './error-actions';

const USERS_URL = 'https://apis.thebigdataafrica.com/api/v1/auth';

// Setup config headers and token
export const tokenConfig = () => {
	// Get token from localStorage
	const token = localStorage.getItem('userToken');
	// console.log(token);

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

// Check token and Auth user
export const auth = () => async (dispatch) => {
	const token = tokenConfig();
	try {
		const response = await axios.get(`${USERS_URL}/profile`, token);
		const data = await response.data;
		// console.log(data);

		await dispatch({
			type: AUTH_USER,
			payload: data,
		});
	} catch (error) {
		// console.log(error.response.data);
		dispatch(
			returnErrors(
				error.response.data,
				error.response.status,
				'AUTHENTICATION_FAIL'
			)
		);
		dispatch(authError());
		localStorage.removeItem('userToken');
	}
};

// Register User
export const registerUser = (payload) => async (dispatch) => {
	const { name, email, phone, gender, password, password_confirmation } =
		payload;

	try {
		// Headers
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		// Request body
		const body = JSON.stringify({
			name,
			email,
			phone,
			gender,
			password,
			password_confirmation,
		});

		const response = await axios.post(`${USERS_URL}/signup`, body, config);
		const data = await response.data;

		if (data) {
			await dispatch({
				type: REGISTER_SUCCESS,
				payload: data,
			});
			toast.success(`Success! Admin user registered.`);
		}
		dispatch(clearErrors());
	} catch (error) {
		dispatch(
			returnErrors(error.response.data, error.response.status, 'REGISTER_FAIL')
		);
		dispatch(registerFail());
		localStorage.removeItem('userToken');
	}
};

// Login User
export const loginUser = (payload) => async (dispatch) => {
	const { email, password } = payload;

	try {
		// Headers
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		// Request body
		const body = JSON.stringify({ email, password });

		const response = await axios.post(`${USERS_URL}/signin`, body, config);

		const data = await response.data;
		// console.log(data);

		if (data) {
			await dispatch({
				type: LOGIN_SUCCESS,
				payload: data,
			});
			localStorage.setItem('userToken', data.token);
			toast.success(`Success! You're now logged in.`);
		}
		dispatch(clearErrors());
	} catch (error) {
		// console.log(error.response);
		toast.error('Invalid login credentials!');
		dispatch(
			returnErrors(error.response.data, error.response.status, 'LOGIN_FAIL')
		);
		dispatch(loginFail());
		localStorage.removeItem('userToken');
	}
};

// Logout User
export const logOut = () => (dispatch) => {
	localStorage.removeItem('userToken');
	toast.success(`Success! You're now logged out.`);
	dispatch(clearErrors());
	dispatch({
		type: LOGOUT_SUCCESS,
	});
};

export const updateUserInfo = (payload) => async (dispatch) => {
	const token = tokenConfig();

	const { name, email, phone } = payload;

	try {
		// Request body
		const body = JSON.stringify({ name, email, phone });

		const response = await axios.put(
			`${USERS_URL}/update-user-info`,
			body,
			token
		);

		const data = await response.data;

		await dispatch({
			type: UPDATE_USER_INFO,
			payload: data,
		});
		toast.success(`Success! User info updated.`);
	} catch (error) {
		toast.error('Error updating user info!');
		dispatch(
			returnErrors(
				error.response.data,
				error.response.status,
				'UPDATE_USER_INFO'
			)
		);
	}
};

export const changePassword = (payload) => async (dispatch) => {
	const token = tokenConfig();

	const { current_password, new_password } = payload;
	try {
		// Request body
		const body = JSON.stringify({ current_password, new_password });

		const response = await axios.put(
			`${USERS_URL}/update-password`,
			body,
			token
		);

		const data = await response.data;

		await dispatch({
			type: CHANGE_PASSWORD,
			payload: data,
		});
		toast.success(`Success! password changed..`);
	} catch (error) {
		toast.error('Current pass is incorrect!');
		dispatch(
			returnErrors(
				error.response.data,
				error.response.status,
				'CHANGE_PASSWORD'
			)
		);
	}
};

// Forgot password
export const forgotPassword = (payload) => async (dispatch) => {
	const { email, newPassword } = payload;

	try {
		// Headers
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		// Request body
		const body = JSON.stringify({ email, newPassword });

		const response = await axios.put(
			`${USERS_URL}/forgot-password`,
			body,
			config
		);

		const data = await response.data;
		// console.log(data);

		if (data) {
			await dispatch({
				type: RESET_PASSWORD_SUCCESS,
				payload: data,
			});
			toast.success(`Success! Your password is reset.`);
		}
		dispatch(clearErrors());
	} catch (error) {
		toast.error('User with given email address does not exist!');
		dispatch(
			returnErrors(error.response.data, error.response.status, 'RESET_FAIL')
		);
		localStorage.removeItem('userToken');
	}
};

// Get customers
export const getUsers = (payload) => async (dispatch) => {
	const token = tokenConfig();

	try {
		dispatch({ type: USER_LOADING });
		const response = await axios.get(`${USERS_URL}`, token);
		const data = await response.data;

		await dispatch({
			type: GET_USERS,
			payload: data,
		});
	} catch (error) {
		toast.error('Error while fetching users!');
		dispatch(
			returnErrors(error.response.data, error.response.status, 'GET_USERS')
		);
	}
};

export const adminCreateUser = (payload) => async (dispatch) => {
	const token = tokenConfig();
	const { name, email, phone, gender, role, password, password_confirmation } =
		payload;

	try {
		// Request body
		const body = JSON.stringify({
			name,
			email,
			phone,
			gender,
			role,
			password,
			password_confirmation,
		});

		const response = await axios.post(
			`${ADMIN_USER_AUTH}/create-user`,
			body,
			token
		);
		const data = await response.data;

		if (data) {
			dispatch({ type: USER_LOADING });
			await dispatch({
				type: CREATE_USER,
				payload: data,
			});
			toast.success(`Success! New user registered.`);
		}
		// dispatch(clearErrors());
	} catch (error) {
		console.log(error);
		toast.error(`Error while creating user!`);
		dispatch(
			returnErrors(error.response.data, error.response.status, 'CREATE_USER')
		);
	}
};
