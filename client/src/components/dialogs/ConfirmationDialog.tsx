import { useRef } from 'react';
import { Box, Button, Dialog, DialogTitle } from '@mui/material';
import React from 'react';

interface ConfirmationDialogProps {
  open: boolean;
  setOpen: (arg: boolean) => void;
  title: string;
  text?: boolean;
  confirmAction: (arg?: unknown) => void;
}

function ConfirmationDialog(props: ConfirmationDialogProps) {
  const newUserDialogRef = useRef<HTMLDivElement | null>(null);

  function handleClose() {
    props.setOpen(false);
  }

  return (
    <Dialog
      onClose={handleClose}
      open={props.open}
      ref={node => {
        newUserDialogRef.current = node;
      }}>
      <DialogTitle> {props.title} </DialogTitle>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={4}
        marginBottom="20px"
        marginTop="20px">
        <Button onClick={() => props.confirmAction()} variant="contained">
          Confirm
        </Button>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
      </Box>
    </Dialog>
  );
}

export default ConfirmationDialog;
