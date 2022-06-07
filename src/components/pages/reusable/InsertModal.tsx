import React, { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button, Grid, TextField, Stack, IconButton } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import moment from 'moment';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type ModalPropsType = {
    openModal: boolean,
    employee: any,
    getEmployees: any,
    handleCloseModal: any
}

const InsertModal = ({ openModal, employee, getEmployees, handleCloseModal }: ModalPropsType) => {

    const defaultValue = {
        name: "",
        email: "",
        phoneNumber: "",
        homeAddress: {
            city: "",
            ZIPCode: "",
            addressLine1: "",
            addressLine2: "",
        },
        dateOfEmployment: null,
        dateOfBirth: null
    };

    const [formValues, setFormValues] = useState(defaultValue);
    const [openSnake, setOpenSnake] = React.useState(false);

    useEffect(() => {
        employee !== undefined ? setFormValues(employee) : setFormValues(defaultValue);
    }, [employee]);

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        if (name !== "name" && name !== "email" && name !== "phoneNumber") {
            setFormValues({
                ...formValues,
                homeAddress: {
                    ...formValues.homeAddress,
                    [name]: value,
                }
            });
        } else {
            setFormValues({
                ...formValues,
                [name]: value,
            });
        }
    };
    const handleDatePicker = (name: string, value: any) => {
        setFormValues({
            ...formValues,
            [name]: moment(value).toDate().toISOString(),
        });
    }

    const handleSnakeClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnake(false);
    };

    const handleSubmit = async (event: any) => {

        const config: AxiosRequestConfig = employee !== undefined ? {
            method: "patch",
            url: 'http://142.132.229.249:3000/employees/' + employee._id,
            data: formValues,
        } : {
            method: "post",
            url: 'http://142.132.229.249:3000/employees',
            data: formValues,
        };

        event.preventDefault();
        await axios(config).then((res) => {
            if (res.status == 201) {
                setOpenSnake(true);
                getEmployees();
            }
            handleCloseModal();
        });
    };

    return (
        <div>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ marginBottom: "30px" }}
                    >
                        {employee !== undefined ? (<Typography id="modal-modal-title" variant="h6" component="h2">Edit Employee</Typography>) : (<Typography id="modal-modal-title" variant="h6" component="h2">Create New Employee</Typography>)}
                        <IconButton aria-label="cancel" onClick={() => handleCloseModal()}>
                            <HighlightOffIcon />
                        </IconButton>
                    </Stack>
                    <form onSubmit={handleSubmit}>
                        <Box sx={{ width: '100%' }}>
                            <Stack spacing={2}>
                            <Grid sx={{ textAlign: "center" }} item>
                                    <TextField
                                        id="name-input"
                                        name="name"
                                        label="Name"
                                        type="text"
                                        sx={{ width: "80%" }}
                                        value={formValues.name}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid sx={{ textAlign: "center" }} item>
                                    <TextField
                                        id="email-input"
                                        name="email"
                                        label="Email"
                                        type="email"
                                        sx={{ width: "80%" }}
                                        value={formValues.email}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid sx={{ textAlign: "center" }} item>
                                    <TextField
                                        id="phoneNumber-input"
                                        name="phoneNumber"
                                        label="Phone Number"
                                        type="text"
                                        sx={{ width: "80%" }}
                                        value={formValues.phoneNumber}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid sx={{ textAlign: "center" }} item>
                                    <TextField
                                        id="city-input"
                                        name="city"
                                        label="City"
                                        type="text"
                                        sx={{ width: "80%" }}
                                        value={formValues.homeAddress.city}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid sx={{ textAlign: "center" }} item>
                                    <TextField
                                        id="zipCode-input"
                                        name="zipCode"
                                        label="ZIPCode"
                                        type="text"
                                        sx={{ width: "80%" }}
                                        value={formValues.homeAddress.ZIPCode}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid sx={{ textAlign: "center" }} item>
                                    <TextField
                                        id="addressLine1-input"
                                        name="addressLine1"
                                        label="Address Line 1"
                                        type="text"
                                        sx={{ width: "80%" }}
                                        value={formValues.homeAddress.addressLine1}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid sx={{ textAlign: "center" }} item>
                                    <TextField
                                        id="addressLine2-input"
                                        name="addressLine2"
                                        label="Address Line 2"
                                        type="text"
                                        sx={{ width: "80%" }}
                                        value={formValues.homeAddress.addressLine2}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid sx={{ textAlign: "center" }} item>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            label="Date Of Employment"
                                            value={formValues.dateOfEmployment}
                                            onChange={(newValue) => {
                                                handleDatePicker("dateOfEmployment", newValue);
                                            }}
                                            renderInput={(params) => <TextField sx={{ width: "80%" }} {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid sx={{ textAlign: "center" }} item>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            label="Date Of Birth"
                                            value={formValues.dateOfBirth}
                                            onChange={(newValue) => {
                                                handleDatePicker("dateOfBirth", newValue);
                                            }}
                                            renderInput={(params) => <TextField sx={{ width: "80%" }} {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid sx={{ textAlign: "center" }} item>
                                <Button variant="contained" color="primary" type="submit">
                                        Submit
                                    </Button>
                                </Grid>
                            </Stack>
                        </Box>
                    </form>
                </Box>
            </Modal>
            <Snackbar open={openSnake} anchorOrigin={{ vertical: "top", horizontal: "right" }} key={"top" + "right"} autoHideDuration={6000} onClose={handleSnakeClose}>
                <Alert onClose={handleSnakeClose} severity="success" sx={{ width: '100%' }}>
                    Success, New employee created!
                </Alert>
            </Snackbar>
        </div>
    );
}

export default InsertModal;