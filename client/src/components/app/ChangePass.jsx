import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';

import { changePassword } from '../../store/actions/auth-actions';

import CustomButton from '../../utils/CustomButton';

const ChangePass = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [passLoading, setPassLoading] = useState(false);

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

	const onSubmitPassword = async (data, e) => {
		e.preventDefault();

		setPassLoading(true);

		await dispatch(changePassword(data));

		setPassLoading(false);
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmitPassword)}>
				<div className="w-full bg-white rounded-lg mx-auto mt-8 flex overflow-hidden rounded-b-none">
					<div className="w-1/3 bg-gray-100 p-8 hidden md:inline-block">
						<h2 className="font-medium text-md text-gray-700 mb-4 tracking-wide">
							Change Password
						</h2>
						<p className="text-xs text-gray-500">Update your password</p>
					</div>
					<div className="md:w-2/3 w-full">
						<div className="py-8 px-16">
							<label htmlFor="name" className="text-sm text-gray-600">
								Current Password
							</label>
							<input
								{...register('current_password', {
									required: 'Password is required!',
									minLength: {
										value: 8,
										message: 'Current password should be atleast 8 characters',
									},
								})}
								className="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500"
								type="password"
								name="current_password"
							/>
							<span className="text-red-600">
								{errors?.current_password?.message}
							</span>
						</div>
						<hr className="border-gray-200" />
						<div className="py-8 px-16">
							<label htmlFor="email" className="text-sm text-gray-600">
								New Password
							</label>
							<input
								{...register('new_password', {
									required: 'Password is required!',
									minLength: {
										value: 8,
										message: 'New password should be atleast 8 characters',
									},
								})}
								className="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500"
								type="password"
								name="new_password"
							/>
							<span className="text-red-600">
								{errors?.new_password?.message}
							</span>
						</div>
						<hr className="border-gray-200" />
					</div>
				</div>
				<div className="p-16 bg-gray-100 flex justify-between rounded-b-lg border-t border-gray-200">
					<p className="float-left text-xs text-gray-500 tracking-tight mt-2">
						Click on Save to update your password
					</p>
					<CustomButton
						type="submit"
						disabled={passLoading ? true : false}
						loading={passLoading}
						variant="contained"
					>
						Change Password
					</CustomButton>
				</div>
			</form>
		</>
	);
};

export default ChangePass;
