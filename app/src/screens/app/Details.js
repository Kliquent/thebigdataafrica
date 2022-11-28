import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Details = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Details Screen</Text>
		</View>
	);
};

export default Details;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		fontSize: 30,
	},
});
