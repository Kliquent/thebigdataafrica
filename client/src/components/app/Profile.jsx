import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';

import { auth, updateUserInfo } from '../../store/actions/auth-actions';

import Navbar from './Navbar';
import ChangePass from './ChangePass';

import CustomButton from '../../utils/CustomButton';

const Profile = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	let currentUser = useSelector((state) => state.auth?.user?.current_user);
	const [buttonLoading, setButtonLoading] = useState(false);

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

	useEffect(() => {
		dispatch(auth());
	}, []);

	useEffect(() => {
		reset({
			name: currentUser?.name,
			email: currentUser?.email,
			phone: currentUser?.phone,
		});
		// eslint-disable-next-line
	}, [currentUser]);

	const onSubmit = async (data, e) => {
		e.preventDefault();

		setButtonLoading(true);

		await dispatch(updateUserInfo(data));
		await dispatch(auth());

		setButtonLoading(false);
	};

	return (
		<>
			<Navbar />
			<div className="bg-gray-50 min-h-screen">
				<div className="container mx-auto max-w-3xl mt-8">
					<h1 className="text-2xl font-bold text-gray-700 px-6 md:px-0">
						Account Settings
					</h1>
					<ul className="flex border-b border-gray-300 text-sm font-medium text-gray-600 mt-3 px-6 md:px-0">
						<li className="mr-8 text-gray-900 border-b-2 border-gray-800">
							<a href="#_" className="py-4 inline-block">
								Profile Info
							</a>
						</li>
					</ul>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="w-full bg-white rounded-lg mx-auto mt-8 flex overflow-hidden rounded-b-none">
							<div className="w-1/3 bg-gray-100 p-8 hidden md:inline-block">
								<h2 className="font-medium text-md text-gray-700 mb-4 tracking-wide">
									Profile Info
								</h2>
								<p className="text-xs text-gray-500">
									Update your basic profile information such as Email Address,
									Name, and Phone.
								</p>
							</div>
							<div className="md:w-2/3 w-full">
								<div className="py-8 px-16">
									<label htmlFor="name" className="text-sm text-gray-600">
										Name
									</label>
									<input
										{...register('name', {
											required: 'Name is required!',
										})}
										className="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500"
										type="text"
										name="name"
									/>
									<span className="text-red-600">{errors?.name?.message}</span>
								</div>
								<hr className="border-gray-200" />
								<div className="py-8 px-16">
									<label htmlFor="email" className="text-sm text-gray-600">
										Email Address
									</label>
									<input
										{...register('email', {
											required: 'Email address is required!',
											pattern: {
												value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
												message: 'Invalid email address',
											},
											shouldFocus: true,
										})}
										className="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500"
										type="email"
										name="email"
									/>
									<span className="text-red-600">{errors?.email?.message}</span>
								</div>
								<hr className="border-gray-200" />
								<div className="py-8 px-16">
									<label htmlFor="email" className="text-sm text-gray-600">
										Phone
									</label>
									<input
										{...register('phone', {
											required: 'Phone is required!',
											pattern: {
												value: /^(\+243|0)[1-9]\d{7}$/i,
												message: 'Please enter a valid mobile number',
											},
											shouldFocus: true,
										})}
										className="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500"
										type="number"
										name="phone"
									/>
									<span className="text-red-600">{errors?.phone?.message}</span>
								</div>
							</div>
						</div>
						<div className="p-16 bg-gray-100 flex justify-between rounded-b-lg border-t border-gray-200">
							<p className="float-left text-xs text-gray-500 tracking-tight mt-2">
								Click on Save to update your Profile Info
							</p>
							{/* <input type="submit" /> */}
							<CustomButton
								type="submit"
								disabled={buttonLoading ? true : false}
								loading={buttonLoading}
								variant="contained"
							>
								Save
							</CustomButton>
						</div>
					</form>
					<ChangePass />
				</div>
			</div>
		</>
	);
};

export default Profile;
