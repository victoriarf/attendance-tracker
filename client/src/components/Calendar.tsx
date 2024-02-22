import React, { useEffect, useReducer, useState } from 'react';
import { Calendar, DateObject } from 'react-multi-date-picker';
import { isSameMonth } from 'date-fns';

interface MapDaysProps {
  style?: React.CSSProperties;
}

interface ClassDays {
  selectedDates: DateObject[];
  missedDates: DateObject[];
  color?: string;
}

type CalendarDays = Record<string, ClassDays>;

interface CalendarDatesAction {
  workingClass: string;
  dates: DateObject[];
  type: EventTypes;
  date: DateObject | undefined;
}

enum EventTypes {
  Missed = 'Missed',
  Selected = 'Selected',
  Unselected = 'Unselected',
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
  const initialCalendarDates: CalendarDays = {
    painting: {
      selectedDates: [],
      missedDates: [],
      color: 'rgba(10,255,161,0.5)',
    },
  };

  const datesReducer = (state: CalendarDays, action: CalendarDatesAction): CalendarDays => {
    const classDates = state[action.workingClass];
    let newSelectedDates = action.dates;
    let newMissedDates = classDates.missedDates;

    if (action.type === EventTypes.Missed) {
      newMissedDates = [...classDates.missedDates, action.date!];
    }

    if (action.type === EventTypes.Unselected) {
      newMissedDates = classDates.missedDates.filter(el => el !== action.date);
      newSelectedDates = classDates.selectedDates.filter(el => el !== action.date);
    }

    return {
      [action.workingClass]: {
        selectedDates: newSelectedDates,
        missedDates: newMissedDates,
      },
    };
  };

  const [calendarDates, updateCalendarDates] = useReducer<
    React.Reducer<CalendarDays, CalendarDatesAction>
  >(datesReducer, initialCalendarDates);
  const [displayedMonth, setDisplayedMonth] = useState<Date>(new Date());

  const attendedThisMonth = calendarDates.painting.selectedDates.filter((date: DateObject) => {
    return isSameMonth(date.toDate(), displayedMonth);
  });

  useEffect(() => {
    props.onAttendanceChange(attendedThisMonth.length);
  }, [attendedThisMonth]);

  const handleMonthChange = (newDate: DateObject) => {
    setDisplayedMonth(newDate.toDate());
  };

  function findMissingElement(initialArray: DateObject[], newArray: DateObject[]) {
    return initialArray.find(
      el => !newArray.some(current => el.format(DATE_FORMAT) === current.format(DATE_FORMAT))
    );
  }

  function findRepeatedElement(missed: DateObject[], selected: DateObject[]) {
    return missed.find(el =>
      selected.some(selected => selected.format(DATE_FORMAT) === el.format(DATE_FORMAT))
    );
  }

  const handleDatesChange = (dates: DateObject[]) => {
    const classDates = calendarDates.painting;
    let type = EventTypes.Selected;
    let date;

    if (dates.length < classDates.selectedDates.length) {
      date = findMissingElement(classDates.selectedDates, dates);
      !!date && (type = EventTypes.Missed);
    } else {
      date = findRepeatedElement(classDates.missedDates, dates);
      !!date && (type = EventTypes.Unselected);
    }

    updateCalendarDates({ workingClass: 'painting', dates, type, date });
  };

  return (
    <div className="styles.classesCalendar">
      <Calendar
        value={calendarDates.painting.selectedDates}
        onChange={handleDatesChange}
        multiple
        numberOfMonths={1}
        onMonthChange={handleMonthChange}
        className="styles.attendanceCalendar"
        mapDays={({ date, isSameDate }) => {
          const props: MapDaysProps = {};
          calendarDates['painting'].missedDates.map(day => {
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

      <p> Painting Selected dates: </p>
      {calendarDates.painting.selectedDates.map((date, index) => (
        <li key={index}>
          {' '}
          <span>Selected DATE:</span> {date.format(DATE_FORMAT)}{' '}
        </li>
      ))}

      <p> Painnting Missed dates: </p>
      {calendarDates.painting.missedDates.map((date, index) => (
        <li key={index}>
          {' '}
          <span>Missed DATE:</span> {date.format(DATE_FORMAT)}{' '}
        </li>
      ))}
    </div>
  );
}

export default CalendarComponent;
