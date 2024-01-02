import React, {useEffect, useRef, useState} from 'react';
import {Calendar} from "react-multi-date-picker"
import {getDaysInMonth, startOfMonth, addDays, isFriday, isSameDay} from 'date-fns';
import './Calendar.scss';

/**
 * Refer to docs https://shahabyazdi.github.io/react-multi-date-picker/props/
 * This calendar has some bugs.
 * 1 - When you select multiple values, than press again on the selected one -
 * onFocusedDateChange always will receive latest focused date value, even if user deselect first selected.
 * 2 - onFocusedDateChange will receive undefined when presses same value again
 */
function CalendarComponent() {
  const DATE_FORMAT = 'DD/MM/YYYY';

  const [selectedDates, setSelectedDates] = useState([]);
  const [missedDates, setMissedDates] = useState([]);

  useEffect(() => {
    console.log('Selected Dates:', selectedDates.map((date) => date.format(DATE_FORMAT)));
    console.log('Missed : ', missedDates.map((date) => date.format(DATE_FORMAT)));
  }, [selectedDates, missedDates]);


  const handleMonthChange = (newDate) => {
    console.log('handle month change');
  };

  function findMissingElement(initialArray, newArray) {
    return initialArray.filter(el => {
      let found = newArray.reduce((acc, current) => {
        el.format(DATE_FORMAT) === current.format(DATE_FORMAT) && acc.push(current.format(DATE_FORMAT));
        return acc;
      }, []);
      return !found.includes(el.format(DATE_FORMAT));
    });
  }


  const handleDatesChange = (dates) => {
    // 1) User deselects a date -> add to missing
    if (dates.length < selectedDates.length) {
      let deselectedDates = findMissingElement(selectedDates, dates);
      if (deselectedDates.length > 0) {
        setMissedDates([...missedDates, ...deselectedDates])
      }

    } else {
      let reselected = findMissingElement(missedDates, dates);
      setMissedDates(reselected);
    }

    setSelectedDates(dates);
  };


  return (
      <div className="classes-calendar">
        <Calendar
            value={selectedDates}
            onChange={handleDatesChange}
            multiple
            numberOfMonths={1}
            onMonthChange={handleMonthChange}
            className='attendance-calendar'
            mapDays={({date, isSameDate}) => {
              let props = {};
              missedDates.map(day => {
                if (isSameDate(date, day)) {
                  props.style = {backgroundColor: 'rgba(0, 0, 0, 0.15)'};
                }
              })


              return props;
            }}
        />
      </div>
  );
}

export default CalendarComponent;
