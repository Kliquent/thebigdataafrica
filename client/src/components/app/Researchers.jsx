import React, { useState, useEffect, Fragment } from 'react';
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

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CustomButton from '../../utils/CustomButton';

import Navbar from './Navbar';

const Researchers = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	return (
		<>
			<Navbar />
			<h3>Researchers</h3>
		</>
	);
};

export default Researchers;
