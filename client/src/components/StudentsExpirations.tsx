import Loading from './Loading';
import React, { useState } from 'react';
import { Box, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { StudentMembershipRecord } from '../interfaces/studentMembershipRecord.interface';
import { hardcodedMembershipRecords } from '../constants/hardcodedMembershipRecords';

const StudentsExpirations = () => {
  // @ts-expect-error // later will be fixed
  const [membershipRecords, setMembershipRecords] = useState<StudentMembershipRecord[]>(
    hardcodedMembershipRecords
  );

  const loading = false; // TODO;

  const deleteRecord = (i: number) => {
    console.log('Delete', i);
  };

  const editRecord = (record: StudentMembershipRecord, i: number) => {
    console.log('Edit', record, i);
  };

  return (
    <>
      {loading ? (
        <Box style={{ display: 'flex', justifyContent: 'center' }}>
          <Loading />
        </Box>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Number available</TableCell>
              <TableCell>Expiration date</TableCell>
              <TableCell style={{ textAlign: 'center' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.values(membershipRecords).map((record: StudentMembershipRecord, i: number) => {
              const { userName, className, status, availableCount, expirationDate } = record;
              return (
                <TableRow key={i}>
                  <TableCell>{userName}</TableCell>
                  <TableCell>{className}</TableCell>
                  <TableCell>{status}</TableCell>
                  <TableCell>{availableCount}</TableCell>
                  <TableCell>{expirationDate.getMonth() + expirationDate.getDate()}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>
                    <EditNoteIcon
                      onClick={() => editRecord(record, i)}
                      sx={{ cursor: 'pointer' }}
                    />
                    <DeleteForeverIcon
                      sx={{ marginLeft: '5px', cursor: 'pointer' }}
                      onClick={() => deleteRecord(i)}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default StudentsExpirations;
