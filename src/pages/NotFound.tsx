import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ py: 12, textAlign: 'center' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: '8rem',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2,
          }}
        >
          404
        </Typography>
        
        <Typography
          variant="h2"
          sx={{
            fontFamily: 'Playfair Display',
            fontWeight: 700,
            mb: 3,
            color: 'text.primary',
          }}
        >
          Page Not Found
        </Typography>
        
        <Typography variant="h6" color="text.secondary" sx={{ mb: 6, maxWidth: 500, mx: 'auto' }}>
          Oops! It seems like you've wandered off the beaten path. 
          The page you're looking for doesn't exist or has been moved.
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            component={Link}
            to="/"
            variant="contained"
            size="large"
            startIcon={<Home />}
            sx={{
              py: 1.5,
              px: 4,
              fontSize: '1.1rem',
              fontWeight: 600,
              borderRadius: 3,
            }}
          >
            Go Home
          </Button>
          
          <Button
            onClick={() => navigate(-1)}
            variant="outlined"
            size="large"
            startIcon={<ArrowLeft />}
            sx={{
              py: 1.5,
              px: 4,
              fontSize: '1.1rem',
              fontWeight: 600,
              borderRadius: 3,
            }}
          >
            Go Back
          </Button>
        </Box>
      </motion.div>
    </Container>
  );
};

export default NotFound;