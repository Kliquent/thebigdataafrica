import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	View,
	Text,
	Animated,
	Dimensions,
	ActivityIndicator,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { useForm, Controller } from 'react-hook-form';
import { TextInput, HelperText } from 'react-native-paper';
import { postSurveyee, getSurveyQuestions } from '../../store/actions/Surveys';
import { clearErrors } from '../../store/actions/Error';
import TextInputAvoidingView from '../../components/KeyboardAvoiding';
import { StyledButton, ButtonText } from '../../components/styles';
import { styles } from '../auth/styles';

const { width, height } = Dimensions.get('screen');

const SurveyeeForm = ({ navigation }) => {
	const dispatch = useDispatch();

	let currentSurveyee = useSelector((state) => state.surveys);
	let error = useSelector((state) => state.error);

	const [buttonLoading, setButtonLoading] = useState(false);

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({ mode: 'onBlur' });

	const onSubmit = async (data) => {
		// Attempt to authenticate user
		setButtonLoading(true);
		const { first_name, last_name, phone } = data;

		const body = {
			first_name,
			last_name,
			phone,
		};
		dispatch(postSurveyee(body));
	};

	useEffect(() => {
		if (currentSurveyee.postSurveyeeSuccess) {
			navigation.navigate('SurveyDetails');
			reset({
				first_name: '',
				last_name: '',
				phone: '',
			});
		}
	}, [currentSurveyee.postSurveyeeSuccess]);

	useEffect(() => {
		// Check for survey error
		if (error.id === 'SURVEY_RESPONSE_ERROR') {
			setButtonLoading(false);
			// Toast.show({
			// 	type: 'error',
			// 	text1: 'Server error. Please try again later!',
			// 	text2: 'We are currently experiencing issues.',
			// });
			dispatch(clearErrors());
		} else {
			setButtonLoading(false);
		}
	}, [error]);

	return (
		<TextInputAvoidingView>
			<Animated.View style={styles.container}>
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
					<View style={styles.inputFormContainer}>
						<Text
							style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}
						>
							SURVEYEE FORM
						</Text>
						<Controller
							control={control}
							name="first_name"
							render={({ field: { onChange, value, onBlur } }) => (
								<TextInput
									mode="outlined"
									label="First Name"
									placeholder="Enter your First Name"
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
									message: 'First name is required',
								},
							}}
						/>
						<HelperText type="error" style={styles.helper}>
							{errors?.first_name?.message}
						</HelperText>

						<Controller
							control={control}
							name="last_name"
							render={({ field: { onChange, value, onBlur } }) => (
								<TextInput
									mode="outlined"
									label="Last Name"
									placeholder="Enter your Last Name"
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
									message: 'Last name is required',
								},
							}}
						/>
						<HelperText type="error" style={styles.helper}>
							{errors?.last_name?.message}
						</HelperText>

						<Controller
							control={control}
							name="phone"
							render={({ field: { onChange, value, onBlur } }) => (
								<TextInput
									mode="outlined"
									keyboardType="numeric"
									maxLength={10}
									label="Phone Number"
									placeholder="0712345678"
									value={value}
									theme={{
										colors: {
											primary: '#00ab55',
											underlineColor: 'transparent',
										},
									}}
									onBlur={onBlur}
									onChangeText={(value) => onChange(value)}
								/>
							)}
							// rules={{
							// 	required: {
							// 		value: true,
							// 		message: 'Phone number is required',
							// 	},
							// 	pattern: {
							// 		value: /^(\+254|0)[1-9]\d{8}$/i,
							// 		message: 'Please enter a valid mobile number',
							// 	},
							// }}
						/>

						<HelperText type="error" style={styles.helper}>
							{errors?.phone?.message}
						</HelperText>

						<StyledButton
							disabled={buttonLoading ? true : false}
							onPress={handleSubmit(onSubmit)}
						>
							{buttonLoading ? (
								<ActivityIndicator color="#fff" size="small" />
							) : (
								<ButtonText>Submit</ButtonText>
							)}
						</StyledButton>
					</View>
				</View>
			</Animated.View>
		</TextInputAvoidingView>
	);
};

export default SurveyeeForm;
