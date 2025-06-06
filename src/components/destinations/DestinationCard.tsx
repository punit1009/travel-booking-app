import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  Rating,
  Button,
  IconButton,
} from '@mui/material';
import { MapPin, Clock, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

interface Destination {
  id: string;
  name: string;
  state: string;
  category: string;
  price: string;
  rating: number;
  reviews: number;
  bestTime: string;
  highlights: string[];
  image: string;
  description: string;
}

interface DestinationCardProps {
  destination: Destination;
  index?: number;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination, index = 0 }) => {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        },
      }}
    >
        <Box sx={{ 
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          paddingTop: '56.25%', // 16:9 aspect ratio
          '& .card-image': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
          },
          '&:hover .card-image': {
            transform: 'scale(1.05)',
          }
        }}>
          <CardMedia
            component="img"
            image={destination.image}
            alt={destination.name}
            className="card-image"
          />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 100%)',
            }}
          />
          <IconButton
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              '&:hover': {
                backgroundColor: 'rgba(255, 107, 53, 0.1)',
                color: '#FF6B35',
              },
            }}
          >
            <Heart size={20} />
          </IconButton>
          <Chip
            label={destination.category}
            sx={{
              position: 'absolute',
              top: 12,
              left: 12,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              fontWeight: 600,
            }}
          />
        </Box>

        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="h5" component="h3" sx={{ fontWeight: 700, color: 'text.primary' }}>
              {destination.name}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'primary.main',
                fontWeight: 700,
                whiteSpace: 'nowrap',
                ml: 1,
              }}
            >
              {destination.price}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
            <MapPin size={16} color="#666" />
            <Typography variant="body2" color="text.secondary">
              {destination.state}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating
              value={destination.rating}
              precision={0.1}
              readOnly
              size="small"
              sx={{ mr: 1 }}
            />
            <Typography variant="body2" color="text.secondary">
              {destination.rating} ({destination.reviews} reviews)
            </Typography>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
            {destination.description}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
            <Clock size={16} color="#666" />
            <Typography variant="body2" color="text.secondary">
              Best time: {destination.bestTime}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 3 }}>
            {destination.highlights.slice(0, 3).map((highlight) => (
              <Chip
                key={highlight}
                label={highlight}
                size="small"
                variant="outlined"
                sx={{
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  fontSize: '0.75rem',
                }}
              />
            ))}
          </Box>

          <Button
            variant="contained"
            fullWidth
            sx={{
              py: 1.5,
              fontWeight: 600,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #E55A2B 0%, #E8841A 100%)',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(255, 107, 53, 0.3)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Explore Now
          </Button>
        </CardContent>
      </Card>
  );
};

export default DestinationCard;