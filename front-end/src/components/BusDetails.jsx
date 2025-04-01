import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import WifiIcon from '@mui/icons-material/Wifi';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import UsbIcon from '@mui/icons-material/Usb';
import ChairIcon from '@mui/icons-material/Chair';
import TvIcon from '@mui/icons-material/Tv';
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
  amenities: ['WiFi', 'AC', 'USB Ports', 'Reclining Seats'],
  description: 'Modern and comfortable bus with all essential amenities for a pleasant journey.',
  cancellationPolicy: 'Free cancellation up to 24 hours before departure',
  baggageAllowance: 'One carry-on bag and one checked bag included',
};

const BusDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [busDetails, setBusDetails] = useState(null);

  useEffect(() => {
    // TODO: Replace with actual API call using id
    setBusDetails(mockBusDetails);
  }, [id]);

  const handleBookNow = () => {
    navigate(`/booking/${id}`);
  };

  const getAmenityIcon = (amenity) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <WifiIcon />;
      case 'ac':
        return <AcUnitIcon />;
      case 'usb ports':
        return <UsbIcon />;
      case 'reclining seats':
        return <ChairIcon />;
      case 'entertainment system':
        return <TvIcon />;
      default:
        return null;
    }
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

  return (
    <Box>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Typography variant="h4" gutterBottom>
                {busDetails.operator}
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                {busDetails.description}
              </Typography>

              <List>
                <ListItem>
                  <ListItemIcon>
                    <AccessTimeIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Journey Time"
                    secondary={`${busDetails.departureTime} - ${busDetails.arrivalTime}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LocalOfferIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Price"
                    secondary={`$${busDetails.price}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <EventSeatIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Available Seats"
                    secondary={`${busDetails.availableSeats} out of ${busDetails.seats}`}
                  />
                </ListItem>
              </List>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" gutterBottom>
                Amenities
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {busDetails.amenities.map((amenity) => (
                  <Chip
                    key={amenity}
                    icon={getAmenityIcon(amenity)}
                    label={amenity}
                    variant="outlined"
                  />
                ))}
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper elevation={2} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Journey Details
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Departure"
                      secondary={busDetails.departureTime}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Arrival"
                      secondary={busDetails.arrivalTime}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Price"
                      secondary={`$${busDetails.price}`}
                    />
                  </ListItem>
                </List>

                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleBookNow}
                  disabled={busDetails.availableSeats === 0}
                >
                  Book Now
                </Button>

                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  {busDetails.cancellationPolicy}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {busDetails.baggageAllowance}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default BusDetails; 