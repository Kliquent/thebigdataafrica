import styled from 'styled-components';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import Constants from 'expo-constants';

const StatusBarHeight = Constants.statusBarHeight;

// colors
export const Colors = {
	primary: '#fff',
	secondary: '#E5E7EB',
	tertiary: '#1F2937',
	darkLight: '#9CA3AF',
	brand: '#7CC89A',
	green: '#10B981',
	red: '#EF4444',
};

const { primary, secondary, tertiary, darkLight, brand, green, red } = Colors;

export const StyledButton = styled.TouchableOpacity`
	padding: 15px;
	background-color: ${brand};
	justify-content: center;
	align-items: center;
	border-radius: 50px;
	margin-vertical: 5px;
	height: 60px;

	${(props) =>
		props.google == true &&
		`
    background-color: ${green};
    flex-direction: row;
    justify-content: center;
  `}
`;

export const ButtonText = styled.Text`
	color: ${primary};
	font-size: 16px;

	${(props) =>
		props.google == true &&
		`
    color: ${primary};
    padding: 25px;
  `}
`;
