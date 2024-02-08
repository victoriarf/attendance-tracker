import React from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';
import ClassButton from './ClassButton';
import './ClassButtonWithCheckbox.scss';

interface ClassButtonProps {
  userClass: {
    name: string;
  };
  isChecked: boolean;
  onCheckboxChange: () => void;
}

export const ClassButtonWithCheckbox = (props: ClassButtonProps) => {
  return (
    <>
      <ClassButton userClass={props.userClass}></ClassButton>
      <FormControlLabel
        className="classCheckboxLabel"
        control={<Checkbox color="default" className="classCheckbox" size="medium" />}
        label=""
        checked={props.isChecked}
        onChange={props.onCheckboxChange}
      />
    </>
  );
};

export default ClassButtonWithCheckbox;
