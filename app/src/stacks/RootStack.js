import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import AppTabStack from './AppTabStack';
import { auth } from '../store/actions/Auth';

const RootStack = () => {
	const dispatch = useDispatch();
	let authUser = useSelector((state) => state.auth.isAuthenticated);

	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		const authUser = async () => {
			await dispatch(auth());
			setIsLoading(false);
		};
		authUser();
	}, []);

	if (isLoading) {
		return <ActivityIndicator size="large" style={styles.loading} />;
	}

	// console.log(authUser);

	return (
		<NavigationContainer>
			{authUser ? <AppTabStack /> : <AuthStack />}
		</NavigationContainer>
	);
};

export default RootStack;

const styles = StyleSheet.create({
	loading: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
