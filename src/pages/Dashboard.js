import React, { useState } from 'react';
import {
  Box,
  CssBaseline,
  Typography,
  TextField,
  Button,
  Container,
  IconButton,
  Card,
  CardContent,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Grid,
  Paper,
  Avatar,
  Divider,
  useTheme,
  ThemeProvider,
  createTheme,
  InputBase,
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
  Search as SearchIcon,
  ArrowUpward as ArrowUpwardIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Create custom themed components
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 20,
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.05)',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.08)',
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '300px',
  [theme.breakpoints.down('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8],
  },
}));

// Dashboard component
const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);

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
    { text: 'Dashboard', icon: <DashboardIcon />, active: true },
    { text: 'Customers', icon: <PeopleIcon />, active: false },
    { text: 'Invoices', icon: <ReceiptIcon />, active: false },
    { text: 'Products', icon: <InventoryIcon />, active: false },
    { text: 'Reports', icon: <AssessmentIcon />, active: false },
    { text: 'Settings', icon: <SettingsIcon />, active: false },
  ];

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        
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
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar alt="John Doe" src="/static/images/avatar/1.jpg" />
                <Typography variant="body1" sx={{ ml: 1 }}>
                  John Doe
                </Typography>
              </Box>
            </Toolbar>
          </AppBar>

          {/* Dashboard stats */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6} md={4}>
              <StyledCard elevation={3}>
                <CardContent>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Total Revenue
                  </Typography>
                  <Typography variant="h4" component="div" color="primary" sx={{ fontWeight: 'bold' }}>
                    $45,678
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <ArrowUpwardIcon color="success" fontSize="small" />
                    <Typography variant="body2" color="success.main" sx={{ ml: 0.5 }}>
                      +12.5% from last month
                    </Typography>
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <StyledCard elevation={3}>
                <CardContent>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Active Customers
                  </Typography>
                  <Typography variant="h4" component="div" color="primary" sx={{ fontWeight: 'bold' }}>
                    1,234
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <ArrowUpwardIcon color="success" fontSize="small" />
                    <Typography variant="body2" color="success.main" sx={{ ml: 0.5 }}>
                      +5.2% from last month
                    </Typography>
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <StyledCard elevation={3}>
                <CardContent>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Pending Invoices
                  </Typography>
                  <Typography variant="h4" component="div" color="primary" sx={{ fontWeight: 'bold' }}>
                    23
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <ArrowUpwardIcon color="success" fontSize="small" sx={{ transform: 'rotate(180deg)' }} />
                    <Typography variant="body2" color="success.main" sx={{ ml: 0.5 }}>
                      -2.1% from last month
                    </Typography>
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
          </Grid>

          {/* Revenue chart */}
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3, 
              mb: 3, 
              borderRadius: 2 
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Revenue Overview</Typography>
              <Box>
                <Button 
                  variant="contained" 
                  size="small" 
                  sx={{ 
                    mr: 1, 
                    bgcolor: theme.palette.primary.main,
                    '&:hover': {
                      bgcolor: theme.palette.primary.dark
                    }
                  }}
                >
                  Daily
                </Button>
                <Button 
                  variant="outlined" 
                  size="small" 
                  sx={{ 
                    mr: 1,
                    color: theme.palette.mode === 'dark' ? 'white' : theme.palette.primary.main,
                    borderColor: theme.palette.mode === 'dark' ? 'white' : theme.palette.primary.main
                  }}
                >
                  Weekly
                </Button>
                <Button 
                  variant="outlined" 
                  size="small"
                  sx={{ 
                    color: theme.palette.mode === 'dark' ? 'white' : theme.palette.primary.main,
                    borderColor: theme.palette.mode === 'dark' ? 'white' : theme.palette.primary.main
                  }}
                >
                  Monthly
                </Button>
              </Box>
            </Box>
            <Box 
              sx={{ 
                height: 300, 
                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Chart would go here
              </Typography>
            </Box>
          </Paper>

          {/* Recent activity */}
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3, 
              borderRadius: 2 
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>Recent Activity</Typography>
            
            <Box sx={{ '& > :not(:last-child)': { mb: 2, pb: 2, borderBottom: 1, borderColor: 'divider' } }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <Avatar 
                  sx={{ 
                    mr: 2, 
                    bgcolor: 'primary.light',
                    color: theme.palette.mode === 'dark' ? 'black' : 'white'
                  }}
                >
                  💰
                </Avatar>
                <Box>
                  <Typography variant="subtitle1">New Invoice Generated</Typography>
                  <Typography variant="body2" color="text.secondary">Invoice #1234 for $1,200</Typography>
                  <Typography variant="caption" color="text.secondary">2 hours ago</Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <Avatar 
                  sx={{ 
                    mr: 2, 
                    bgcolor: 'primary.light',
                    color: theme.palette.mode === 'dark' ? 'black' : 'white'
                  }}
                >
                  👤
                </Avatar>
                <Box>
                  <Typography variant="subtitle1">New Customer Registered</Typography>
                  <Typography variant="body2" color="text.secondary">John Smith from Tech Corp</Typography>
                  <Typography variant="caption" color="text.secondary">5 hours ago</Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <Avatar 
                  sx={{ 
                    mr: 2, 
                    bgcolor: 'primary.light',
                    color: theme.palette.mode === 'dark' ? 'black' : 'white'
                  }}
                >
                  ✅
                </Avatar>
                <Box>
                  <Typography variant="subtitle1">Payment Received</Typography>
                  <Typography variant="body2" color="text.secondary">Payment of $800 for Invoice #1230</Typography>
                  <Typography variant="caption" color="text.secondary">1 day ago</Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;