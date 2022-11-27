import { combineReducers } from 'redux';
import auth from './auth-reducer';
import surveys from './survey-reducer';
import clients from './client-reducer';
import researchers from './researcher-reducer';
import error from './error-reducer';

const rootReducer = combineReducers({
	auth,
	surveys,
	clients,
	researchers,
	error,
});

export default rootReducer;
