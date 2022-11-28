import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
	IconButton,
	CircularProgress,
	TablePagination,
} from '@mui/material';
import { useForm } from 'react-hook-form';

import {
	getSurvey,
	getQuestionsBySurvey,
} from '../../store/actions/survey-actions';
import {
	createQuestion,
	updateQuestion,
	deleteQuestion,
	getQuestions,
	getQuestion,
} from '../../store/actions/question-actions';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CustomButton from '../../utils/CustomButton';
import Navbar from './Navbar';

const SurveyDetails = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	let survey = useSelector((state) => state.surveys?.survey);
	let questionLoading = useSelector((state) => state.questions?.isLoading);
	let questionsBySurvey = useSelector(
		(state) => state.surveys?.questionsBySurvey
	);

	let urlParams = useParams();
	let surveyId = urlParams?.surveyId;

	const pages = [10, 20, 50];
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(pages[page]);

	const [openPopup, setOpenPopup] = useState(false);
	const [openViewPopup, setOpenViewPopup] = useState(false);
	const [openEditPopup, setOpenEditPopup] = useState(false);
	const [openDeletePopup, setOpenDeletePopup] = useState(false);
	const [buttonLoading, setButtonLoading] = useState(false);

	const [updatedQuestion, setUpdatedSurvey] = useState([]);
	const [deletedQuestion, setDeletedQuestion] = useState([]);

	useEffect(() => {
		(async () => {
			await dispatch(getSurvey(surveyId));
		})();
	}, []);

	useEffect(() => {
		dispatch(getQuestionsBySurvey(surveyId));
	}, []);

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
			title: '',
			description: '',
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
		const { name, description } = data;

		reset({
			name,
			description,
		});

		setUpdatedSurvey(data);
		setOpenEditPopup(true);
	};

	const onSubmit = async (data, e) => {
		e.preventDefault();
		const { name, description } = data;

		setButtonLoading(true);

		const payload = {
			name,
			description,
			survey_id: surveyId,
		};

		await dispatch(createQuestion(payload));
		await dispatch(getQuestions());

		setButtonLoading(false);
		handleCloseDialog();
	};

	const onSubmitEdit = async (data, e) => {
		e.preventDefault();
		setButtonLoading(true);
		const { name, description } = data;

		const updatedData = {
			_id: updatedQuestion._id,
			name,
			description,
			survey_id: surveyId,
		};

		await dispatch(updateQuestion(updatedData));
		await dispatch(getQuestions());

		setButtonLoading(false);
		handleCloseEditDialog();
	};

	const handleDeleteQuestion = (question) => {
		setDeletedQuestion(question);
		setOpenDeletePopup(true);
	};

	const confirmDeleteQuestion = async () => {
		setButtonLoading(true);
		await dispatch(deleteQuestion(deletedQuestion));
		await dispatch(getQuestions());
		setButtonLoading(false);
		handleCloseDeleteDialog();
	};

	return (
		<>
			<Navbar />
			<main className="flex-1 max-h-full p-5 overflow-hidden overflow-y-scroll">
				<div className="flex flex-col items-start justify-start pb-6 space-x-2 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
					<IconButton onClick={() => navigate('/')}>
						<ArrowBackIcon />
					</IconButton>
					<h1 className="text-2xl font-semibold whitespace-nowrap">
						{survey?.title}
					</h1>
				</div>
				<div className="mt-8 flex items-center justify-center space-x-2">
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
							New Question
						</button>
					</div>
				</div>
				<div className="wrapper">
					{questionsBySurvey.length > 0 ? (
						questionsBySurvey.map((question, index) => {
							const { _id, name, description } = question;

							return (
								<Fragment key={index}>
									<Accordion title={name}>
										<div className="flex items-center justify-between">
											{description}
											<div className="p-2 cursor-pointer text-gray-400 hover:text-green-600">
												<IconButton
													onClick={(e) => handleEditPopup(question, e)}
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
												<IconButton
													onClick={(e) => handleDeleteQuestion(question, e)}
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
									</Accordion>
								</Fragment>
							);
						})
					) : (
						<div className="flex items-center justify-center">
							{questionLoading ? (
								<CircularProgress
									variant="indeterminate"
									disableShrink
									size={25}
									thickness={4}
								/>
							) : (
								<p>You have no questions</p>
							)}
						</div>
					)}
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
						? 'Edit Question'
						: openViewPopup
						? 'View Question'
						: 'Add New Question'}{' '}
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
								? 'Update existing question'
								: openPopup
								? 'Create a new question'
								: 'View details'}
						</DialogContentText>

						<TextField
							{...register('name', {
								required: 'Question name is required!',
								shouldFocus: true,
							})}
							InputProps={{
								readOnly: openViewPopup ? true : false,
							}}
							style={{ marginBottom: '.8rem' }}
							name="name"
							fullWidth
							autoComplete="off"
							label="Question Name"
							placeholder="Type your new question name"
							error={errors?.name ? true : false}
							helperText={errors?.name?.message}
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
							label="Question Description"
							placeholder="Type your description"
							error={errors?.description ? true : false}
							helperText={errors?.description?.message}
						/>
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
						onClick={confirmDeleteQuestion}
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

export default SurveyDetails;

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
