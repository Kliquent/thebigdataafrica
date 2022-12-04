import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	CircularProgress,
	TableRow,
	TableCell,
	Button,
	IconButton,
	TablePagination,
} from '@mui/material';
import Navbar from './Navbar';
import ResponsePieChart from '../chart/ResponsePieChart';
import ResponseBarChart from '../chart/ResponseBarChart';
import {
	getAnswers,
	getAnswerAnalytics,
} from '../../store/actions/answer-actions';

const Responses = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	let answerLoading = useSelector((state) => state.answers?.isLoading);
	let answerAnalytics = useSelector(
		(state) => state.answers?.getAnswerAnalytics
	);
	// console.log(answerAnalytics);

	const pages = [10, 20, 50];
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
	const [order, setOrder] = useState('desc');
	const [orderBy, setOrderBy] = useState('_id');

	// useEffect(() => {
	// 	const payload = {
	// 		page,
	// 		order,
	// 		orderBy,
	// 		limit: rowsPerPage,
	// 	};

	// 	dispatch(getAnswers(payload));
	// }, [page, rowsPerPage]);

	useEffect(() => {
		dispatch(getAnswerAnalytics());
	}, []);

	const handleSortRequest = (property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
		const payload = {
			page,
			order,
			orderBy,
			limit: rowsPerPage,
		};

		dispatch(getAnswers(payload));
	};

	const handlePageChange = (event, newPage) => {
		setPage(newPage);
	};

	const handleRowsPerPageChange = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	return (
		<>
			<Navbar />
			<div className="wrapper">
				<div className="flex flex-col items-start justify-between pb-6 space-y-4 lg:items-center lg:space-y-0 lg:flex-row">
					<div className="flex items-center space-x-2">
						<h1 className="text-2xl font-semibold whitespace-nowrap">
							Response Analytics
						</h1>
					</div>
				</div>
				{answerAnalytics.length > 0 ? (
					answerAnalytics.map((analytics, index) => {
						const { _id, options, totalQuestionOptions } = analytics;

						return (
							<Fragment key={index}>
								<Accordion
									title={_id[0]?.name ? _id[0]?.name : 'Question not available'}
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
		</>
	);
};

export default Responses;

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
