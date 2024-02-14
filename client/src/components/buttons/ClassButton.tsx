import React, { useEffect, useRef, useState } from 'react';
import { Button, InputBase } from '@mui/material';
import styles from './ClassButton.module.scss';

interface ClassButtonProps {
  userClass: {
    name: string;
  };
  allowRename?: boolean;
  isActive: boolean;
  onRename?: (className: string) => void;
  onClick?: () => void;
}

export const ClassButton = (props: ClassButtonProps) => {
  console.log('ClassButton re rendering', props.userClass.name);
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
        className={`${styles.classButton} ${props.isActive && styles.active}`}
        variant="contained"
        size={'medium'}
        onDoubleClick={() => rename()}
        onClick={() => props.onClick && props.onClick()}>
        {' '}
        {!isRenameMode && props.userClass.name}
        {isRenameMode && (
          <InputBase
            className={styles.buttonInput}
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

export default React.memo(ClassButton);
