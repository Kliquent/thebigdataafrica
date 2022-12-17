import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

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
import { useForm } from 'react-hook-form';

import {
	createClient,
	updateClient,
	deleteClient,
	getClients,
	getClient,
} from '../../store/actions/client-actions';

import CustomButton from '../../utils/CustomButton';

import Navbar from './Navbar';

const Clients = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	let auth = useSelector((state) => state.auth);
	let clientLoading = useSelector((state) => state.clients?.isLoading);
	let clients = useSelector((state) => state.clients?.clients);

	const pages = [10, 20, 50];
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(pages[page]);

	const [showPassword, setShowPassword] = useState(false);

	const [openPopup, setOpenPopup] = useState(false);
	const [openViewPopup, setOpenViewPopup] = useState(false);
	const [openEditPopup, setOpenEditPopup] = useState(false);
	const [openDeletePopup, setOpenDeletePopup] = useState(false);
	const [buttonLoading, setButtonLoading] = useState(false);

	const [selectedGender, setSelectedGender] = useState('Female');
	const [updatedClient, setUpdatedClient] = useState([]);

	const [deletedClient, setDeletedClient] = useState([]);

	useEffect(() => {
		dispatch(getClients());
	}, []);

	useEffect(() => {
		reset({
			name: '',
			email: '',
			phone: '',
		});
		// eslint-disable-next-line
	}, [openPopup]);

	const handlePageChange = (event, newPage) => {
		setPage(newPage);
	};

	const handleRowsPerPageChange = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleChangeGender = (event) => {
		setSelectedGender(event.target.value);
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
			email: '',
			phone: '',
		});
		setOpenEditPopup(false);
	};

	const handleCloseDeleteDialog = () => {
		setOpenDeletePopup(false);
	};

	const handleClickOpen = () => {
		setOpenPopup(true);
	};

	const handleEditPopup = (data, e) => {
		e.preventDefault();
		const { name, email, phone, gender } = data;

		reset({
			name,
			email,
			phone,
			gender,
		});

		setUpdatedClient(data);
		setOpenEditPopup(true);
	};

	const onSubmit = async (data, e) => {
		e.preventDefault();

		setButtonLoading(true);

		await dispatch(createClient(data));
		await dispatch(getClients());

		setButtonLoading(false);
		handleCloseDialog();
	};

	const onSubmitEdit = async (data, e) => {
		e.preventDefault();
		setButtonLoading(true);
		const { name, email, phone, gender } = data;

		const payload = {
			_id: updatedClient._id,
			name,
			email,
			phone,
			gender,
		};

		await dispatch(updateClient(payload));
		await dispatch(getClients());

		setButtonLoading(false);
		handleCloseEditDialog();
	};

	const handleDeleteClient = (client) => {
		setDeletedClient(client);
		setOpenDeletePopup(true);
	};

	const confirmDeleteClient = async () => {
		setButtonLoading(true);
		await dispatch(deleteClient(deletedClient));
		await dispatch(getClients());
		setButtonLoading(false);
		handleCloseDeleteDialog();
	};

	return (
		<>
			<Navbar />
			<main className="flex-1 max-h-full p-5 overflow-hidden overflow-y-scroll">
				<div className="flex items-start justify-between pb-6 space-x-2 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
					<h1 className="text-2xl font-semibold whitespace-nowrap">Clients</h1>
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
							New Client
						</button>
					</div>
				</div>

				{/* Client's Tabular view */}
				<div className="w-full overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg ring-1 ring-black ring-opacity-5 mb-8">
					<div className="w-full overflow-x-auto no-scrollbar">
						<table className="w-full whitespace-nowrap">
							<thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-800">
								<tr>
									<td className="px-4 py-3">Client Name</td>
									<td className="px-4 py-3">Email</td>
									<td className="px-4 py-3">Phone</td>
									<td className="px-4 py-3">Gender</td>
									<td className="px-4 py-3">Role</td>
									<td className="px-4 py-3">Last Updated</td>
									<td className="px-4 py-3">Status</td>
									<td className="px-4 py-3 text-center">Action</td>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-100 dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400">
								{clients.length > 0 ? (
									clients.map((client, index) => {
										const {
											_id,
											name,
											email,
											phone,
											gender,
											role_id,
											updatedAt,
											isUserActive,
										} = client;
										return (
											<tr key={index} className="">
												<td className="px-4 py-3">
													<span className="text-sm">{name}</span>
												</td>
												<td className="px-4 py-3">
													<span className="text-sm">{email}</span>
												</td>
												<td className="px-4 py-3">
													<span className="text-sm">{phone}</span>
												</td>
												<td className="px-4 py-3">
													<span className="text-sm">{gender}</span>
												</td>
												<td className="px-4 py-3">
													<span className="text-sm">{role_id?.title}</span>
												</td>
												<td className="px-4 py-3">
													<span className="text-sm">
														{new Date(`${updatedAt}`).toLocaleString()}
													</span>
												</td>

												<td className="px-4 py-3">
													<span className="font-serif">
														{isUserActive === true ? (
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
																onClick={() => navigate(`/clients/${_id}`)}
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
														<div className="p-2 cursor-pointer text-gray-400 hover:text-green-600">
															<IconButton
																onClick={(e) => handleEditPopup(client, e)}
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
																onClick={(e) => handleDeleteClient(client, e)}
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
											{clientLoading ? (
												<CircularProgress
													variant="indeterminate"
													disableShrink
													size={25}
													thickness={4}
												/>
											) : (
												<p>You have no clients</p>
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
								Showing 1-{clients.length} of{' '}
								{clients.length ? clients.length : 0}
							</span>
							<div className="flex mt-2 sm:mt-auto sm:justify-end">
								<TablePagination
									sx={{ overflow: 'hidden' }}
									component="div"
									page={page}
									rowsPerPageOptions={pages}
									rowsPerPage={rowsPerPage}
									count={clients.length ? clients.length : 0}
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
						? 'Edit Client'
						: openViewPopup
						? 'View Client'
						: 'Add New Client'}{' '}
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
								? 'Update existing client'
								: openPopup
								? 'Create a new client'
								: 'View details'}
						</DialogContentText>

						<TextField
							{...register('name', {
								required: 'Name is required!',
								shouldFocus: true,
							})}
							InputProps={{
								readOnly: openViewPopup ? true : false,
							}}
							style={{ marginBottom: '.8rem' }}
							name="name"
							fullWidth
							autoComplete="off"
							label="Name"
							placeholder="Type your name"
							error={errors?.name ? true : false}
							helperText={errors?.name?.message}
						/>

						<TextField
							{...register('email', {
								required: 'Email address is required!',
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
									message: 'Invalid email address',
								},
								shouldFocus: true,
							})}
							style={{ marginBottom: '.8rem' }}
							name="email"
							fullWidth
							autoComplete="off"
							label="Email address"
							placeholder="johndoe@example.com"
							error={errors?.email ? true : false}
							helperText={errors?.email?.message}
						/>

						<TextField
							{...register('phone', {
								required: 'Phone is required!',
								pattern: {
									value: /^(\+243|0)[1-9]\d{8}$/i,
									message: 'Please enter a valid mobile number',
								},
								shouldFocus: true,
							})}
							style={{ marginBottom: '.8rem' }}
							label="Mobile number"
							placeholder="07xxxxxxxx"
							name="phone"
							type="number"
							margin="normal"
							autoComplete="off"
							fullWidth
							error={errors?.phone ? true : false}
							helperText={errors.phone && errors.phone.message}
						/>

						<TextField
							{...register('gender', {
								required: 'Gender is required!',
							})}
							style={{ marginBottom: '.8rem' }}
							fullWidth
							select
							label="Gender"
							value={selectedGender}
							onChange={handleChangeGender}
							helperText="Please select user gender"
						>
							{gender.map((option) => (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</TextField>

						{openPopup && (
							<TextField
								{...register('password', {
									required: 'Password is required!',
									minLength: {
										value: 8,
										message: 'Password should be atleast 8 characters',
									},
								})}
								fullWidth
								name="password"
								type={showPassword ? 'text' : 'password'}
								label="Password"
								autoComplete="off"
								error={errors?.password ? true : false}
								helperText={errors?.password?.message}
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
						onClick={confirmDeleteClient}
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

export default Clients;

const gender = [
	{
		value: 'Male',
		label: 'Male',
	},
	{
		value: 'Female',
		label: 'Female',
	},
];
