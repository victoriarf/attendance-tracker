import React, { useEffect, useRef, useState } from 'react';
import { Button, InputBase } from '@mui/material';
import styles from './ClassButton.module.scss';

interface ClassButtonProps {
  userClass: {
    name: string;
  };
  allowRename?: boolean;
  onRename?: (className: string) => void;
}

export const ClassButton = (props: ClassButtonProps) => {
  const [className, setCLassName] = useState<string>('');
  const [isRenameMode, setIsRenameMode] = useState<boolean>();

  const classInput = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setCLassName(props.userClass.name);
  }, []);

  useEffect(() => {
    if (isRenameMode && classInput.current) {
      classInput.current?.focus();
    }
  }, [isRenameMode]);

  function rename() {
    if (!props.allowRename) return;
    setIsRenameMode(true);
  }

  function exitRename(ev: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setIsRenameMode(false);
    setCLassName(ev.target.value);

    if (props.userClass.name !== ev.target.value) {
      props.onRename && props.onRename(className);
    }
  }

  return (
    <React.Fragment>
      <Button
        className={styles.classButton}
        variant="contained"
        size={'medium'}
        onDoubleClick={() => rename()}>
        {' '}
        {!isRenameMode && props.userClass.name}
        {isRenameMode && (
          <InputBase
            inputRef={(node: HTMLInputElement) => (classInput.current = node)}
            onBlur={exitRename}
            value={className}
            onChange={ev => setCLassName(ev.target.value)}
            inputProps={{ 'aria-label': props.userClass.name }}></InputBase>
        )}
      </Button>
    </React.Fragment>
  );
};

export default ClassButton;
