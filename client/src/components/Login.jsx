import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import AdornedButton from '../utils/AdornedButton';
import { loginUser } from '../store/actions/auth-actions';

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	let auth = useSelector((state) => state.auth);
	let error = useSelector((state) => state.error);

	const [showPassword, setShowPassword] = useState(false);
	const [buttonLoading, setButtonLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'all',
		shouldUnregister: true,
		shouldFocusError: true,
	});

	const handleShowPassword = () =>
		setShowPassword((prevShowPassword) => !prevShowPassword);

	const onSubmit = async (data, e) => {
		setButtonLoading(true);
		e.preventDefault();
		await dispatch(loginUser(data));
	};

	let origin = '/';
	if (
		auth?.user?.current_user?.role_id?.title === 'Administrator' ||
		auth?.user?.current_user?.role_id?.title === 'Root Administrator'
	) {
		origin = location.state?.from?.pathname || '/';
	} else {
		origin = '/profile' || `/clients/${auth?.user?.current_user?.role_id?._id}`;
	}

	useEffect(() => {
		if (auth.isAuthenticated) {
			setButtonLoading(false);
			navigate(origin);
		}
	}, [auth.isAuthenticated]);

	useEffect(() => {
		// Check for login error
		if (error.id === 'LOGIN_FAIL') {
			setButtonLoading(false);
		} else {
			setButtonLoading(false);
		}
	}, [error]);

	return (
		<div>
			<div className="lg:flex">
				<div className="lg:w-1/2 xl:max-w-screen-sm">
					<div className="py-12 bg-green-100 lg:bg-white flex justify-center lg:px-12">
						{/* <div className="cursor-pointer flex items-center">
							<img
								src="https://res.cloudinary.com/bajetisafi/image/upload/v1660135726/logo/logo-removebg-preview_tmelxo.png"
								alt="Bajeti Safi Logo"
								loading="lazy"
							/>
						</div> */}
					</div>
					<div className="mt-8 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
						<h2
							className="text-center text-4xl text-ourGreen font-display font-semibold lg:text-left xl:text-5xl
                    xl:text-bold"
						>
							Log in
						</h2>
						<div className="mt-8">
							<form onSubmit={handleSubmit(onSubmit)}>
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
								<div className="my-4">
									<div className="flex justify-end items-center">
										<div>
											<Link
												to="/forgot-password"
												className="text-xs font-display font-semibold text-green-600 hover:text-green-800
                                        cursor-pointer"
											>
												Forgot Password?
											</Link>
										</div>
									</div>
								</div>
								<TextField
									{...register('password', {
										required: 'Password is required!',
										minLength: {
											value: 8,
											message: 'Password should be atleast 8 characters',
										},
									})}
									style={{ marginBottom: '.8rem' }}
									fullWidth
									name="password"
									type={showPassword ? 'text' : 'password'}
									label="Password"
									autoComplete="off"
									error={errors?.password ? true : false}
									helperText={errors?.password?.message}
								/>
								<div className="mt-10">
									<AdornedButton type="submit" loading={buttonLoading}>
										{buttonLoading ? 'Loading' : 'Login'}
									</AdornedButton>
								</div>
							</form>
							{/* <div className="mt-8 text-sm font-display font-semibold text-gray-700 text-center">
								Don't have an account ?{' '}
								<a className="cursor-pointer text-green-600 hover:text-green-800">
									Sign up
								</a>
							</div> */}
						</div>
					</div>
				</div>
				<div className="hidden lg:flex items-center justify-center bg-green-100 flex-1 h-screen">
					<div className="max-w-xs transform duration-200 hover:scale-150 cursor-pointer">
						<img
							className="w-5/6 mx-auto"
							src="https://res.cloudinary.com/bajetisafi/image/upload/q_auto/v1663964203/are-you-wasting-your-google-ads-budget_-11-lessons-learned-in-audits-1600x840-612e46c946598-sej-1520x800_l4diqb.jpg"
							alt="Bajeti Safi Dashboard"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
