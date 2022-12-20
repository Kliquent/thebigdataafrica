import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { logOut } from '../../store/actions/auth-actions';

const Navbar = () => {
	const dispatch = useDispatch();
	const [toggleSearch, setToggleSearch] = useState(false);
	const [toggleAlert, setToggleAlert] = useState(false);
	const [toggleProfile, setToggleProfile] = useState(false);

	const handleAlert = () => setToggleAlert(!toggleAlert);
	const handleProfile = () => setToggleProfile(!toggleProfile);
	const handleSearch = () => setToggleSearch(!toggleSearch);

	const signOut = () => {
		dispatch(logOut());
	};
	return (
		<div>
			<header className="flex-shrink-0 border-b bg-white">
				<div className="flex items-center justify-between p-2">
					{/* <div className="fixed inset-0 z-10 bg-black bg-opacity-20">
						<div className="ml-[78px] inset-x-0 flex items-center justify-between p-2 bg-white shadow-md">
							<div className="flex items-center flex-1 px-2 space-x-2">
								<span>
									<svg
										className="w-6 h-6 text-gray-500"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
										/>
									</svg>
								</span>
								<input
									type="text"
									placeholder="Search"
									className="w-full px-4 py-3 text-gray-600 rounded-md focus:bg-gray-100 focus:outline-none"
								/>
							</div>

							<button className="flex-shrink-0 p-4 rounded-md">
								<svg
									className="w-4 h-4 text-gray-500"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						</div>
					</div> */}

					<div className="items-center hidden px-2 space-x-2 md:flex-1 md:flex md:mr-auto md:ml-5">
						{/* <span>
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
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								/>
							</svg>
						</span>
						<input
							type="text"
							placeholder="Search"
							className="px-4 py-3 rounded-md hover:bg-gray-100 lg:max-w-sm md:py-2 md:flex-1 focus:outline-none md:focus:bg-gray-100 md:focus:shadow md:focus:border"
						/> */}
					</div>

					<div className="relative flex items-center space-x-3">
						{/* <button className="p-2 bg-gray-100 rounded-full md:hidden focus:outline-none focus:ring ring-ourGreen hover:bg-gray-200">
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
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								/>
							</svg>
						</button> */}

						<div className="items-center hidden space-x-3 md:flex">
							<div className="relative">
								{/* <div className="absolute right-0 p-1 bg-red-400 rounded-full animate-ping"></div>
								<div className="absolute right-0 p-1 bg-red-400 border rounded-full"></div> */}
								{/* <button
									onClick={handleAlert}
									className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring ring-ourGreen"
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
											d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
										/>
									</svg>
								</button> */}

								{/* Notifications */}
								{toggleAlert && (
									<div className="absolute mt-3 transform bg-white rounded-md shadow-lg -translate-x-3/4 min-w-max">
										<div className="p-2 text-sm text-center font-medium border-b">
											Notifications
										</div>
										<ul className="block overflow-y-auto h-96 text-sm border-t border-gray-100 rounded-md">
											{notifications.map((item, index) => {
												const { name, id, imageUrl, date, status } = item;
												return (
													<li
														key={id}
														className="flex justify-between items-center font-serif font-normal text-sm py-3 border-b border-gray-100  px-3 transition-colors duration-150 hover:bg-gray-50  cursor-pointer"
													>
														<div className="flex items-center">
															<div className="relative rounded-full inline-block w-8 h-8 p-1 mr-2 md:block bg-gray-50 border border-gray-200">
																<img
																	className="object-cover w-full h-full rounded-full"
																	src={imageUrl}
																	alt="image"
																	loading="lazy"
																/>
																<div
																	className="absolute inset-0 rounded-full shadow-inner"
																	aria-hidden="true"
																/>
															</div>
															<div className="notification-content">
																<h6 className="font-medium text-gray-500">
																	{name}
																</h6>
																<p className="flex items-center text-xs text-gray-400">
																	<span
																		className={`inline-flex px-2 text-xs font-medium leading-5 rounded-full ${
																			status === 'New Order'
																				? 'text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-100'
																				: 'text-red-500 bg-red-100 dark:text-red-100 dark:bg-red-800'
																		} `}
																	>
																		{status}
																	</span>
																	<span className="ml-2">{date}</span>
																</p>
															</div>
														</div>
														<span className="px-2">
															<svg
																className="w-4 h-4"
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
														</span>
													</li>
												);
											})}
										</ul>
									</div>
								)}
							</div>
						</div>

						<div className="relative">
							<button
								onClick={handleProfile}
								className="p-1 bg-gray-200 rounded-full focus:outline-none focus:ring ring-ourGreen mr-5"
							>
								<img
									className="object-cover w-8 h-8 rounded-full"
									src="https://avatars0.githubusercontent.com/u/57622665?s=460&u=8f581f4c4acd4c18c33a87b3e6476112325e8b38&v=4"
									alt="Ahmed Kamel"
								/>
							</button>

							<div className="absolute right-0 p-1 bg-green-400 rounded-full bottom-3 animate-ping mr-5"></div>
							<div className="absolute right-0 p-1 bg-green-400 border border-white rounded-full bottom-3 mr-5"></div>
							{toggleProfile && (
								<div className="absolute mt-3 transform -translate-x-3/4 bg-white rounded-md shadow-lg min-w-max">
									<ul className="flex flex-col p-2 my-2 space-y-1">
										<li>
											<Link
												to="/"
												className="block px-2 py-1 transition rounded-md hover:bg-gray-100"
											>
												Profile
											</Link>
										</li>
									</ul>
									<div className="flex items-center justify-center p-2  border-t">
										<Link
											to="#"
											onClick={signOut}
											className="block px-4 py-1 transition rounded-md hover:bg-gray-100"
										>
											Logout
										</Link>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</header>
		</div>
	);
};

export default Navbar;

const notifications = [
	{
		id: 1,
		imageUrl: 'https://i.postimg.cc/tCsSNSxS/Yellow-Sweet-Corn-Bag-each.jpg',
		name: 'Yellow Sweet Corn Stock out, please check!',
		date: 'Dec 12 2021 - 12:40PM',
		status: 'Stock Out',
	},
	{
		id: 2,
		imageUrl: 'https://i.ibb.co/ZTWbx5z/team-1.jpg',
		name: 'Sam L. Placed $300 USD order!',
		date: 'Nov 12 2021 - 15:40PM',
		status: 'New Order',
	},
	{
		id: 3,
		imageUrl: 'https://i.postimg.cc/tCsSNSxS/Yellow-Sweet-Corn-Bag-each.jpg',
		name: 'Yellow Sweet Corn Stock out, please check!',
		date: 'Dec 12 2021 - 12:40PM',
		status: 'Stock Out',
	},
	{
		id: 4,
		imageUrl: 'https://i.ibb.co/ZTWbx5z/team-1.jpg',
		name: 'Sam L. Placed $300 USD order!',
		date: 'Nov 12 2021 - 15:40PM',
		status: 'New Order',
	},
	{
		id: 5,
		imageUrl: 'https://i.postimg.cc/tCsSNSxS/Yellow-Sweet-Corn-Bag-each.jpg',
		name: 'Yellow Sweet Corn Stock out, please check!',
		date: 'Dec 12 2021 - 12:40PM',
		status: 'Stock Out',
	},
	{
		id: 6,
		imageUrl: 'https://i.ibb.co/ZTWbx5z/team-1.jpg',
		name: 'Sam L. Placed $300 USD order!',
		date: 'Nov 12 2021 - 15:40PM',
		status: 'New Order',
	},
	{
		id: 7,
		imageUrl: 'https://i.postimg.cc/tCsSNSxS/Yellow-Sweet-Corn-Bag-each.jpg',
		name: 'Yellow Sweet Corn Stock out, please check!',
		date: 'Dec 12 2021 - 12:40PM',
		status: 'Stock Out',
	},
	{
		id: 8,
		imageUrl: 'https://i.ibb.co/ZTWbx5z/team-1.jpg',
		name: 'Sam L. Placed $300 USD order!',
		date: 'Nov 12 2021 - 15:40PM',
		status: 'New Order',
	},
];
