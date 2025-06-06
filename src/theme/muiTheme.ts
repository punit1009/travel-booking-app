import { createTheme } from '@mui/material/styles';

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#FF6B35',
      light: '#FF8A5C',
      dark: '#E55A2B',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#1B4B73',
      light: '#2D5B85',
      dark: '#143A5C',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#DC3545',
      light: '#E76570',
      dark: '#C02A37',
    },
    warning: {
      main: '#F7931E',
      light: '#F9A547',
      dark: '#E8841A',
    },
    success: {
      main: '#28A745',
      light: '#51B767',
      dark: '#228B3F',
    },
    background: {
      default: '#FAFAFA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A1A1A',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
      fontSize: '3.5rem',
      lineHeight: 1.2,
      '@media (max-width:768px)': {
        fontSize: '2.5rem',
      },
    },
    h2: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
      fontSize: '2.75rem',
      lineHeight: 1.3,
      '@media (max-width:768px)': {
        fontSize: '2rem',
      },
    },
    h3: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.4,
      '@media (max-width:768px)': {
        fontSize: '1.5rem',
      },
    },
    h4: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h5: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.5,
    },
    h6: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '12px 24px',
          fontSize: '1rem',
          fontWeight: 600,
          boxShadow: 'none',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 4px 20px rgba(255, 107, 53, 0.3)',
            transform: 'translateY(-2px)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #E55A2B 0%, #E8841A 100%)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 8px 40px rgba(0, 0, 0, 0.12)',
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            '&:hover fieldset': {
              borderColor: '#FF6B35',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#FF6B35',
            },
          },
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});