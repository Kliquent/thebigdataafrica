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
import { getAnswers } from '../../store/actions/answer-actions';

const Responses = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	let answerLoading = useSelector((state) => state.answers?.isLoading);
	let answers = useSelector((state) => state.answers?.answers);

	const pages = [10, 20, 50];
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
	const [order, setOrder] = useState('desc');
	const [orderBy, setOrderBy] = useState('_id');

	useEffect(() => {
		const payload = {
			page,
			order,
			orderBy,
			limit: rowsPerPage,
		};

		dispatch(getAnswers(payload));
	}, [page, rowsPerPage]);

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
			<main className="flex-1 max-h-full p-5 overflow-hidden overflow-y-scroll">
				<div className="flex items-start justify-between pb-6 space-x-2 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
					<h1 className="text-2xl font-semibold whitespace-nowrap">
						Responses
					</h1>
				</div>

				<div className="mt-8 w-full overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg ring-1 ring-black ring-opacity-5 mb-8">
					<div className="w-full overflow-x-auto no-scrollbar">
						<table className="w-full whitespace-nowrap">
							<thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-800">
								<tr>
									<td className="px-4 py-3">Type</td>
									<td className="px-4 py-3 text-center">Question</td>
									<td className="px-4 py-3 text-center">Option Type</td>
									<td className="px-4 py-3 text-center">Option Name</td>
									<td className="px-4 py-3 text-center">Surveyee Suggestion</td>
									<td className="px-4 py-3">Surveyee Name</td>
									<td className="px-4 py-3">Contact</td>
									<td className="px-4 py-3">Location</td>
									<td className="px-4 py-3">Created At</td>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-100 dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400">
								{answers.length > 0 ? (
									answers.map((answer, index) => {
										const {
											type,
											surveyee,
											question_id,
											option_id,
											answerText,
											location,
											createdAt,
										} = answer;

										return (
											<Fragment key={index}>
												<tr className="">
													<td className="px-4 py-3">
														<span className="text-sm">{type}</span>
													</td>
													<td className="px-4 py-3">
														<span className="text-sm">{question_id?.name}</span>
													</td>
													<td className="px-4 py-3">
														<span className="text-sm">{option_id?.type}</span>
													</td>
													<td className="px-4 py-3">
														<span className="text-sm">{option_id?.name}</span>
													</td>
													<td className="px-4 py-3">
														<span className="text-sm">{answerText}</span>
													</td>
													<td className="px-4 py-3">
														<span className="text-sm">
															{surveyee[0]?.first_name} {surveyee[0]?.last_name}
														</span>
													</td>
													<td className="px-4 py-3">
														<span className="text-sm">
															{surveyee[0]?.phone}
														</span>
													</td>
													<td className="px-4 py-3">
														<span className="text-sm"></span>
													</td>
													<td className="px-4 py-3">
														<span className="text-sm">
															{new Date(`${createdAt}`).toLocaleString()}
														</span>
													</td>
												</tr>
											</Fragment>
										);
									})
								) : (
									<TableRow>
										<TableCell
											colSpan={12}
											style={{
												padding: '1rem',
												textAlign: 'center',
											}}
										>
											{answerLoading ? (
												<CircularProgress
													variant="indeterminate"
													disableShrink
													size={25}
													thickness={4}
												/>
											) : (
												<p>You have no answers</p>
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
								Showing 1-{answers.length} of{' '}
								{answers.length ? answers.length : 0}
							</span>
							<div className="flex mt-2 sm:mt-auto sm:justify-end">
								<TablePagination
									// sx={{ overflow: 'hidden' }}
									component="div"
									page={page}
									rowsPerPageOptions={pages}
									rowsPerPage={rowsPerPage}
									count={answers.length ? answers.length : 0}
									onPageChange={handlePageChange}
									onRowsPerPageChange={handleRowsPerPageChange}
								/>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
};

export default Responses;
