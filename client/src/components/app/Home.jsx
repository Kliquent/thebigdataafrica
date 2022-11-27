import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import {
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
	Autocomplete,
	IconButton,
	CircularProgress,
	TablePagination,
} from '@mui/material';
import { useForm } from 'react-hook-form';

import {
	createSurvey,
	updateSurvey,
	deleteSurvey,
	getSurveys,
	getSurvey,
	tokenConfig,
} from '../../store/actions/survey-actions';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CustomButton from '../../utils/CustomButton';

import Navbar from './Navbar';
// import { PieChartM, BarChartM } from '../charts/home';
import { abbreviateNumber } from '../../utils/AbbreviationNumber';

const Home = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const token = tokenConfig();

	let auth = useSelector((state) => state.auth);
	let surveyLoading = useSelector((state) => state.surveys?.isLoading);
	let surveys = useSelector((state) => state.surveys?.surveys);

	const pages = [10, 20, 50];
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(pages[page]);

	const [openPopup, setOpenPopup] = useState(false);
	const [openViewPopup, setOpenViewPopup] = useState(false);
	const [openEditPopup, setOpenEditPopup] = useState(false);
	const [openDeletePopup, setOpenDeletePopup] = useState(false);
	const [buttonLoading, setButtonLoading] = useState(false);

	const [updatedSurvey, setUpdatedSurvey] = useState([]);
	const [updatedResearcher, setUpdatedResearcher] = useState([]);
	const [updatedClient, setUpdatedClient] = useState([]);
	const [deletedSurvey, setDeletedSurvey] = useState([]);

	const [open, setOpen] = useState(false);
	const [options, setOptions] = useState([]);
	const [selectedResearcher, setSelectedResearcher] = useState([]);

	const [openClient, setOpenClient] = useState(false);
	const [optionsClient, setOptionsClient] = useState([]);
	const [selectedClient, setSelectedClient] = useState([]);

	const loading = open && options.length === 0;
	const loadingClient = openClient && optionsClient.length === 0;

	useEffect(() => {
		dispatch(getSurveys());
	}, []);

	useEffect(() => {
		let active = true;

		if (!loading) {
			return undefined;
		}

		let roleId = '638321784a197589eeedf7fa'; // for researcher

		(async () => {
			const response = await axios.get(
				`https://apis.thebigdataafrica.com/api/v1/auth/users-by-role/${roleId}`,
				token
			);
			const users = await response.data.users;

			if (active) {
				setOptions(users);
			}
		})();

		return () => {
			active = false;
		};
	}, [loading]);

	useEffect(() => {
		let active = true;

		if (!loadingClient) {
			return undefined;
		}

		let roleId = '638321904a197589eeedf7ff'; // for client

		(async () => {
			const response = await axios.get(
				`https://apis.thebigdataafrica.com/api/v1/auth/users-by-role/${roleId}`,
				token
			);
			const users = await response.data.users;

			if (active) {
				setOptionsClient(users);
			}
		})();

		return () => {
			active = false;
		};
	}, [loadingClient]);

	const handlePageChange = (event, newPage) => {
		setPage(newPage);
	};

	const handleRowsPerPageChange = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'all',
		shouldUnregister: true,
		shouldFocusError: true,
	});

	const handleCloseDialog = () => {
		setOpenPopup(false);
	};

	const handleCloseEditDialog = () => {
		reset({
			name: '',
			description: '',
		});
		setOpenEditPopup(false);
	};

	const handleCloseDeleteDialog = () => {
		setOpenDeletePopup(false);
	};

	const selectedOption = (value) => {
		setSelectedResearcher(value);
	};

	const selectedOptionClient = (value) => {
		setSelectedClient(value);
	};

	const handleClickOpen = () => {
		setOpenPopup(true);
	};

	const handleEditPopup = (data, e) => {
		e.preventDefault();
		const { title, description, researcher, owner } = data;

		reset({
			title,
			description,
			researcher: researcher?.name,
			client: owner?.name,
		});

		setUpdatedSurvey(data);
		setUpdatedResearcher(researcher);
		setUpdatedClient(owner);
		setOpenEditPopup(true);
	};

	const onSubmit = async (data, e) => {
		e.preventDefault();
		const { title, description } = data;

		setButtonLoading(true);

		const payload = {
			title,
			description,
			researcher_id: selectedResearcher?._id,
			client_id: selectedClient?._id,
		};

		await dispatch(createSurvey(payload));
		await dispatch(getSurveys());

		setButtonLoading(false);
		handleCloseDialog();
	};

	const onSubmitEdit = async (data, e) => {
		e.preventDefault();
		setButtonLoading(true);
		const { title, description } = data;

		const updatedData = {
			_id: updatedSurvey._id,
			title,
			description,
			researcher_id: selectedResearcher?._id,
			client_id: selectedClient?._id,
		};

		await dispatch(updateSurvey(updatedData));
		await dispatch(getSurveys());

		setButtonLoading(false);
		handleCloseEditDialog();
	};

	const handleDeleteSurvey = (survey) => {
		setDeletedSurvey(survey);
		setOpenDeletePopup(true);
	};

	const confirmDeleteSurvey = async () => {
		setButtonLoading(true);
		await dispatch(deleteSurvey(deletedSurvey));
		await dispatch(getSurveys());
		setButtonLoading(false);
		handleCloseDeleteDialog();
	};

	return (
		<>
			<Navbar />
			<main className="flex-1 max-h-full p-5 overflow-hidden overflow-y-scroll">
				<div className="flex flex-col items-start justify-between pb-6 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
					<div className="flex items-center space-x-2">
						<h1 className="text-2xl font-semibold whitespace-nowrap">
							Surveys Dashboard
						</h1>
						<h3 className="text-gray-500">
							Welcome back, {auth?.user?.current_user?.name}
						</h3>
					</div>
					<div className="w-full md:w-56 lg:w-56 xl:w-56">
						<button
							onClick={handleClickOpen}
							className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 text-sm text-white bg-green-500 border border-transparent active:bg-green-600 hover:bg-green-600 focus:ring focus:ring-purple-300 w-full rounded-md h-12"
							type="button"
						>
							<span className="mr-3">
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
									<line x1={12} y1={5} x2={12} y2={19} />
									<line x1={5} y1={12} x2={19} y2={12} />
								</svg>
							</span>
							New Survey
						</button>
					</div>
				</div>

				{/* Survey Stats */}
				<div className="pt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
					<div className="min-w-0 rounded-lg ring-0 ring-gray-300 ring-opacity-4 overflow-hidden bg-white dark:bg-gray-800 flex h-full">
						<div className="p-4 flex items-center border border-gray-200 dark:border-gray-800 w-full rounded-lg">
							<div className="flex items-center justify-center p-3 rounded-full h-12 w-12 text-center mr-4 text-lg text-orange-600 dark:text-orange-100 bg-orange-200 dark:bg-orange-500">
								<i className="bx bx-purchase-tag text-orange-600 text-center text-2xl w-8 h-8"></i>
							</div>
							<div>
								<p className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">
									Survey Send
								</p>
								<p className="text-2xl font-bold leading-none text-black dark:text-gray-200">
									{abbreviateNumber(157)}
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
									Received Responses
								</p>
								<p className="text-2xl font-bold leading-none text-black dark:text-gray-200">
									{abbreviateNumber(2910)}
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
									Response Pending
								</p>
								<p className="text-2xl font-bold leading-none text-black dark:text-gray-200">
									{abbreviateNumber(380)}
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
									Clients
								</p>
								<p className="text-2xl font-bold leading-none text-black dark:text-gray-200">
									{abbreviateNumber(260)}
								</p>
							</div>
						</div>
					</div>
				</div>
				{/* Visual Charts */}
				<div className="grid gap-4 md:grid-cols-2 my-8">
					<div className="min-w-0 p-4 bg-white rounded-lg  ring-1 ring-gray-200 ring-opacity-4 dark:bg-gray-800">
						<p className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
							Conversions This Year
						</p>
						{/* <BarChartM /> */}
					</div>
					<div className="min-w-0 p-4 bg-white rounded-lg ring-1 ring-gray-200 ring-opacity-4 dark:bg-gray-800">
						<p className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
							Vertical Performance
						</p>
						{/* <PieChartM /> */}
					</div>
				</div>
				{/* Recent Orders */}
				<h1 className="my-6 text-lg font-bold text-gray-700 dark:text-gray-300">
					Surveys
				</h1>

				<div className="w-full overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg ring-1 ring-black ring-opacity-5 mb-8">
					<div className="w-full overflow-x-auto no-scrollbar">
						<table className="w-full whitespace-nowrap">
							<thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-800">
								<tr>
									<td className="px-4 py-3">Type</td>
									<td className="px-4 py-3 text-center">Title</td>
									<td className="px-4 py-3">Client Name</td>
									<td className="px-4 py-3">Researcher</td>
									<td className="px-4 py-3">Created By</td>
									<td className="px-4 py-3">Last Updated</td>
									<td className="px-4 py-3">Status</td>
									<td className="px-4 py-3 text-center">Action</td>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-100 dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400">
								{surveys.length > 0 ? (
									surveys.map((survey, index) => {
										const {
											type,
											title,
											owner,
											researcher,
											created_by,
											updatedAt,
											active,
										} = survey;
										return (
											<tr key={index} className="">
												<td className="px-4 py-3">
													<span className="text-sm">{type}</span>
												</td>
												<td className="px-4 py-3">
													<span className="text-sm">{title}</span>
												</td>
												<td className="px-4 py-3">
													<span className="text-sm">{owner?.name}</span>
												</td>
												<td className="px-4 py-3">
													<span className="text-sm">{researcher?.name}</span>
												</td>
												<td className="px-4 py-3">
													<span className="text-sm">{created_by?.name}</span>
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
													<div className="flex items-center justify-end text-right">
														<div className="p-2 cursor-pointer text-gray-400 hover:text-green-600">
															<IconButton
																onClick={(e) => handleEditPopup(survey, e)}
															>
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
																	<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
																	<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
																</svg>
															</IconButton>
														</div>
														<div className="p-2 cursor-pointer text-gray-400 hover:text-red-600">
															<IconButton
																onClick={(e) => handleDeleteSurvey(survey, e)}
															>
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
																	<polyline points="3 6 5 6 21 6" />
																	<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
																	<line x1={10} y1={11} x2={10} y2={17} />
																	<line x1={14} y1={11} x2={14} y2={17} />
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
											{loading ? (
												<CircularProgress
													variant="indeterminate"
													disableShrink
													size={25}
													thickness={4}
												/>
											) : (
												<p>You have no product types</p>
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
								Showing 1-{surveys.length} of{' '}
								{surveys.length ? surveys.length : 0}
							</span>
							<div className="flex mt-2 sm:mt-auto sm:justify-end">
								<TablePagination
									sx={{ overflow: 'hidden' }}
									component="div"
									page={page}
									rowsPerPageOptions={pages}
									rowsPerPage={rowsPerPage}
									count={surveys.length ? surveys.length : 0}
									onPageChange={handlePageChange}
									onRowsPerPageChange={handleRowsPerPageChange}
								/>
							</div>
						</div>
					</div>
				</div>
			</main>
			<Dialog
				open={
					openEditPopup
						? openEditPopup
						: openViewPopup
						? openViewPopup
						: openPopup
				}
				onBackdropClick={() => setOpenViewPopup(false)}
			>
				<DialogTitle
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					{openEditPopup
						? 'Edit Survey'
						: openViewPopup
						? 'View Survey'
						: 'Add New Survey'}{' '}
					<IconButton
						onClick={
							openEditPopup
								? () => setOpenEditPopup(false)
								: openPopup
								? () => setOpenPopup(false)
								: () => setOpenViewPopup(false)
						}
					>
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
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</IconButton>
				</DialogTitle>
				<form
					onSubmit={
						openEditPopup ? handleSubmit(onSubmitEdit) : handleSubmit(onSubmit)
					}
				>
					<DialogContent>
						<DialogContentText style={{ marginBottom: '.8rem' }}>
							{openEditPopup
								? 'Update existing survey'
								: openPopup
								? 'Create a new survey'
								: 'View details'}
						</DialogContentText>

						<TextField
							{...register('title', {
								required: 'Survey title is required!',
								shouldFocus: true,
							})}
							InputProps={{
								readOnly: openViewPopup ? true : false,
							}}
							style={{ marginBottom: '.8rem' }}
							name="title"
							fullWidth
							autoComplete="off"
							label="Survey Title"
							placeholder="Type your new survey"
							error={errors?.title ? true : false}
							helperText={errors?.title?.message}
						/>

						<TextField
							{...register('description')}
							InputProps={{
								readOnly: openViewPopup ? true : false,
							}}
							sx={{ marginBottom: '.8rem', marginTop: '.8rem' }}
							name="description"
							fullWidth
							multiline
							rows={4}
							autoComplete="off"
							label="Survey Description"
							placeholder="Type your description"
							error={errors?.description ? true : false}
							helperText={errors?.description?.message}
						/>

						{openEditPopup || openViewPopup ? (
							<Autocomplete
								defaultValue={updatedResearcher}
								id="researcher"
								style={{ marginBottom: '1rem' }}
								open={open}
								onOpen={() => {
									setOpen(true);
								}}
								onClose={() => {
									setOpen(false);
								}}
								onChange={(event, value) => selectedOption(value)}
								isOptionEqualToValue={(option, value) => {
									return option.name === value.name;
								}}
								getOptionLabel={(option) => option.name}
								options={options}
								loading={loading}
								fullWidth
								renderInput={(params) => (
									<TextField
										{...params}
										{...register('researcher', {
											required: 'Researcher is required!',
											shouldFocus: true,
										})}
										sx={{ marginBottom: '.8rem' }}
										label="Assign survey researcher"
										variant="outlined"
										InputProps={{
											...params.InputProps,
											endAdornment: (
												<>
													{loading ? (
														<CircularProgress color="inherit" size={20} />
													) : null}
													{params.InputProps.endAdornment}
												</>
											),
										}}
										error={errors?.researcher ? true : false}
										helperText={errors?.researcher?.message}
									/>
								)}
							/>
						) : (
							<Autocomplete
								id="researcher"
								style={{ marginBottom: '1rem' }}
								open={open}
								onOpen={() => {
									setOpen(true);
								}}
								onClose={() => {
									setOpen(false);
								}}
								onChange={(event, value) => selectedOption(value)}
								isOptionEqualToValue={(option, value) => {
									return option.name === value.name;
								}}
								getOptionLabel={(option) => option.name}
								options={options}
								loading={loading}
								fullWidth
								renderInput={(params) => (
									<TextField
										{...params}
										{...register('researcher', {
											required: 'Researcher is required!',
											shouldFocus: true,
										})}
										sx={{ marginBottom: '.8rem' }}
										label="Assign survey researcher"
										variant="outlined"
										InputProps={{
											...params.InputProps,
											endAdornment: (
												<>
													{loading ? (
														<CircularProgress color="inherit" size={20} />
													) : null}
													{params.InputProps.endAdornment}
												</>
											),
										}}
										error={errors?.researcher ? true : false}
										helperText={errors?.researcher?.message}
									/>
								)}
							/>
						)}

						{openEditPopup || openViewPopup ? (
							<Autocomplete
								defaultValue={updatedClient}
								id="clients"
								style={{ marginBottom: '1rem' }}
								open={openClient}
								onOpen={() => {
									setOpenClient(true);
								}}
								onClose={() => {
									setOpenClient(false);
								}}
								onChange={(event, value) => selectedOptionClient(value)}
								isOptionEqualToValue={(option, value) => {
									return option.name === value.name;
								}}
								getOptionLabel={(option) => option.name}
								options={optionsClient}
								loading={loadingClient}
								fullWidth
								renderInput={(params) => (
									<TextField
										{...params}
										{...register('client', {
											required: 'Client is required!',
											shouldFocus: true,
										})}
										sx={{ marginBottom: '.8rem' }}
										label="Choose survey client"
										variant="outlined"
										InputProps={{
											...params.InputProps,
											endAdornment: (
												<>
													{loadingClient ? (
														<CircularProgress color="inherit" size={20} />
													) : null}
													{params.InputProps.endAdornment}
												</>
											),
										}}
										error={errors?.client ? true : false}
										helperText={errors?.client?.message}
									/>
								)}
							/>
						) : (
							<Autocomplete
								id="clients"
								style={{ marginBottom: '1rem' }}
								open={openClient}
								onOpen={() => {
									setOpenClient(true);
								}}
								onClose={() => {
									setOpenClient(false);
								}}
								onChange={(event, value) => selectedOptionClient(value)}
								isOptionEqualToValue={(option, value) => {
									return option.name === value.name;
								}}
								getOptionLabel={(option) => option.name}
								options={optionsClient}
								loading={loadingClient}
								fullWidth
								renderInput={(params) => (
									<TextField
										{...params}
										{...register('client', {
											required: 'Client is required!',
											shouldFocus: true,
										})}
										sx={{ marginBottom: '.8rem' }}
										label="Choose survey client"
										variant="outlined"
										InputProps={{
											...params.InputProps,
											endAdornment: (
												<>
													{loadingClient ? (
														<CircularProgress color="inherit" size={20} />
													) : null}
													{params.InputProps.endAdornment}
												</>
											),
										}}
										error={errors?.client ? true : false}
										helperText={errors?.client?.message}
									/>
								)}
							/>
						)}
					</DialogContent>
					{!openViewPopup && (
						<DialogActions sx={{ marginRight: '1rem', marginBottom: '1rem' }}>
							<Button
								onClick={
									openEditPopup ? handleCloseEditDialog : handleCloseDialog
								}
							>
								Cancel
							</Button>
							<CustomButton
								type="submit"
								disabled={buttonLoading ? true : false}
								loading={buttonLoading}
								variant="contained"
							>
								{openEditPopup ? 'Update' : 'Create'}
							</CustomButton>
						</DialogActions>
					)}
				</form>
			</Dialog>
			<Dialog
				open={openDeletePopup}
				onClose={handleCloseDeleteDialog}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogContent
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<DialogContentText id="alert-dialog-description">
						<svg
							className="w-16 h-16 text-red-500"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
							/>
						</svg>
					</DialogContentText>
					<DialogContentText
						sx={{ color: '#000', fontSize: 18, paddingBottom: '1rem' }}
						id="alert-dialog-description"
					>
						Are You Sure! Want to Delete this record?
					</DialogContentText>
					<DialogContentText id="alert-dialog-description">
						Do you really want to delete this record? You can't view this in
						your list anymore if you delete!
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button sx={{ color: 'gray' }} onClick={handleCloseDeleteDialog}>
						No, Keep it
					</Button>
					<CustomButton
						onClick={confirmDeleteSurvey}
						disabled={buttonLoading ? true : false}
						loading={buttonLoading}
						variant="contained"
					>
						Yes, Delete it
					</CustomButton>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default Home;

const stats = [
	{
		id: 1,
		name: 'Survey Send',
		icon: (
			<svg
				className="w-6 h-6 text-center text-green-600"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
				/>
			</svg>
		),
		background: 'bg-green-200',
		value: 100221,
		percentage: '14%',
		year: '2020',
	},
	{
		id: 2,
		name: 'Received Responses',
		icon: (
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
		),
		background: 'bg-orange-200',
		value: 18695,
		percentage: '25%',
		year: '2022',
	},
	{
		id: 3,
		name: 'Feedback Requests',
		icon: (
			<i className="bx bxl-product-hunt text-blue-600 text-center text-2xl w-8 h-8"></i>
		),
		background: 'bg-blue-200',
		value: 4096945,
		percentage: '5%',
		year: '2021',
	},
	{
		id: 4,
		name: 'Users',
		icon: (
			<i className="bx bx-group text-ourYellow text-center text-2xl w-8 h-8"></i>
		),
		background: 'bg-yellow-200',
		value: 38100,
		percentage: '36%',
		year: '2019',
	},
];
