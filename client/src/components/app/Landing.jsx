import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './index';

const Landing = () => {
	const [toggled, setToggled] = useState(false);
	const [width, setWidth] = useState(0);
	const [open, setOpen] = useState(false);

	const handleClickAway = () => {
		setOpen(false);
	};

	const onClick = () => setOpen(!open);

	const handleDrawerToggle = () => {
		if (width > 768) {
			setToggled(!toggled);
		}
	};

	useEffect(() => {
		const updateWindowDimensions = () => {
			const newWidth = window.innerWidth;
			setWidth(newWidth);
			// console.log('updating width');
		};

		// Update window width on page load
		updateWindowDimensions();

		// Update window width on page resize
		window.addEventListener('resize', updateWindowDimensions);

		return () => window.removeEventListener('resize', updateWindowDimensions);
	}, []);

	// console.log('give height', width);

	return (
		<>
			<Sidebar
				width={width}
				toggled={toggled}
				handleDrawerToggle={handleDrawerToggle}
			/>
			<div className="home_content">
				<Outlet />
			</div>
		</>
	);
};

export default Landing;
