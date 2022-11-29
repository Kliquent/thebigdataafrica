import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { StyledButton, ButtonText } from '../../components/styles';
import { auth, logOut } from '../../store/actions/Auth';

const Profile = () => {
	const dispatch = useDispatch();
	let authUser = useSelector((state) => state.auth);

	const [buttonLoading, setButtonLoading] = useState(false);

	const signOut = async () => {
		await dispatch(logOut());
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.innerContainer}>
				<Text style={{ marginBottom: 10, fontSize: 20 }}>Your Profile</Text>
				<View style={{ flexDirection: 'row' }}>
					<Text style={styles.text}>{authUser?.user?.current_user?.name}</Text>
				</View>
				<Text style={styles.textRole}>Researcher</Text>
				<Text style={styles.textRole}>
					0{authUser?.user?.current_user?.phone}
				</Text>
				<StyledButton
					style={{ width: '80%', marginTop: 50 }}
					disabled={buttonLoading ? true : false}
					onPress={signOut}
				>
					{buttonLoading ? (
						<ActivityIndicator color="#fff" size="small" />
					) : (
						<ButtonText>Sign Out</ButtonText>
					)}
				</StyledButton>
			</View>
		</SafeAreaView>
	);
};

export default Profile;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	innerContainer: {
		flex: 1,
		marginBottom: 95,
		// backgroundColor: 'green',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
	},
	text: {
		fontSize: 30,
	},
	textRole: {
		fontSize: 20,
		color: 'gray',
		paddingVertical: 5,
	},
});
