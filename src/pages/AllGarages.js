import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Box,
  Typography,
  TextField,
  MenuItem,
  Grid,
  Alert,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  CircularProgress
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/DownloadForOffline';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import CancelIcon from '@mui/icons-material/Cancel';

const AllGarages = () => {
  const [garages, setGarages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedGarage, setSelectedGarage] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [error, setError] = useState('');

      const token = localStorage.getItem('authToken') ? `Bearer ${localStorage.getItem('authToken')}` : '';
  useEffect(() => {
    const fetchAllGarages = async () => {
      try {
        setLoading(true);
        setError('');
        
        const response = await fetch(
          'https://garage-management-zi5z.onrender.com/api/admin/allgarages',
          {
            method: 'GET',
            headers: {
              'Authorization': token,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch garages: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('API Response:', data);
        setGarages(data.garages || []);
      } catch (error) {
        console.error('Error fetching garages:', error);
        setError(`Failed to load garages: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchAllGarages();
  }, []);

  const getStatusColor = (garage) => {
    if (garage.isSubscribed && garage.approved) return 'success';
    if (garage.isSubscribed && !garage.approved) return 'warning';
    return 'error';
  };

  const getSubscriptionStatus = (garage) => {
    if (garage.isSubscribed && garage.approved) return 'Active';
    if (garage.isSubscribed && !garage.approved) return 'Pending Approval';
    return 'Not Subscribed';
  };

  const getStatusIcon = (garage) => {
    if (garage.isSubscribed && garage.approved) return <CheckCircleIcon fontSize="small" />;
    if (garage.isSubscribed && !garage.approved) return <PendingIcon fontSize="small" />;
    return <CancelIcon fontSize="small" />;
  };

  const filteredGarages = garages.filter(garage => {
    if (filter === 'all') return true;
    if (filter === 'active') return garage.approved && garage.isSubscribed;
    if (filter === 'pending') return garage.isSubscribed && !garage.approved;
    if (filter === 'inactive') return !garage.isSubscribed;
    return true;
  });

  const handleViewGarage = (garage) => {
    setSelectedGarage(garage);
    setViewDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setViewDialogOpen(false);
    setSelectedGarage(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getGarageStats = () => {
    const active = garages.filter(g => g.approved && g.isSubscribed).length;
    const pending = garages.filter(g => g.isSubscribed && !g.approved).length;
    const inactive = garages.filter(g => !g.isSubscribed).length;
    
    return { active, pending, inactive, total: garages.length };
  };

  const stats = getGarageStats();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>Loading garages...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        All Garages
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Stats Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <Box p={2} textAlign="center">
              <Typography variant="h4" color="primary">{stats.total}</Typography>
              <Typography variant="body2">Total Garages</Typography>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <Box p={2} textAlign="center">
              <Typography variant="h4" color="success.main">{stats.active}</Typography>
              <Typography variant="body2">Active</Typography>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <Box p={2} textAlign="center">
              <Typography variant="h4" color="warning.main">{stats.pending}</Typography>
              <Typography variant="body2">Pending</Typography>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <Box p={2} textAlign="center">
              <Typography variant="h4" color="error.main">{stats.inactive}</Typography>
              <Typography variant="body2">Inactive</Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardHeader 
              title={`Garage Management (${filteredGarages.length} garages)`}
              action={
                <TextField
                  select
                  size="small"
                  label="Filter"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  sx={{ minWidth: 120 }}
                >
                  <MenuItem value="all">All ({stats.total})</MenuItem>
                  <MenuItem value="active">Active ({stats.active})</MenuItem>
                  <MenuItem value="pending">Pending ({stats.pending})</MenuItem>
                  <MenuItem value="inactive">Inactive ({stats.inactive})</MenuItem>
                </TextField>
              }
            />
            <Divider />
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Garage Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Subscription Type</TableCell>
                    <TableCell>Start Date</TableCell>
                    <TableCell>End Date</TableCell>
                    <TableCell>Payment</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredGarages.map((garage) => (
                    <TableRow key={garage._id} hover>
                      <TableCell>
                        <Box>
                          <Typography variant="subtitle2" fontWeight="bold">
                            {garage.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {garage.address}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{garage.email}</TableCell>
                      <TableCell>{garage.phone}</TableCell>
                      <TableCell>
                        <Chip
                          icon={getStatusIcon(garage)}
                          label={getSubscriptionStatus(garage)}
                          color={getStatusColor(garage)}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={garage.subscriptionType || 'N/A'} 
                          size="small"
                          variant="filled"
                          color={garage.subscriptionType ? 'primary' : 'default'}
                        />
                      </TableCell>
                      <TableCell>{formatDate(garage.subscriptionStart)}</TableCell>
                      <TableCell>{formatDate(garage.subscriptionEnd)}</TableCell>
                      <TableCell>
                        {garage.paymentDetails ? (
                          <Box>
                            <Typography variant="caption" display="block">
                              ₹{garage.paymentDetails.amount}
                            </Typography>
                            <Chip 
                              label={garage.paymentDetails.status} 
                              size="small"
                              color={garage.paymentDetails.status === 'paid' ? 'success' : 'default'}
                            />
                          </Box>
                        ) : (
                          'N/A'
                        )}
                      </TableCell>
                      <TableCell>
                        <IconButton 
                          size="small" 
                          color="primary"
                          onClick={() => handleViewGarage(garage)}
                          title="View Details"
                        >
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          color="secondary"
                          title="Edit"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          color="info"
                          title="Download"
                        >
                          <DownloadIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            
            {filteredGarages.length === 0 && !loading && (
              <Box p={4} textAlign="center">
                <Typography color="text.secondary">
                  No garages found for the selected filter.
                </Typography>
              </Box>
            )}
          </Card>
        </Grid>
      </Grid>

      {/* View Garage Dialog */}
      <Dialog 
        open={viewDialogOpen} 
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Garage Details: {selectedGarage?.name}
        </DialogTitle>
        <DialogContent>
          {selectedGarage && (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Paper elevation={1} sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>Basic Information</Typography>
                  <Typography><strong>Name:</strong> {selectedGarage.name}</Typography>
                  <Typography><strong>Email:</strong> {selectedGarage.email}</Typography>
                  <Typography><strong>Phone:</strong> {selectedGarage.phone}</Typography>
                  <Typography><strong>Address:</strong> {selectedGarage.address}</Typography>
                  <Typography><strong>Status:</strong> 
                    <Chip 
                      label={getSubscriptionStatus(selectedGarage)} 
                      color={getStatusColor(selectedGarage)}
                      size="small"
                      sx={{ ml: 1 }}
                    />
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper elevation={1} sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>Subscription Details</Typography>
                  <Typography><strong>Type:</strong> {selectedGarage.subscriptionType || 'N/A'}</Typography>
                  <Typography><strong>Start:</strong> {formatDate(selectedGarage.subscriptionStart)}</Typography>
                  <Typography><strong>End:</strong> {formatDate(selectedGarage.subscriptionEnd)}</Typography>
                  <Typography><strong>Subscribed:</strong> {selectedGarage.isSubscribed ? 'Yes' : 'No'}</Typography>
                  <Typography><strong>Approved:</strong> {selectedGarage.approved ? 'Yes' : 'No'}</Typography>
                </Paper>
              </Grid>
              {selectedGarage.paymentDetails && (
                <Grid item xs={12}>
                  <Paper elevation={1} sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>Payment Information</Typography>
                    <Typography><strong>Amount:</strong> ₹{selectedGarage.paymentDetails.amount}</Typography>
                    <Typography><strong>Method:</strong> {selectedGarage.paymentDetails.method}</Typography>
                    <Typography><strong>Status:</strong> {selectedGarage.paymentDetails.status}</Typography>
                    {selectedGarage.paymentDetails.paymentId && (
                      <Typography><strong>Payment ID:</strong> {selectedGarage.paymentDetails.paymentId}</Typography>
                    )}
                  </Paper>
                </Grid>
              )}
              <Grid item xs={12}>
                <Paper elevation={1} sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>System Information</Typography>
                  <Typography><strong>Created:</strong> {formatDate(selectedGarage.createdAt)}</Typography>
                  <Typography><strong>Updated:</strong> {formatDate(selectedGarage.updatedAt)}</Typography>
                  <Typography><strong>ID:</strong> {selectedGarage._id}</Typography>
                </Paper>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AllGarages;