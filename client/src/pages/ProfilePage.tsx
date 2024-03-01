import React, { useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { addUser, getUsers, removeUser } from '../api/usersApi';
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
import WrapperWithNavbar from '../components/WrapperWithNavbar';

// TODO: export interface
interface TabUser {
  _id: string;
  name: string;
}

function ProfilePage() {
  const [activeUserId, setActiveUser] = useState<string | null>('');

  const [editStudentsMode, setEditStudentsMode] = useState(false);
  const [activeColor, setActiveColor] = useState('#3d94d6');

  const [activeClass, setActiveClass] = useState<TabUser | null>(null);

  const { data: users, refetch: refetchUsers } = useQuery('users', () => getUsers(), {
    onSuccess: users => {
      setActiveUser(users[0]._id);
    },
  });

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
    classes?.length > 0 && setActiveClass(classes[0]);
  }, [classes]);

  const confirmDeleteUser = () => {
    if (!deleteUserId) {
      return;
    }

    removeUser(deleteUserId).then(() => refetchUsers());
    deleteUserSetId(null);
    deleteUserDialogSetOpen(false);
  };

  const confirmAddUser = (name: string) => {
    addUser(name)
      .then(() => {
        newUserDialogSetOpen(false);
        return refetchUsers();
      })
      .then(({ data }) => {
        data?.length && setActiveUser(data[data.length - 1]?._id);
      });
  };

  const onColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setActiveColor(event.target.value);
  };

  const onAddStudentPressed = () => {
    newUserDialogSetOpen(true);
  };

  const onAddClassPressed = () => {
    newUserDialogSetOpen(true);
  };

  const onRemoveStudentClicked = (
    ev: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    ev.stopPropagation();
    deleteUserDialogSetOpen(true);
    deleteUserSetId(id);
  };

  const renameUserClass = useCallback(
    (classId: string, name: string) => {
      const classData = prepareClassData({ name });
      updateUserClass(classId, classData).then(() => {
        refetchClasses();
      });
    },
    [updateUserClass, refetchClasses]
  );

  return (
    <WrapperWithNavbar>
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
                              onClick={ev => onRemoveStudentClicked(ev, user._id)}
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
                            isActive={userClass == activeClass}
                            onClick={() => setActiveClass(userClass)}
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
        open={newUserDialogOpen}
        setOpen={newUserDialogSetOpen}
        confirmAction={(userName: string) => confirmAddUser(userName)}></AddStudentDialog>

      <ConfirmationDialog
        title="Are you sure you want to delete user?"
        open={deleteUserDialogOpen}
        setOpen={deleteUserDialogSetOpen}
        confirmAction={() => confirmDeleteUser()}></ConfirmationDialog>
    </WrapperWithNavbar>
  );
}

export default ProfilePage;
