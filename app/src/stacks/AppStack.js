import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import {
	createStackNavigator,
	CardStyleInterpolators,
} from '@react-navigation/stack';
import { Octicons, Feather, AntDesign } from '@expo/vector-icons';
import {
	Home,
	Details,
	SurveyeeForm,
	SurveyDetails,
	Profile,
	Notifications,
} from '../screens/app';

const HomeStackScreen = createStackNavigator();
const ProfileStackScreen = createStackNavigator();

export const HomeStack = ({ navigation }) => {
	return (
		<>
			<HomeStackScreen.Navigator
				screenOptions={{
					cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
					presentation: 'card', // modal
				}}
			>
				<HomeStackScreen.Screen
					headerMode="screen"
					name="HomeScreen"
					component={Home}
					options={{
						title: 'Home',
						headerRight: () => (
							<View style={{ flexDirection: 'row' }}>
								<Feather
									name="bell"
									size={20}
									style={{ paddingHorizontal: 15 }}
									color="#000"
									onPress={() => navigation.navigate('Notifications')}
								/>
							</View>
						),
					}}
				/>
				<HomeStackScreen.Screen
					headerMode="screen"
					name="SurveyDetails"
					cardStyle={{ zIndex: 1000 }}
					component={SurveyDetails}
					options={{
						title: 'Current Survey',
						headerLeft: () => (
							<AntDesign
								name="close"
								size={24}
								style={{ paddingHorizontal: 15 }}
								color="#000"
								onPress={() => navigation.navigate('HomeScreen')}
							/>
						),
					}}
				/>
				<HomeStackScreen.Screen
					headerMode="screen"
					name="SurveyeeForm"
					cardStyle={{ zIndex: 1000 }}
					component={SurveyeeForm}
					options={{
						title: 'Surveyee Form',
						headerLeft: () => (
							<AntDesign
								name="close"
								size={24}
								style={{ paddingHorizontal: 15 }}
								color="#000"
								onPress={() => navigation.navigate('HomeScreen')}
							/>
						),
					}}
				/>
				<HomeStackScreen.Screen
					name="Notifications"
					component={Notifications}
					options={{
						headerLeft: () => (
							<AntDesign
								name="close"
								size={24}
								style={{ paddingHorizontal: 15 }}
								color="#000"
								onPress={() => navigation.navigate('HomeScreen')}
							/>
						),
					}}
				/>
			</HomeStackScreen.Navigator>
		</>
	);
};

export const ProfileStack = ({ navigation }) => {
	return (
		<ProfileStackScreen.Navigator
			screenOptions={{
				cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
				presentation: 'card', // modal
			}}
		>
			<HomeStackScreen.Screen
				headerMode="screen"
				name="ProfileScreen"
				component={Profile}
				options={{
					title: 'Profile',
					headerRight: () => (
						<View style={{ flexDirection: 'row' }}>
							<Feather
								name="bell"
								size={20}
								style={{ paddingHorizontal: 15 }}
								color="#000"
								onPress={() => navigation.navigate('ProfileNotifications')}
							/>
						</View>
					),
				}}
			/>
			<HomeStackScreen.Screen
				headerMode="screen"
				name="ProfileNotifications"
				component={Notifications}
				options={{
					title: 'Notifications',
					headerLeft: () => (
						<AntDesign
							name="close"
							size={24}
							style={{ paddingHorizontal: 15 }}
							color="#000"
							onPress={() => navigation.navigate('ProfileScreen')}
						/>
					),
				}}
			/>
		</ProfileStackScreen.Navigator>
	);
};
