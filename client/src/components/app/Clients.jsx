import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

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

import Navbar from './Navbar';

const Clients = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleClickOpen = () => {
		// setOpenPopup(true);
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
									<td className="px-4 py-3">Created By</td>
									<td className="px-4 py-3">Last Updated</td>
									<td className="px-4 py-3">Status</td>
									<td className="px-4 py-3 text-center">Action</td>
								</tr>
							</thead>
							{/* <tbody className="bg-white divide-y divide-gray-100 dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400">
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
							</tbody> */}
						</table>
					</div>
					{/* <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-white text-gray-500 dark:text-gray-400 dark:bg-gray-800">
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
					</div> */}
				</div>
			</main>
		</>
	);
};

export default Clients;
