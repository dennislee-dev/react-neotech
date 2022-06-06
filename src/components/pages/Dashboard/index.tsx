import React, { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { Box } from "@mui/system";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import InsertModal from "../reusable/Modal";

const columns = [
  { id: 'name', label: 'Name', minWidth: 100 },
  { id: 'email', label: 'Email', minWidth: 100 },
  {
    id: 'phoneNumber',
    label: 'Phone Number',
    minWidth: 100,
    align: 'right'
  },
  {
    id: 'city',
    label: 'City',
    minWidth: 100,
    align: 'right'
  },
  {
    id: 'ZIPCode',
    label: 'ZIPCode',
    minWidth: 100,
    align: 'right'
  },
  {
    id: 'addressLine1',
    label: 'AddressLine 1',
    minWidth: 100,
    align: 'right'
  },
  {
    id: 'addressLine2',
    label: 'AddressLine 2',
    minWidth: 100,
    align: 'right'
  },
  {
    id: 'dateOfEmployment',
    label: 'Date Of Employment',
    minWidth: 100,
    align: 'right'
  },
  {
    id: 'dateOfBirth',
    label: 'Date Of Birth',
    minWidth: 100,
    align: 'right'
  },
];

const DashboardPage = () => {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [employees, setEmployees] = useState([]);
  const [openModal, setOpenModal] = useState(false); 

  useEffect(() => {

    const config:AxiosRequestConfig = {
      method: "get",
      url: 'http://142.132.229.249:3000/employees',
      data: { page: page, limit: rowsPerPage },
    };

    const getEmployees = async () : Promise<void> => {
      await axios(config).then((res) => {
        setEmployees(res.data.employees);
        console.log("RES", res);
      });
    }
    getEmployees();
  }, []);

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  }

  const handleCloseModal = () => {
    setOpenModal(true);
  }

  return (
    <Box sx={{ backgroundColor: '#ebebeb', height: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ width: '80%', margin: '50px auto 0', textAlign: 'right' }}>
      <Button variant="contained" startIcon={<GroupAddIcon />} onClick={() => handleOpenModal()} >
          New Employee
      </Button>
      </Box>
      
      <Paper sx={{ width: '80%', overflow: 'hidden', margin: '30px auto' }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align="center"
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {employees
                .map((employee, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      return (
                        <TableCell key={column.id} align="center">
                          {employee[column.id] === null ? employee["homeAddress"][column.id] : employee[column.id]}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={employees.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <InsertModal openModal={openModal} handleCloseModal={() => handleCloseModal()} />
    </Box>
  );
};

export default DashboardPage;
