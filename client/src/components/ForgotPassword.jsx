import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
	return (
		<main className="container py-16 mx-auto lg:px-4">
			<section className="max-w-md mx-auto mt-16">
				<form action="#" className="p-4 mb-8 bg-white rounded-md shadow-md">
					<p className="my-4 text-2xl font-semibold text-center">
						Forgot Password
					</p>
					<p className="mb-4 text-sm">
						Enter your email address below so we can send you a password reset
						link.
					</p>

					<div className="mb-4">
						<input
							type="email"
							id="input-email"
							name="input_email"
							placeholder="Enter email"
							className="w-full h-10 px-2 mb-1 text-sm bg-transparent border border-gray-400 rounded appearance-none disabled:bg-gray-100 dark:disabled:bg-gray-700 focus:border-ourGreen dark:border-gray-600 focus:ring-ourGreen focus:outline-none"
							required
						/>
					</div>

					<button
						type="submit"
						className="w-full h-10 px-6 py-2 mb-4 text-sm font-semibold text-center text-white align-middle transition bg-ourGreen border border-green-600 rounded hover:bg-ourGreen hover:border-green-600 disabled:pointer-events-none"
					>
						Send Reset Password Link
					</button>
					<Link
						to="/"
						className="block mb-4 text-sm text-center text-green-600 hover:text-green-800"
					>
						Back to login
					</Link>
				</form>
			</section>
		</main>
	);
};

export default ForgotPassword;
