import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useQuery } from 'react-query';
import { getUsers, removeUser } from '../api/usersApi';
import { Button, Container, IconButton, Tab } from '@mui/material';
import PersonAddSharpIcon from '@mui/icons-material/PersonAddSharp';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import './ProfilePage.scss';
import { TabContext, TabList } from '@mui/lab';
import AddStudentDialog from '../components/dialogs/AddStudentDialog';

function ProfilePage() {
  const [activeUserId, setActiveUser] = useState<string | null>('');

  const [editStudentsMode, setEditStudentsMode] = useState(false);

  const { data: users, refetch: refetchUsers } = useQuery('users', () => getUsers());
  const [newUserDialogOpen, newUserDialogSetOpen] = useState(false);

  useEffect(() => {
    if (!activeUserId && users && users[0]) {
      setActiveUser(users[0]._id);
    }
  }, [activeUserId, users]);

  function onAddStudentPressed() {
    newUserDialogSetOpen(true);
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

      <AddStudentDialog
        refetchUsers={refetchUsers}
        open={newUserDialogOpen}
        setOpen={newUserDialogSetOpen}></AddStudentDialog>
    </>
  );
}

export default ProfilePage;
