import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import SearchIcon from '@mui/icons-material/Search';
import Navbar from '../components/Navbar';

// Mock data for cities - replace with API call in production
const cities = [
  'New York',
  'Los Angeles',
  'Chicago',
  'Houston',
  'Phoenix',
  'Philadelphia',
  'San Antonio',
  'San Diego',
  'Dallas',
  'San Jose',
];

const Home = () => {
  const navigate = useNavigate();
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [date, setDate] = useState(new Date());

  const handleSearch = () => {
    if (fromCity && toCity && date) {
      navigate('/buses', {
        state: {
          from: fromCity,
          to: toCity,
          date: date.toISOString(),
        },
      });
    }
  };

  return (
    <Box>
      <Navbar />
      <Box
        sx={{
          backgroundImage: 'url(/bus-banner.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '500px',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        />
        <Container maxWidth="lg">
          <Paper
            elevation={3}
            sx={{
              p: 4,
              position: 'relative',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
            }}
          >
            <Typography variant="h4" gutterBottom>
              Book Your Bus Ticket
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Autocomplete
                  options={cities}
                  value={fromCity}
                  onChange={(event, newValue) => setFromCity(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="From"
                      fullWidth
                      required
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Autocomplete
                  options={cities}
                  value={toCity}
                  onChange={(event, newValue) => setToCity(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="To"
                      fullWidth
                      required
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Date"
                    value={date}
                    onChange={(newValue) => setDate(newValue)}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth required />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  startIcon={<SearchIcon />}
                  onClick={handleSearch}
                  disabled={!fromCity || !toCity || !date}
                >
                  Search Buses
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
        <Typography variant="h4" gutterBottom>
          Why Choose BusHub?
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <Typography variant="h6" gutterBottom>
                Easy Booking
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Book your bus tickets in just a few clicks with our user-friendly interface.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <Typography variant="h6" gutterBottom>
                Safe Travel
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Travel with confidence on our well-maintained buses with experienced drivers.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <Typography variant="h6" gutterBottom>
                Best Prices
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Get the best deals and competitive prices on bus tickets.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home; 