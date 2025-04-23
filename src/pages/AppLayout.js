import React, { useState } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  FormControlLabel,
  Switch,
  CssBaseline,
  ThemeProvider,
  createTheme,
  useMediaQuery
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Receipt as ReceiptIcon,
  Inventory as InventoryIcon,
  Assessment as AssessmentIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

const AppLayout = () => {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();
  
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

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };
  
  // Nav items with proper path mappings
  const navItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Customers', icon: <PeopleIcon />, path: '/customers' },
    { text: 'Invoices', icon: <ReceiptIcon />, path: '/invoices' },
    { text: 'Products', icon: <InventoryIcon />, path: '/products' },
    { text: 'Reports', icon: <AssessmentIcon />, path: '/Report' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/Setting' },
  ];
  const drawerWidth = 250;
  
  // Check if path is active
  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') {
      return true;
    }
    if (path !== '/' && location.pathname.startsWith(path)) {
      return true;
    }
    return false;
  };
  
  // Drawer content
  const drawer = (
    <>
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
              component={Link}
              to={item.path}
              sx={{ 
                borderRadius: 1,
                mb: 0.5,
                backgroundColor: isActive(item.path) ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.25)',
                },
              }}
              onClick={() => isMobile && setMobileOpen(false)}
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
    </>
  );
  
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        
        {/* Mobile drawer */}
        {isMobile ? (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile
            }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': { 
                width: drawerWidth,
                backgroundColor: darkMode ? '#1e1e1e' : '#1a237e',
                color: 'white'
              },
            }}
          >
            {drawer}
          </Drawer>
        ) : (
          /* Desktop drawer */
          <Drawer
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
            open
          >
            {drawer}
          </Drawer>
        )}
        
        {/* Main content */}
        <Box
          component="main"
          sx={{ 
            flexGrow: 1, 
            p: 3,
            overflow: 'auto',
            backgroundColor: theme.palette.background.default,
            minHeight: '100vh',
            width: { xs: '100%', md: `calc(100% - ${drawerWidth}px)` }
          }}
        >
          {/* This is where the page content gets rendered */}
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AppLayout;