import { combineReducers } from 'redux';
import auth from './auth-reducer';
import surveys from './survey-reducer';
import clients from './client-reducer';
import error from './error-reducer';

const rootReducer = combineReducers({
	auth,
	surveys,
	clients,
	error,
});

export default rootReducer;
