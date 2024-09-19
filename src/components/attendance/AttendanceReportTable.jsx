import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Avatar,
  Box,
  TablePagination,
  Typography,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NotFoundImage from '../../assets/images/not-found.jpg';
import { tableShadow } from '../../styles/global';
import StatusChip from '../common/StatusChip';
import { truncate } from '../../utils/truncate';
const AttendanceReportTable = ({
  rows,
  columns,
  hideColumns = []
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'), {
    defaultMatches: true,
  });

  const handleClick = (event, row) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const visibleColumns = columns.filter((col) =>
    isMobile ? !hideColumns.includes(col.id) : true,
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleView = (id)=>{
    console.log('view :',id);
  }
  const handleDetele = (id)=>{
    console.log('delete :',id);
  }

  return (
    <Paper sx={{ ...tableShadow }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {visibleColumns.map((column) => (
                <TableCell
                  key={column.id}
                  sx={{
                    width: column.id === 'id' ? '' : 'auto',
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell align="right">Status / Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={index}>
                  {visibleColumns.map((column) => (
                    <TableCell key={column.id}>
                      {column.id === 'name' ? (
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            flexShrink: 1,
                          }}
                        >
                          <Avatar
                            src={row.img}
                            alt={`Avatar ${row.name}`}
                            sx={{
                              width: 32,
                              height: 32,
                              marginRight: '8px',
                              objectFit: 'cover',
                            }}
                          />
                          {row[column.id]}
                        </div>
                      ) : column.id === 'id' ? (
                        row[column.id]
                      ) : (
                        truncate(row[column.id], 30)
                      )}
                    </TableCell>
                  ))}
                  <TableCell sx={{ width: 'auto' }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                      }}
                    >
                      <StatusChip status={row.status} statusId={row.status_id} />

                      <IconButton
                        size="small"
                        onClick={(e) => handleClick(e, row)}
                      >
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {rows.length === 0 && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '500px',
              width: '100%',
            }}
          >
            <Box>
              <img
                src={NotFoundImage}
                alt="Not Found"
                width="400px"
                height="auto"
                style={{ objectFit: 'cover' }}
              />
              <Typography variant="h6" color="text.primary" textAlign="center">
                No Attendance Record
              </Typography>
            </Box>
          </Box>
        )}
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Menu
        id='basic-menu'
        open={Boolean(anchorEl)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        anchorEl={anchorEl} 
        onClose={handleClose}
      >
        <MenuItem onClick={()=>{handleView(1)}}>View</MenuItem>
        <MenuItem onClick={()=>handleDetele(2)}>Delete</MenuItem>
      </Menu>
    </Paper>
  );
};

export default AttendanceReportTable;
