import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Avatar,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Card,
  CardContent,
} from '@mui/material';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Calendar, Package, Star, Edit } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const UserProfile: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Mock user data - in real app, this would come from API
  const userProfile = {
    ...user,
    phone: '+91 98765 43210',
    location: 'Mumbai, Maharashtra',
    joinDate: 'January 2024',
    totalBookings: 3,
    totalSpent: '₹85,000',
    favoriteDestination: 'Kerala',
  };

  const bookings = [
    {
      id: 1,
      packageName: 'Golden Triangle Tour',
      destination: 'Delhi, Agra, Jaipur',
      date: '15 Mar 2024',
      status: 'Completed',
      amount: '₹25,000',
      rating: 5,
    },
    {
      id: 2,
      packageName: 'Kerala Backwater Paradise',
      destination: 'Cochin, Alleppey, Kumarakom',
      date: '22 Feb 2024',
      status: 'Completed',
      amount: '₹18,000',
      rating: 5,
    },
    {
      id: 3,
      packageName: 'Rajasthan Royal Experience',
      destination: 'Jaipur, Udaipur, Jodhpur',
      date: '10 Apr 2024',
      status: 'Upcoming',
      amount: '₹45,000',
      rating: null,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'success';
      case 'Upcoming':
        return 'primary';
      case 'Cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <>
      {/* Header Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1B4B73 0%, #2D5B85 100%)',
          color: 'white',
          py: 8,
          mt: 8,
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="h1"
              sx={{
                fontFamily: 'Playfair Display',
                fontWeight: 700,
                textAlign: 'center',
                fontSize: { xs: '2.5rem', md: '3.5rem' },
              }}
            >
              My Profile
            </Typography>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {/* Profile Information */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Paper sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    mx: 'auto',
                    mb: 3,
                    background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                    fontSize: '3rem',
                    fontWeight: 700,
                  }}
                >
                  {userProfile.name?.charAt(0).toUpperCase()}
                </Avatar>
                
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  {userProfile.name}
                </Typography>
                
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  Travel Enthusiast
                </Typography>

                <Button
                  variant="outlined"
                  startIcon={<Edit size={20} />}
                  fullWidth
                  sx={{ mb: 3 }}
                >
                  Edit Profile
                </Button>

                <Divider sx={{ mb: 3 }} />

                <List disablePadding>
                  <ListItem disablePadding sx={{ mb: 2 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Mail size={20} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Email"
                      secondary={userProfile.email}
                      primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }}
                      secondaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                  
                  <ListItem disablePadding sx={{ mb: 2 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Phone size={20} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Phone"
                      secondary={userProfile.phone}
                      primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }}
                      secondaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                  
                  <ListItem disablePadding sx={{ mb: 2 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <MapPin size={20} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Location"
                      secondary={userProfile.location}
                      primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }}
                      secondaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                  
                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Calendar size={20} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Member Since"
                      secondary={userProfile.joinDate}
                      primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }}
                      secondaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                </List>
              </Paper>
            </motion.div>
          </Grid>

          {/* Travel Statistics & Bookings */}
          <Grid item xs={12} md={8}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Travel Stats */}
              <Paper sx={{ p: 4, borderRadius: 3, mb: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                  Travel Statistics
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={6} md={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main' }}>
                        {userProfile.totalBookings}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Total Trips
                      </Typography>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={6} md={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main' }}>
                        {userProfile.totalSpent}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Total Spent
                      </Typography>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={6} md={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main' }}>
                        4.9
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Avg Rating
                      </Typography>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={6} md={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main' }}>
                        8
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        States Visited
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>

              {/* Booking History */}
              <Paper sx={{ p: 4, borderRadius: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    Booking History
                  </Typography>
                  <Button variant="outlined" size="small">
                    View All
                  </Button>
                </Box>

                <Grid container spacing={3}>
                  {bookings.map((booking, index) => (
                    <Grid item xs={12} key={booking.id}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card sx={{ borderRadius: 2 }}>
                          <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                              <Box>
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                  {booking.packageName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                  <MapPin size={16} />
                                  {booking.destination}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <Calendar size={16} />
                                  {booking.date}
                                </Typography>
                              </Box>
                              <Box sx={{ textAlign: 'right' }}>
                                <Chip
                                  label={booking.status}
                                  color={getStatusColor(booking.status) as any}
                                  size="small"
                                  sx={{ mb: 1 }}
                                />
                                <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                                  {booking.amount}
                                </Typography>
                              </Box>
                            </Box>
                            
                            {booking.rating && (
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="body2" color="text.secondary">
                                  Your Rating:
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                  {[...Array(booking.rating)].map((_, i) => (
                                    <Star key={i} size={16} fill="#FFD700" color="#FFD700" />
                                  ))}
                                </Box>
                              </Box>
                            )}
                          </CardContent>
                        </Card>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default UserProfile;