import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Avatar,
  Stack,
  Divider,
  Button,
  Chip,
} from '@mui/material';
import {
  TrendingUp,
  Users,
  CreditCard,
  AlertTriangle,
} from 'lucide-react';

const Dashboard = () => {
  const dashboardStats = [
    {
      title: 'Total Garages',
      value: '156',
      trend: '+12%',
      desc: 'vs last month',
      color: '#1976d2',
      icon: Users,
    },
    {
      title: 'Active Subscriptions',
      value: '142',
      trend: '+8%',
      desc: 'vs last month',
      color: '#2e7d32',
      icon: TrendingUp,
    },
    {
      title: 'Monthly Revenue',
      value: '₹2,45,000',
      trend: '+15%',
      desc: 'vs last month',
      color: '#ed6c02',
      icon: CreditCard,
    },
    {
      title: 'Pending Approvals',
      value: '8',
      trend: '-3%',
      desc: 'vs last week',
      color: '#d32f2f',
      icon: AlertTriangle,
    },
  ];

  const recentActivity = [
    { id: 1, garage: 'AutoCare Plus', action: 'Subscription Renewed', time: '2 hours ago', status: 'success' },
    { id: 2, garage: 'Quick Fix Motors', action: 'Payment Received', time: '4 hours ago', status: 'success' },
    { id: 3, garage: 'Elite Auto Service', action: 'Pending Approval', time: '6 hours ago', status: 'warning' },
    { id: 4, garage: 'Pro Mechanics', action: 'Account Created', time: '1 day ago', status: 'info' },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Dashboard Overview
      </Typography>
      
      <Grid container spacing={3}>
        {/* Stats Cards */}
        {dashboardStats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ boxShadow: 3, height: '100%' }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="body2" color="textSecondary">
                      {stat.title}
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">
                      {stat.value}
                    </Typography>
                    <Stack direction="row" spacing={1} mt={1}>
                      <Typography variant="caption" color="success.main">
                        {stat.trend}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {stat.desc}
                      </Typography>
                    </Stack>
                  </Box>
                  <Avatar sx={{ bgcolor: stat.color, width: 50, height: 50 }}>
                    <stat.icon size={24} />
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* Recent Activity */}
        <Grid item xs={12} lg={8}>
          <Card sx={{ p: 2 }}>
            <CardHeader title="Recent Activity" />
            <Divider />
            <Box sx={{ mt: 2 }}>
              {recentActivity.map((activity) => (
                <Box key={activity.id} sx={{ mb: 2, p: 2, border: '1px solid #eee', borderRadius: 2 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography fontWeight="bold">{activity.garage}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {activity.action}
                      </Typography>
                    </Box>
                    <Box textAlign="right">
                      <Typography variant="caption" color="textSecondary">
                        {activity.time}
                      </Typography>
                      <Box mt={0.5}>
                        <Chip
                          label={activity.status}
                          color={activity.status === 'success' ? 'success' : activity.status === 'warning' ? 'warning' : 'info'}
                          size="small"
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ p: 2 }}>
            <CardHeader title="Quick Actions" />
            <Divider />
            <Stack spacing={2} sx={{ mt: 2 }}>
              <Button variant="contained" fullWidth>
                Add New Garage
              </Button>
              <Button variant="outlined" fullWidth>
                Generate Report
              </Button>
              <Button variant="outlined" fullWidth>
                Send Notifications
              </Button>
              <Button variant="outlined" fullWidth>
                View Analytics
              </Button>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
