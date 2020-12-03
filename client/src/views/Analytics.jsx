import React from "react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from "recharts";

// import data from "./data.json";
import data2 from "./data2";

const Analytics = () => {
	return (
		<div>
			<BarChart
				width={800}
				height={400}
				data={data2}
				margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="day" />
				<YAxis />
				<Legend />
				<Tooltip />
				{
					data2.map(
						(day) =>
							day.data.map((tmp, idx) => (
								<Bar
									dataKey={`data[${idx}].value`}
									fill={tmp.color}
									stackId={tmp.typeId}
									name={tmp.subtype}
									key={tmp.subtypeId}
								/>
							))
					)[0]
				}
			</BarChart>
		</div>
	);
	// return (
	// 	<div>
	// 		<BarChart
	// 			width={800}
	// 			height={400}
	// 			data={data}
	// 			margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
	// 		>
	// 			<CartesianGrid strokeDasharray="3 3" />
	// 			<XAxis dataKey="label" />
	// 			<YAxis />
	// 			<Legend />
	// 			<Tooltip />
	// 			{
	// 				data.map((day) =>
	// 					day.types.map((type, tIdx) =>
	// 						type.subtypes.map((subtype, sIdx) => (
	// 							<Bar
	// 								dataKey={`types[${tIdx}].subtypes[${sIdx}].num`}
	// 								name={subtype.name}
	// 								fill={subtype.color}
	// 								stackId={`${day.idx}-${type.id}`}
	// 							/>
	// 						))
	// 					)
	// 				)
	// 			}
	// 		</BarChart>
	// 	</div>
	// );
};

export default Analytics;
