import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Paper,
  Skeleton,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { MapPin, Filter } from 'lucide-react';
import DestinationCard from '../components/destinations/DestinationCard';
import SearchBar from '../components/common/SearchBar';
import { getDestinations } from '../services/api';

const DestinationsPage: React.FC = () => {
  const [categoryFilter, setCategoryFilter] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const { data: destinations = [], isLoading } = useQuery({
    queryKey: ['destinations'],
    queryFn: getDestinations,
  });

  // Filter destinations based on selected filters and search
  const filteredDestinations = destinations.filter((destination) => {
    const matchesCategory = !categoryFilter || destination.category === categoryFilter;
    const matchesState = !stateFilter || destination.state === stateFilter;
    const matchesSearch = !searchQuery || 
      destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destination.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destination.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesState && matchesSearch;
  });

  // Get unique categories and states for filters
  const categories = [...new Set(destinations.map(d => d.category))];
  const states = [...new Set(destinations.map(d => d.state))];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const clearFilters = () => {
    setCategoryFilter('');
    setStateFilter('');
    setSearchQuery('');
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
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography
                variant="h1"
                sx={{
                  fontFamily: 'Playfair Display',
                  fontWeight: 700,
                  mb: 2,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                }}
              >
                Explore India's Destinations
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: 600, mx: 'auto' }}>
                From the snow-capped Himalayas to tropical beaches, discover the incredible diversity of India
              </Typography>
            </Box>

            <Box sx={{ maxWidth: 600, mx: 'auto' }}>
              <SearchBar
                placeholder="Search destinations across India..."
                fullWidth
                onSearch={handleSearch}
              />
            </Box>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Filters Section */}
        <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Filter size={20} />
            <Typography variant="h6" sx={{ ml: 1, fontWeight: 600 }}>
              Filter Destinations
            </Typography>
          </Box>

          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={categoryFilter}
                  label="Category"
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <MenuItem value="">All Categories</MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>State</InputLabel>
                <Select
                  value={stateFilter}
                  label="State"
                  onChange={(e) => setStateFilter(e.target.value)}
                >
                  <MenuItem value="">All States</MenuItem>
                  {states.map((state) => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                {(categoryFilter || stateFilter || searchQuery) && (
                  <>
                    <Typography variant="body2\" color="text.secondary">
                      Active filters:
                    </Typography>
                    {categoryFilter && (
                      <Chip
                        label={`Category: ${categoryFilter}`}
                        onDelete={() => setCategoryFilter('')}
                        color="primary"
                        variant="outlined"
                        size="small"
                      />
                    )}
                    {stateFilter && (
                      <Chip
                        label={`State: ${stateFilter}`}
                        onDelete={() => setStateFilter('')}
                        color="primary"
                        variant="outlined"
                        size="small"
                      />
                    )}
                    {searchQuery && (
                      <Chip
                        label={`Search: ${searchQuery}`}
                        onDelete={() => setSearchQuery('')}
                        color="primary"
                        variant="outlined"
                        size="small"
                      />
                    )}
                    <Chip
                      label="Clear All"
                      onClick={clearFilters}
                      color="secondary"
                      variant="outlined"
                      size="small"
                    />
                  </>
                )}
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Results Count */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <MapPin size={20} />
            {isLoading ? 'Loading destinations...' : `${filteredDestinations.length} destinations found`}
          </Typography>
        </Box>

        {/* Destinations Grid */}
        {isLoading ? (
          <Grid container spacing={4}>
            {[...Array(6)].map((_, index) => (
              <Grid item xs={12} sm={6} lg={4} key={index}>
                <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>
                  <Skeleton variant="rectangular" height={240} />
                  <Box sx={{ p: 3 }}>
                    <Skeleton variant="text" height={32} width="80%" />
                    <Skeleton variant="text" height={20} width="60%" />
                    <Skeleton variant="text" height={20} width="40%" />
                    <Box sx={{ mt: 2 }}>
                      <Skeleton variant="rectangular" height={40} />
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        ) : filteredDestinations.length > 0 ? (
          <Grid container spacing={4}>
            {filteredDestinations.map((destination, index) => (
              <Grid item xs={12} sm={6} lg={4} key={destination.id}>
                <DestinationCard destination={destination} index={index} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Paper sx={{ p: 8, textAlign: 'center', borderRadius: 3 }}>
            <MapPin size={48} color="#ccc" />
            <Typography variant="h5" sx={{ mt: 2, mb: 1, color: 'text.secondary' }}>
              No destinations found
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Try adjusting your filters or search terms to find more destinations.
            </Typography>
          </Paper>
        )}
      </Container>
    </>
  );
};

export default DestinationsPage;