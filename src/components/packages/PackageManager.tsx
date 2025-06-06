import React, { useState } from 'react';
import { usePackages } from '../../contexts/PackageContext';
import { Package } from '../../contexts/PackageContext';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  CircularProgress,
  Snackbar,
  Alert,
  Grid,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';

const PackageManager: React.FC = () => {
  const { packages, loading, error, createPackage, updatePackage, deletePackage } = usePackages();
  const [open, setOpen] = useState(false);
  const [currentPackage, setCurrentPackage] = useState<Partial<Package> | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  
  // Use packages from context
  const displayedPackages = packages || [];
  
  // Handle package type for TypeScript
  type PackageWithId = Package & { _id: string };

  const handleOpen = (pkg?: Package) => {
    setCurrentPackage(pkg || { title: '', description: '', price: 0, duration: '', image: '', destinations: [] });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentPackage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPackage) return;

    try {
      if (currentPackage._id) {
        await updatePackage(currentPackage._id, currentPackage);
        setSnackbarMessage('Package updated successfully');
      } else {
        await createPackage(currentPackage as Omit<Package, '_id' | 'createdAt' | 'updatedAt'>);
        setSnackbarMessage('Package created successfully');
      }
      setSnackbarSeverity('success');
      handleClose();
    } catch (err) {
      setSnackbarMessage('Error saving package');
      setSnackbarSeverity('error');
      console.error(err);
    } finally {
      setOpenSnackbar(true);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      try {
        await deletePackage(id);
        setSnackbarMessage('Package deleted successfully');
        setSnackbarSeverity('success');
      } catch (err) {
        setSnackbarMessage('Error deleting package');
        setSnackbarSeverity('error');
        console.error(err);
      } finally {
        setOpenSnackbar(true);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentPackage(prev => ({
      ...prev!,
      [name]: name === 'price' ? Number(value) : value
    }));
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ my: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">My Travel Packages</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => handleOpen()}
        >
          Add Package
        </Button>
      </Box>

      <Grid container spacing={3}>
        {displayedPackages.map((pkg) => (
          <Grid item xs={12} sm={6} md={4} key={pkg._id}>
            <Card>
              {pkg.image && (
                <Box
                  component="img"
                  src={pkg.image}
                  alt={pkg.title}
                  sx={{ width: '100%', height: 200, objectFit: 'cover' }}
                />
              )}
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {pkg.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {pkg.duration}
                </Typography>
                <Typography variant="h6" color="primary">
                  ${pkg.price}
                </Typography>
                <Typography variant="body2" paragraph>
                  {pkg.description?.substring(0, 100)}...
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton onClick={() => handleOpen(pkg)} color="primary">
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDelete(pkg._id)} color="error">
                  <Delete />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>{currentPackage?._id ? 'Edit Package' : 'Create New Package'}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="title"
              label="Title"
              type="text"
              fullWidth
              variant="outlined"
              value={currentPackage?.title || ''}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              name="description"
              label="Description"
              type="text"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              value={currentPackage?.description || ''}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              name="price"
              label="Price"
              type="number"
              fullWidth
              variant="outlined"
              value={currentPackage?.price || ''}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              name="duration"
              label="Duration"
              type="text"
              fullWidth
              variant="outlined"
              value={currentPackage?.duration || ''}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
              placeholder="e.g., 7 Days 6 Nights"
            />
            <TextField
              margin="dense"
              name="image"
              label="Image URL"
              type="url"
              fullWidth
              variant="outlined"
              value={currentPackage?.image || ''}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              name="destinations"
              label="Destinations (comma separated)"
              type="text"
              fullWidth
              variant="outlined"
              value={currentPackage?.destinations?.join(', ') || ''}
              onChange={(e) =>
                setCurrentPackage({
                  ...currentPackage!,
                  destinations: e.target.value.split(',').map((s) => s.trim())
                })
              }
              sx={{ mb: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              {currentPackage?._id ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PackageManager;
