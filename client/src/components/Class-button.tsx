import React from 'react';
import { Button, Checkbox, FormControlLabel } from '@mui/material';
import './Class-button.css';

interface ClassButtonProps {
  userClass: {
    name: string;
  };
  isChecked: boolean;
  onCheckboxChange: () => {};
}

export const ClassButton = (props: ClassButtonProps) => {
  return (
    <React.Fragment>
      <Button className="classButton" variant="contained" size={'medium'}>
        {' '}
        {props.userClass.name}
      </Button>
      <FormControlLabel
        className="classCheckboxLabel"
        control={<Checkbox color="default" className="classCheckbox" size="medium" />}
        label=""
        checked={props.isChecked}
        onChange={props.onCheckboxChange}
      />
    </React.Fragment>
  );
};

export default ClassButton;
