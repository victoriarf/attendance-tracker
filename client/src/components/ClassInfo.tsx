import { Checkbox, FormControlLabel } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Recurring, UserClass } from '../interfaces/class.interface';
import styles from './ClassInfo.module.scss';

interface ClassInfoProps {
  userClass: UserClass;
  attendedThisMonth: number;
}

function ClassInfo(props: ClassInfoProps) {
  const [currentMonthTotal, setCurrentMonthTotal] = useState<number>(0);

  useEffect(() => {
    calculateCurrentMonthTotal();
  }, [props.attendedThisMonth]);

  function setPriceRecurring(recurring: Recurring) {
    if (recurring === 'monthly') return '/ month';
    if (recurring === 'individual') return '/ class';
    return '';
  }

  function getPaymentLabel(date?: string) {
    return date ? 'Payment:' + date : 'Payment is required';
  }

  const calculateCurrentMonthTotal = () => {
    if (props.userClass.price.recurring === 'monthly') {
      return setCurrentMonthTotal(Number(props.userClass.price.amount));
    }

    if (props.userClass.price.recurring === 'individual') {
      const numberOfClasses = props.attendedThisMonth;
      setCurrentMonthTotal(+props.userClass.price.amount * numberOfClasses);
    }
  };

  return (
    <div className={styles.classInfo}>
      <div className={styles.classNameRow}>
        <strong className={styles.className}> {props.userClass.name} </strong>
        <FormControlLabel control={<Checkbox />} label={getPaymentLabel()} />
      </div>

      <div>
        <div>
          <strong className={styles.label}>Price:</strong>
        </div>
        <strong> {props.userClass.price?.amount} uah</strong>
        {setPriceRecurring(props.userClass.price?.recurring)}
      </div>

      <div>This month total: {currentMonthTotal}</div>

      {/* Schedule */}
      {props.userClass.schedule?.length > 0 && (
        <div className={styles.schedule}>
          <strong className={styles.label}> Shedule: </strong>
          {props.userClass.schedule.map(el => (
            <div key={el._id} className={styles.scheduleRecord}>
              <div className={styles.day}> {el.day} </div>
              <div className={styles.time}>{el?.time}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ClassInfo;
