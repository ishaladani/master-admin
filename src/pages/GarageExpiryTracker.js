// GarageExpiryTracker.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Chip,
  CircularProgress,
  Alert,
  Avatar,
  Divider,
} from '@mui/material';
import {
  CalendarToday as CalendarIcon,
  Mail as MailIcon,
  WarningAmber as WarningIcon,
  CheckCircle as CheckIcon,
  ErrorOutline as ErrorIcon,
  Schedule as ClockIcon,
} from '@mui/icons-material';

const getStatusDetails = (daysUntilExpiry) => {
  if (daysUntilExpiry === null) return { label: 'No Subscription', color: 'default' };
  if (daysUntilExpiry < 0) return { label: 'Expired', color: 'error', icon: <ErrorIcon /> };
  if (daysUntilExpiry <= 7) return { label: 'Critical', color: 'error', icon: <ClockIcon /> };
  if (daysUntilExpiry <= 30) return { label: 'Warning', color: 'warning', icon: <WarningIcon /> };
  return { label: 'Active', color: 'success', icon: <CheckIcon /> };
};

const GarageExpiryTracker = () => {
  const [garages, setGarages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [emailStatuses, setEmailStatuses] = useState({});

  useEffect(() => {
    const fetchGarages = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const res = await axios.get(
          'https://garage-management-zi5z.onrender.com/api/admin/allgarages', 
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setGarages(res.data.garages || []);
      } catch (err) {
        setError('Failed to load garage subscriptions. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchGarages();
  }, []);

  const calculateDaysUntilExpiry = (expiryDate) => {
    if (!expiryDate) return null;
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const sendReminderEmail = async (garageId, email) => {
    setEmailStatuses((prev) => ({ ...prev, [garageId]: 'sending' }));
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post(
        'https://garage-management-zi5z.onrender.com/api/send-expiry-email', 
        {
          to: email,
          subject: 'Subscription Renewal Reminder',
          html: generateEmailTemplate(garageId),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setEmailStatuses((prev) => ({ ...prev, [garageId]: 'sent' }));
        setTimeout(() => setEmailStatuses((prev) => ({ ...prev, [garageId]: null })), 3000);
      } else {
        throw new Error('Failed to send email');
      }
    } catch (err) {
      setEmailStatuses((prev) => ({ ...prev, [garageId]: 'error' }));
      setTimeout(() => setEmailStatuses((prev) => ({ ...prev, [garageId]: null })), 3000);
    }
  };

  const generateEmailTemplate = (garage) => {
    // You can customize this further
    return `
      <h2>Hi ${garage.name},</h2>
      <p>Your subscription is expiring soon. Please renew it to continue services.</p>
    `;
  };

  const filteredGarages = garages.filter((g) => {
    const days = calculateDaysUntilExpiry(g.subscriptionEnd);
    return days !== null && days <= 30;
  });

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Subscription Expiry Tracker
      </Typography>
      <Typography variant="subtitle1" align="center" color="textSecondary" paragraph>
        Monitor and manage garage subscription renewals
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      {loading ? (
        <Box display="flex" justifyContent="center" my={6}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {filteredGarages.length === 0 ? (
            <Box textAlign="center" mt={4}>
              <CalendarIcon fontSize="large" color="disabled" />
              <Typography variant="h6" color="textSecondary" mt={2}>
                No expiring subscriptions found.
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {filteredGarages.map((garage) => {
                const daysLeft = calculateDaysUntilExpiry(garage.subscriptionEnd);
                const status = getStatusDetails(daysLeft);

                return (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={garage._id}>
                    <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <CardContent>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                          <Typography variant="h6" noWrap>{garage.name}</Typography>
                          <Chip
                            icon={status.icon}
                            label={status.label}
                            color={status.color}
                            size="small"
                          />
                        </Box>
                        <Divider sx={{ my: 1 }} />
                        <Typography variant="body2" color="textSecondary">Email: {garage.email}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          Plan: {garage.subscriptionType?.replace('_', ' ') || 'N/A'}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Expires: {new Date(garage.subscriptionEnd).toLocaleDateString()}
                        </Typography>
                        <Typography
                          variant="body2"
                          color={daysLeft < 0 ? 'error' : daysLeft <= 7 ? 'warning.main' : 'inherit'}
                          fontWeight="bold"
                          mt={1}
                        >
                          {daysLeft < 0
                            ? `Expired ${Math.abs(daysLeft)} day(s) ago`
                            : `${daysLeft} day(s) remaining`}
                        </Typography>
                      </CardContent>
                      <CardActions sx={{ mt: 'auto' }}>
                        <Button
                          fullWidth
                          startIcon={<MailIcon />}
                          onClick={() => sendReminderEmail(garage._id, garage.email)}
                          disabled={emailStatuses[garage._id] === 'sending'}
                          variant="contained"
                          color={
                            emailStatuses[garage._id] === 'error'
                              ? 'error'
                              : emailStatuses[garage._id] === 'sent'
                              ? 'success'
                              : 'primary'
                          }
                          sx={{ textTransform: 'none' }}
                        >
                          {emailStatuses[garage._id] === 'sending'
                            ? 'Sending...'
                            : emailStatuses[garage._id] === 'sent'
                            ? 'Sent!'
                            : emailStatuses[garage._id] === 'error'
                            ? 'Failed'
                            : 'Send Reminder'}
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </>
      )}
    </Container>
  );
};

export default GarageExpiryTracker;