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
	TextInput,
	TouchableOpacity,
	Modal,
	Animated,
	ActivityIndicator,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
// import Toast from 'react-native-toast-message';
import { COLORS, SIZES } from '../../constants';
import {
	postSurveyeeResponse,
	getSurveyQuestions,
	getOptionsByQuestion,
} from '../../store/actions/Surveys';
import { clearErrors } from '../../store/actions/Error';
import { Checkbox, RadioButton } from 'react-native-paper';

const { height } = Dimensions.get('screen');

const SurveyDetails = ({ navigation }) => {
	const dispatch = useDispatch();
	const isFocused = useIsFocused();

	let currentSurvey = useSelector((state) => state.surveys?.currentSurvey);
	let surveyQuestions = useSelector(
		(state) => state.surveys?.getSurveyQuestions
	);
	let questionOptions = useSelector(
		(state) => state.surveys?.optionsByQuestion
	);
	let currentSurveyee = useSelector((state) => state.surveys?.currentSurveyee);
	let error = useSelector((state) => state.error);

	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [selectedOption, setSelectedOption] = useState(false);
	const [checkSelectedOption, setCheckSelectedOption] = useState([]);
	const [showNextButton, setShowNextButton] = useState(false);
	const [showCompleteModal, setShowCompleteModal] = useState(false);
	const [progress, setProgress] = useState(new Animated.Value(0));
	const [optionText, setOptionText] = useState('');
	const [buttonLoading, setButtonLoading] = useState(false);

	useEffect(() => {
		dispatch(getSurveyQuestions(currentSurvey?._id));
	}, [isFocused]);

	useEffect(() => {
		if (surveyQuestions[currentQuestionIndex]?._id) {
			dispatch(
				getOptionsByQuestion(surveyQuestions[currentQuestionIndex]?._id)
			);
		}
	}, [isFocused, surveyQuestions[currentQuestionIndex]?._id]);

	const progressAnim = progress.interpolate({
		inputRange: [0, surveyQuestions?.length],
		outputRange: ['0%', '100%'],
	});

	useEffect(() => {
		if (optionText !== '') {
			// Show Next Button
			setShowNextButton(true);
		} else {
			setShowNextButton(false);
		}
	}, [optionText]);

	// getCurrentOption from input field option
	const getCurrentOption = (option, answerText) => {
		// State for input text
		setOptionText(answerText);

		const body = {
			survey_question_id: '', // provide field to avoid error
			question_id: surveyQuestions[currentQuestionIndex]?._id,
			option_id: option._id,
			answerText: answerText,
			location: '',
			surveyee: currentSurveyee,
		};
		setSelectedOption(body);
	};

	const validateAnswer = (option) => {
		if (option.type === 'Checkbox') {
			const body = {
				survey_question_id: '', // provide field to avoid error
				question_id: surveyQuestions[currentQuestionIndex]?._id,
				option_id: option._id,
				answerText: '',
				location: '',
				surveyee: currentSurveyee,
			};

			let newArray = checkSelectedOption.slice();

			if (
				newArray[newArray?.findIndex((x) => x.option_id === option._id)]
					?.option_id === option._id
			) {
				let filteredItems = newArray.filter(
					(item) => item.option_id !== option._id
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
				survey_question_id: '', // provide field to avoid error
				question_id: surveyQuestions[currentQuestionIndex]?._id,
				option_id: option._id,
				answerText: '',
				location: '',
				surveyee: currentSurveyee,
			};
			setSelectedOption(body);
			// Show Next Button
			setShowNextButton(true);
		}
	};

	const handleNext = async () => {
		if (currentQuestionIndex == surveyQuestions?.length - 1) {
			// Handle last quiz dispatch
			setButtonLoading(true);

			// dispatch checkBoxes response
			checkSelectedOption?.map(async (option) => {
				await dispatch(postSurveyeeResponse(option));
			});

			// Clear state on Checkbox to avoid sending duplicate data
			setCheckSelectedOption([]);

			// dispatch radioButton response
			await dispatch(postSurveyeeResponse(selectedOption));

			// Clear state to avoid sending duplicate data
			setSelectedOption([]);

			// Show Score Modal
			setShowCompleteModal(true);
			setButtonLoading(false);
		} else {
			setButtonLoading(true);
			// dispatch checkBoxes response
			checkSelectedOption?.map(async (option) => {
				await dispatch(postSurveyeeResponse(option));
			});

			// Clear state on Checkbox to avoid sending duplicate data
			setCheckSelectedOption([]);

			// dispatch radioButton response
			await dispatch(postSurveyeeResponse(selectedOption));

			// Clear state to avoid sending duplicate data
			setSelectedOption([]);

			// Show next question
			setCurrentQuestionIndex(currentQuestionIndex + 1);
			setShowNextButton(false);
			setButtonLoading(false);
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
						/ {surveyQuestions?.length}
					</Text>
				</View>

				{/* Question */}
				<Text
					style={{
						color: COLORS.white,
						fontSize: 25,
					}}
				>
					{surveyQuestions[currentQuestionIndex]?.name}
				</Text>
				<Text
					style={{
						color: COLORS.white,
						fontSize: 15,
						opacity: 0.8,
						marginVertical: 5,
						marginRight: 2,
					}}
				>
					Choose one/multiple options or Input text.
				</Text>
			</View>
		);
	};

	const renderOptions = () => {
		return (
			<View style={{ height: height * 0.36 }}>
				<ScrollView showsVerticalScrollIndicator={false}>
					{questionOptions?.map((option) => {
						// console.log(option);
						const { _id, select_type, type, name } = option;

						return (
							<Fragment key={_id}>
								{type === 'Checkbox' ? (
									<Checkbox.Item
										labelStyle={{ color: '#fff' }}
										label={name}
										status={
											_id ===
											checkSelectedOption[
												checkSelectedOption?.findIndex(
													(x) => x.option_id === _id
												)
											]?.option_id
												? 'checked'
												: 'unchecked'
										}
										onPress={() => {
											validateAnswer(option);
										}}
									/>
								) : type === 'Radio' ? (
									<RadioButton.Group>
										<RadioButton.Item
											status={
												_id == selectedOption.option_id
													? 'checked'
													: 'unchecked'
											}
											onPress={() => {
												validateAnswer(option);
											}}
											value={name}
											label={name}
											labelStyle={{ color: '#fff' }}
										/>
									</RadioButton.Group>
								) : (
									<>
										<Text
											style={{
												color: COLORS.white,
												fontSize: 18,
												opacity: 0.9,
												marginVertical: 5,
											}}
										>
											{name}
										</Text>
										<TextInput
											style={{ height: 50, color: 'white' }}
											placeholder="Type your suggestion"
											placeholderTextColor="white"
											inputStyle={{ color: 'white' }}
											onChangeText={(newText) =>
												getCurrentOption(option, newText)
											}
											value={optionText}
										/>
									</>
								)}
							</Fragment>
						);
					})}
				</ScrollView>
			</View>
		);
	};

	const renderNextButton = () => {
		if (showNextButton) {
			return (
				<TouchableOpacity
					disabled={buttonLoading ? true : false}
					onPress={handleNext}
					style={{
						marginTop: 5,
						width: '100%',
						backgroundColor: '#7CC89A',
						padding: 20,
						borderRadius: 50,
					}}
				>
					{buttonLoading ? (
						<ActivityIndicator color="#fff" size="small" />
					) : (
						<Text
							style={{ fontSize: 20, color: COLORS.white, textAlign: 'center' }}
						>
							Next
						</Text>
					)}
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

	// Automatically route to next question
	// useEffect(() => {
	// 	if (currentSurveyee.responseSuccess) {
	// 		handleNext();
	// 	}
	// }, [currentSurveyee.responseSuccess]);

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
								{surveyQuestions?.length > surveyQuestions?.length / 2
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
											surveyQuestions?.length > surveyQuestions?.length / 2
												? COLORS.success
												: COLORS.error,
									}}
								>
									{surveyQuestions?.length}
								</Text>
								<Text style={{ fontSize: 40 }}>/</Text>
								<Text
									style={{
										fontSize: 20,
										color: COLORS.black,
									}}
								>
									{surveyQuestions?.length}
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
