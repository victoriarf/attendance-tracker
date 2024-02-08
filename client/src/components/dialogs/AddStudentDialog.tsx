import { useState } from 'react';
import { Box, Button, Dialog, DialogTitle, TextField } from '@mui/material';
import React from 'react';

interface AddStudentDialogProps {
  open: boolean;
  setOpen: (arg: boolean) => void;
  confirmAction: (arg: string) => void;
}

function AddStudentDialog(props: AddStudentDialogProps) {
  const [newStudentName, setNewStudentName] = useState('');

  function handleClose() {
    props.setOpen(false);
  }

  return (
    <Dialog onClose={handleClose} open={props.open}>
      <DialogTitle> Please enter a student name </DialogTitle>
      <TextField
        value={newStudentName}
        onChange={ev => setNewStudentName(ev.target.value)}
        label="Name"
        variant="standard"
        sx={{ m: 2 }}
      />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={4}
        marginBottom="20px"
        marginTop="20px">
        <Button onClick={() => props.confirmAction(newStudentName)} variant="contained">
          Confirm
        </Button>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
      </Box>
    </Dialog>
  );
}

export default AddStudentDialog;
