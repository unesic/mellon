import React from "react";
import ReactCalendar from "react-calendar";

const Calendar = ({ date, setDate }) => {
	return (
		<div className="Calendar__Wrapper">
			<ReactCalendar
				onChange={setDate}
				value={date}
				className="Calendar__Container"
				tileClassName="Calendar__Tile"
			/>
		</div>
	);
};

export default Calendar;
