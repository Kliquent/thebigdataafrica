import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
	ResponsiveContainer,
	PieChart,
	Tooltip,
	Legend,
	Pie,
	Cell,
} from 'recharts';
import { tokenConfig } from '../../store/actions/survey-actions';

const COLORS = [
	// '#FFBB28',
	'#FF3366',
	// '#0088FE',
	// '#FF7300',
	// '#FF0000',
	'#007ED6',
	'#7CDDDD',
	'#00C49F',
];

const PieChartM = () => {
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

	const SURVEYS = [
		{
			name: 'Surveys',
			value: analytics.totalSurveys,
		},
		{
			name: 'Questions',
			value: analytics.totalQuestions,
		},
		{
			name: 'Options',
			value: analytics.totalOptions,
		},
		{
			name: 'Responses',
			value: analytics.totalAnswers,
		},
	];

	const RADIAN = Math.PI / 180;
	const renderCustomizedLabel = ({
		cx,
		cy,
		midAngle,
		innerRadius,
		outerRadius,
		percent,
		index,
	}) => {
		const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
		const x = cx + radius * Math.cos(-midAngle * RADIAN) - 10;
		const y = cy + radius * Math.sin(-midAngle * RADIAN);

		return (
			<text x={x} y={y} fill="white" fontSize={12} dominantBaseline="central">
				{`${(percent * 100).toFixed(0)}%`}
			</text>
		);
	};

	return (
		<ResponsiveContainer width="99%" height={400}>
			<PieChart fontSize={14}>
				<Tooltip
					cursor={false}
					contentStyle={TooltipContainerStyles}
					formatter={(value, name) => [`${value}`, `Stats - ${name}`]}
				/>

				<Pie
					dataKey="value"
					data={SURVEYS}
					outerRadius={100}
					innerRadius={60}
					name="Sales"
					nameKey="name"
					unit="%"
					paddingAngle={2}
					label={renderCustomizedLabel}
					labelLine={false}
				>
					{SURVEYS.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
					))}
				</Pie>
				{/* <Legend layout="vertical" verticalAlign="middle" align="right" /> */}
				<Legend layout="horizontal" verticalAlign="bottom" align="center" />
			</PieChart>
		</ResponsiveContainer>
	);
};

export default PieChartM;

const TooltipContainerStyles = {
	border: 0,
	borderRadius: '8px',
	fontSize: 14,
	boxShadow: '2px 2px 5px 3px rgba(0,0,0,0.15)',
};
