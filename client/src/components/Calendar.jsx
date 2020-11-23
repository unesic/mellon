import React, { useState } from "react";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Calendar = () => {
	const [date, setDate] = useState(new Date());

	return (
		<div>
			<ReactCalendar
				onChange={setDate}
				value={date}
				className="CalendarContainer"
				tileClassName="CalendarTile"
			/>
		</div>
	);
};

export default Calendar;
