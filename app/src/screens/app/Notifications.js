import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Notifications = () => {
	return (
		<View style={styles.container}>
			<View style={styles.innerContainer}>
				<View style={{ backgroundColor: '#f3f3f3', padding: 20 }}>
					<Text>You're all caught up!</Text>
				</View>
			</View>
		</View>
	);
};

export default Notifications;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	innerContainer: {
		flex: 1,
		marginBottom: 95,
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
	},
	text: {
		fontSize: 30,
	},
});
