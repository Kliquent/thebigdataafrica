import React from 'react';
import { CircularProgress } from '@mui/material';
import { withStyles } from '@mui/styles';

const styles = {
	root: {
		marginLeft: 5,
	},
};

const SpinnerAdornment = withStyles(styles)((props) => (
	<CircularProgress className={props.classes.spinner} size={15} />
));

const AdornedButton = (props) => {
	const { children, loading, ...rest } = props;
	return (
		<button
			className={`${
				loading
					? 'bg-gray-100 text-black opacity-50 cursor-not-allowed'
					: 'bg-ourGreen text-white hover:bg-green-600'
			}  p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline 
                                shadow-lg`}
			{...rest}
		>
			{loading && <SpinnerAdornment {...rest} />}
			&nbsp;
			{children}
		</button>
	);
};

export default AdornedButton;
