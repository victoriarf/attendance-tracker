import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useQuery } from 'react-query';
import { getUsers, removeUser } from '../api/usersApi';
import { Box, Button, Container, IconButton, Stack, Tab, Typography } from '@mui/material';
import PersonAddSharpIcon from '@mui/icons-material/PersonAddSharp';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import './ProfilePage.scss';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import AddStudentDialog from '../components/dialogs/AddStudentDialog';
import ConfirmationDialog from '../components/dialogs/ConfirmationDialog';
import { UserClass } from '../interfaces/class.interface';
import { getUserClasses, updateUserClass } from '../api/classesApi';
import ClassButton from '../components/buttons/ClassButton';
import { prepareClassData } from '../api/classes-transform-api';

// TODO: export interface
interface TabUser {
  _id: string;
  name: string;
}

function ProfilePage() {
  const [activeUserId, setActiveUser] = useState<string | null>('');

  const [editStudentsMode, setEditStudentsMode] = useState(false);
  const [activeColor, setActiveColor] = useState('#3d94d6');

  const { data: users, refetch: refetchUsers } = useQuery('users', () => getUsers());
  const [newUserDialogOpen, newUserDialogSetOpen] = useState(false);
  const [deleteUserDialogOpen, deleteUserDialogSetOpen] = useState(false);
  const [deleteUserId, deleteUserSetId] = useState<string | null>(null);

  const { data: classes, refetch: refetchClasses } = useQuery(
    ['classes', activeUserId],
    () => activeUserId && getUserClasses(activeUserId),
    {
      enabled: !!activeUserId,
    }
  );

  useEffect(() => {
    if (!activeUserId && users && users[0]) {
      setActiveUser(users[0]._id);
    }
  }, [activeUserId, users]);

  function confirmDeleteUser() {
    if (!deleteUserId) {
      return;
    }

    removeUser(deleteUserId).then(() => refetchUsers());
    deleteUserSetId(null);
    deleteUserDialogSetOpen(false);
  }

  function onColorChange(event: React.ChangeEvent<HTMLInputElement>) {
    setActiveColor(event.target.value);
  }

  function onAddStudentPressed(): void {
    newUserDialogSetOpen(true);
  }

  function onAddClassPressed(): void {
    newUserDialogSetOpen(true);
  }

  function onRemoveStudentClicked(id: string): void {
    deleteUserDialogSetOpen(true);
    deleteUserSetId(id);
  }

  function renameUserClass(classId: string, name: string) {
    const classData = prepareClassData({ name });
    updateUserClass(classId, classData).then(() => {
      refetchClasses();
    });
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
                  {users?.map((user: TabUser) => (
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
                              sx={{ mr: 2, pt: 0, pb: 0 }}>
                              <DeleteOutlineOutlinedIcon color="action" />
                            </IconButton>
                          )}
                        </div>
                      }
                      value={user._id}
                    />
                  ))}
                </TabList>

                <Box className={'row'}>
                  <Typography component="h4"> Classes </Typography>
                  <Button onClick={() => onAddClassPressed()}>
                    <PersonAddSharpIcon color="action" sx={{ mr: 1 }} />
                    <span> Add a class</span>
                  </Button>
                </Box>

                {users.map((user: TabUser) => (
                  <TabPanel key={user._id} value={user._id}>
                    <Stack direction="column" justifyContent="start" spacing={1}>
                      {classes?.map((userClass: UserClass) => (
                        <Box key={userClass.name}>
                          <ClassButton
                            userClass={userClass}
                            allowRename={editStudentsMode}
                            onRename={(name: string) => renameUserClass(userClass._id, name)}
                          />
                        </Box>
                      ))}
                    </Stack>
                  </TabPanel>
                ))}
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
