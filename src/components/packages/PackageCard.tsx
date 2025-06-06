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
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import { Calendar, Users, MapPin, Check, Heart, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface Package {
  id: string;
  title: string;
  duration: string;
  price: string;
  originalPrice?: string;
  cities: string[];
  rating: number;
  reviews: number;
  inclusions: string[];
  highlights: string[];
  image: string;
  bestSeller?: boolean;
  popular?: boolean;
  luxury?: boolean;
  description: string;
}

interface PackageCardProps {
  package: Package;
  index?: number;
}

const PackageCard: React.FC<PackageCardProps> = ({ package: pkg, index = 0 }) => {
  const discountPercentage = pkg.originalPrice
    ? Math.round((1 - parseInt(pkg.price.replace(/[₹,]/g, '')) / parseInt(pkg.originalPrice.replace(/[₹,]/g, ''))) * 100)
    : 0;

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
            image={pkg.image}
            alt={pkg.title}
            className="card-image"
          />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%)',
            }}
          />
          
          {/* Badges */}
          <Box sx={{ position: 'absolute', top: 12, left: 12, display: 'flex', flexDirection: 'column', gap: 1 }}>
            {pkg.bestSeller && (
              <Chip
                label="Best Seller"
                sx={{
                  backgroundColor: '#FF6B35',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                }}
                icon={<Star size={14} />}
              />
            )}
            {pkg.popular && (
              <Chip
                label="Popular"
                sx={{
                  backgroundColor: '#1B4B73',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                }}
              />
            )}
            {pkg.luxury && (
              <Chip
                label="Luxury"
                sx={{
                  backgroundColor: '#F7931E',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                }}
              />
            )}
          </Box>

          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <Chip
              label={`${discountPercentage}% OFF`}
              sx={{
                position: 'absolute',
                top: 12,
                right: 12,
                backgroundColor: '#28A745',
                color: 'white',
                fontWeight: 700,
                fontSize: '0.75rem',
              }}
            />
          )}

          {/* Favorite Button */}
          <IconButton
            sx={{
              position: 'absolute',
              bottom: 12,
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
        </Box>

        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          <Typography variant="h5" component="h3" sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>
            {pkg.title}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Calendar size={16} color="#666" />
              <Typography variant="body2" color="text.secondary">
                {pkg.duration}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <MapPin size={16} color="#666" />
              <Typography variant="body2" color="text.secondary">
                {pkg.cities.join(', ')}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating
              value={pkg.rating}
              precision={0.1}
              readOnly
              size="small"
              sx={{ mr: 1 }}
            />
            <Typography variant="body2" color="text.secondary">
              {pkg.rating} ({pkg.reviews} reviews)
            </Typography>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
            {pkg.description}
          </Typography>

          {/* Price Section */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
              <Typography
                variant="h4"
                sx={{
                  color: 'primary.main',
                  fontWeight: 700,
                }}
              >
                {pkg.price}
              </Typography>
              {pkg.originalPrice && (
                <Typography
                  variant="h6"
                  sx={{
                    color: 'text.secondary',
                    textDecoration: 'line-through',
                  }}
                >
                  {pkg.originalPrice}
                </Typography>
              )}
            </Box>
            <Typography variant="body2" color="text.secondary">
              per person
            </Typography>
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* Inclusions */}
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            Package Includes:
          </Typography>
          <List dense sx={{ mb: 2 }}>
            {pkg.inclusions.slice(0, 3).map((inclusion) => (
              <ListItem key={inclusion} disableGutters sx={{ py: 0.25 }}>
                <ListItemIcon sx={{ minWidth: 20 }}>
                  <Check size={14} color="#28A745" />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body2\" color="text.secondary">
                      {inclusion}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>

          {/* Highlights */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 3 }}>
            {pkg.highlights.slice(0, 3).map((highlight) => (
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

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>
            <Button
              variant="outlined"
              sx={{
                flex: 1,
                py: 1.5,
                fontWeight: 600,
                borderRadius: 2,
                borderColor: 'primary.main',
                color: 'primary.main',
                '&:hover': {
                  borderColor: 'primary.dark',
                  backgroundColor: 'rgba(255, 107, 53, 0.05)',
                },
              }}
            >
              View Details
            </Button>
            <Button
              variant="contained"
              sx={{
                flex: 1,
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
              Book Now
            </Button>
          </Box>
        </CardContent>
      </Card>
  );
};

export default PackageCard;