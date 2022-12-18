import React, { useState, useEffect, Fragment } from 'react';
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

import {
	tokenConfig,
	getClientSurveys,
} from '../../../store/actions/survey-actions';
import { getClientResearchers } from '../../../store/actions/researcher-actions';
import { getClientSurveyees } from '../../../store/actions/client-actions';
import { getClientAnswerAnalytics } from '../../../store/actions/answer-actions';

import Navbar from '../Navbar';
import { abbreviateNumber } from '../../../utils/AbbreviationNumber';

import ResponsePieChart from '../../chart/ResponsePieChart';
import ResponseBarChart from '../../chart/ResponseBarChart';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Surveys = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const token = tokenConfig();

	let urlParams = useParams();
	let clientId = urlParams?.clientId;

	let surveyLoading = useSelector((state) => state.surveys?.isLoading);
	let clientSurveys = useSelector((state) => state.surveys?.getClientSurveys);

	let researcherLoading = useSelector((state) => state.researchers?.isLoading);
	let researchers = useSelector(
		(state) => state.researchers?.getClientResearchers
	);

	// API call under client redux action
	let clientLoading = useSelector((state) => state.clients?.isLoading);
	let surveyees = useSelector((state) => state.clients?.getClientSurveyees);

	let answerLoading = useSelector((state) => state.answers?.isLoading);
	let answerClientAnalytics = useSelector(
		(state) => state.answers?.getClientAnswerAnalytics
	);

	// console.log(answerClientAnalytics);

	const [currentClient, setCurrentClient] = useState({});
	const [analytics, setAnalytics] = useState({});

	const pages = [10, 20, 50];
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(pages[page]);

	const handlePageChange = (event, newPage) => {
		setPage(newPage);
	};

	const handleRowsPerPageChange = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

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

	useEffect(() => {
		dispatch(getClientSurveys(clientId));
	}, []);

	useEffect(() => {
		dispatch(getClientResearchers(clientId));
	}, []);

	useEffect(() => {
		dispatch(getClientSurveyees(clientId));
	}, []);

	useEffect(() => {
		dispatch(getClientAnswerAnalytics(clientId));
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

				{/* Client Surveys */}
				<h1 className="my-6 text-lg font-bold text-gray-700 dark:text-gray-300">
					Your Surveys
				</h1>

				<div className="mt-8 w-full overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg ring-1 ring-black ring-opacity-5 mb-8">
					<div className="w-full overflow-x-auto no-scrollbar">
						<table className="w-full whitespace-nowrap">
							<thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-800">
								<tr>
									<td className="px-4 py-3">Type</td>
									<td className="px-4 py-3">Title</td>
									<td className="px-4 py-3">Last Updated</td>
									<td className="px-4 py-3">Status</td>
									<td className="px-4 py-3 text-center">Action</td>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-100 dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400">
								{clientSurveys.length > 0 ? (
									clientSurveys.map((survey, index) => {
										const { _id, type, title, updatedAt, active } = survey;
										return (
											<tr key={index} className="">
												<td className="px-4 py-3">
													<span className="text-sm">{type}</span>
												</td>
												<td className="px-4 py-3">
													<span className="text-sm">{title}</span>
												</td>

												<td className="px-4 py-3">
													<span className="text-sm">
														{new Date(`${updatedAt}`).toLocaleString()}
													</span>
												</td>

												<td className="px-4 py-3">
													<span className="font-serif">
														{active === true ? (
															<span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-100">
																Active
															</span>
														) : (
															<span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-red-500 bg-red-100 dark:text-red-100 dark:bg-red-800">
																Inactive
															</span>
														)}
													</span>
												</td>
												<td className="px-4 py-3">
													<div className="flex items-center justify-center text-right">
														<div className="p-2 cursor-pointer text-gray-400 hover:text-green-600">
															<IconButton
																onClick={() =>
																	navigate(`/surveys-details/${_id}`)
																}
															>
																<svg
																	className="w-6 h-6"
																	fill="none"
																	stroke="currentColor"
																	viewBox="0 0 24 24"
																	height="1em"
																	width="1em"
																	xmlns="http://www.w3.org/2000/svg"
																>
																	<path
																		strokeLinecap="round"
																		strokeLinejoin="round"
																		strokeWidth={2}
																		d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
																	/>
																</svg>
															</IconButton>
														</div>
													</div>
												</td>
											</tr>
										);
									})
								) : (
									<TableRow>
										<TableCell
											colSpan={12}
											style={{ padding: '1rem', textAlign: 'center' }}
										>
											{surveyLoading ? (
												<CircularProgress
													variant="indeterminate"
													disableShrink
													size={25}
													thickness={4}
												/>
											) : (
												<p>You have no surveys</p>
											)}
										</TableCell>
									</TableRow>
								)}
							</tbody>
						</table>
					</div>
					<div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-white text-gray-500 dark:text-gray-400 dark:bg-gray-800">
						<div className="flex flex-col justify-between text-xs sm:flex-row text-gray-600 dark:text-gray-400">
							<span className="flex items-center font-semibold tracking-wide uppercase">
								Showing 1-{clientSurveys.length} of{' '}
								{clientSurveys.length ? clientSurveys.length : 0}
							</span>
							<div className="flex mt-2 sm:mt-auto sm:justify-end">
								<TablePagination
									sx={{ overflow: 'hidden' }}
									component="div"
									page={page}
									rowsPerPageOptions={pages}
									rowsPerPage={rowsPerPage}
									count={clientSurveys.length ? clientSurveys.length : 0}
									onPageChange={handlePageChange}
									onRowsPerPageChange={handleRowsPerPageChange}
								/>
							</div>
						</div>
					</div>
				</div>

				{/* Client Researchers */}
				<h1 className="my-6 text-lg font-bold text-gray-700 dark:text-gray-300">
					Researchers
				</h1>

				<div className="mt-8 w-full overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg ring-1 ring-black ring-opacity-5 mb-8">
					<div className="w-full overflow-x-auto no-scrollbar">
						<table className="w-full whitespace-nowrap">
							<thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-800">
								<tr>
									<td className="px-4 py-3">Name</td>
									<td className="px-4 py-3">Email</td>
									<td className="px-4 py-3">Phone</td>
									<td className="px-4 py-3">Gender</td>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-100 dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400">
								{researchers.length > 0 ? (
									researchers.map((researcher, index) => {
										const { researcher_id } = researcher;

										return (
											<tr key={index} className="">
												<td className="px-4 py-3">
													<span className="text-sm">{researcher_id?.name}</span>
												</td>

												<td className="px-4 py-3">
													<span className="text-sm">
														{researcher_id?.email}
													</span>
												</td>

												<td className="px-4 py-3">
													<span className="text-sm">
														{researcher_id?.phone}
													</span>
												</td>

												<td className="px-4 py-3">
													<span className="text-sm">
														{researcher_id?.gender}
													</span>
												</td>
											</tr>
										);
									})
								) : (
									<TableRow>
										<TableCell
											colSpan={12}
											style={{ padding: '1rem', textAlign: 'center' }}
										>
											{researcherLoading ? (
												<CircularProgress
													variant="indeterminate"
													disableShrink
													size={25}
													thickness={4}
												/>
											) : (
												<p>You have no researchers</p>
											)}
										</TableCell>
									</TableRow>
								)}
							</tbody>
						</table>
					</div>
					<div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-white text-gray-500 dark:text-gray-400 dark:bg-gray-800">
						<div className="flex flex-col justify-between text-xs sm:flex-row text-gray-600 dark:text-gray-400">
							<span className="flex items-center font-semibold tracking-wide uppercase">
								Showing 1-{researchers.length} of{' '}
								{researchers.length ? researchers.length : 0}
							</span>
							<div className="flex mt-2 sm:mt-auto sm:justify-end">
								<TablePagination
									sx={{ overflow: 'hidden' }}
									component="div"
									page={page}
									rowsPerPageOptions={pages}
									rowsPerPage={rowsPerPage}
									count={researchers.length ? researchers.length : 0}
									onPageChange={handlePageChange}
									onRowsPerPageChange={handleRowsPerPageChange}
								/>
							</div>
						</div>
					</div>
				</div>

				{/* Client Surveyees */}
				<h1 className="my-6 text-lg font-bold text-gray-700 dark:text-gray-300">
					Surveyees
				</h1>

				<div className="mt-8 w-full overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg ring-1 ring-black ring-opacity-5 mb-8">
					<div className="w-full overflow-x-auto no-scrollbar">
						<table className="w-full whitespace-nowrap">
							<thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-800">
								<tr>
									<td className="px-4 py-3">Name</td>
									<td className="px-4 py-3">Email</td>
									<td className="px-4 py-3">Phone</td>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-100 dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400">
								{surveyees.length > 0 ? (
									surveyees.map((surveyee, index) => {
										const { surveyee_id } = surveyee;

										return (
											<tr key={index} className="">
												<td className="px-4 py-3">
													<span className="text-sm">{surveyee_id?.name}</span>
												</td>

												<td className="px-4 py-3">
													<span className="text-sm">
														{surveyee_id?.email
															? surveyee_id?.email
															: 'Email address not provided by Surveyee'}
													</span>
												</td>

												<td className="px-4 py-3">
													<span className="text-sm">{surveyee_id?.phone}</span>
												</td>
											</tr>
										);
									})
								) : (
									<TableRow>
										<TableCell
											colSpan={12}
											style={{ padding: '1rem', textAlign: 'center' }}
										>
											{clientLoading ? (
												<CircularProgress
													variant="indeterminate"
													disableShrink
													size={25}
													thickness={4}
												/>
											) : (
												<p>You have no surveyees</p>
											)}
										</TableCell>
									</TableRow>
								)}
							</tbody>
						</table>
					</div>
					<div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-white text-gray-500 dark:text-gray-400 dark:bg-gray-800">
						<div className="flex flex-col justify-between text-xs sm:flex-row text-gray-600 dark:text-gray-400">
							<span className="flex items-center font-semibold tracking-wide uppercase">
								Showing 1-{surveyees.length} of{' '}
								{surveyees.length ? surveyees.length : 0}
							</span>
							<div className="flex mt-2 sm:mt-auto sm:justify-end">
								<TablePagination
									sx={{ overflow: 'hidden' }}
									component="div"
									page={page}
									rowsPerPageOptions={pages}
									rowsPerPage={rowsPerPage}
									count={surveyees.length ? surveyees.length : 0}
									onPageChange={handlePageChange}
									onRowsPerPageChange={handleRowsPerPageChange}
								/>
							</div>
						</div>
					</div>
				</div>

				{/* Response Analytics By Survey Question */}
				<h1 className="my-6 text-lg font-bold text-gray-700 dark:text-gray-300">
					Response Analytics By Survey Questions
				</h1>

				<div className="wrapper">
					{answerClientAnalytics.length > 0 ? (
						answerClientAnalytics.map((analytics, index) => {
							const { _id, options, totalQuestionOptions } = analytics;

							return (
								<Fragment key={index}>
									<Accordion
										title={
											_id[0]?.name ? _id[0]?.name : 'Question not available'
										}
									>
										<div className="flex items-center justify-between">
											{_id[0]?.description}
										</div>
										<div className="mt-8 flex justify-between item-center">
											<div className="flex items-center space-x-2">
												<h3 className="text-xl whitespace-nowrap">
													{totalQuestionOptions} Total Question Choices
												</h3>
											</div>
										</div>
										<div className="grid gap-4 md:grid-cols-2 my-8">
											<div className="min-w-0 p-4 bg-white rounded-lg  ring-1 ring-gray-200 ring-opacity-4 dark:bg-gray-800">
												<p className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
													Bar Chart Representation
												</p>
												<ResponseBarChart options={options} />
											</div>
											<div className="min-w-0 p-4 bg-white rounded-lg ring-1 ring-gray-200 ring-opacity-4 dark:bg-gray-800">
												<p className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
													Pie Chart Representation
												</p>
												<ResponsePieChart options={options} />
											</div>
										</div>
									</Accordion>
								</Fragment>
							);
						})
					) : (
						<div className="flex items-center justify-center">
							{answerLoading ? (
								<CircularProgress
									variant="indeterminate"
									disableShrink
									size={25}
									thickness={4}
								/>
							) : (
								<p>You have no responses</p>
							)}
						</div>
					)}
				</div>
			</main>
		</>
	);
};

export default Surveys;

const Accordion = ({ title, children }) => {
	const [isOpen, setOpen] = React.useState(false);
	return (
		<div className="accordion-wrapper">
			<div
				className={`accordion-title ${isOpen ? 'open' : ''}`}
				onClick={() => setOpen(!isOpen)}
			>
				{title}
			</div>
			<div className={`accordion-item ${!isOpen ? 'collapsed' : ''}`}>
				<div className="accordion-content">{children}</div>
			</div>
		</div>
	);
};
