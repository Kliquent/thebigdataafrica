import { combineReducers } from 'redux';
import auth from './auth-reducer';
import error from './error-reducer';

const rootReducer = combineReducers({
	auth,
	error,
});

export default rootReducer;
