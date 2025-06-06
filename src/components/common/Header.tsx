import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import { Menu as MenuIcon, User, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import AuthModal from '../auth/AuthModal';

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalType, setAuthModalType] = useState<'login' | 'register'>('login');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleAuthModal = (type: 'login' | 'register') => {
    setAuthModalType(type);
    setAuthModalOpen(true);
  };

  const handleUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleCloseUserMenu();
    navigate('/');
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Destinations', path: '/destinations' },
    { label: 'Packages', path: '/packages' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', pt: 2 }}>
      <Typography variant="h6" sx={{ my: 2, fontFamily: 'Playfair Display' }}>
        Incredible India Travel
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemText
              primary={
                <Link
                  to={item.path}
                  style={{
                    textDecoration: 'none',
                    color: theme.palette.text.primary,
                    display: 'block',
                    padding: '12px 16px',
                  }}
                >
                  {item.label}
                </Link>
              }
            />
          </ListItem>
        ))}
        {!isAuthenticated && (
          <Box sx={{ mt: 2, px: 2 }}>
            <Button
              variant="outlined"
              fullWidth
              sx={{ mb: 1 }}
              onClick={() => handleAuthModal('login')}
            >
              Login
            </Button>
            <Button
              variant="contained"
              fullWidth
              onClick={() => handleAuthModal('register')}
            >
              Sign Up
            </Button>
          </Box>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 2px 20px rgba(0, 0, 0, 0.1)',
          color: theme.palette.text.primary,
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography
                variant="h5"
                component="div"
                sx={{
                  fontFamily: 'Playfair Display',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Incredible India Travel
              </Typography>
            </Link>
          </motion.div>

          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Button
                    component={Link}
                    to={item.path}
                    sx={{
                      color: theme.palette.text.primary,
                      fontWeight: 500,
                      position: 'relative',
                      '&:hover': {
                        backgroundColor: 'transparent',
                        '&::after': {
                          width: '100%',
                        },
                      },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: -4,
                        left: 0,
                        width: 0,
                        height: 2,
                        background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                        transition: 'width 0.3s ease',
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                </motion.div>
              ))}
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {!isMobile && !isAuthenticated && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Button
                  variant="outlined"
                  sx={{ mr: 1 }}
                  onClick={() => handleAuthModal('login')}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  onClick={() => handleAuthModal('register')}
                >
                  Sign Up
                </Button>
              </motion.div>
            )}

            {!isMobile && isAuthenticated && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={handleUserMenu}>
                  <Avatar sx={{ width: 32, height: 32, bgcolor: theme.palette.primary.main }}>
                    {user?.name?.charAt(0).toUpperCase()}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleCloseUserMenu}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem onClick={() => { handleCloseUserMenu(); navigate('/profile'); }}>
                    <User size={16} style={{ marginRight: 8 }} />
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <LogOut size={16} style={{ marginRight: 8 }} />
                    Logout
                  </MenuItem>
                </Menu>
              </Box>
            )}

            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>

      <AuthModal
        open={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        type={authModalType}
        onSwitchType={setAuthModalType}
      />
    </>
  );
};

export default Header;