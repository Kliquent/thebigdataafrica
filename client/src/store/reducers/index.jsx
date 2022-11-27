import { combineReducers } from 'redux';
import auth from './auth-reducer';
import surveys from './survey-reducer';
import error from './error-reducer';

const rootReducer = combineReducers({
	auth,
	surveys,
	error,
});

export default rootReducer;
