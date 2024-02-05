import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import { useQuery } from 'react-query';
import { addUser, getUsers, removeUser } from '../api/usersApi';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogTitle,
  IconButton,
  Tab,
  TextField,
} from '@mui/material';
import PersonAddSharpIcon from '@mui/icons-material/PersonAddSharp';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import './ProfilePage.scss';
import { TabContext, TabList } from '@mui/lab';

function ProfilePage() {
  const [activeUserId, setActiveUser] = useState<string | null>('');

  const [editStudentsMode, setEditStudentsMode] = useState(false);
  const [newStudentName, setNewStudentName] = useState('');
  const [newUserDialogOpen, newUserDialogSetOpen] = useState(false);

  const { data: users, refetch: refetchUsers } = useQuery('users', () => getUsers());
  const newUserDialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!activeUserId && users && users[0]) {
      setActiveUser(users[0]._id);
    }
  }, [activeUserId, users]);

  function onAddStudentPressed() {
    newUserDialogSetOpen(true);
  }

  function addStudent(name: string) {
    addUser(name).then(() => {
      newUserDialogSetOpen(false);
      refetchUsers();
    });
  }

  function handleNewUserDialogClose() {
    newUserDialogSetOpen(false);
  }

  function removeStudent(id: string) {
    removeUser(id).then(() => refetchUsers());
  }

  return (
    <>
      <Navbar></Navbar>

      <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
        <h2>Profile</h2>

        <div className="container">
          {activeUserId && (
            <>
              <IconButton
                onClick={() => setEditStudentsMode(!editStudentsMode)}
                size="small"
                edge="start"
                aria-label="menu"
                sx={{ mr: 2 }}>
                <EditOutlinedIcon className="editIcon" />
              </IconButton>

              {editStudentsMode && (
                <Button onClick={() => onAddStudentPressed()}>
                  <PersonAddSharpIcon color="action" sx={{ mr: 2 }} />
                  <span> Add </span>
                </Button>
              )}

              <TabContext value={activeUserId}>
                <TabList
                  variant="scrollable"
                  onChange={(_, newValue) => setActiveUser(newValue)}
                  color="primary">
                  {users?.map((user: { _id: string; name: string }) => (
                    <span key={user._id}>
                      <>
                        <Tab key={user._id} label={user.name} value={user._id} />
                        {editStudentsMode && (
                          <IconButton
                            onClick={() => removeStudent(user._id)}
                            key={user._id + 'icon'}
                            size="small"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}>
                            <DeleteOutlineOutlinedIcon color="action" />
                          </IconButton>
                        )}
                      </>
                    </span>
                  ))}
                </TabList>
              </TabContext>
            </>
          )}
        </div>
      </Container>

      {/* New Student/User Name */}
      <Dialog
        onClose={handleNewUserDialogClose}
        open={newUserDialogOpen}
        ref={node => {
          newUserDialogRef.current = node;
        }}>
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
    </>
  );
}

export default ProfilePage;
