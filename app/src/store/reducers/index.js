import { combineReducers } from 'redux';
import auth from './Auth';
import surveys from './Surveys';
import error from './Error';

export default combineReducers({
	auth,
	surveys,
	error,
});
