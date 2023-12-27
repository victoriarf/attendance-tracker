import React, { useRef, useState} from 'react';
import { Calendar } from "react-multi-date-picker"
import './Calendar.scss';

function CalendarComponent() {
  // const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const [value, setValue] = useState(new Date());

  return (
      <>
        <div className='classes-calendar'>
          <Calendar
              value={value}
              onChange={setValue}
              multiple={true}
              numberOfMonths={1}
          />
        </div>
      </>
  )
}

export default CalendarComponent
