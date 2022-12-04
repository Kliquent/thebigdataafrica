import React from 'react';
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

const ResponseBarChart = ({ options }) => {
	return (
		<ResponsiveContainer width="99%" height={400}>
			<BarChart
				width={500}
				height={300}
				data={options}
				margin={{
					top: 20,
					right: 10,
					left: 20,
					bottom: 5,
				}}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="option_id[0].name" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Bar dataKey="count" fill="#12B981" />
			</BarChart>
		</ResponsiveContainer>
	);
};

export default ResponseBarChart;
