import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
	return (
		<main className="container px-4 py-16 mx-auto">
			<section className="max-w-md mx-auto mt-48 text-center">
				<h1 className="mb-2 text-4xl font-medium">Page Not Found</h1>
				<p className="mb-8 text-sm">
					The page you were trying to view does not exist.
				</p>
				<Link
					to="/"
					className="inline-block h-10 px-6 py-2 mb-1 text-sm font-semibold text-white transition bg-ourGreen border border-green-600 rounded hover:bg-green-600 hover:border-green-600"
				>
					Return to Home
				</Link>
			</section>
		</main>
	);
};

export default PageNotFound;
