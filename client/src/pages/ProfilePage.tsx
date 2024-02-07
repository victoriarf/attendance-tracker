import React, { SyntheticEvent, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useQuery } from 'react-query';
import { getUsers, removeUser } from '../api/usersApi';
import { Box, Button, Container, IconButton, Tab, Typography } from '@mui/material';
import PersonAddSharpIcon from '@mui/icons-material/PersonAddSharp';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import './ProfilePage.scss';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import AddStudentDialog from '../components/dialogs/AddStudentDialog';
import ConfirmationDialog from '../components/dialogs/ConfirmationDialog';

function ProfilePage() {
  const [activeUserId, setActiveUser] = useState<string | null>('');

  const [editStudentsMode, setEditStudentsMode] = useState(false);
  const [activeColor, setActiveColor] = useState('#3d94d6');

  const { data: users, refetch: refetchUsers } = useQuery('users', () => getUsers());
  const [newUserDialogOpen, newUserDialogSetOpen] = useState(false);
  const [deleteUserDialogOpen, deleteUserDialogSetOpen] = useState(false);
  const [deleteUserId, deleteUserSetId] = useState<string | null>(null);

  useEffect(() => {
    if (!activeUserId && users && users[0]) {
      setActiveUser(users[0]._id);
    }

    console.log('activeUserId', activeUserId);
  }, [activeUserId, users]);

  function confirmDeleteUser() {
    if (!deleteUserId) {
      return;
    }

    removeUser(deleteUserId).then(() => refetchUsers());
    deleteUserSetId(null);
    deleteUserDialogSetOpen(false);
  }

  function onColorChange(event: SyntheticEvent) {
    console.log(event);
    // @ts-expect-error //todo
    console.log(event.target.value);
    // @ts-expect-error //todo
    setActiveColor(event.target.value);
  }

  function onAddStudentPressed() {
    newUserDialogSetOpen(true);
  }

  function onRemoveStudentClicked(id: string) {
    deleteUserDialogSetOpen(true);
    deleteUserSetId(id);
  }

  return (
    <>
      <Navbar></Navbar>

      <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
        <h2>
          Profile
          <IconButton
            onClick={() => setEditStudentsMode(!editStudentsMode)}
            size="small"
            edge="start"
            aria-label="menu"
            sx={{ ml: 2 }}>
            <EditOutlinedIcon className="editIcon" />
          </IconButton>
        </h2>

        <Box className="row" sx={{ mb: 3 }}>
          <p> It is possible to change the color or double click to rename </p>
          <div>
            Select color
            <input type="color" value={activeColor} onChange={event => onColorChange(event)} />
          </div>
        </Box>

        <Box className="container">
          {activeUserId && (
            <>
              <Box className={'row'}>
                <Typography component="h4"> Students </Typography>

                <Button onClick={() => onAddStudentPressed()}>
                  <PersonAddSharpIcon color="action" sx={{ mr: 1 }} />
                  <span> Add student</span>
                </Button>
              </Box>
              <TabContext value={activeUserId}>
                <TabList
                  variant="scrollable"
                  onChange={(_, newValue) => setActiveUser(newValue)}
                  color="primary">
                  {users?.map((user: { _id: string; name: string }) => (
                    <Tab
                      key={user._id}
                      label={
                        <div className={'row'}>
                          {user.name}
                          {editStudentsMode && (
                            <IconButton
                              onClick={() => onRemoveStudentClicked(user._id)}
                              key={user._id + 'icon'}
                              size="small"
                              edge="start"
                              color="inherit"
                              aria-label="menu"
                              sx={{ mr: 2 }}>
                              <DeleteOutlineOutlinedIcon color="action" />
                            </IconButton>
                          )}
                        </div>
                      }
                      value={user._id}
                    />
                  ))}
                </TabList>

                <TabPanel value={activeUserId}>
                  <Box className={'row'}>
                    <Typography component="h4"> Classes </Typography>

                    <Button onClick={() => onAddStudentPressed()}>
                      <PersonAddSharpIcon color="action" sx={{ mr: 1 }} />
                      <span> Add class</span>
                    </Button>
                  </Box>
                </TabPanel>
              </TabContext>
            </>
          )}
        </Box>
      </Container>

      <AddStudentDialog
        refetchUsers={refetchUsers}
        open={newUserDialogOpen}
        setOpen={newUserDialogSetOpen}></AddStudentDialog>

      <ConfirmationDialog
        title="Are you sure you want to delete user?"
        open={deleteUserDialogOpen}
        setOpen={deleteUserDialogSetOpen}
        confirmAction={() => confirmDeleteUser()}></ConfirmationDialog>
    </>
  );
}

export default ProfilePage;
