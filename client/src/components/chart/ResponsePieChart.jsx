import React from 'react';
import {
	ResponsiveContainer,
	PieChart,
	Tooltip,
	Legend,
	Pie,
	Cell,
} from 'recharts';

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

const ResponsePieChart = ({ options }) => {
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
					formatter={(count, name) => [`${count}`, `Choice - ${name}`]}
				/>

				<Pie
					dataKey="count"
					data={options}
					outerRadius={100}
					innerRadius={60}
					name="Choices"
					nameKey="option_id[0].name"
					unit="%"
					paddingAngle={2}
					label={renderCustomizedLabel}
					labelLine={false}
				>
					{options.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
					))}
				</Pie>
				{/* <Legend layout="vertical" verticalAlign="middle" align="right" /> */}
				{/* <Legend layout="horizontal" verticalAlign="bottom" align="center" /> */}
			</PieChart>
		</ResponsiveContainer>
	);
};

export default ResponsePieChart;

const TooltipContainerStyles = {
	border: 0,
	borderRadius: '8px',
	fontSize: 14,
	boxShadow: '2px 2px 5px 3px rgba(0,0,0,0.15)',
};
