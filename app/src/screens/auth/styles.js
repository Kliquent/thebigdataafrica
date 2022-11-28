import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
	container: {
		width: '100%',
	},
	centerAlign: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	logo: {
		width: 160,
		height: height / 5,
	},
	inputContainer: {
		backgroundColor: 'rgba(255,255,255,1)',
		padding: 20,
		marginTop: -height / 1.6,
		borderRadius: 20,
		width: width / 1.2,
		height: height / 2,
		...Platform.select({
			ios: {
				shadowColor: 'gray',
				shadowOffset: {
					width: 0,
					height: 2,
				},
				shadowOpacity: 0.25,
				shadowRadius: 3.5,
			},
			android: {
				elevation: -5, // its negative to allow effective box shadow
				position: 'relative',
				borderWidth: 1,
				borderColor: '#f3f3f3',
				zIndex: 50,
			},
		}),
	},
	// Surveyee Form (Modal)
	inputFormContainer: {
		backgroundColor: 'rgba(255,255,255,1)',
		padding: 20,
		// marginTop: height / 8,
		borderRadius: 20,
		width: width / 1.2,
		height: height / 1.5,
		...Platform.select({
			ios: {
				shadowColor: 'gray',
				shadowOffset: {
					width: 0,
					height: 2,
				},
				shadowOpacity: 0.25,
				shadowRadius: 3.5,
			},
			android: {
				elevation: -5, // its negative to allow effective box shadow
				position: 'relative',
				borderWidth: 1,
				borderColor: '#f3f3f3',
				zIndex: 50,
			},
		}),
	},
	// Surveyee Form
	inputFormContainer: {
		backgroundColor: 'rgba(255,255,255,1)',
		padding: 20,
		marginTop: -height / 5,
		borderRadius: 20,
		width: width / 1.2,
		height: height / 1.5,
		...Platform.select({
			ios: {
				shadowColor: 'gray',
				shadowOffset: {
					width: 0,
					height: 2,
				},
				shadowOpacity: 0.25,
				shadowRadius: 3.5,
			},
			android: {
				elevation: -5, // its negative to allow effective box shadow
				position: 'relative',
				borderWidth: 1,
				borderColor: '#f3f3f3',
				zIndex: 50,
			},
		}),
	},
});

export { styles };
