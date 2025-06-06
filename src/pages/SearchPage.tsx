import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Tabs,
  Tab,
  Skeleton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, MapPin, Package, Loader2 } from 'lucide-react';
import SearchBar from '../components/common/SearchBar';
import DestinationCard from '../components/destinations/DestinationCard';
import PackageCard from '../components/packages/PackageCard';
import { searchDestinations, getPackages } from '../services/api';

// Styled card container with consistent height and spacing
const StyledCardContainer = styled(Box)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.shape.borderRadius * 2,
  overflow: 'hidden',
  boxShadow: theme.shadows[2],
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

// Styled card content container
const CardContentWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  '& .MuiCardContent-root': {
    padding: 0,
  },
}));

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [activeTab, setActiveTab] = useState(0);

  const { data: searchResults = [], isLoading } = useQuery({
    queryKey: ['search', query],
    queryFn: async () => {
      if (!query.trim()) return [];
      try {
        const results = await searchDestinations(query);
        console.log('Raw search results:', results);
        
        return results.map((item: any) => {
          const baseItem = {
            ...item,
            id: item._id || item.id,
            type: item.type || 'destination',
            // Ensure required fields have default values if missing
            name: item.name || item.title || 'Untitled',
            image: item.image || '/placeholder-image.jpg',
            price: item.price || 0,
            rating: item.rating || 0,
            reviews: item.reviews || 0,
          };
          
          // Add type-specific fields
          if (item.type === 'destination') {
            return {
              ...baseItem,
              state: item.state || 'Unknown',
              description: item.description || 'No description available',
            };
          } else {
            // Package specific fields
            return {
              ...baseItem,
              duration: item.duration || 'N/A',
              destination: item.destination || 'Unknown',
              description: item.description || 'No description available',
            };
          }
        });
      } catch (error) {
        console.error('Search error:', error);
        return [];
      }
    },
    enabled: query.length > 0,
  });

  useEffect(() => {
    const urlQuery = searchParams.get('q');
    if (urlQuery) {
      setQuery(urlQuery);
    }
  }, [searchParams]);

  // Filter search results by type
  const destinations = searchResults.filter((item: any) => item.type === 'destination');
  const packages = searchResults.filter((item: any) => item.type === 'package');
  
  console.log('Filtered destinations:', destinations);
  console.log('Filtered packages:', packages);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const getTabLabel = (type: string, count: number) => {
    return `${type} (${count})`;
  };

  return (
    <>
      {/* Header Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1B4B73 0%, #FF6B35 100%)',
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
                Search Results
              </Typography>
              {query && (
                <Typography variant="h6" sx={{ opacity: 0.9 }}>
                  Showing results for "{query}"
                </Typography>
              )}
            </Box>

            <Box sx={{ maxWidth: 600, mx: 'auto' }}>
              <SearchBar
                placeholder="Search destinations and packages..."
                fullWidth
                onSearch={handleSearch}
              />
            </Box>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        {query ? (
          <>
            {/* Results Summary */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <SearchIcon size={20} />
                {isLoading 
                  ? 'Searching...' 
                  : `${searchResults.length} results found for "${query}"`
                }
              </Typography>
            </Box>

            {/* Tabs for filtering results */}
            {!isLoading && searchResults.length > 0 && (
              <Paper sx={{ mb: 4, borderRadius: 2 }}>
                <Tabs
                  value={activeTab}
                  onChange={handleTabChange}
                  variant="fullWidth"
                  sx={{
                    '& .MuiTab-root': {
                      fontWeight: 600,
                      fontSize: '1rem',
                    },
                  }}
                >
                  <Tab 
                    label={getTabLabel('All Results', searchResults.length)}
                    icon={<SearchIcon size={20} />}
                    iconPosition="start"
                  />
                  <Tab 
                    label={getTabLabel('Destinations', destinations.length)}
                    icon={<MapPin size={20} />}
                    iconPosition="start"
                  />
                  <Tab 
                    label={getTabLabel('Packages', packages.length)}
                    icon={<Package size={20} />}
                    iconPosition="start"
                  />
                </Tabs>
              </Paper>
            )}

            {/* Results Content */}
            {isLoading ? (
              <Grid container spacing={3}>
                {[...Array(6)].map((_, index) => (
                  <Grid item xs={12} sm={6} lg={4} key={index}>
                    <StyledCardContainer component={Paper}>
                      <Skeleton 
                        variant="rectangular" 
                        height={200} 
                        sx={{ 
                          width: '100%',
                          transform: 'none', // Remove scale transform
                        }} 
                      />
                      <CardContentWrapper>
                        <Skeleton variant="text" height={28} width="80%" />
                        <Skeleton variant="text" height={20} width="60%" sx={{ mt: 1 }} />
                        <Skeleton variant="text" height={20} width="40%" sx={{ mb: 2 }} />
                        <Box sx={{ mt: 'auto', pt: 2 }}>
                          <Skeleton 
                            variant="rectangular" 
                            height={40} 
                            width="100%" 
                            sx={{ 
                              borderRadius: 2,
                              transform: 'none', // Remove scale transform
                            }} 
                          />
                        </Box>
                      </CardContentWrapper>
                    </StyledCardContainer>
                  </Grid>
                ))}
              </Grid>
            ) : searchResults.length > 0 ? (
              <>
                {/* All Results Tab */}
                {activeTab === 0 && (
                  <AnimatePresence>
                    <Grid container spacing={3}>
                      {[...destinations, ...packages].map((item) => (
                        <Grid 
                          item 
                          xs={12} 
                          sm={6} 
                          lg={4} 
                          key={`${item.type}-${item.id}`}
                        >
                          <StyledCardContainer>
                            {item.type === 'destination' ? (
                              <DestinationCard destination={item} index={0} />
                            ) : (
                              <PackageCard package={item} index={0} />
                            )}
                          </StyledCardContainer>
                        </Grid>
                      ))}
                    </Grid>
                  </AnimatePresence>
                )}

                {/* Destinations Tab */}
                {activeTab === 1 && (
                  <>
                    {destinations.length > 0 ? (
                      <AnimatePresence>
                        <Grid container spacing={3}>
                          {destinations.map((destination) => (
                            <Grid 
                              item 
                              xs={12} 
                              sm={6} 
                              lg={4} 
                              key={destination.id}
                            >
                              <StyledCardContainer>
                                <DestinationCard destination={destination} index={0} />
                              </StyledCardContainer>
                            </Grid>
                          ))}
                        </Grid>
                      </AnimatePresence>
                    ) : (
                      <Paper sx={{ p: 8, textAlign: 'center', borderRadius: 3 }}>
                        <MapPin size={48} color="#ccc" />
                        <Typography variant="h5" sx={{ mt: 2, mb: 1, color: 'text.secondary' }}>
                          No destinations found
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          Try searching with different keywords or browse our destinations page.
                        </Typography>
                      </Paper>
                    )}
                  </>
                )}

                {/* Packages Tab */}
                {activeTab === 2 && (
                  <>
                    {packages.length > 0 ? (
                      <AnimatePresence>
                        <Grid container spacing={3}>
                          {packages.map((pkg) => (
                            <Grid 
                              item 
                              xs={12} 
                              sm={6} 
                              lg={4} 
                              key={pkg.id}
                            >
                              <StyledCardContainer>
                                <PackageCard package={pkg} index={0} />
                              </StyledCardContainer>
                            </Grid>
                          ))}
                        </Grid>
                      </AnimatePresence>
                    ) : (
                      <Paper sx={{ p: 8, textAlign: 'center', borderRadius: 3 }}>
                        <Package size={48} color="#ccc" />
                        <Typography variant="h5" sx={{ mt: 2, mb: 1, color: 'text.secondary' }}>
                          No packages found
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          Try searching with different keywords or browse our packages page.
                        </Typography>
                      </Paper>
                    )}
                  </>
                )}
              </>
            ) : (
              <Paper sx={{ p: 8, textAlign: 'center', borderRadius: 3 }}>
                <SearchIcon size={48} color="#ccc" />
                <Typography variant="h5" sx={{ mt: 2, mb: 1, color: 'text.secondary' }}>
                  No results found
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  We couldn't find any destinations or packages matching "{query}".
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Try searching for popular destinations like "Goa", "Kerala", "Rajasthan", or "Golden Triangle".
                </Typography>
              </Paper>
            )}
          </>
        ) : (
          <Paper sx={{ p: 8, textAlign: 'center', borderRadius: 3 }}>
            <SearchIcon size={48} color="#ccc" />
            <Typography variant="h5" sx={{ mt: 2, mb: 1, color: 'text.secondary' }}>
              Start Your Search
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Enter a destination, city, or package name to find your perfect Indian adventure.
            </Typography>
          </Paper>
        )}
      </Container>
    </>
  );
};

export default SearchPage;