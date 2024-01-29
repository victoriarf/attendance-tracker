import { Checkbox, FormControlLabel } from '@mui/material';
import React from 'react';
import './Class-info.scss';
import { Recurring, UserClass } from '../interfaces/class.interface';

interface ClassInfoProps {
  userClass: UserClass;
}

function ClassInfo(props: ClassInfoProps) {
  function setPriceRecurring(recurring: Recurring) {
    if (recurring === 'monthly') return '/ month';
    if (recurring === 'individual') return '/ class';
    return '';
  }

  function getPaymentLabel(date?: string) {
    return date ? 'Payment:' + date : 'Payment is required';
  }

  return (
    <div className="classInfo">
      <div className="classNameRow">
        <strong className="className"> {props.userClass.name} </strong>
        <FormControlLabel control={<Checkbox />} label={getPaymentLabel()} />
      </div>

      <div>
        <div>
          <strong className="label">Price:</strong>
        </div>
        <strong> {props.userClass.price?.amount} uah</strong>
        {setPriceRecurring(props.userClass.price?.recurring)}
      </div>

      {/* Schedule */}
      {props.userClass.schedule?.length > 0 && (
        <div className="schedule">
          <strong className="label"> Shedule: </strong>
          {props.userClass.schedule.map(el => (
            <div key={el._id} className="schedule-record">
              <div className="day"> {el.day} </div>
              <div className="time">{el?.time}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ClassInfo;
