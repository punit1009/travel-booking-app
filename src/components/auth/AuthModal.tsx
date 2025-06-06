import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Divider,
  Alert,
  CircularProgress,
} from '@mui/material';
import { X, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../../contexts/AuthContext';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  type: 'login' | 'register';
  onSwitchType: (type: 'login' | 'register') => void;
}

// Define form input types
type LoginInputs = {
  email: string;
  password: string;
};

type RegisterInputs = LoginInputs & {
  name: string;
  confirmPassword: string;
};

const loginSchema = yup.object<LoginInputs>({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

const registerSchema = yup.object<RegisterInputs>({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

const AuthModal: React.FC<AuthModalProps> = ({ open, onClose, type, onSwitchType }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, register } = useAuth();

  // Use separate form instances for login and register to avoid type conflicts
  const loginForm = useForm<LoginInputs>({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
  });

  const registerForm = useForm<RegisterInputs>({
    resolver: yupResolver(registerSchema),
    mode: 'onChange',
  });

  // Get the correct form based on auth type
  const form = type === 'login' ? loginForm : registerForm;
  const { 
    register: formRegister, 
    formState: { errors }, 
    reset,
    handleSubmit 
  } = form;

  const handleClose = () => {
    reset();
    setError('');
    setLoading(false);
    onClose();
  };

  const handleSwitchType = () => {
    reset();
    setError('');
    setLoading(false);
    onSwitchType(type === 'login' ? 'register' : 'login');
  };

  // Handle login form submission
  const onLogin = async (data: LoginInputs) => {
    console.log('Login data:', data);
    setLoading(true);
    setError('');

    try {
      await login(data.email, data.password);
      handleClose();
    } catch (err) {
      console.error('Login error:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to sign in. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle register form submission
  const onRegister = async (data: RegisterInputs) => {
    console.log('Register data:', data);
    setLoading(true);
    setError('');

    try {
      await register(
        data.name,
        data.email,
        data.password,
        data.confirmPassword
      );
      handleClose();
    } catch (err) {
      console.error('Registration error:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to create account. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(250, 250, 250, 0.95) 100%)',
          backdropFilter: 'blur(20px)',
        },
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ position: 'relative', p: 4 }}>
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              zIndex: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            <X size={20} />
          </IconButton>

          <AnimatePresence mode="wait">
            <motion.div
              key={type}
              initial={{ opacity: 0, x: type === 'login' ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: type === 'login' ? 20 : -20 }}
              transition={{ duration: 0.3 }}
            >
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: 'Playfair Display',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 1,
                  }}
                >
                  {type === 'login' ? 'Welcome Back' : 'Join Us'}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {type === 'login'
                    ? 'Sign in to your account to continue your journey'
                    : 'Create an account to start exploring incredible India'}
                </Typography>
              </Box>

              {error && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                  {error}
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit(type === 'login' ? onLogin : onRegister)} sx={{ mt: 2 }}>
                {type === 'register' && (
                  <TextField
                    {...formRegister('name')}
                    fullWidth
                    label="Full Name"
                    variant="outlined"
                    margin="normal"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    disabled={loading}
                    sx={{ mb: 2 }}
                  />
                )}

                <TextField
                  {...formRegister('email')}
                  fullWidth
                  label="Email Address"
                  type="email"
                  variant="outlined"
                  margin="normal"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  disabled={loading}
                  sx={{ mb: 2 }}
                />

                <TextField
                  {...formRegister('password')}
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  variant="outlined"
                  margin="normal"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  disabled={loading}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        disabled={loading}
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </IconButton>
                    ),
                  }}
                  sx={{ mb: 2 }}
                />

                {type === 'register' && (
                  <TextField
                    {...formRegister('confirmPassword')}
                    fullWidth
                    label="Confirm Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    variant="outlined"
                    margin="normal"
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                    disabled={loading}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          edge="end"
                          disabled={loading}
                        >
                          {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </IconButton>
                      ),
                    }}
                    sx={{ mb: 3 }}
                  />
                )}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: 3,
                    position: 'relative',
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    type === 'login' ? 'Sign In' : 'Create Account'
                  )}
                </Button>

                <Divider sx={{ my: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    or
                  </Typography>
                </Divider>

                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    {type === 'login' ? "Don't have an account?" : 'Already have an account?'}
                    <Button
                      onClick={handleSwitchType}
                      sx={{
                        ml: 1,
                        color: 'primary.main',
                        fontWeight: 600,
                        textTransform: 'none',
                        '&:hover': {
                          backgroundColor: 'transparent',
                        },
                      }}
                      disabled={loading}
                    >
                      {type === 'login' ? 'Sign Up' : 'Sign In'}
                    </Button>
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          </AnimatePresence>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;