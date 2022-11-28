import React, { useState, useEffect } from 'react';
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

import { getSurvey } from '../../store/actions/survey-actions';
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
	let questions = useSelector((state) => state.questions?.questions);

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

	useEffect(() => {
		(async () => {
			await dispatch(getSurvey(surveyId));
		})();
	}, []);

	useEffect(() => {
		dispatch(getQuestions());
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
		// const { title, description, researcher, owner } = data;

		// reset({
		// 	title,
		// 	description,
		// 	researcher: researcher?.name,
		// 	client: owner?.name,
		// });

		// setUpdatedSurvey(data);
		// setUpdatedResearcher(researcher);
		// setUpdatedClient(owner);
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
		// setButtonLoading(true);
		// const { title, description } = data;

		// const updatedData = {
		// 	_id: updatedSurvey._id,
		// 	title,
		// 	description,
		// 	researcher_id: selectedResearcher?._id,
		// 	client_id: selectedClient?._id,
		// };

		// await dispatch(updateSurvey(updatedData));
		// await dispatch(getSurveys());

		// setButtonLoading(false);
		// handleCloseEditDialog();
	};

	const handleDeleteSurvey = (survey) => {
		// setDeletedSurvey(survey);
		setOpenDeletePopup(true);
	};

	const confirmDeleteSurvey = async () => {
		// setButtonLoading(true);
		// await dispatch(deleteSurvey(deletedSurvey));
		// await dispatch(getSurveys());
		// setButtonLoading(false);
		// handleCloseDeleteDialog();
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
					{questions.length > 0 ? (
						questions.map((question, index) => {
							const { _id, name, description } = question;

							return (
								<Accordion key={index} title={name}>
									{description}
								</Accordion>
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
