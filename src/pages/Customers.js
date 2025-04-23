import React, { useState } from 'react';
import {
  Box,
  CssBaseline,
  Typography,
  Button,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Paper,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
  Pagination,
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
  Add as AddIcon,
  FileDownload as FileDownloadIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Styled components
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: 8,
  boxShadow: theme.shadows[1],
  marginBottom: theme.spacing(3),
  "& .MuiTableRow-root:hover": {
    backgroundColor: theme.palette.mode === 'dark' 
      ? 'rgba(255, 255, 255, 0.08)' 
      : 'rgba(0, 0, 0, 0.04)',
  }
}));

const CustomerAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.mode === 'dark' ? theme.palette.common.black : theme.palette.primary.contrastText,
  fontWeight: 'bold',
}));

const StatusChip = styled(Chip)(({ theme, status }) => {
  let color, bgcolor;
  
  switch(status) {
    case 'active':
      color = theme.palette.success.main;
      bgcolor = theme.palette.mode === 'dark' 
        ? 'rgba(76, 175, 80, 0.2)' 
        : 'rgba(76, 175, 80, 0.1)';
      break;
    case 'inactive':
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

// Customers component
const Customers = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [planFilter, setPlanFilter] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [page, setPage] = useState(1);

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
    { text: 'Customers', icon: <PeopleIcon />, active: true, link: '/customers' },
    { text: 'Invoices', icon: <ReceiptIcon />, active: false, link: '/invoices' },
    { text: 'Products', icon: <InventoryIcon />, active: false, link: '/products' },
    { text: 'Reports', icon: <AssessmentIcon />, active: false, link: '/reports' },
    { text: 'Settings', icon: <SettingsIcon />, active: false, link: '/settings' },
  ];

  // Mock customer data
  const customers = [
    {
      id: 1,
      name: 'John Smith',
      company: 'Tech Corp Ltd',
      initials: 'JS',
      email: 'john.smith@techcorp.com',
      plan: 'Enterprise',
      status: 'active',
      totalSpent: '$12,450',
      lastOrder: '2024-04-10'
    },
    {
      id: 2,
      name: 'Alice Lee',
      company: 'Digital Solutions',
      initials: 'AL',
      email: 'alice@digitalsolutions.com',
      plan: 'Pro',
      status: 'active',
      totalSpent: '$8,750',
      lastOrder: '2024-04-09'
    },
    {
      id: 3,
      name: 'Robert Johnson',
      company: 'Global Systems',
      initials: 'RJ',
      email: 'robert@globalsystems.com',
      plan: 'Basic',
      status: 'pending',
      totalSpent: '$2,300',
      lastOrder: '2024-04-08'
    },
    {
      id: 4,
      name: 'Maria Kim',
      company: 'Innovation Labs',
      initials: 'MK',
      email: 'maria@innovationlabs.com',
      plan: 'Enterprise',
      status: 'inactive',
      totalSpent: '$15,200',
      lastOrder: '2024-03-15'
    },
    {
      id: 5,
      name: 'David Wilson',
      company: 'Smart Tech',
      initials: 'DW',
      email: 'david@smarttech.com',
      plan: 'Pro',
      status: 'active',
      totalSpent: '$6,800',
      lastOrder: '2024-04-11'
    }
  ];

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handlePlanFilterChange = (event) => {
    setPlanFilter(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
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
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Customers
              </Typography>
              <Button 
                variant="outlined" 
                startIcon={<FileDownloadIcon />} 
                sx={{ 
                  mr: 2,
                  color: theme.palette.mode === 'dark' ? 'white' : 'inherit',
                  borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.23)'
                }}
              >
                Export
              </Button>
              <Button 
                variant="contained" 
                startIcon={<AddIcon />}
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark
                  }
                }}
              >
                Add Customer
              </Button>
            </Toolbar>
          </AppBar>

          {/* Filters */}
          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                onChange={handleStatusFilterChange}
                label="Status"
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Plan</InputLabel>
              <Select
                value={planFilter}
                onChange={handlePlanFilterChange}
                label="Plan"
              >
                <MenuItem value="all">All Plans</MenuItem>
                <MenuItem value="basic">Basic</MenuItem>
                <MenuItem value="pro">Pro</MenuItem>
                <MenuItem value="enterprise">Enterprise</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                onChange={handleSortChange}
                label="Sort By"
              >
                <MenuItem value="latest">Sort by: Latest</MenuItem>
                <MenuItem value="name">Sort by: Name</MenuItem>
                <MenuItem value="revenue">Sort by: Revenue</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Customers Table */}
          <StyledTableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="customers table">
              <TableHead>
                <TableRow sx={{ backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)' }}>
                  <TableCell>Customer</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Plan</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Total Spent</TableCell>
                  <TableCell>Last Order</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <CustomerAvatar>{customer.initials}</CustomerAvatar>
                        <Box>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {customer.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {customer.company}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.plan}</TableCell>
                    <TableCell>
                      <StatusChip 
                        status={customer.status} 
                        label={customer.status.charAt(0).toUpperCase() + customer.status.slice(1)} 
                      />
                    </TableCell>
                    <TableCell>{customer.totalSpent}</TableCell>
                    <TableCell>{customer.lastOrder}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>

          {/* Pagination */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Pagination 
              count={3} 
              page={page} 
              onChange={handlePageChange} 
              color="primary" 
              showFirstButton 
              showLastButton
              size="large"
            />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Customers;