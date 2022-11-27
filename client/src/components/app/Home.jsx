import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './Navbar';
// import { PieChartM, BarChartM } from '../charts/home';
import { abbreviateNumber } from '../../utils/AbbreviationNumber';

const Home = () => {
	const dispatch = useDispatch();

	let auth = useSelector((state) => state.auth);
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
									<td className="px-4 py-3">Order Time</td>
									<td className="px-4 py-3">Delivery Address</td>
									<td className="px-4 py-3">Customer Name</td>
									<td className="px-4 py-3">Phone</td>
									<td className="px-4 py-3">Payment method</td>
									<td className="px-4 py-3">Order amount</td>
									<td className="px-4 py-3">Status</td>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-100 dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400">
								{orders.map((order, index) => {
									const {
										date,
										deliveryAddress,
										name,
										phone,
										amount,
										paymentMethod,
										status,
									} = order;
									return (
										<tr key={index} className="">
											<td className="px-4 py-3">
												<span className="text-sm">{date}</span>
											</td>
											<td className="px-4 py-3">
												<span className="text-sm ">{deliveryAddress}</span>
											</td>
											<td className="px-4 py-3">
												<span className="text-sm ">{name}</span>
											</td>
											<td className="px-4 py-3">
												{' '}
												<span className="text-sm">{phone}</span>{' '}
											</td>
											<td className="px-4 py-3">
												<span className="text-sm font-semibold">
													{paymentMethod}
												</span>
											</td>
											<td className="px-4 py-3">
												{' '}
												<span className="text-sm font-semibold">
													KES {abbreviateNumber(amount)}
												</span>{' '}
											</td>
											<td className="px-4 py-3">
												<span className="font-serif">
													{status === 'Processing' ? (
														<span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-blue-500 bg-blue-100 dark:text-white dark:bg-blue-800">
															Processing
														</span>
													) : status === 'Delivered' ? (
														<span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-100">
															Delivered
														</span>
													) : (
														status === 'Cancelled' && (
															<span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-red-500 bg-red-100 dark:text-red-100 dark:bg-red-800">
																Cancel
															</span>
														)
													)}
												</span>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
					<div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-white text-gray-500 dark:text-gray-400 dark:bg-gray-800">
						<div className="flex flex-col justify-between text-xs sm:flex-row text-gray-600 dark:text-gray-400">
							<span className="flex items-center font-semibold tracking-wide uppercase">
								Showing 1-8 of 186
							</span>
							<div className="flex mt-2 sm:mt-auto sm:justify-end">
								<nav aria-label="Table navigation">
									<ul className="inline-flex items-center">
										<li>
											<button
												className="align-bottom inline-flex items-center justify-center leading-5 transition-colors duration-150 font-medium focus:outline-none p-2 rounded-md text-gray-600 dark:text-gray-400 border border-transparent opacity-50 cursor-not-allowed"
												disabled=""
												type="button"
												aria-label="Previous"
											>
												<svg
													className="h-3 w-3"
													aria-hidden="true"
													fill="currentColor"
													viewBox="0 0 20 20"
												>
													<path
														d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
														clipRule="evenodd"
														fillRule="evenodd"
													/>
												</svg>
											</button>
										</li>
										<li>
											<button
												className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-3 py-1 rounded-md text-xs text-white bg-green-500 border border-transparent active:bg-green-600 hover:bg-green-600 focus:ring focus:ring-purple-300"
												type="button"
											>
												1
											</button>
										</li>
										<li>
											<button
												className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium  px-3 py-1 rounded-md text-xs text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-100 focus:ring focus:ring-gray-300 dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10"
												type="button"
											>
												2
											</button>
										</li>
										<li>
											<button
												className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium px-3 py-1 rounded-md text-xs text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-100 focus:ring focus:ring-gray-300 dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10"
												type="button"
											>
												3
											</button>
										</li>
										<li>
											<span className="px-2 py-1">...</span>
										</li>
										<li>
											<button
												className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium px-3 py-1 rounded-md text-xs text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-100 focus:ring focus:ring-gray-300 dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10"
												type="button"
											>
												24
											</button>
										</li>
										<li>
											<button
												className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium p-2 rounded-md text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-100 focus:ring focus:ring-gray-300 dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10"
												type="button"
												aria-label="Next"
											>
												<svg
													className="h-3 w-3"
													aria-hidden="true"
													fill="currentColor"
													viewBox="0 0 20 20"
												>
													<path
														d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
														clipRule="evenodd"
														fillRule="evenodd"
													/>
												</svg>
											</button>
										</li>
									</ul>
								</nav>
							</div>
						</div>
					</div>
				</div>
			</main>
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

const orders = [
	{
		id: 1,
		date: 'May 9, 2022',
		deliveryAddress: 'Roysambu',
		name: 'Allan Bingham',
		phone: '0721436032',
		paymentMethod: 'Mpesa',
		amount: 16800,
		status: 'Processing',
	},
	{
		id: 2,
		date: 'Apr 29, 2022',
		deliveryAddress: 'Kasarani',
		phone: '0790516067',
		name: 'Allister Mugaisi',
		paymentMethod: 'Visa (DTB Bank)',
		amount: 10400,
		status: 'Delivered',
	},
	{
		id: 3,
		date: 'Apr 25, 2022',
		deliveryAddress: 'Kahawa West',
		name: 'Yoven Ambati',
		phone: '0722318068',
		paymentMethod: 'Mastercard (KCB Bank)',
		amount: 6800,
		status: 'Cancelled',
	},
];
