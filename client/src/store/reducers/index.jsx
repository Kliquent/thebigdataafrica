import { combineReducers } from 'redux';
import auth from './auth-reducer';
import survey from './survey-reducer';
import error from './error-reducer';

const rootReducer = combineReducers({
	auth,
	survey,
	error,
});

export default rootReducer;
