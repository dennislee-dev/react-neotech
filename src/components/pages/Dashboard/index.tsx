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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Stack } from "@mui/material";
import InsertModal from "../reusable/InsertModal";

type DashboardPropType = {
  deleted: boolean
}

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
  {
    id: 'action',
    label: 'Action',
    minwidth: 150,
    algin: 'center'
  }
];

const DashboardPage = ({ deleted }: DashboardPropType) => {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState(undefined);
  const [totalEmployeeCount, setTotalEmployeeCount] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {

    console.log(window.location.href);

    const config: AxiosRequestConfig = !deleted ? {
      method: "get",
      url: 'http://142.132.229.249:3000/employees',
      data: { page: page, limit: rowsPerPage },
    } : {
      method: "get",
      url: 'http://142.132.229.249:3000/employees/deleted',
      data: { page: page, limit: rowsPerPage },
    };

    const getEmployees = async (): Promise<void> => {
      await axios(config).then((res) => {
        setEmployees(res.data.employees);
        setTotalEmployeeCount(res.data.count);
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
    setEmployee(undefined);
    setOpenModal(true);
  }

  const handleOpenEditModal = (index: number) => {
    setEmployee(employees[index]);
    setOpenModal(true);
  }

  const handleCloseModal = () => {
    setOpenModal(false);
  }

  const handleDelete = (id: string) => {
    if (window.confirm("Do you want to delete this employee?")) {
      const config: AxiosRequestConfig = !deleted ? {
        method: "delete",
        url: 'http://142.132.229.249:3000/employees/soft-delete/' + id,
      } : {
        method: "delete",
        url: 'http://142.132.229.249:3000/employees/permanent-delete/' + id,
      };

      const softDeleteEmployees = async (): Promise<void> => {
        await axios(config).then((res) => {
          console.log(res);
        });
      }
      softDeleteEmployees();
    }
  }

  return (
    <Box sx={{ backgroundColor: '#ebebeb', height: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <Button color="inherit" onClick={() => window.location.href = "/"}>Employees</Button>
          <Button color="inherit" onClick={() => window.location.href = "/deleted-employees"}>Deleted Employees</Button>
        </Toolbar>
      </AppBar>
      {!deleted && (<Box sx={{ width: '80%', margin: '50px auto 0', textAlign: 'right' }}>
        <Button variant="contained" startIcon={<GroupAddIcon />} onClick={() => handleOpenModal()} color="success" >
          New Employee
        </Button>
      </Box>)}


      <Paper sx={{ width: '80%', overflow: 'hidden', margin: !deleted ? '30px auto' : '110px auto 30px' }}>
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
              {employees.length !== 0 ? employees
                .map((employee, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column, idx) => {
                        return (
                          <TableCell key={column.id} align="center">
                            {column.id === 'action' ? (<Stack direction="row" spacing={2}><Button sx={{ display: deleted ? "none" : "display" }} variant="contained" startIcon={<EditIcon />} onClick={() => handleOpenEditModal(index)} >
                              Edit
                            </Button><Button variant="contained" startIcon={<DeleteIcon />} onClick={() => handleDelete(employee["_id"])} color="error" >
                                Delete
                              </Button></Stack>) : employee[column.id] === undefined ? employee["homeAddress"][column.id] : employee[column.id]}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                }) : (
                <TableRow hover role="checkbox" tabIndex={-1}>
                  <TableCell align="center" sx={{ width: '100%' }} colSpan={10} >No Data</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalEmployeeCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <InsertModal openModal={openModal} employee={employee} handleCloseModal={() => handleCloseModal()} />
    </Box>
  );
};

export default DashboardPage;
