import React from 'react';
import { Button } from '@mui/material';
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

const CustomButton = (props) => {
	const { children, loading, ...rest } = props;
	return (
		<Button {...rest}>
			{loading && <SpinnerAdornment {...rest} />}
			&nbsp;
			{children}
		</Button>
	);
};

export default CustomButton;
