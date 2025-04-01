import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardActions,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Navbar from '../components/Navbar';

// Mock data for user profile and bookings - replace with API calls in production
const mockUserProfile = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '1234567890',
  joinDate: '2024-01-01',
};

const mockBookings = [
  {
    id: 1,
    busOperator: 'Express Bus',
    from: 'New York',
    to: 'Los Angeles',
    date: '2024-03-15',
    departureTime: '08:00 AM',
    arrivalTime: '02:00 PM',
    seatNumber: 12,
    status: 'Confirmed',
    price: 49.99,
  },
  {
    id: 2,
    busOperator: 'Luxury Coaches',
    from: 'Chicago',
    to: 'Houston',
    date: '2024-03-20',
    departureTime: '09:30 AM',
    arrivalTime: '03:30 PM',
    seatNumber: 8,
    status: 'Pending',
    price: 59.99,
  },
];

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const Profile = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  margin: '0 auto 16px',
                  bgcolor: 'primary.main',
                }}
              >
                <PersonIcon sx={{ fontSize: 60 }} />
              </Avatar>
              <Typography variant="h5" gutterBottom>
                {mockUserProfile.firstName} {mockUserProfile.lastName}
              </Typography>
              <Typography color="text.secondary" gutterBottom>
                {mockUserProfile.email}
              </Typography>
              <Typography color="text.secondary">
                Member since {new Date(mockUserProfile.joinDate).toLocaleDateString()}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={8}>
            <Paper elevation={3}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                aria-label="profile tabs"
              >
                <Tab
                  icon={<HistoryIcon />}
                  label="Bookings"
                  id="profile-tab-0"
                  aria-controls="profile-tabpanel-0"
                />
                <Tab
                  icon={<SettingsIcon />}
                  label="Settings"
                  id="profile-tab-1"
                  aria-controls="profile-tabpanel-1"
                />
                <Tab
                  icon={<NotificationsIcon />}
                  label="Notifications"
                  id="profile-tab-2"
                  aria-controls="profile-tabpanel-2"
                />
              </Tabs>

              <TabPanel value={tabValue} index={0}>
                <Grid container spacing={3}>
                  {mockBookings.map((booking) => (
                    <Grid item xs={12} key={booking.id}>
                      <Card>
                        <CardContent>
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                              <Typography variant="h6" gutterBottom>
                                {booking.busOperator}
                              </Typography>
                              <Typography color="text.secondary">
                                {booking.from} → {booking.to}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Typography variant="h6" gutterBottom>
                                ${booking.price}
                              </Typography>
                              <Typography color="text.secondary">
                                Seat {booking.seatNumber}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Typography>
                                Date: {new Date(booking.date).toLocaleDateString()}
                              </Typography>
                              <Typography>
                                Time: {booking.departureTime} - {booking.arrivalTime}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Typography>
                                Status: {booking.status}
                              </Typography>
                            </Grid>
                          </Grid>
                        </CardContent>
                        <CardActions>
                          <Button size="small" color="primary">
                            View Details
                          </Button>
                          <Button size="small" color="primary">
                            Cancel Booking
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>

              <TabPanel value={tabValue} index={1}>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Personal Information"
                      secondary={
                        <Box>
                          <Typography>Name: {mockUserProfile.firstName} {mockUserProfile.lastName}</Typography>
                          <Typography>Email: {mockUserProfile.email}</Typography>
                          <Typography>Phone: {mockUserProfile.phone}</Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      primary="Account Settings"
                      secondary="Change password, notification preferences, etc."
                    />
                  </ListItem>
                </List>
              </TabPanel>

              <TabPanel value={tabValue} index={2}>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Booking Confirmation"
                      secondary="Your booking for Express Bus has been confirmed"
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      primary="Special Offer"
                      secondary="Get 10% off on your next booking!"
                    />
                  </ListItem>
                </List>
              </TabPanel>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Profile; 