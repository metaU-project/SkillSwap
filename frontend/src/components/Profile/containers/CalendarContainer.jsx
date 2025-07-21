import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';

const CalendarContainer = ({ onDateSelect }) => {
  const [value, setValue] = useState(new Date());
  const handleChange = (date) => {
    setValue(date);
    if (onDateSelect) onDateSelect(date);
  };

  return (
    <div>
      <Calendar onChange={handleChange} value={value} />
    </div>
  );
};

export default CalendarContainer;
