import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  CardActions,
  Chip,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import Navbar from '../components/Navbar';

// Mock data for buses - replace with API call in production
const mockBuses = [
  {
    id: 1,
    operator: 'Express Bus',
    departureTime: '08:00 AM',
    arrivalTime: '02:00 PM',
    price: 49.99,
    seats: 40,
    availableSeats: 15,
    amenities: ['WiFi', 'AC', 'USB Ports', 'Reclining Seats'],
  },
  {
    id: 2,
    operator: 'Luxury Coaches',
    departureTime: '09:30 AM',
    arrivalTime: '03:30 PM',
    price: 59.99,
    seats: 35,
    availableSeats: 8,
    amenities: ['WiFi', 'AC', 'USB Ports', 'Reclining Seats', 'Entertainment System'],
  },
  {
    id: 3,
    operator: 'Budget Bus',
    departureTime: '10:00 AM',
    arrivalTime: '04:00 PM',
    price: 39.99,
    seats: 45,
    availableSeats: 25,
    amenities: ['AC', 'USB Ports'],
  },
];

const BusList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [buses, setBuses] = useState([]);
  const [sortBy, setSortBy] = useState('price');

  useEffect(() => {
    // TODO: Replace with actual API call using location.state
    setBuses(mockBuses);
  }, [location]);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    const sortedBuses = [...buses].sort((a, b) => {
      switch (event.target.value) {
        case 'price':
          return a.price - b.price;
        case 'departure':
          return a.departureTime.localeCompare(b.departureTime);
        case 'arrival':
          return a.arrivalTime.localeCompare(b.arrivalTime);
        default:
          return 0;
      }
    });
    setBuses(sortedBuses);
  };

  const handleBookNow = (busId) => {
    navigate(`/booking/${busId}`);
  };

  return (
    <Box>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Available Buses
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {location.state?.from} to {location.state?.to} on{' '}
            {new Date(location.state?.date).toLocaleDateString()}
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortBy}
              label="Sort By"
              onChange={handleSortChange}
            >
              <MenuItem value="price">Price (Low to High)</MenuItem>
              <MenuItem value="departure">Departure Time</MenuItem>
              <MenuItem value="arrival">Arrival Time</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Grid container spacing={3}>
          {buses.map((bus) => (
            <Grid item xs={12} key={bus.id}>
              <Card>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                      <Typography variant="h6" gutterBottom>
                        {bus.operator}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AccessTimeIcon />
                        <Typography>
                          {bus.departureTime} - {bus.arrivalTime}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocalOfferIcon />
                        <Typography variant="h6">${bus.price}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <EventSeatIcon />
                        <Typography>
                          {bus.availableSeats} seats available
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {bus.amenities.map((amenity) => (
                          <Chip
                            key={amenity}
                            label={amenity}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleBookNow(bus.id)}
                  >
                    Book Now
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default BusList; 