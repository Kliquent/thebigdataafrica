import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Tooltip, Zoom } from '@mui/material';

import { logOut } from '../../store/actions/auth-actions';

const Sidebar = ({ width, toggled, handleDrawerToggle }) => {
	const dispatch = useDispatch();

	let auth = useSelector((state) => state.auth);

	const [click, setClick] = useState(false);

	const handleClick = () => setClick(!click);

	const signOut = () => {
		dispatch(logOut());
	};

	return (
		<>
			<div
				className={
					width > 768 ? (toggled ? 'sidebar active' : 'sidebar') : 'sidebar'
				}
			>
				<div className="logo_content">
					<div className="logo">
						{/* <img
							src="https://res.cloudinary.com/bajetisafi/image/upload/q_auto/v1660135726/logo/logo-removebg-preview_tmelxo.png"
							alt="Bajeti Safi Logo"
							className="logo-img"
							loading="lazy"
						/> */}
						<h4 className="logo-img text-black text-center font-semibold">
							The Big Data Africa
						</h4>
					</div>
					{width > 768 ? (
						<i className="bx bx-menu" onClick={handleDrawerToggle} id="btn"></i>
					) : (
						<div className="absolute top-4 w-[50px]">
							<img
								src="https://res.cloudinary.com/bajetisafi/image/upload/v1660133333/logo/icon-logo_ib6wwp.jpg"
								alt="Bajeti Safi Icon"
								className="object-cover"
								loading="lazy"
							/>
						</div>
					)}
				</div>

				<ul>
					<li>
						<NavLink to="/">
							{toggled ? (
								<i className="bx bx-grid-alt"></i>
							) : (
								<Tooltip
									componentsProps={{
										tooltip: {
											sx: {
												color: '#45B64C',
												width: '100px',
												bgcolor: '#fff',
												lineHeight: '30px',
												textAlign: 'center',
												fontSize: '1rem',
												boxShadow:
													'0px 0px 0px 0.5px rgba(50, 50, 93, 0.1), 0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07)',
												transition: 'all 0.5s ease',
											},
										},
										arrow: {
											sx: {
												color: '#DCFCE7',
											},
										},
									}}
									enterTouchDelay={0}
									title="Home"
									placement="right"
									TransitionComponent={Zoom}
									arrow
								>
									<i className="bx bx-grid-alt"></i>
								</Tooltip>
							)}

							<span className="links_name">Home</span>
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/clients"
							activeclassname="active"
							onClick={handleClick}
						>
							{toggled ? (
								<i className="bx bx-group"></i>
							) : (
								<Tooltip
									componentsProps={{
										tooltip: {
											sx: {
												color: '#45B64C',
												width: '100px',
												bgcolor: '#fff',
												lineHeight: '30px',
												textAlign: 'center',
												fontSize: '1rem',
												boxShadow:
													'0px 0px 0px 0.5px rgba(50, 50, 93, 0.1), 0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07)',
												transition: 'all 0.5s ease',
											},
										},
										arrow: {
											sx: {
												color: '#DCFCE7',
											},
										},
									}}
									enterTouchDelay={0}
									title="Clients"
									placement="right"
									TransitionComponent={Zoom}
									arrow
								>
									<i className="bx bx-group"></i>
								</Tooltip>
							)}
							<span className="links_name">Clients</span>
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/researchers"
							activeclassname="active"
							onClick={handleClick}
						>
							{toggled ? (
								<i className="bx bxs-user-detail"></i>
							) : (
								<Tooltip
									componentsProps={{
										tooltip: {
											sx: {
												color: '#45B64C',
												width: '110px',
												bgcolor: '#fff',
												lineHeight: '30px',
												textAlign: 'center',
												fontSize: '1rem',
												boxShadow:
													'0px 0px 0px 0.5px rgba(50, 50, 93, 0.1), 0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07)',
												transition: 'all 0.5s ease',
											},
										},
										arrow: {
											sx: {
												color: '#DCFCE7',
											},
										},
									}}
									enterTouchDelay={0}
									title="Researchers"
									placement="right"
									TransitionComponent={Zoom}
									arrow
								>
									<i className="bx bxs-user-detail"></i>
								</Tooltip>
							)}
							<span className="links_name">Researchers</span>
						</NavLink>
					</li>

					{/* <li>
						<NavLink
							to="/administrators"
							activeclassname="active"
							onClick={handleClick}
						>
							{toggled ? (
								<i className="bx bx-user"></i>
							) : (
								<Tooltip
									componentsProps={{
										tooltip: {
											sx: {
												color: '#45B64C',
												width: '120px',
												bgcolor: '#fff',
												lineHeight: '30px',
												textAlign: 'center',
												fontSize: '1rem',
												boxShadow:
													'0px 0px 0px 0.5px rgba(50, 50, 93, 0.1), 0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07)',
												transition: 'all 0.5s ease',
											},
										},
										arrow: {
											sx: {
												color: '#DCFCE7',
											},
										},
									}}
									enterTouchDelay={0}
									title="Administrators"
									placement="right"
									TransitionComponent={Zoom}
									arrow
								>
									<i className="bx bx-user"></i>
								</Tooltip>
							)}
							<span className="links_name">Administrators</span>
						</NavLink>
					</li> */}
				</ul>

				<div className="profile_content">
					<div className="profile_dashboard">
						<div className="profile_details">
							<div className="name_job">
								<div className="name">{auth?.user?.current_user?.name}</div>
								<div className="job">{auth?.user?.current_user?.role}</div>
							</div>
						</div>
						{toggled ? (
							<i className="bx bx-log-out" onClick={signOut} id="log_out"></i>
						) : (
							<Tooltip
								componentsProps={{
									tooltip: {
										sx: {
											color: '#45B64C',
											width: '100px',
											bgcolor: '#fff',
											lineHeight: '30px',
											textAlign: 'center',
											fontSize: '1rem',
											boxShadow:
												'0px 0px 0px 0.5px rgba(50, 50, 93, 0.1), 0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07)',
											transition: 'all 0.5s ease',
										},
									},
									arrow: {
										sx: {
											color: '#DCFCE7',
										},
									},
								}}
								enterTouchDelay={0}
								title="Logout"
								placement="right"
								TransitionComponent={Zoom}
								arrow
							>
								<i className="bx bx-log-out" onClick={signOut} id="log_out"></i>
							</Tooltip>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default Sidebar;
