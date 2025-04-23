import React, { useState } from 'react';
import {
  Box,
  CssBaseline,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Paper,
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
  Link,
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

const StatusChip = styled(Chip)(({ theme, status }) => {
  let color, bgcolor;
  
  switch(status) {
    case 'paid':
      color = theme.palette.success.main;
      bgcolor = theme.palette.mode === 'dark' 
        ? 'rgba(76, 175, 80, 0.2)' 
        : 'rgba(76, 175, 80, 0.1)';
      break;
    case 'overdue':
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

// Invoices component
const Invoices = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('30days');
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
    { text: 'Customers', icon: <PeopleIcon />, active: false, link: '/customers' },
    { text: 'Invoices', icon: <ReceiptIcon />, active: true, link: '/invoices' },
    { text: 'Products', icon: <InventoryIcon />, active: false, link: '/products' },
    { text: 'Reports', icon: <AssessmentIcon />, active: false, link: '/reports' },
    { text: 'Settings', icon: <SettingsIcon />, active: false, link: '/settings' },
  ];

  // Mock invoice data
  const invoices = [
    {
      id: 'INV-2024-001',
      customer: 'Tech Corp Ltd',
      amount: '$1,200.00',
      status: 'paid',
      issueDate: '2024-04-01',
      dueDate: '2024-04-15'
    },
    {
      id: 'INV-2024-002',
      customer: 'Digital Solutions',
      amount: '$850.00',
      status: 'pending',
      issueDate: '2024-04-05',
      dueDate: '2024-04-19'
    },
    {
      id: 'INV-2024-003',
      customer: 'Global Systems',
      amount: '$2,400.00',
      status: 'overdue',
      issueDate: '2024-03-15',
      dueDate: '2024-04-01'
    },
    {
      id: 'INV-2024-004',
      customer: 'Innovation Labs',
      amount: '$1,500.00',
      status: 'paid',
      issueDate: '2024-04-02',
      dueDate: '2024-04-16'
    },
    {
      id: 'INV-2024-005',
      customer: 'Smart Tech',
      amount: '$950.00',
      status: 'pending',
      issueDate: '2024-04-08',
      dueDate: '2024-04-22'
    }
  ];

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleDateFilterChange = (event) => {
    setDateFilter(event.target.value);
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
                Invoices
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
                Create Invoice
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
                <MenuItem value="paid">Paid</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="overdue">Overdue</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Date Range</InputLabel>
              <Select
                value={dateFilter}
                onChange={handleDateFilterChange}
                label="Date Range"
              >
                <MenuItem value="30days">Last 30 Days</MenuItem>
                <MenuItem value="90days">Last 90 Days</MenuItem>
                <MenuItem value="12months">Last 12 Months</MenuItem>
                <MenuItem value="custom">Custom Range</MenuItem>
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
                <MenuItem value="amount">Sort by: Amount</MenuItem>
                <MenuItem value="dueDate">Sort by: Due Date</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Invoices Table */}
          <StyledTableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="invoices table">
              <TableHead>
                <TableRow sx={{ backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)' }}>
                  <TableCell>Invoice #</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Issue Date</TableCell>
                  <TableCell>Due Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell>
                      <Link
                        href="#"
                        underline="hover"
                        sx={{ 
                          color: theme.palette.primary.main,
                          fontWeight: 500
                        }}
                      >
                        {invoice.id}
                      </Link>
                    </TableCell>
                    <TableCell>{invoice.customer}</TableCell>
                    <TableCell>{invoice.amount}</TableCell>
                    <TableCell>
                      <StatusChip 
                        status={invoice.status} 
                        label={invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)} 
                      />
                    </TableCell>
                    <TableCell>{invoice.issueDate}</TableCell>
                    <TableCell>{invoice.dueDate}</TableCell>
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

export default Invoices;