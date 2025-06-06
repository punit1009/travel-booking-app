import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
} from '@mui/material';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const footerLinks = {
    destinations: [
      'Goa',
      'Kerala',
      'Rajasthan',
      'Himachal Pradesh',
      'Tamil Nadu',
      'Maharashtra',
    ],
    packages: [
      'Golden Triangle',
      'Kerala Backwaters',
      'Rajasthan Royal',
      'Goa Beach',
      'Himachal Hills',
      'South India Temple',
    ],
    company: [
      'About Us',
      'Our Team',
      'Careers',
      'Press',
      'Blog',
      'Reviews',
    ],
    support: [
      'Contact Us',
      'FAQ',
      'Booking Support',
      'Travel Insurance',
      'Terms & Conditions',
      'Privacy Policy',
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(135deg, #1B4B73 0%, #2D5B85 100%)',
        color: 'white',
        py: 6,
        mt: 8,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontFamily: 'Playfair Display',
                  fontWeight: 700,
                  mb: 2,
                  background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Incredible India Travel
              </Typography>
              <Typography variant="body2" sx={{ mb: 3, opacity: 0.9 }}>
                Discover the magic of India with our premium travel experiences. 
                From the golden deserts of Rajasthan to the backwaters of Kerala, 
                we craft unforgettable journeys across incredible India.
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {socialLinks.map((social, index) => (
                  <motion.div
                    key={social.label}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <IconButton
                      href={social.href}
                      sx={{
                        color: 'white',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 107, 53, 0.2)',
                          transform: 'translateY(-2px)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <social.icon size={20} />
                    </IconButton>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              <Grid item xs={6} md={3}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Destinations
                  </Typography>
                  {footerLinks.destinations.map((link) => (
                    <Link
                      key={link}
                      href="#"
                      sx={{
                        display: 'block',
                        color: 'rgba(255, 255, 255, 0.8)',
                        textDecoration: 'none',
                        mb: 1,
                        fontSize: '0.875rem',
                        '&:hover': {
                          color: '#FF6B35',
                          transform: 'translateX(4px)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {link}
                    </Link>
                  ))}
                </motion.div>
              </Grid>

              <Grid item xs={6} md={3}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Packages
                  </Typography>
                  {footerLinks.packages.map((link) => (
                    <Link
                      key={link}
                      href="#"
                      sx={{
                        display: 'block',
                        color: 'rgba(255, 255, 255, 0.8)',
                        textDecoration: 'none',
                        mb: 1,
                        fontSize: '0.875rem',
                        '&:hover': {
                          color: '#FF6B35',
                          transform: 'translateX(4px)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {link}
                    </Link>
                  ))}
                </motion.div>
              </Grid>

              <Grid item xs={6} md={3}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Company
                  </Typography>
                  {footerLinks.company.map((link) => (
                    <Link
                      key={link}
                      href="#"
                      sx={{
                        display: 'block',
                        color: 'rgba(255, 255, 255, 0.8)',
                        textDecoration: 'none',
                        mb: 1,
                        fontSize: '0.875rem',
                        '&:hover': {
                          color: '#FF6B35',
                          transform: 'translateX(4px)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {link}
                    </Link>
                  ))}
                </motion.div>
              </Grid>

              <Grid item xs={6} md={3}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Support
                  </Typography>
                  {footerLinks.support.map((link) => (
                    <Link
                      key={link}
                      href="#"
                      sx={{
                        display: 'block',
                        color: 'rgba(255, 255, 255, 0.8)',
                        textDecoration: 'none',
                        mb: 1,
                        fontSize: '0.875rem',
                        '&:hover': {
                          color: '#FF6B35',
                          transform: 'translateX(4px)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {link}
                    </Link>
                  ))}
                </motion.div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              © 2024 Incredible India Travel. All rights reserved.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1, opacity: 0.8 }}>
                <Phone size={16} />
                +91 98765 43210
              </Typography>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1, opacity: 0.8 }}>
                <Mail size={16} />
                info@incredibleindiatravel.com
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;