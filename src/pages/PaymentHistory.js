import React, { useState } from 'react';
import {
  Box,
  Typography,
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
  TextField,
  MenuItem,
  Grid,
  Avatar,
} from '@mui/material';
import { CreditCard } from 'lucide-react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/DownloadForOffline';

const PaymentHistory = () => {
  const [filter, setFilter] = useState('all');

  // Mock data - replace with real API call
  const paymentHistory = [
    {
      id: 1,
      garage: 'AutoCare Plus',
      amount: 5000,
      date: '2024-06-01',
      method: 'UPI',
      status: 'Completed',
      transactionId: 'TXN123456789'
    },
    {
      id: 2,
      garage: 'Quick Fix Motors',
      amount: 3500,
      date: '2024-05-28',
      method: 'Credit Card',
      status: 'Completed',
      transactionId: 'TXN987654321'
    },
    {
      id: 3,
      garage: 'Elite Auto Service',
      amount: 7500,
      date: '2024-05-25',
      method: 'Bank Transfer',
      status: 'Pending',
      transactionId: 'TXN456789123'
    },
    {
      id: 4,
      garage: 'Pro Mechanics',
      amount: 4200,
      date: '2024-05-20',
      method: 'UPI',
      status: 'Failed',
      transactionId: 'TXN789123456'
    },
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'success';
      case 'pending': return 'warning';
      case 'failed': return 'error';
      default: return 'default';
    }
  };

  const filteredPayments = paymentHistory.filter(payment => {
    if (filter === 'all') return true;
    return payment.status.toLowerCase() === filter;
  });

  const totalRevenue = paymentHistory
    .filter(p => p.status === 'Completed')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <Box>
      <Box display="flex" alignItems="center" mb={3}>
        <CreditCard size={28} color="#1976d2" />
        <Typography variant="h4" fontWeight="bold" sx={{ ml: 1 }}>
          Payment History
        </Typography>
      </Box>

      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <Box p={2} display="flex" alignItems="center">
              <Avatar sx={{ bgcolor: 'success.main', mr: 2 }}>
                ₹
              </Avatar>
              <Box>
                <Typography variant="h6">₹{totalRevenue.toLocaleString()}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Revenue
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <Box p={2} display="flex" alignItems="center">
              <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                {paymentHistory.length}
              </Avatar>
              <Box>
                <Typography variant="h6">{paymentHistory.length}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Transactions
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <CardHeader
          title="Payment Transactions"
          action={
            <TextField
              select
              size="small"
              label="Filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              sx={{ minWidth: 120 }}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="failed">Failed</MenuItem>
            </TextField>
          }
        />
        <Divider />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Garage</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Method</TableCell>
                <TableCell>Transaction ID</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.garage}</TableCell>
                  <TableCell>₹{payment.amount.toLocaleString()}</TableCell>
                  <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                  <TableCell>{payment.method}</TableCell>
                  <TableCell>{payment.transactionId}</TableCell>
                  <TableCell>
                    <Chip
                      label={payment.status}
                      color={getStatusColor(payment.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton size="small" color="primary">
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton size="small" color="info">
                      <DownloadIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};

export default PaymentHistory;
