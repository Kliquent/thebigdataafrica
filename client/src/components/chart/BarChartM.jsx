import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';
import { tokenConfig } from '../../store/actions/survey-actions';

const BarChartM = () => {
	const token = tokenConfig();

	const [analytics, setAnalytics] = useState({});

	useEffect(() => {
		(async () => {
			const response = await axios.get(
				`https://apis.thebigdataafrica.com/api/v1/analytics`,
				token
			);
			const analyticsData = await response.data;

			if (analyticsData) {
				setAnalytics((analytics) => ({
					...analytics,
					...analyticsData,
				}));
			}
		})();
	}, []);

	const data = [
		{
			name: 'Dec',
			surveys: analytics.totalSurveys,
			questions: analytics.totalQuestions,
			options: analytics.totalOptions,
			answers: analytics.totalAnswers,
			total: 21600,
		},
	];

	return (
		<ResponsiveContainer width="99%" height={400}>
			<BarChart
				width={500}
				height={300}
				data={data}
				margin={{
					top: 20,
					right: 10,
					left: 20,
					bottom: 5,
				}}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Bar dataKey="surveys" fill="#12B981" />
				<Bar dataKey="questions" fill="#0DA5E9" />
				<Bar dataKey="options" fill="#F97316" />
				<Bar dataKey="answers" fill="#FF0000" />
			</BarChart>
		</ResponsiveContainer>
	);
};

export default BarChartM;
