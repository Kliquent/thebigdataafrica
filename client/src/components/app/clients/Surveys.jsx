import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {
	MenuItem,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
	TableRow,
	TableCell,
	Button,
	Chip,
	IconButton,
	CircularProgress,
	TablePagination,
} from '@mui/material';

import { tokenConfig } from '../../../store/actions/survey-actions';

import Navbar from '../Navbar';
import { abbreviateNumber } from '../../../utils/AbbreviationNumber';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Surveys = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const token = tokenConfig();

	let urlParams = useParams();
	let clientId = urlParams?.clientId;

	const [currentClient, setCurrentClient] = useState({});
	const [analytics, setAnalytics] = useState({});

	useEffect(() => {
		(async () => {
			const response = await axios.get(
				`https://apis.thebigdataafrica.com/api/v1/auth/client/?clientId=${clientId}`,
				token
			);
			const currentClientData = await response.data?.current_user;

			if (currentClientData) {
				setCurrentClient((client) => ({
					...client,
					...currentClientData,
				}));
			}
		})();
	}, []);

	useEffect(() => {
		(async () => {
			const response = await axios.get(
				`https://apis.thebigdataafrica.com/api/v1/analytics/clients/${clientId}`,
				token
			);
			const analyticsData = await response.data;

			if (analyticsData) {
				setAnalytics((analytics) => ({
					...analytics,
					...analyticsData,
				}));
			}
		})();
	}, []);

	return (
		<>
			<Navbar />
			<main className="flex-1 max-h-full p-5 overflow-hidden overflow-y-scroll">
				<div className="flex flex-col items-start justify-start pb-6 space-x-2 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
					<IconButton onClick={() => navigate('/clients')}>
						<ArrowBackIcon />
					</IconButton>
					<h1 className="text-2xl font-semibold whitespace-nowrap">
						Client Name: {currentClient.name}
					</h1>
				</div>

				{/* Survey Stats */}
				<div className="pt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-4">
					<div className="min-w-0 rounded-lg ring-0 ring-gray-300 ring-opacity-4 overflow-hidden bg-white dark:bg-gray-800 flex h-full">
						<div className="p-4 flex items-center border border-gray-200 dark:border-gray-800 w-full rounded-lg">
							<div className="flex items-center justify-center p-3 rounded-full h-12 w-12 text-center mr-4 text-lg text-orange-600 dark:text-orange-100 bg-orange-200 dark:bg-orange-500">
								<i className="bx bx-purchase-tag text-orange-600 text-center text-2xl w-8 h-8"></i>
							</div>
							<div>
								<p className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">
									Surveys
								</p>
								<p className="text-2xl font-bold leading-none text-black dark:text-gray-200">
									{abbreviateNumber(analytics.totalSurveys)}
								</p>
							</div>
						</div>
					</div>
					<div className="min-w-0 rounded-lg ring-0 ring-gray-300 ring-opacity-4 overflow-hidden bg-white dark:bg-gray-800 flex h-full">
						<div className="p-4 flex items-center border border-gray-200 dark:border-gray-800 w-full rounded-lg">
							<div className="flex items-center justify-center p-3 rounded-full h-12 w-12 text-center mr-4 text-lg text-blue-600 dark:text-blue-100 bg-blue-200 dark:bg-blue-500">
								<svg
									stroke="currentColor"
									fill="none"
									strokeWidth={2}
									viewBox="0 0 24 24"
									strokeLinecap="round"
									strokeLinejoin="round"
									height="1em"
									width="1em"
									xmlns="http://www.w3.org/2000/svg"
								>
									<polyline points="23 4 23 10 17 10" />
									<polyline points="1 20 1 14 7 14" />
									<path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
								</svg>
							</div>
							<div>
								<p className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">
									Questions
								</p>
								<p className="text-2xl font-bold leading-none text-black dark:text-gray-200">
									{abbreviateNumber(analytics.totalQuestions)}
								</p>
							</div>
						</div>
					</div>
					<div className="min-w-0 rounded-lg ring-0 ring-gray-300 ring-opacity-4 overflow-hidden bg-white dark:bg-gray-800 flex h-full">
						<div className="p-4 flex items-center border border-gray-200 dark:border-gray-800 w-full rounded-lg">
							<div className="flex items-center justify-center p-3 rounded-full h-12 w-12 text-center mr-4 text-lg text-blue-600 dark:text-blue-100 bg-blue-200 dark:bg-blue-500">
								<svg
									stroke="currentColor"
									fill="none"
									strokeWidth={2}
									viewBox="0 0 24 24"
									strokeLinecap="round"
									strokeLinejoin="round"
									height="1em"
									width="1em"
									xmlns="http://www.w3.org/2000/svg"
								>
									<polyline points="23 4 23 10 17 10" />
									<polyline points="1 20 1 14 7 14" />
									<path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
								</svg>
							</div>
							<div>
								<p className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">
									Choices
								</p>
								<p className="text-2xl font-bold leading-none text-black dark:text-gray-200">
									{abbreviateNumber(analytics.totalOptions)}
								</p>
							</div>
						</div>
					</div>
					<div className="min-w-0 rounded-lg ring-0 ring-gray-300 ring-opacity-4 overflow-hidden bg-white dark:bg-gray-800 flex h-full">
						<div className="p-4 flex items-center border border-gray-200 dark:border-gray-800 w-full rounded-lg">
							<div className="flex items-center justify-center p-3 rounded-full h-12 w-12 text-center mr-4 text-lg text-green-600 dark:text-green-100 bg-green-200 dark:bg-green-500">
								<svg
									stroke="currentColor"
									fill="none"
									strokeWidth={2}
									viewBox="0 0 24 24"
									strokeLinecap="round"
									strokeLinejoin="round"
									height="1em"
									width="1em"
									xmlns="http://www.w3.org/2000/svg"
								>
									<polyline points="20 6 9 17 4 12" />
								</svg>
							</div>
							<div>
								<p className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">
									Responses
								</p>
								<p className="text-2xl font-bold leading-none text-black dark:text-gray-200">
									{abbreviateNumber(analytics.totalAnswers)}
								</p>
							</div>
						</div>
					</div>
					<div className="min-w-0 rounded-lg ring-0 ring-gray-300 ring-opacity-4 overflow-hidden bg-white dark:bg-gray-800 flex h-full">
						<div className="p-4 flex items-center border border-gray-200 dark:border-gray-800 w-full rounded-lg">
							<div className="flex items-center justify-center p-3 rounded-full h-12 w-12 text-center mr-4 text-lg text-gray-600 dark:text-gray-100 bg-gray-200 dark:bg-gray-500">
								<svg
									className="w-6 h-6"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
									/>
								</svg>
							</div>
							<div>
								<p className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">
									Researchers
								</p>
								<p className="text-2xl font-bold leading-none text-black dark:text-gray-200">
									{abbreviateNumber(analytics.totalResearchers)}
								</p>
							</div>
						</div>
					</div>
					<div className="min-w-0 rounded-lg ring-0 ring-gray-300 ring-opacity-4 overflow-hidden bg-white dark:bg-gray-800 flex h-full">
						<div className="p-4 flex items-center border border-gray-200 dark:border-gray-800 w-full rounded-lg">
							<div className="flex items-center justify-center p-3 rounded-full h-12 w-12 text-center mr-4 text-lg text-teal-600 dark:text-teal-100 bg-teal-200 dark:bg-teal-500">
								<svg
									className="w-6 h-6"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
									/>
								</svg>
							</div>
							<div>
								<p className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">
									Surveyees
								</p>
								<p className="text-2xl font-bold leading-none text-black dark:text-gray-200">
									{abbreviateNumber(analytics.totalSurveyee)}
								</p>
							</div>
						</div>
					</div>
					<div className="min-w-0 rounded-lg ring-0 ring-gray-300 ring-opacity-4 overflow-hidden bg-white dark:bg-gray-800 flex h-full">
						<div className="p-4 flex items-center border border-gray-200 dark:border-gray-800 w-full rounded-lg">
							<div className="flex items-center justify-center p-3 rounded-full h-12 w-12 text-center mr-4 text-lg text-yellow-600 dark:text-yellow-100 bg-yellow-200 dark:bg-yellow-500">
								<svg
									className="w-6 h-6"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
									/>
								</svg>
							</div>
							<div>
								<p className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">
									Locations
								</p>
								<p className="text-2xl font-bold leading-none text-black dark:text-gray-200">
									{abbreviateNumber(analytics.totalLocations)}
								</p>
							</div>
						</div>
					</div>
					<div className="min-w-0 rounded-lg ring-0 ring-gray-300 ring-opacity-4 overflow-hidden bg-white dark:bg-gray-800 flex h-full">
						<div className="p-4 flex items-center border border-gray-200 dark:border-gray-800 w-full rounded-lg">
							<div className="flex items-center justify-center p-3 rounded-full h-12 w-12 text-center mr-4 text-lg text-teal-600 dark:text-teal-100 bg-teal-200 dark:bg-teal-500">
								<svg
									className="w-6 h-6"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
									/>
								</svg>
							</div>
							<div>
								<p className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">
									Response Events
								</p>
								<p className="text-2xl font-bold leading-none text-black dark:text-gray-200">
									{abbreviateNumber(analytics.totalAnswerEvents)}
								</p>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
};

export default Surveys;
