import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
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

const SurveyDetails = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	let urlParams = useParams();
	let surveyId = urlParams?.surveyId;
	console.log(surveyId);

	return (
		<>
			<Navbar />
			<main className="flex-1 max-h-full p-5 overflow-hidden overflow-y-scroll">
				<div className="flex flex-col items-start justify-start pb-6 space-x-2 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
					<IconButton onClick={() => navigate('/')}>
						<ArrowBackIcon />
					</IconButton>
					<h1 className="text-2xl font-semibold whitespace-nowrap">
						What’s Your Take on This? Techmakers
					</h1>
				</div>
				<div className="wrapper">
					<Accordion title="Why is the sky blue?">
						Sunlight reaches Earth's atmosphere and is scattered in all
						directions by all the gases and particles in the air. Blue light is
						scattered more than the other colors because it travels as shorter,
						smaller waves. This is why we see a blue sky most of the time.
					</Accordion>
					<Accordion title="What's It Like Inside Jupiter?">
						It's really hot inside Jupiter! No one knows exactly how hot, but
						scientists think it could be about 43,000°F (24,000°C) near
						Jupiter's center, or core.
					</Accordion>
					<Accordion title="What Is a Black Hole?">
						A black hole is an area of such immense gravity that nothing -- not
						even light -- can escape from it.
					</Accordion>
				</div>
			</main>
		</>
	);
};

export default SurveyDetails;

const Accordion = ({ title, children }) => {
	const [isOpen, setOpen] = React.useState(false);
	return (
		<div className="accordion-wrapper">
			<div
				className={`accordion-title ${isOpen ? 'open' : ''}`}
				onClick={() => setOpen(!isOpen)}
			>
				{title}
			</div>
			<div className={`accordion-item ${!isOpen ? 'collapsed' : ''}`}>
				<div className="accordion-content">{children}</div>
			</div>
		</div>
	);
};
