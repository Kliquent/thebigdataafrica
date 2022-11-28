import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
	Dimensions,
	useWindowDimensions,
} from 'react-native';

const OnBoardingItem = ({ item }) => {
	const { width } = useWindowDimensions();
	return (
		<View style={styles.container}>
			<Image
				source={item.image}
				style={[styles.image, { width, resizeMode: 'contain' }]}
			/>
			<View style={{ flex: 0.15 }}>
				<Text style={styles.title}>{item.title}</Text>
				<Text style={styles.description}>{item.description}</Text>
			</View>
		</View>
	);
};

export default OnBoardingItem;

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		height: height * 0.75,
		width: width,
	},
	image: {
		flex: 0.7,
		justifyContent: 'center',
	},
	title: {
		fontSize: 28,
		fontWeight: '800',
		marginBottom: 10,
		color: '#0052ff',
		textAlign: 'center',
	},
	description: {
		fontWeight: '300',
		color: '#62656b',
		textAlign: 'center',
		paddingHorizontal: 64,
	},
});
