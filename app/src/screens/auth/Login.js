import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	StyleSheet,
	View,
	Text,
	Image,
	Animated,
	Dimensions,
	ActivityIndicator,
	Platform,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { LinearGradient } from 'expo-linear-gradient';
import { useForm, Controller } from 'react-hook-form';
import { TextInput, HelperText, useTheme } from 'react-native-paper';
import { loginUser } from '../../store/actions/Auth';
import { clearErrors } from '../../store/actions/Error';
import TextInputAvoidingView from '../../components/KeyboardAvoiding';
import { StyledButton, ButtonText } from '../../components/styles';
import { styles } from './styles';

const { width, height } = Dimensions.get('screen');

const Login = () => {
	const dispatch = useDispatch();
	let error = useSelector((state) => state.error);

	const [showPassword, setShowPassword] = useState(false);
	const [buttonLoading, setButtonLoading] = useState(false);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({ mode: 'onBlur' });

	const togglePassword = () => {
		setShowPassword(!showPassword);
	};

	const onSubmit = async (data) => {
		// Attempt to authenticate user
		setButtonLoading(true);
		await dispatch(loginUser(data));
	};

	useEffect(() => {
		// Check for register error
		if (error.id === 'LOGIN_FAIL') {
			setButtonLoading(false);
			Toast.show({
				type: 'error',
				text1: 'Invalid credentials. Please try again!',
				text2: 'Either your email address or password is incorrect.',
			});
			dispatch(clearErrors());
		} else {
			setButtonLoading(false);
		}
	}, [error]);

	return (
		<TextInputAvoidingView>
			<Animated.View style={styles.container}>
				<LinearGradient
					colors={['#F79974', '#7CC89A']}
					style={[styles.centerAlign, { paddingBottom: 5, height: height / 3 }]}
				>
					<Image
						source={require('../../../assets/nikiai-logo.png')}
						style={styles.logo}
					/>
				</LinearGradient>
				<View
					style={[
						styles.centerAlign,
						{
							marginTop: 0,
							backgroundColor: 'rgba(230,230,230,.9)',
							height: height,
						},
					]}
				>
					<View style={styles.inputContainer}>
						<Text
							style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}
						>
							SIGN IN
						</Text>
						<Controller
							control={control}
							type="email"
							name="email"
							render={({ field: { onChange, value, onBlur } }) => (
								<TextInput
									mode="outlined"
									autoFocus={Platform.OS === 'ios' ? true : false}
									keyboardType="email-address"
									label="Email address"
									placeholder="Enter your email address"
									value={value}
									theme={{
										colors: {
											primary: '#7CC89A',
											underlineColor: 'transparent',
										},
									}}
									onBlur={onBlur}
									onChangeText={(value) => onChange(value)}
								/>
							)}
							rules={{
								required: {
									value: true,
									message: 'Email address is required',
								},
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
									message: 'Invalid email address',
								},
							}}
						/>
						<HelperText type="error" style={styles.helper}>
							{errors?.email?.message}
						</HelperText>
						<Controller
							control={control}
							name="password"
							render={({ field: { onChange, value, onBlur } }) => (
								<TextInput
									mode="outlined"
									label="Password"
									secureTextEntry={showPassword ? false : true}
									placeholder="Enter password"
									value={value}
									theme={{
										colors: {
											primary: '#7CC89A',
											underlineColor: 'transparent',
										},
									}}
									onBlur={onBlur}
									onChangeText={(value) => onChange(value)}
									right={
										<TextInput.Icon
											onPress={togglePassword}
											name={showPassword ? 'eye-off' : 'eye'}
										/>
									}
								/>
							)}
							rules={{
								required: {
									value: true,
									message: 'Password is required',
								},
								minLength: {
									value: 8,
									message: 'Password should be atleast 8 characters',
								},
							}}
						/>
						<HelperText type="error">{errors?.password?.message}</HelperText>
						<StyledButton
							disabled={buttonLoading ? true : false}
							onPress={handleSubmit(onSubmit)}
						>
							{buttonLoading ? (
								<ActivityIndicator color="#fff" size="small" />
							) : (
								<ButtonText>Sign in</ButtonText>
							)}
						</StyledButton>
					</View>
				</View>
			</Animated.View>
		</TextInputAvoidingView>
	);
};

export default Login;
