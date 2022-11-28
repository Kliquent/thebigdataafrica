import React, { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	ScrollView,
	View,
	Text,
	SafeAreaView,
	StatusBar,
	Dimensions,
	Image,
	TouchableOpacity,
	Modal,
	Animated,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { COLORS, SIZES } from '../../constants';
import { postSurveyeeResponse } from '../../store/actions/Surveys';
import { clearErrors } from '../../store/actions/Error';
import { Checkbox, RadioButton } from 'react-native-paper';

const { height } = Dimensions.get('screen');

const SurveyDetails = ({ navigation }) => {
	const dispatch = useDispatch();
	let surveyQuiz = useSelector((state) => state.surveys);
	let currentSurveyee = useSelector((state) => state.surveys);
	let error = useSelector((state) => state.error);

	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [selectedOption, setSelectedOption] = useState(false);
	const [checkSelectedOption, setCheckSelectedOption] = useState([]);
	const [showNextButton, setShowNextButton] = useState(false);
	const [showCompleteModal, setShowCompleteModal] = useState(false);
	const [progress, setProgress] = useState(new Animated.Value(0));

	const progressAnim = progress.interpolate({
		inputRange: [0, surveyQuiz?.currentSurveyQuiz?.length],
		outputRange: ['0%', '100%'],
	});

	const validateAnswer = (option) => {
		if (
			surveyQuiz?.currentSurveyQuiz[currentQuestionIndex]?.input_type?.name ==
			'CheckBoxes'
		) {
			const body = {
				surveyee_id: currentSurveyee?.currentSurveyee?.id,
				question_id: surveyQuiz?.currentSurveyQuiz[currentQuestionIndex]?.id,
				option_id: option.id,
				option_title: option.title,
			};

			let newArray = checkSelectedOption.slice();

			if (
				newArray[newArray?.findIndex((x) => x.option_id === option.id)]
					?.option_id === option.id
			) {
				let filteredItems = newArray.filter(
					(item) => item.option_id !== option.id
				);
				setCheckSelectedOption(filteredItems);
			} else {
				newArray.push(body);
				setCheckSelectedOption(newArray);
			}

			// Show Next Button
			setShowNextButton(true);
		} else {
			// Body params
			const body = {
				surveyee_id: currentSurveyee?.currentSurveyee?.id,
				question_id: surveyQuiz?.currentSurveyQuiz[currentQuestionIndex]?.id,
				option_id: option.id,
				option_title: option.title,
			};
			setSelectedOption(body);

			// Show Next Button
			setShowNextButton(true);
		}
	};

	const handleNext = async () => {
		if (currentQuestionIndex == surveyQuiz?.currentSurveyQuiz?.length - 1) {
			// Handle last quiz dispatch
			// dispatch checkBoxes response
			checkSelectedOption?.map(async (option) => {
				await dispatch(postSurveyeeResponse(option));
			});
			// Clear state to avoid sending duplicate data
			setCheckSelectedOption([]);

			// dispatch radioButton response
			await dispatch(postSurveyeeResponse(selectedOption));
			// Clear state to avoid sending duplicate data
			setSelectedOption([]);

			// Show Score Modal
			setShowCompleteModal(true);
		} else {
			// dispatch checkBoxes response
			checkSelectedOption?.map(async (option) => {
				await dispatch(postSurveyeeResponse(option));
			});
			// Clear state to avoid sending duplicate data
			setCheckSelectedOption([]);

			// dispatch radioButton response
			await dispatch(postSurveyeeResponse(selectedOption));
			// Clear state to avoid sending duplicate data
			setSelectedOption([]);

			setCurrentQuestionIndex(currentQuestionIndex + 1);
			setShowNextButton(false);
		}
		Animated.timing(progress, {
			toValue: currentQuestionIndex + 1,
			duration: 1000,
			useNativeDriver: false,
		}).start();
	};

	const restartQuiz = async () => {
		setShowCompleteModal(false);
		setCurrentQuestionIndex(0);
		setShowNextButton(false);
		setCheckSelectedOption([]);
		navigation.navigate('SurveyeeForm');
		Animated.timing(progress, {
			toValue: 0,
			duration: 1000,
			useNativeDriver: false,
		}).start();
	};

	const renderQuestion = () => {
		return (
			<View
				style={{
					marginVertical: 10,
				}}
			>
				{/* Question Counter */}
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'flex-end',
					}}
				>
					<Text
						style={{
							color: COLORS.white,
							fontSize: 20,
							opacity: 0.6,
							marginRight: 2,
						}}
					>
						{currentQuestionIndex + 1}
					</Text>
					<Text style={{ color: COLORS.white, fontSize: 18, opacity: 0.6 }}>
						/ {surveyQuiz?.currentSurveyQuiz?.length}
					</Text>
				</View>

				{/* Question */}
				<Text
					style={{
						color: COLORS.white,
						fontSize: 25,
					}}
				>
					{surveyQuiz?.currentSurveyQuiz[currentQuestionIndex]?.title}
				</Text>
			</View>
		);
	};

	const renderOptions = () => {
		return (
			<View style={{ height: height * 0.36 }}>
				<ScrollView showsVerticalScrollIndicator={false}>
					{surveyQuiz?.currentSurveyQuiz[currentQuestionIndex]?.options?.map(
						(option) => {
							const { id, title } = option;

							return (
								<Fragment key={id}>
									{surveyQuiz?.currentSurveyQuiz[currentQuestionIndex]
										?.input_type?.name == 'CheckBoxes' ? (
										<Checkbox.Item
											labelStyle={{ color: '#fff' }}
											label={title}
											status={
												id ===
												checkSelectedOption[
													checkSelectedOption?.findIndex(
														(x) => x.option_id === id
													)
												]?.option_id
													? 'checked'
													: 'unchecked'
											}
											onPress={() => {
												validateAnswer(option);
											}}
										/>
									) : (
										<RadioButton.Group>
											<RadioButton.Item
												status={
													id === selectedOption.option_id
														? 'checked'
														: 'unchecked'
												}
												onPress={() => {
													validateAnswer(option);
												}}
												value={option.title}
												label={title}
												labelStyle={{ color: '#fff' }}
											/>
										</RadioButton.Group>
									)}
								</Fragment>
							);
						}
					)}
				</ScrollView>
			</View>
		);
	};

	const renderNextButton = () => {
		if (showNextButton) {
			return (
				<TouchableOpacity
					onPress={handleNext}
					style={{
						marginTop: 5,
						width: '100%',
						backgroundColor: '#7CC89A',
						padding: 20,
						borderRadius: 50,
					}}
				>
					<Text
						style={{ fontSize: 20, color: COLORS.white, textAlign: 'center' }}
					>
						Next
					</Text>
				</TouchableOpacity>
			);
		} else {
			return null;
		}
	};

	const renderProgressBar = () => {
		return (
			<View
				style={{
					width: '100%',
					height: 20,
					borderRadius: 20,
					backgroundColor: '#00000020',
				}}
			>
				<Animated.View
					style={[
						{
							height: 20,
							borderRadius: 20,
							backgroundColor: '#7CC89A',
						},
						{
							width: progressAnim,
						},
					]}
				></Animated.View>
			</View>
		);
	};

	// useEffect(() => {
	// 	if (currentSurveyee.responseSuccess) {
	// 		handleNext();
	// 	}
	// }, [currentSurveyee.responseSuccess]);

	useEffect(() => {
		// Check for register error
		if (error.id === 'SURVEY_RESPONSE_ERROR') {
			// Toast.show({
			// 	type: 'error',
			// 	text1: 'Server error. Please try again later!',
			// 	text2: 'We are currently experiencing issues.',
			// });
			dispatch(clearErrors());
		}
	}, [error]);

	return (
		<SafeAreaView
			style={{
				flex: 1,
			}}
		>
			<View
				style={{
					flex: 1,
					paddingVertical: 40,
					paddingHorizontal: 16,
					backgroundColor: '#838084',
					position: 'relative',
				}}
			>
				<StatusBar barStyle="default" backgroundColor={COLORS.primary} />

				{/* ProgressBar */}
				{renderProgressBar()}

				{/* Question */}
				{renderQuestion()}

				{/* Options */}
				{renderOptions()}

				{/* Next Button */}
				{renderNextButton()}

				{/* Complete Modal */}
				<Modal
					animationType="slide"
					transparent={true}
					visible={showCompleteModal}
				>
					<View
						style={{
							flex: 1,
							backgroundColor: '#838084',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<View
							style={{
								backgroundColor: COLORS.white,
								width: '90%',
								borderRadius: 20,
								padding: 20,
								alignItems: 'center',
							}}
						>
							<Text style={{ fontSize: 30, fontWeight: 'bold' }}>
								{surveyQuiz?.currentSurveyQuiz?.length >
								surveyQuiz?.currentSurveyQuiz?.length / 2
									? 'Congratulations!'
									: 'Oops!'}
							</Text>

							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'flex-start',
									alignItems: 'center',
									marginVertical: 20,
								}}
							>
								<Text
									style={{
										fontSize: 30,
										color:
											surveyQuiz?.currentSurveyQuiz?.length >
											surveyQuiz?.currentSurveyQuiz?.length / 2
												? COLORS.success
												: COLORS.error,
									}}
								>
									{surveyQuiz?.currentSurveyQuiz?.length}
								</Text>
								<Text
									style={{
										fontSize: 20,
										color: COLORS.black,
									}}
								>
									/ {surveyQuiz?.currentSurveyQuiz?.length}
								</Text>
							</View>
							{/* Retry Quiz button */}
							<TouchableOpacity
								onPress={restartQuiz}
								style={{
									backgroundColor: '#7CC89A',
									padding: 20,
									width: '100%',
									borderRadius: 50,
								}}
							>
								<Text
									style={{
										textAlign: 'center',
										color: COLORS.white,
										fontSize: 20,
									}}
								>
									Restart Survey
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>

				{/* Background Image */}
				<Image
					source={{
						uri: 'https://raw.githubusercontent.com/RushikeshVidhate/react-native-quiz-app/master/app/assets/images/DottedBG.png',
					}}
					style={{
						width: SIZES.width,
						height: 130,
						zIndex: -1,
						position: 'absolute',
						bottom: 0,
						left: 0,
						right: 0,
						opacity: 0.5,
					}}
					resizeMode={'contain'}
				/>
			</View>
		</SafeAreaView>
	);
};

export default SurveyDetails;
