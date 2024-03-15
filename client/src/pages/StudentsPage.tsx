import styles from './ClassesPage.module.scss';
import {
  Box,
  FormControl,
  Grid,
  Paper,
  Select,
  InputLabel,
  MenuItem,
  TextField,
  InputAdornment,
  SelectChangeEvent,
} from '@mui/material';
import React, { ChangeEvent, useState } from 'react';
import { useQuery } from 'react-query';
import { getUsers } from '../api/usersApi';
import { Search as SearchIcon } from '@mui/icons-material';
import WrapperWithNavbar from '../components/WrapperWithNavbar';
import StudentsExpirations from '../components/StudentsExpirations';
import { Sidebar } from '../components/Sidebar';
import { sidebarItems } from '../constants/sidebarItems';

const StudentsPage = () => {
  const [selectedClass, setSelectedClass] = useState<string | undefined>('');

  // @ts-expect-error //for now
  const { isLoading, data: users } = useQuery('users', () => getUsers(), {
    onSuccess: () => {},
  });

  function handleSearch(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const value = event.target.value;
    if (!value) return;
    fetchSearchData(value);
  }

  function fetchSearchData(value: string) {
    fetch(`https://api.datamuse.com/words?ml=${value}`, {}).then(res => res.json());
  }

  function handleClassChange(event: SelectChangeEvent) {
    setSelectedClass((event.target as HTMLSelectElement).value);
  }

  return (
    <WrapperWithNavbar>
      {isLoading ? (
        <p className={styles.loading}> Loading... </p>
      ) : (
        <>
          <Box sx={{ display: 'flex' }}>
            <Sidebar sidebarItems={sidebarItems}></Sidebar>

            <Box sx={{ width: '100%' }}>
              <Box
                sx={{
                  p: 2,
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}>
                <TextField
                  variant={'outlined'}
                  placeholder={'Search'}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={e => handleSearch(e)}></TextField>

                <FormControl sx={{ width: 200 }}>
                  <InputLabel id="class-label">Select Class</InputLabel>
                  <Select
                    labelId="class-label"
                    id="class"
                    value={selectedClass}
                    label="Class"
                    onChange={handleClassChange}>
                    <MenuItem value={'1-a Raisins'}>1-a Raisins</MenuItem>
                    <MenuItem value={'1-b Stars'}>1-b Stars</MenuItem>
                    <MenuItem value={'1-c Rainbow'}>1-c Rainbow</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <StudentsExpirations></StudentsExpirations>
                </Paper>
              </Grid>
            </Box>
          </Box>
        </>
      )}
    </WrapperWithNavbar>
  );
};

export default StudentsPage;
