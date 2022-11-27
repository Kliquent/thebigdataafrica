import React, { useEffect } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { auth } from '../store/actions/auth-actions';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
	const dispatch = useDispatch();
	const location = useLocation();

	let currentUser = useSelector((state) => state.auth);

	const getCurrentUser = async () => {
		await batch(() => dispatch(auth()));
	};

	// Check authentication on Page Refresh
	useEffect(() => {
		getCurrentUser();
	}, []);

	if (!currentUser.isAuthenticated) {
		return <Navigate to="/login" replace state={{ from: location }} />;
	}

	return children;
};

export default PrivateRoute;
