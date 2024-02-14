import React, { useEffect, useState } from 'react';
import { Calendar, DateObject } from 'react-multi-date-picker';
import { isSameMonth } from 'date-fns';

interface MapDaysProps {
  style?: React.CSSProperties;
}

/**
 * Refer to docs https://shahabyazdi.github.io/react-multi-date-picker/props/
 * This calendar has some bugs.
 * 1 - When you select multiple values, then press again on the selected one -
 * onFocusedDateChange always will receive latest focused date value, even if user deselect first selected.
 * 2 - onFocusedDateChange will receive undefined when presses same value again
 */
function CalendarComponent(props: { onAttendanceChange: (value: number) => void }) {
  const DATE_FORMAT = 'DD/MM/YYYY';

  const [selectedDates, setSelectedDates] = useState<DateObject[]>([]);
  const [missedDates, setMissedDates] = useState<DateObject[]>([]);
  const [displayedMonth, setDisplayedMonth] = useState<Date>(new Date());

  useEffect(() => {
    console.log(
      'Selected Dates:',
      selectedDates.map((date: DateObject) => date.format(DATE_FORMAT))
    );
    console.log(
      'Missed : ',
      missedDates.map((date: DateObject) => date.format(DATE_FORMAT))
    );
  }, [selectedDates, missedDates]);

  const attendedThisMonth = selectedDates.filter((date: DateObject) => {
    return isSameMonth(date.toDate(), displayedMonth);
  });

  useEffect(() => {
    props.onAttendanceChange(attendedThisMonth.length);
  }, [attendedThisMonth]);

  const handleMonthChange = (newDate: DateObject) => {
    setDisplayedMonth(newDate.toDate());
  };

  function findMissingElement(initialArray: DateObject[], newArray: DateObject[]) {
    return initialArray.filter(el => {
      const found = newArray.reduce((acc: string[], current: DateObject) => {
        el.format(DATE_FORMAT) === current.format(DATE_FORMAT) &&
          acc.push(current.format(DATE_FORMAT));
        return acc;
      }, []);
      return !found.includes(el.format(DATE_FORMAT));
    });
  }

  const handleDatesChange = (dates: DateObject[]) => {
    // 1) User deselects a date -> add to missing
    if (dates.length < selectedDates.length) {
      const deselectedDates = findMissingElement(selectedDates, dates);
      if (deselectedDates.length > 0) {
        setMissedDates([...missedDates, ...deselectedDates]);
      }
    } else {
      const reselected = findMissingElement(missedDates, dates);
      setMissedDates(reselected);
    }

    setSelectedDates(dates);
  };

  return (
    <div className="styles.classesCalendar">
      <Calendar
        value={selectedDates}
        onChange={handleDatesChange}
        multiple
        numberOfMonths={1}
        onMonthChange={handleMonthChange}
        className="styles.attendanceCalendar"
        mapDays={({ date, isSameDate }) => {
          const props: MapDaysProps = {};
          missedDates.map(day => {
            if (isSameDate(date, day)) {
              props.style = { backgroundColor: 'rgba(0, 0, 0, 0.15)' };
            }
          });

          return props;
        }}
      />
      <p> This month Selected dates: </p>
      {attendedThisMonth.map((date, index) => (
        <li key={index}>
          {' '}
          <span>DATE:</span> {date.format(DATE_FORMAT)}{' '}
        </li>
      ))}
    </div>
  );
}

export default CalendarComponent;
