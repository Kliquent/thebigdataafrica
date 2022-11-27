import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Routes, Route } from 'react-router-dom';
import {
	Landing,
	// Sidebar components
	Home,
	Clients,
	Researchers,
	Administrators,
	// Content
	SurveyDetails,
} from './components/app';
import { PrivateRoute } from './middleware';
import { Login, ForgotPassword, PageNotFound } from './components';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import './App.css';

const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<Routes>
				<Route
					path="/"
					element={
						<PrivateRoute>
							<Landing />
						</PrivateRoute>
					}
				>
					{/* Sidebar details */}
					<Route
						index
						element={
							<PrivateRoute>
								<Home />
							</PrivateRoute>
						}
					/>
					<Route
						path="clients"
						element={
							<PrivateRoute>
								<Clients />
							</PrivateRoute>
						}
					/>
					<Route
						path="researchers"
						element={
							<PrivateRoute>
								<Researchers />
							</PrivateRoute>
						}
					/>
					<Route
						path="administrators"
						element={
							<PrivateRoute>
								<Administrators />
							</PrivateRoute>
						}
					/>

					{/* Survey Content */}
					<Route
						path="/surveys-details/:surveyId"
						element={<SurveyDetails />}
					/>
				</Route>
				<Route path="/login" element={<Login />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
				<Route path="*" element={<PageNotFound />} />
			</Routes>
			<Toaster position="top-center" />
		</ThemeProvider>
	);
};

export default App;

const theme = createTheme({
	shape: {
		borderRadius: 7,
	},
	palette: {
		primary: {
			main: '#00ab55',
		},
		secondary: {
			main: '#f68b1e',
		},
		default: {
			main: '#F8F9FA',
		},
	},
});
