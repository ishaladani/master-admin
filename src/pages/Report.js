import React, { useState } from 'react';
import {
  Box,
  CssBaseline,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Paper,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  useTheme,
  ThemeProvider,
  createTheme,
  Switch,
  FormControlLabel
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Receipt as ReceiptIcon,
  Inventory as InventoryIcon,
  Assessment as AssessmentIcon,
  Settings as SettingsIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Styled components
const MetricCard = styled(Card)(({ theme }) => ({
  height: '100%',
  textAlign: 'center',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[6],
  },
}));

const ChartContainer = styled(Box)(({ theme }) => ({
  height: 300,
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StatusChip = styled(Chip)(({ theme, status }) => {
  let color, bgcolor;
  
  switch(status) {
    case 'completed':
      color = theme.palette.success.main;
      bgcolor = theme.palette.mode === 'dark' 
        ? 'rgba(76, 175, 80, 0.2)' 
        : 'rgba(76, 175, 80, 0.1)';
      break;
    case 'failed':
      color = theme.palette.error.main;
      bgcolor = theme.palette.mode === 'dark' 
        ? 'rgba(244, 67, 54, 0.2)' 
        : 'rgba(244, 67, 54, 0.1)';
      break;
    case 'pending':
      color = theme.palette.warning.main;
      bgcolor = theme.palette.mode === 'dark' 
        ? 'rgba(255, 152, 0, 0.2)' 
        : 'rgba(255, 152, 0, 0.1)';
      break;
    default:
      color = theme.palette.text.primary;
      bgcolor = theme.palette.action.hover;
  }
  
  return {
    backgroundColor: bgcolor,
    color: color,
    fontWeight: 500,
    fontSize: '0.75rem',
    padding: '0 10px',
    height: 24
  };
});

// Analytics component
const Report = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [dateRange, setDateRange] = useState('7days');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Create theme
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
          primary: {
            main: '#1a237e',
          },
          secondary: {
            main: '#283593',
          },
          background: {
            default: darkMode ? '#121212' : '#f0f2f5',
            paper: darkMode ? '#1e1e1e' : '#ffffff',
          },
        },
        components: {
          MuiDrawer: {
            styleOverrides: {
              paper: {
                backgroundColor: darkMode ? '#121212' : '#1a237e',
                color: 'white',
              },
            },
          },
        },
      }),
    [darkMode],
  );

  const drawerWidth = 250;
  const navItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, active: false, link: '/' },
    { text: 'Customers', icon: <PeopleIcon />, active: false, link: '/customers' },
    { text: 'Invoices', icon: <ReceiptIcon />, active: false, link: '/invoices' },
    { text: 'Products', icon: <InventoryIcon />, active: false, link: '/products' },
    { text: 'Reports', icon: <AssessmentIcon />, active: true, link: '/reports' },
    { text: 'Settings', icon: <SettingsIcon />, active: false, link: '/settings' },
  ];

  // Mock analytics data
  const metrics = [
    { 
      label: 'Total Revenue', 
      value: '$124,563', 
      trend: '+12.5%', 
      increasing: true 
    },
    { 
      label: 'Average Order Value', 
      value: '$245', 
      trend: '+8.3%', 
      increasing: true 
    },
    { 
      label: 'Conversion Rate', 
      value: '3.2%', 
      trend: '-1.5%', 
      increasing: false 
    },
    { 
      label: 'Active Customers', 
      value: '856', 
      trend: '+5.7%', 
      increasing: true 
    }
  ];

  // Mock transaction data
  const transactions = [
    {
      id: '#TRX-001',
      customer: 'Tech Corp Ltd',
      amount: '$1,200',
      date: '2024-04-11',
      status: 'completed'
    },
    {
      id: '#TRX-002',
      customer: 'Global Solutions',
      amount: '$850',
      date: '2024-04-11',
      status: 'pending'
    },
    {
      id: '#TRX-003',
      customer: 'Digital Systems',
      amount: '$2,400',
      date: '2024-04-10',
      status: 'completed'
    },
    {
      id: '#TRX-004',
      customer: 'Innovation Labs',
      amount: '$1,500',
      date: '2024-04-10',
      status: 'failed'
    }
  ];

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  const handleDateRangeChange = (event) => {
    setDateRange(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        
        {/* Sidebar */}
        {/* <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { 
              width: drawerWidth, 
              boxSizing: 'border-box',
              backgroundColor: darkMode ? '#1e1e1e' : '#1a237e',
              color: 'white'
            },
          }}
        >
          <Box sx={{ p: 2 }}>
            <Typography 
              variant="h5" 
              component="div" 
              sx={{ 
                fontWeight: 'bold', 
                textAlign: 'center', 
                my: 2 
              }}
            >
              BillingSoft
            </Typography>
          </Box>
          
          <List>
            {navItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton 
                  sx={{ 
                    borderRadius: 1,
                    mb: 0.5,
                    backgroundColor: item.active ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.25)',
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: 'white' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Box sx={{ mt: 'auto', mb: 2, px: 2 }}>
            <FormControlLabel
              control={
                <Switch 
                  checked={darkMode} 
                  onChange={handleThemeChange} 
                  color="default"
                />
              }
              label="Dark Mode"
            />
          </Box>
        </Drawer> */}
        
        {/* Main content */}
        <Box
          component="main"
          sx={{ 
            flexGrow: 1, 
            p: 3,
            overflow: 'auto',
            backgroundColor: theme.palette.background.default,
            minHeight: '100vh'
          }}
        >
          {/* Header */}
          <AppBar 
            position="static" 
            color="transparent" 
            elevation={0}
            sx={{ 
              backgroundColor: theme.palette.background.paper,
              borderRadius: 2,
              mb: 3
            }}
          >
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6" component="div">
                Analytics Overview
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
                  <InputLabel>Time Period</InputLabel>
                  <Select
                    value={dateRange}
                    onChange={handleDateRangeChange}
                    label="Time Period"
                  >
                    <MenuItem value="7days">Last 7 Days</MenuItem>
                    <MenuItem value="30days">Last 30 Days</MenuItem>
                    <MenuItem value="90days">Last 90 Days</MenuItem>
                    <MenuItem value="custom">Custom Range</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={categoryFilter}
                    onChange={handleCategoryChange}
                    label="Category"
                  >
                    <MenuItem value="all">All Categories</MenuItem>
                    <MenuItem value="products">Products</MenuItem>
                    <MenuItem value="services">Services</MenuItem>
                    <MenuItem value="subscriptions">Subscriptions</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Toolbar>
          </AppBar>

          {/* Metrics Grid */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            {metrics.map((metric, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <MetricCard elevation={3}>
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {metric.label}
                    </Typography>
                    <Typography variant="h4" sx={{ my: 1, color: 'primary.main', fontWeight: 600 }}>
                      {metric.value}
                    </Typography>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      color: metric.increasing ? 'success.main' : 'error.main' 
                    }}>
                      {metric.increasing ? 
                        <ArrowUpwardIcon fontSize="small" /> : 
                        <ArrowDownwardIcon fontSize="small" />
                      }
                      <Typography variant="body2" component="span" sx={{ ml: 0.5 }}>
                        {metric.trend}
                      </Typography>
                    </Box>
                  </CardContent>
                </MetricCard>
              </Grid>
            ))}
          </Grid>

          {/* Charts Grid */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  mb: 3 
                }}>
                  <Typography variant="h6">Revenue Trends</Typography>
                </Box>
                <ChartContainer>
                  <Typography variant="body2" color="text.secondary">
                    Revenue chart would go here
                  </Typography>
                </ChartContainer>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  mb: 3 
                }}>
                  <Typography variant="h6">Customer Growth</Typography>
                </Box>
                <ChartContainer>
                  <Typography variant="body2" color="text.secondary">
                    Customer growth chart would go here
                  </Typography>
                </ChartContainer>
              </Paper>
            </Grid>
          </Grid>

          {/* Transactions Table */}
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Recent Transactions</Typography>
            <TableContainer>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)' }}>
                    <TableCell>Transaction ID</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id} hover>
                      <TableCell>{transaction.id}</TableCell>
                      <TableCell>{transaction.customer}</TableCell>
                      <TableCell>{transaction.amount}</TableCell>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>
                        <StatusChip
                          status={transaction.status}
                          label={transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Report;