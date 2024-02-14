import React from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';
import ClassButton from './ClassButton';
import styles from './ClassButtonWithCheckbox.module.scss';

interface ClassButtonProps {
  userClass: {
    name: string;
  };
  isChecked: boolean;
  isActive: boolean;
  onCheckboxChange: () => void;
  onClick?: () => void;
}

export const ClassButtonWithCheckbox = (props: ClassButtonProps) => {
  return (
    <>
      <ClassButton
        userClass={props.userClass}
        isActive={props.isActive}
        onClick={() => props.onClick && props.onClick()}></ClassButton>
      <FormControlLabel
        className={styles.classCheckboxLabel}
        control={<Checkbox color="default" className={styles.classCheckbox} size="medium" />}
        label=""
        checked={props.isChecked}
        onChange={props.onCheckboxChange}
      />
    </>
  );
};

export default ClassButtonWithCheckbox;
