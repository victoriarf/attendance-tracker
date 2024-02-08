import React from 'react';
import { Button } from '@mui/material';
import styles from './ClassButton.module.scss';

interface ClassButtonProps {
  userClass: {
    name: string;
  };
}

export const ClassButton = (props: ClassButtonProps) => {
  return (
    <React.Fragment>
      <Button className={styles.classButton} variant="contained" size={'medium'}>
        {' '}
        {props.userClass.name}
      </Button>
    </React.Fragment>
  );
};

export default ClassButton;
