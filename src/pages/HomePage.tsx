import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
  Rating,
  Chip,
} from '@mui/material';
import { ArrowRight, MapPin, Star, Users, Award, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import SearchBar from '../components/common/SearchBar';
import DestinationCard from '../components/destinations/DestinationCard';
import PackageCard from '../components/packages/PackageCard';
import { getDestinations, getPackages } from '../services/api';

const HomePage: React.FC = () => {
  const { data: destinations = [], isLoading: destinationsLoading } = useQuery({
    queryKey: ['destinations'],
    queryFn: getDestinations,
    select: (data) => data.slice(0, 6),
  });

  const { data: packages = [], isLoading: packagesLoading } = useQuery({
    queryKey: ['packages'],
    queryFn: getPackages,
    select: (data) => data.slice(0, 4),
  });

  const stats = [
    { icon: Users, value: '50,000+', label: 'Happy Travelers' },
    { icon: MapPin, value: '500+', label: 'Destinations' },
    { icon: Award, value: '15+', label: 'Years Experience' },
    { icon: Globe, value: '28', label: 'Indian States' },
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Priya Sharma',
      location: 'Mumbai',
      rating: 5,
      comment: 'Incredible experience in Kerala! The houseboat stay was magical and the service was exceptional.',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    {
      id: 2,
      name: 'Rajesh Kumar',
      location: 'Delhi',
      rating: 5,
      comment: 'Golden Triangle tour exceeded all expectations. Professional guides and luxury accommodations.',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    {
      id: 3,
      name: 'Anita Desai',
      location: 'Bangalore',
      rating: 5,
      comment: 'Rajasthan palace tour was a dream come true. Every detail was perfectly arranged.',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          minHeight: '100vh',
          background: `linear-gradient(rgba(27, 75, 115, 0.7), rgba(255, 107, 53, 0.6)), url('https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=1920')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', color: 'white' }}
          >
            <Typography
              variant="h1"
              sx={{
                fontFamily: 'Playfair Display',
                fontWeight: 700,
                mb: 3,
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              }}
            >
              Discover Incredible India
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 5,
                opacity: 0.95,
                maxWidth: 600,
                mx: 'auto',
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
              }}
            >
              Experience the magic of India with our premium travel packages. 
              From royal palaces to pristine beaches, create memories that last a lifetime.
            </Typography>

            <Box sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
              <SearchBar
                placeholder="Where do you want to explore in India?"
                fullWidth
              />
            </Box>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                component={Link}
                to="/packages"
                variant="contained"
                size="large"
                endIcon={<ArrowRight />}
                sx={{
                  py: 2,
                  px: 4,
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #E55A2B 0%, #E8841A 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 10px 30px rgba(255, 107, 53, 0.4)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Explore Packages
              </Button>
              <Button
                component={Link}
                to="/destinations"
                variant="outlined"
                size="large"
                sx={{
                  py: 2,
                  px: 4,
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  borderRadius: 3,
                  borderColor: 'white',
                  color: 'white',
                  borderWidth: 2,
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                View Destinations
              </Button>
            </Box>
          </motion.div>
        </Container>

        {/* Floating Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '20%',
            right: '10%',
            opacity: 0.1,
          }}
        >
          <motion.div
            animate={{ y: [-20, 20, -20] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <MapPin size={100} />
          </motion.div>
        </Box>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={stat.label}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      mx: 'auto',
                      mb: 2,
                      background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                    }}
                  >
                    <stat.icon size={40} />
                  </Avatar>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Popular Destinations */}
      <Box sx={{ py: 8, backgroundColor: 'background.default' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontFamily: 'Playfair Display',
                  fontWeight: 700,
                  mb: 2,
                  color: 'text.primary',
                }}
              >
                Popular Destinations
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
                Explore India's most enchanting destinations, from royal heritage sites to pristine natural wonders
              </Typography>
            </motion.div>
          </Box>

          <Grid container spacing={4}>
            {destinations.map((destination, index) => (
              <Grid item xs={12} sm={6} lg={4} key={destination.id}>
                <DestinationCard destination={destination} index={index} />
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Button
              component={Link}
              to="/destinations"
              variant="outlined"
              size="large"
              endIcon={<ArrowRight />}
              sx={{
                py: 1.5,
                px: 4,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: 3,
              }}
            >
              View All Destinations
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Featured Packages */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h2"
              sx={{
                fontFamily: 'Playfair Display',
                fontWeight: 700,
                mb: 2,
                color: 'text.primary',
              }}
            >
              Featured Packages
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              Carefully curated travel experiences that showcase the best of incredible India
            </Typography>
          </motion.div>
        </Box>

        <Grid container spacing={4}>
          {packages.map((pkg, index) => (
            <Grid item xs={12} md={6} key={pkg.id}>
              <PackageCard package={pkg} index={index} />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button
            component={Link}
            to="/packages"
            variant="contained"
            size="large"
            endIcon={<ArrowRight />}
            sx={{
              py: 1.5,
              px: 4,
              fontSize: '1.1rem',
              fontWeight: 600,
              borderRadius: 3,
            }}
          >
            View All Packages
          </Button>
        </Box>
      </Container>

      {/* Testimonials */}
      <Box sx={{ py: 8, backgroundColor: 'background.default' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontFamily: 'Playfair Display',
                  fontWeight: 700,
                  mb: 2,
                  color: 'text.primary',
                }}
              >
                What Our Travelers Say
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
                Real experiences from real travelers who discovered incredible India with us
              </Typography>
            </motion.div>
          </Box>

          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={testimonial.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      p: 2,
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar
                          src={testimonial.avatar}
                          sx={{ width: 60, height: 60, mr: 2 }}
                        />
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {testimonial.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {testimonial.location}
                          </Typography>
                        </Box>
                      </Box>
                      <Rating
                        value={testimonial.rating}
                        readOnly
                        sx={{ mb: 2 }}
                      />
                      <Typography variant="body1" sx={{ fontStyle: 'italic', lineHeight: 1.7 }}>
                        "{testimonial.comment}"
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: 10,
          background: 'linear-gradient(135deg, #1B4B73 0%, #2D5B85 100%)',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h2"
              sx={{
                fontFamily: 'Playfair Display',
                fontWeight: 700,
                mb: 3,
              }}
            >
              Ready to Explore Incredible India?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Join thousands of travelers who have discovered the magic of India. 
              Start planning your dream journey today.
            </Typography>
            <Button
              component={Link}
              to="/packages"
              variant="contained"
              size="large"
              endIcon={<ArrowRight />}
              sx={{
                py: 2,
                px: 6,
                fontSize: '1.2rem',
                fontWeight: 700,
                borderRadius: 3,
                backgroundColor: '#FF6B35',
                '&:hover': {
                  backgroundColor: '#E55A2B',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 10px 30px rgba(255, 107, 53, 0.4)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Start Your Journey
            </Button>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;