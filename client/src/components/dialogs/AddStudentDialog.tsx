import { useState } from 'react';
import { addUser } from '../../api/usersApi';
import { Box, Button, Dialog, DialogTitle, TextField } from '@mui/material';
import React from 'react';

interface AddStudentDialogProps {
  refetchUsers: () => void;
  open: boolean;
  setOpen: (arg: boolean) => void;
}

function AddStudentDialog(props: AddStudentDialogProps) {
  const [newStudentName, setNewStudentName] = useState('');

  function addStudent(name: string) {
    addUser(name).then(() => {
      props.setOpen(false);
      props.refetchUsers();
    });
  }

  function handleNewUserDialogClose() {
    props.setOpen(false);
  }

  return (
    <Dialog onClose={handleNewUserDialogClose} open={props.open}>
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
        <Button onClick={() => addStudent(newStudentName)} variant="contained">
          Confirm
        </Button>
        <Button onClick={handleNewUserDialogClose} variant="outlined">
          Cancel
        </Button>
      </Box>
    </Dialog>
  );
}

export default AddStudentDialog;
