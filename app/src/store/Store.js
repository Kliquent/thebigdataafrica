import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import RootReducers from './reducers';

let composeEnhancers = compose;

if (__DEV__) {
	composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const AppStore = createStore(
	RootReducers,
	composeEnhancers(applyMiddleware(thunk))
);

export default AppStore;
