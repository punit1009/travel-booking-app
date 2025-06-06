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
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Package, Filter, Star, TrendingUp, Crown } from 'lucide-react';
import PackageCard from '../components/packages/PackageCard';
import SearchBar from '../components/common/SearchBar';
import { getPackages } from '../services/api';

const PackagesPage: React.FC = () => {
  const [priceFilter, setPriceFilter] = useState('');
  const [durationFilter, setDurationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');

  const { data: packages = [], isLoading } = useQuery({
    queryKey: ['packages'],
    queryFn: getPackages,
  });

  // Filter packages based on selected filters and search
  const filteredPackages = packages.filter((pkg) => {
    const price = parseInt(pkg.price.replace(/[₹,]/g, ''));
    const matchesPrice = !priceFilter || 
      (priceFilter === 'budget' && price < 20000) ||
      (priceFilter === 'mid' && price >= 20000 && price < 40000) ||
      (priceFilter === 'luxury' && price >= 40000);
    
    const matchesDuration = !durationFilter ||
      (durationFilter === 'short' && pkg.duration.includes('3') || pkg.duration.includes('4')) ||
      (durationFilter === 'medium' && (pkg.duration.includes('5') || pkg.duration.includes('6'))) ||
      (durationFilter === 'long' && (pkg.duration.includes('7') || pkg.duration.includes('8')));
    
    const matchesType = !typeFilter ||
      (typeFilter === 'bestseller' && pkg.bestSeller) ||
      (typeFilter === 'popular' && pkg.popular) ||
      (typeFilter === 'luxury' && pkg.luxury);
    
    const matchesSearch = !searchQuery || 
      pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.cities.some(city => city.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesPrice && matchesDuration && matchesType && matchesSearch;
  });

  // Sort packages
  const sortedPackages = [...filteredPackages].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return parseInt(a.price.replace(/[₹,]/g, '')) - parseInt(b.price.replace(/[₹,]/g, ''));
      case 'price-high':
        return parseInt(b.price.replace(/[₹,]/g, '')) - parseInt(a.price.replace(/[₹,]/g, ''));
      case 'rating':
        return b.rating - a.rating;
      case 'duration':
        return parseInt(a.duration) - parseInt(b.duration);
      default: // popular
        return (b.bestSeller ? 2 : 0) + (b.popular ? 1 : 0) - ((a.bestSeller ? 2 : 0) + (a.popular ? 1 : 0));
    }
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const clearFilters = () => {
    setPriceFilter('');
    setDurationFilter('');
    setTypeFilter('');
    setSearchQuery('');
  };

  return (
    <>
      {/* Header Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
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
                India Travel Packages
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: 600, mx: 'auto' }}>
                Discover handcrafted journeys that showcase the best of incredible India
              </Typography>
            </Box>

            <Box sx={{ maxWidth: 600, mx: 'auto' }}>
              <SearchBar
                placeholder="Search packages by destination or city..."
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
              Filter & Sort Packages
            </Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={2.4}>
              <FormControl fullWidth>
                <InputLabel>Price Range</InputLabel>
                <Select
                  value={priceFilter}
                  label="Price Range"
                  onChange={(e) => setPriceFilter(e.target.value)}
                >
                  <MenuItem value="">All Prices</MenuItem>
                  <MenuItem value="budget">Budget (Under ₹20k)</MenuItem>
                  <MenuItem value="mid">Mid-range (₹20k-40k)</MenuItem>
                  <MenuItem value="luxury">Luxury (₹40k+)</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={2.4}>
              <FormControl fullWidth>
                <InputLabel>Duration</InputLabel>
                <Select
                  value={durationFilter}
                  label="Duration"
                  onChange={(e) => setDurationFilter(e.target.value)}
                >
                  <MenuItem value="">All Durations</MenuItem>
                  <MenuItem value="short">Short (3-4 Days)</MenuItem>
                  <MenuItem value="medium">Medium (5-6 Days)</MenuItem>
                  <MenuItem value="long">Long (7+ Days)</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={2.4}>
              <FormControl fullWidth>
                <InputLabel>Package Type</InputLabel>
                <Select
                  value={typeFilter}
                  label="Package Type"
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <MenuItem value="">All Types</MenuItem>
                  <MenuItem value="bestseller">Best Sellers</MenuItem>
                  <MenuItem value="popular">Popular</MenuItem>
                  <MenuItem value="luxury">Luxury</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={2.4}>
              <FormControl fullWidth>
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortBy}
                  label="Sort By"
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <MenuItem value="popular">Popular First</MenuItem>
                  <MenuItem value="price-low">Price: Low to High</MenuItem>
                  <MenuItem value="price-high">Price: High to Low</MenuItem>
                  <MenuItem value="rating">Highest Rated</MenuItem>
                  <MenuItem value="duration">Duration</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={2.4}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {(priceFilter || durationFilter || typeFilter || searchQuery) && (
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                    {priceFilter && (
                      <Chip
                        label={`Price: ${priceFilter}`}
                        onDelete={() => setPriceFilter('')}
                        color="primary"
                        variant="outlined"
                        size="small"
                      />
                    )}
                    {durationFilter && (
                      <Chip
                        label={`Duration: ${durationFilter}`}
                        onDelete={() => setDurationFilter('')}
                        color="primary"
                        variant="outlined"
                        size="small"
                      />
                    )}
                    {typeFilter && (
                      <Chip
                        label={`Type: ${typeFilter}`}
                        onDelete={() => setTypeFilter('')}
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
                  </Box>
                )}
                {(priceFilter || durationFilter || typeFilter || searchQuery) && (
                  <Chip
                    label="Clear All"
                    onClick={clearFilters}
                    color="secondary"
                    variant="outlined"
                    size="small"
                    sx={{ alignSelf: 'flex-start' }}
                  />
                )}
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Quick Filter Buttons */}
        <Box sx={{ mb: 4 }}>
          <ToggleButtonGroup
            value={typeFilter}
            exclusive
            onChange={(_, value) => setTypeFilter(value || '')}
            sx={{ flexWrap: 'wrap', gap: 1 }}
          >
            <ToggleButton value="bestseller" sx={{ border: 'none', borderRadius: 3 }}>
              <Star size={16} style={{ marginRight: 8 }} />
              Best Sellers
            </ToggleButton>
            <ToggleButton value="popular" sx={{ border: 'none', borderRadius: 3 }}>
              <TrendingUp size={16} style={{ marginRight: 8 }} />
              Popular
            </ToggleButton>
            <ToggleButton value="luxury" sx={{ border: 'none', borderRadius: 3 }}>
              <Crown size={16} style={{ marginRight: 8 }} />
              Luxury
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* Results Count */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Package size={20} />
            {isLoading ? 'Loading packages...' : `${sortedPackages.length} packages found`}
          </Typography>
        </Box>

        {/* Packages Grid */}
        {isLoading ? (
          <Grid container spacing={4}>
            {[...Array(4)].map((_, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>
                  <Skeleton variant="rectangular" height={280} />
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
        ) : sortedPackages.length > 0 ? (
          <Grid container spacing={4}>
            {sortedPackages.map((pkg, index) => (
              <Grid item xs={12} md={6} key={pkg.id}>
                <PackageCard package={pkg} index={index} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Paper sx={{ p: 8, textAlign: 'center', borderRadius: 3 }}>
            <Package size={48} color="#ccc" />
            <Typography variant="h5" sx={{ mt: 2, mb: 1, color: 'text.secondary' }}>
              No packages found
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Try adjusting your filters or search terms to find more packages.
            </Typography>
          </Paper>
        )}
      </Container>
    </>
  );
};

export default PackagesPage;