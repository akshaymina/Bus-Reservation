import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
} from '@mui/material';
import Navbar from '../components/Navbar';

// Mock data for bus details - replace with API call in production
const mockBusDetails = {
  id: 1,
  operator: 'Express Bus',
  departureTime: '08:00 AM',
  arrivalTime: '02:00 PM',
  price: 49.99,
  seats: 40,
  availableSeats: 15,
};

const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
    .required('Phone number is required'),
  seatNumber: Yup.number()
    .required('Seat number is required')
    .min(1, 'Invalid seat number')
    .max(40, 'Invalid seat number'),
  paymentMethod: Yup.string().required('Payment method is required'),
});

const steps = ['Passenger Details', 'Seat Selection', 'Payment'];

const Booking = () => {
  const { busId } = useParams();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [busDetails, setBusDetails] = useState(null);

  useEffect(() => {
    // TODO: Replace with actual API call using busId
    setBusDetails(mockBusDetails);
  }, [busId]);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      seatNumber: '',
      paymentMethod: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        // TODO: Implement actual booking logic with API
        console.log('Booking values:', values);
        // Simulate successful booking
        navigate('/profile');
      } catch (error) {
        console.error('Booking error:', error);
      }
    },
  });

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    formik.handleSubmit();
  };

  if (!busDetails) {
    return (
      <Box>
        <Navbar />
        <Container>
          <Typography>Loading...</Typography>
        </Container>
      </Box>
    );
  }

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="firstName"
                name="firstName"
                label="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="lastName"
                name="lastName"
                label="Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="phone"
                name="phone"
                label="Phone Number"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="seatNumber"
                name="seatNumber"
                label="Seat Number"
                type="number"
                value={formik.values.seatNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.seatNumber && Boolean(formik.errors.seatNumber)}
                helperText={formik.touched.seatNumber && formik.errors.seatNumber}
              />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl
                error={formik.touched.paymentMethod && Boolean(formik.errors.paymentMethod)}
              >
                <FormLabel>Payment Method</FormLabel>
                <RadioGroup
                  name="paymentMethod"
                  value={formik.values.paymentMethod}
                  onChange={formik.handleChange}
                >
                  <FormControlLabel
                    value="credit"
                    control={<Radio />}
                    label="Credit Card"
                  />
                  <FormControlLabel
                    value="debit"
                    control={<Radio />}
                    label="Debit Card"
                  />
                  <FormControlLabel
                    value="upi"
                    control={<Radio />}
                    label="UPI"
                  />
                </RadioGroup>
                {formik.touched.paymentMethod && formik.errors.paymentMethod && (
                  <FormHelperText>{formik.errors.paymentMethod}</FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Box>
      <Navbar />
      <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Book Your Ticket
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" paragraph>
            {busDetails.operator} - {busDetails.departureTime} to {busDetails.arrivalTime}
          </Typography>

          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {getStepContent(activeStep)}

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
            {activeStep !== 0 && (
              <Button onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
            )}
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={!formik.isValid || formik.isSubmitting}
              >
                Confirm Booking
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={!formik.isValid}
              >
                Next
              </Button>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Booking; 