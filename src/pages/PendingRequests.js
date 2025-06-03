import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

const PendingRequests = () => {
  const [loading, setLoading] = useState(true);
  const [garages, setGarages] = useState([]);
  const [selectedGarage, setSelectedGarage] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  const token = localStorage.getItem("authToken") ? `Bearer ${localStorage.getItem("authToken")}` : "";

  useEffect(() => {
    const fetchPendingGarages = async () => {
      try {
        const response = await fetch(
          'https://garage-management-zi5z.onrender.com/api/admin/garages/pending',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: token,
            },
          }
        );
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setGarages(data.garages || []);
      } catch (error) {
        console.error('Error fetching pending garages:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPendingGarages();
  }, [token]);

  const handleApprove = async (garageId) => {
    try {
      const response = await fetch(
        `https://garage-management-zi5z.onrender.com/api/admin/garages/approve/${garageId}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: 'approved' }),
        }
      );
      if (!response.ok) throw new Error('Failed to approve');
      setGarages(garages.filter((g) => g._id !== garageId));
    } catch (err) {
      console.error('Approval error:', err);
    }
  };

  const handleReject = async (garageId) => {
    try {
      const response = await fetch(
        `https://garage-management-zi5z.onrender.com/api/admin/garages/${garageId}/reject`,
        {
          method: 'POST',
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ reason: rejectionReason }),
        }
      );
      if (!response.ok) throw new Error('Failed to reject');
      setGarages(garages.filter((g) => g._id !== garageId));
      setDialogOpen(false);
      setRejectionReason('');
    } catch (err) {
      console.error('Rejection error:', err);
    }
  };

  const openRejectDialog = (garage) => {
    setSelectedGarage(garage);
    setDialogOpen(true);
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" mb={3}>
        <AlertTriangle size={28} color="#ed6c02" />
        <Typography variant="h4" fontWeight="bold" sx={{ ml: 1 }}>
          Pending Requests
        </Typography>
      </Box>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : garages.length === 0 ? (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <CheckCircle size={48} color="#2e7d32" />
            <Typography variant="h6" sx={{ mt: 2, color: 'text.secondary' }}>
              No pending requests at the moment
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {garages.map((garage) => (
            <Grid item xs={12} md={6} lg={4} key={garage._id}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="start" mb={2}>
                    <Typography variant="h6" fontWeight="bold">
                      {garage.name}
                    </Typography>
                    <Chip label="Pending" color="warning" size="small" />
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" mb={1}>
                    <strong>Email:</strong> {garage.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={1}>
                    <strong>Phone:</strong> {garage.phone}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={1}>
                    <strong>Subscription:</strong> {garage.subscriptionType || 'N/A'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={3}>
                    <strong>Submitted:</strong> {garage.createdAt ? new Date(garage.createdAt).toLocaleDateString() : 'N/A'}
                  </Typography>

                  <Box display="flex" gap={1}>
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      startIcon={<CheckCircle size={16} />}
                      onClick={() => handleApprove(garage._id)}
                      sx={{ flex: 1 }}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      startIcon={<XCircle size={16} />}
                      onClick={() => openRejectDialog(garage)}
                      sx={{ flex: 1 }}
                    >
                      Reject
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Rejection Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Reject Garage Request</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Please provide a reason for rejecting this garage request:
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            placeholder="Enter rejection reason..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleReject(selectedGarage?._id)}
            disabled={!rejectionReason.trim()}
          >
            Reject
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PendingRequests;
