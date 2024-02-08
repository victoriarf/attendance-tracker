import React from 'react';
import { Button } from '@mui/material';
import './ClassButton.scss';

interface ClassButtonProps {
  userClass: {
    name: string;
  };
}

export const ClassButton = (props: ClassButtonProps) => {
  return (
    <React.Fragment>
      <Button className="classButton" variant="contained" size={'medium'}>
        {' '}
        {props.userClass.name}
      </Button>
    </React.Fragment>
  );
};

export default ClassButton;
