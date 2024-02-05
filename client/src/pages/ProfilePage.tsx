import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useQuery } from 'react-query';
import { addUser, getUsers, removeUser } from '../api/usersApi';
import { Button, Container, IconButton, Tab } from '@mui/material';
import PersonAddSharpIcon from '@mui/icons-material/PersonAddSharp';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import './ProfilePage.scss';

function ProfilePage() {
  const [editStudentsMode, setEditStudentsMode] = useState(false);
  const { data: users, refetch: refetchUsers } = useQuery('users', () => getUsers());

  function addStudent() {
    addUser('NewUserName').then(refetchUsers);
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
          <IconButton
            onClick={() => setEditStudentsMode(!editStudentsMode)}
            size="small"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2 }}>
            <EditOutlinedIcon className="editIcon" />
          </IconButton>
          {users?.map((user: { _id: string; name: string }) => (
            <span key={user._id}>
              <Tab label={user.name} value={user._id} sx={{ paddingRight: 0 }} />
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
            </span>
          ))}
          {editStudentsMode && (
            <Button onClick={() => addStudent()}>
              <PersonAddSharpIcon color="action" sx={{ mr: 2 }} />
              <span> Add a student </span>
            </Button>
          )}
        </div>
      </Container>
    </>
  );
}

export default ProfilePage;
