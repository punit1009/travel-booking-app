import React, { useState, useEffect, useRef, KeyboardEvent, ChangeEvent } from 'react';
import {
  Box,
  TextField,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  InputAdornment,
  CircularProgress,
  Chip,
  Fade,
} from '@mui/material';
import { Search, MapPin, Package } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { searchDestinations } from '../../services/api';
import { useNavigate } from 'react-router-dom';

interface SearchResult {
  id: string;
  name: string;
  type: 'destination' | 'package';
  image?: string;
  location?: string;
  price?: number;
  rating?: number;
  title?: string;
  state?: string;
  destination?: string;
  category?: string;
  duration?: string;
  _score?: number; // Internal use for sorting
}

interface SearchBarProps {
  placeholder?: string;
  fullWidth?: boolean;
  onSearch?: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search destinations, packages...",
  fullWidth = false,
  onSearch,
}) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { data: searchResults = [], isLoading } = useQuery<SearchResult[]>({
    queryKey: ['search-suggestions', query],
    queryFn: async () => {
      if (query.length < 1) return [];
      try {
        const results = await searchDestinations(query);
        const normalizedQuery = query.toLowerCase().trim();
        
        const scoredResults = results.map((item: any) => {
          const name = item.name || item.title || '';
          const location = item.state || item.destination || '';
          const normalizedName = name.toLowerCase();
          const normalizedLocation = location.toLowerCase();
          
          // Calculate relevance score (higher is better)
          let score = 0;
          
          // Exact match boost
          if (normalizedName === normalizedQuery || normalizedLocation === normalizedQuery) {
            score += 100;
          }
          
          // Check if query appears at the start of name/title
          if (normalizedName.startsWith(normalizedQuery)) {
            score += 50;
          } else if (normalizedName.includes(normalizedQuery)) {
            score += 20;
          }
          
          // Check location matches
          if (normalizedLocation.includes(normalizedQuery)) {
            score += 10;
          }
          
          // Boost for destinations (or packages if you prefer)
          if (item.type === 'destination') {
            score += 5;
          }
          
          // Consider rating if available (assuming higher rating = more relevant)
          if (item.rating) {
            score += item.rating;
          }
          
          return {
            id: item._id || item.id || Math.random().toString(36).substr(2, 9),
            name: name || 'Unnamed',
            type: (item.type || 'destination') as 'destination' | 'package',
            image: item.image || '/placeholder.jpg',
            location: location || 'Unknown location',
            price: item.price,
            rating: item.rating,
            category: item.category,
            duration: item.duration,
            state: item.state,
            destination: item.destination,
            title: item.title || name,
            _score: score
          };
        });
        
        // Sort by score (descending) and then by name
        return scoredResults.sort((a, b) => {
          if (b._score !== a._score) {
            return b._score - a._score; // Higher score first
          }
          return (a.name || '').localeCompare(b.name || ''); // Then alphabetically
        });
        
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        return [];
      }
    },
    enabled: query.length > 0,
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true
  });
  
  const showSuggestionsList = showSuggestions && query.length > 0;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setShowSuggestions(true);
    setFocusedIndex(-1);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestionsList || searchResults.length === 0) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setFocusedIndex(prev => 
          prev < searchResults.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        event.preventDefault();
        setFocusedIndex(prev => 
          prev > 0 ? prev - 1 : searchResults.length - 1
        );
        break;
      case 'Enter':
        event.preventDefault();
        if (focusedIndex >= 0 && searchResults[focusedIndex]) {
          handleSuggestionClick(searchResults[focusedIndex]);
        } else if (query.trim()) {
          navigate(`/search?q=${encodeURIComponent(query.trim())}`);
          setShowSuggestions(false);
          onSearch?.(query.trim());
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        break;
    }
  };

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setShowSuggestions(false);
      onSearch?.(query.trim());
    }
  };

  const handleSuggestionClick = (suggestion: SearchResult) => {
    const searchQuery = suggestion.name || suggestion.title || '';
    setQuery(searchQuery);
    setShowSuggestions(false);
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <Box sx={{ position: 'relative' }} ref={inputRef}>
      <TextField
        fullWidth={fullWidth}
        placeholder={placeholder}
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setShowSuggestions(true)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search size={20} />
            </InputAdornment>
          ),
          endAdornment: isLoading && (
            <InputAdornment position="end">
              <CircularProgress size={20} />
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 4,
            backgroundColor: 'background.paper',
            fontSize: '1.1rem',
            '&:hover': {
              '& fieldset': {
                borderColor: 'primary.main',
              },
            },
            '&.Mui-focused': {
              '& fieldset': {
                borderWidth: 2,
                borderColor: 'primary.main',
              },
            },
          },
        }}
      />
      <Fade in={showSuggestionsList}>
        <Box>
          {showSuggestionsList && (
        <Paper
          elevation={8}
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 1000,
            mt: 1,
            borderRadius: 2,
            overflow: 'hidden',
            maxHeight: 400,
            overflowY: 'auto',
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
          }}
        >
          {isLoading ? (
            <Box sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>
              <CircularProgress size={24} />
              <Typography variant="body2" sx={{ mt: 1 }}>Searching...</Typography>
            </Box>
          ) : searchResults.length > 0 ? (
            <List disablePadding>
              {searchResults.slice(0, 5).map((item, index) => (
                <ListItem
                  key={`${item.type}-${item.id}`}
                  button
                  selected={focusedIndex === index}
                  onClick={() => handleSuggestionClick(item)}
                  sx={{
                    '&:hover': { backgroundColor: 'action.hover' },
                    '&.Mui-selected': { backgroundColor: 'action.selected' },
                    display: 'flex',
                    alignItems: 'center',
                    py: 1.5,
                    px: 2,
                  }}
                >
                  <ListItemAvatar sx={{ minWidth: 48 }}>
                    <Avatar 
                      src={item.image} 
                      alt={item.name}
                      variant={item.type === 'destination' ? 'rounded' : 'square'}
                      sx={{ 
                        width: 40, 
                        height: 40,
                        backgroundColor: item.type === 'destination' ? 'primary.light' : 'secondary.light'
                      }}
                    >
                      {item.type === 'destination' ? (
                        <MapPin size={20} />
                      ) : (
                        <Package size={20} />
                      )}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="subtitle2" noWrap>
                          {item.name}
                        </Typography>
                        <Chip
                          label={item.type === 'destination' ? 'Destination' : 'Package'}
                          size="small"
                          color={item.type === 'destination' ? 'primary' : 'secondary'}
                          variant="outlined"
                        />
                      </Box>
                    }
                    secondary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                        {item.type === 'destination' ? (
                          <MapPin size={14} />
                        ) : (
                          <Package size={14} />
                        )}
                        <Typography variant="caption" color="text.secondary" noWrap>
                          {item.location}
                          {item.price && ` • $${item.price}`}
                        </Typography>
                      </Box>
                    }
                    sx={{ my: 0, overflow: 'hidden' }}
                  />
                </ListItem>
              ))}
            </List>
          ) : query.length > 0 ? (
            <Box sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>
              No results found for "{query}"
            </Box>
          ) : null}
        </Paper>
      )}
      
      {isLoading && query.length > 2 && (
        <Paper
          elevation={8}
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 1000,
            mt: 1,
            borderRadius: 2,
            p: 2,
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Searching...
          </Typography>
        </Paper>
      )}
        </Box>
      </Fade>
    </Box>
  );
};

export default SearchBar;