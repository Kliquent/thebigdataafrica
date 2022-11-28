import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import OnBoardingScreen from '../../components/OnBoarding';

const OnBoarding = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<OnBoardingScreen navigation={navigation} />
		</View>
	);
};

export default OnBoarding;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
});
