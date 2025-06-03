
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
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
  Button,
  Avatar,
} from '@mui/material';
import { FileText, Download, Eye, Edit } from 'lucide-react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/DownloadForOffline';
import EditIcon from '@mui/icons-material/Edit';

const GarageRecords = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for garage records
  const garageRecords = [
    {
      id: 1,
      name: 'AutoCare Plus',
      registrationDate: '2024-01-15',
      licenseNumber: 'LIC001234',
      owner: 'Rajesh Kumar',
      services: ['Oil Change', 'Brake Repair', 'Engine Service'],
      rating: 4.5,
      totalCustomers: 250,
      status: 'Active'
    },
    {
      id: 2,
      name: 'Quick Fix Motors',
      registrationDate: '2024-02-20',
      licenseNumber: 'LIC005678',
      owner: 'Priya Sharma',
      services: ['Tire Service', 'AC Repair', 'Battery Replacement'],
      rating: 4.2,
      totalCustomers: 180,
      status: 'Active'
    },
    {
      id: 3,
      name: 'Elite Auto Service',
      registrationDate: '2024-03-10',
      licenseNumber: 'LIC009876',
      owner: 'Amit Patel',
      services: ['Full Service', 'Body Work', 'Paint Job'],
      rating: 4.8,
      totalCustomers: 320,
      status: 'Suspended'
    }
  ];

  const filteredRecords = garageRecords.filter(record => {
    const matchesFilter = filter === 'all' || record.status.toLowerCase() === filter;
    const matchesSearch = record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.owner.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return 'success';
      case 'suspended': return 'error';
      case 'pending': return 'warning';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" mb={3}>
        <FileText size={28} color="#1976d2" />
        <Typography variant="h4" fontWeight="bold" sx={{ ml: 1 }}>
          Garage Records
        </Typography>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  {garageRecords.length}
                </Avatar>
                <Box>
                  <Typography variant="h6">{garageRecords.length}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Records
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <Avatar sx={{ bgcolor: 'success.main', mr: 2 }}>
                  {garageRecords.filter(g => g.status === 'Active').length}
                </Avatar>
                <Box>
                  <Typography variant="h6">
                    {garageRecords.filter(g => g.status === 'Active').length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Active Garages
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <Avatar sx={{ bgcolor: 'warning.main', mr: 2 }}>
                  {(garageRecords.reduce((sum, g) => sum + g.rating, 0) / garageRecords.length).toFixed(1)}
                </Avatar>
                <Box>
                  <Typography variant="h6">
                    {(garageRecords.reduce((sum, g) => sum + g.rating, 0) / garageRecords.length).toFixed(1)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Average Rating
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <Avatar sx={{ bgcolor: 'info.main', mr: 2 }}>
                  {garageRecords.reduce((sum, g) => sum + g.totalCustomers, 0)}
                </Avatar>
                <Box>
                  <Typography variant="h6">
                    {garageRecords.reduce((sum, g) => sum + g.totalCustomers, 0)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Customers
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters and Search */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                size="small"
                label="Search by name or owner"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                select
                fullWidth
                size="small"
                label="Filter by status"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="suspended">Suspended</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box display="flex" gap={1}>
                <Button variant="contained" size="small">
                  Export All
                </Button>
                <Button variant="outlined" size="small">
                  Generate Report
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Records Table */}
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Garage Name</TableCell>
                <TableCell>Owner</TableCell>
                <TableCell>License Number</TableCell>
                <TableCell>Registration Date</TableCell>
                <TableCell>Services</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Customers</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>
                    <Typography fontWeight="bold">{record.name}</Typography>
                  </TableCell>
                  <TableCell>{record.owner}</TableCell>
                  <TableCell>{record.licenseNumber}</TableCell>
                  <TableCell>
                    {new Date(record.registrationDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Box display="flex" flexWrap="wrap" gap={0.5}>
                      {record.services.slice(0, 2).map((service, index) => (
                        <Chip key={index} label={service} size="small" variant="outlined" />
                      ))}
                      {record.services.length > 2 && (
                        <Chip label={`+${record.services.length - 2}`} size="small" />
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Typography>⭐ {record.rating}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{record.totalCustomers}</TableCell>
                  <TableCell>
                    <Chip
                      label={record.status}
                      color={getStatusColor(record.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton size="small" color="primary">
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton size="small" color="secondary">
                      <EditIcon />
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

export default GarageRecords;