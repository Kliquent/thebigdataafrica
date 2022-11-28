import React from 'react';
import {
	ScrollView,
	Keyboard,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default TextInputAvoidingView = ({ children }) => {
	const insets = useSafeAreaInsets();
	return Platform.OS === 'ios' ? (
		<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				{children}
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	) : (
		<KeyboardAvoidingView style={{ flex: 1 }}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				{children}
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
};
