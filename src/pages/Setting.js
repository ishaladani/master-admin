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
  Grid,
  Divider,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormControlLabel,
  Checkbox,
  Card,
  CardContent,
  useTheme,
  ThemeProvider,
  createTheme,
  Switch,
  IconButton
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Receipt as ReceiptIcon,
  Inventory as InventoryIcon,
  Assessment as AssessmentIcon,
  Settings as SettingsIcon,
  ContentCopy as ContentCopyIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Styled components
const SettingsNavItem = styled(ListItemButton)(({ theme, active }) => ({
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(0.5),
  padding: theme.spacing(1.5, 2),
  backgroundColor: active ? (theme.palette.mode === 'dark' ? 'rgba(66, 165, 245, 0.15)' : '#e3f2fd') : 'transparent',
  color: active ? theme.palette.primary.main : theme.palette.text.primary,
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
  },
}));

const ApiKeyBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontFamily: 'monospace',
}));

// Settings component
const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('general');
  
  // Form states
  const [formData, setFormData] = useState({
    companyName: 'Tech Solutions Inc.',
    email: 'admin@techsolutions.com',
    timeZone: 'UTC-8',
    currency: 'USD',
    taxRate: '8.5',
    autoInvoice: true,
    lateFees: true,
    apiKey: 'sk_live_51ABC...XYZ',
    webhookUrl: 'https://api.techsolutions.com/webhook'
  });

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
    { text: 'Reports', icon: <AssessmentIcon />, active: false, link: '/reports' },
    { text: 'Settings', icon: <SettingsIcon />, active: true, link: '/settings' },
  ];

  const settingsNavItems = [
    { id: 'general', label: 'General' },
    { id: 'company', label: 'Company Profile' },
    { id: 'billing', label: 'Billing' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'security', label: 'Security' },
    { id: 'api', label: 'API Keys' },
    { id: 'integrations', label: 'Integrations' },
  ];

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSaveChanges = () => {
    console.log('Saving settings:', formData);
    // Here you would typically send the data to your backend
  };

  const regenerateApiKey = () => {
    const newApiKey = 'sk_live_' + Math.random().toString(36).substring(2, 15);
    setFormData({
      ...formData,
      apiKey: newApiKey
    });
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
              <Typography variant="h6" component="div">
                Settings
              </Typography>
            </Toolbar>
          </AppBar>

          {/* Settings Content */}
          <Grid container spacing={3}>
            {/* Settings Navigation */}
            <Grid item xs={12} md={3}>
              <Paper elevation={3} sx={{ borderRadius: 2, p: 2 }}>
                <List>
                  {settingsNavItems.map((item) => (
                    <SettingsNavItem
                      key={item.id}
                      active={activeSection === item.id}
                      onClick={() => setActiveSection(item.id)}
                    >
                      <ListItemText primary={item.label} />
                    </SettingsNavItem>
                  ))}
                </List>
              </Paper>
            </Grid>

            {/* Settings Form */}
            <Grid item xs={12} md={9}>
              <Paper elevation={3} sx={{ borderRadius: 2, p: 4 }}>
                {/* General Settings Section */}
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
                    General Settings
                  </Typography>
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Company Name"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        variant="outlined"
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        variant="outlined"
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth margin="normal">
                        <InputLabel>Time Zone</InputLabel>
                        <Select
                          name="timeZone"
                          value={formData.timeZone}
                          onChange={handleInputChange}
                          label="Time Zone"
                        >
                          <MenuItem value="UTC-8">UTC-8 (Pacific Time)</MenuItem>
                          <MenuItem value="UTC-5">UTC-5 (Eastern Time)</MenuItem>
                          <MenuItem value="UTC+0">UTC+0 (GMT)</MenuItem>
                          <MenuItem value="UTC+1">UTC+1 (Central European Time)</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Box>

                <Divider sx={{ my: 4 }} />

                {/* Billing Settings Section */}
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
                    Billing Settings
                  </Typography>
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth margin="normal">
                        <InputLabel>Default Currency</InputLabel>
                        <Select
                          name="currency"
                          value={formData.currency}
                          onChange={handleInputChange}
                          label="Default Currency"
                        >
                          <MenuItem value="USD">USD ($)</MenuItem>
                          <MenuItem value="EUR">EUR (€)</MenuItem>
                          <MenuItem value="GBP">GBP (£)</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Tax Rate (%)"
                        name="taxRate"
                        type="number"
                        value={formData.taxRate}
                        onChange={handleInputChange}
                        variant="outlined"
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox 
                            checked={formData.autoInvoice} 
                            onChange={handleInputChange}
                            name="autoInvoice"
                            color="primary"
                          />
                        }
                        label="Automatically generate invoices"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox 
                            checked={formData.lateFees} 
                            onChange={handleInputChange}
                            name="lateFees"
                            color="primary"
                          />
                        }
                        label="Apply late fees for overdue payments"
                      />
                    </Grid>
                  </Grid>
                </Box>

                <Divider sx={{ my: 4 }} />

                {/* API Configuration Section */}
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
                    API Configuration
                  </Typography>
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        API Key
                      </Typography>
                      <ApiKeyBox>
                        <Typography variant="body2" component="span">
                          {formData.apiKey}
                        </Typography>
                        <Box>
                          <IconButton 
                            size="small" 
                            sx={{ mr: 1 }}
                            onClick={() => navigator.clipboard.writeText(formData.apiKey)}
                          >
                            <ContentCopyIcon fontSize="small" />
                          </IconButton>
                          <Button 
                            variant="contained" 
                            size="small"
                            startIcon={<RefreshIcon />}
                            onClick={regenerateApiKey}
                          >
                            Regenerate
                          </Button>
                        </Box>
                      </ApiKeyBox>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Webhook URL"
                        name="webhookUrl"
                        value={formData.webhookUrl}
                        onChange={handleInputChange}
                        variant="outlined"
                        margin="normal"
                      />
                    </Grid>
                  </Grid>
                </Box>

                {/* Action Buttons */}
                <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
                  <Button 
                    variant="contained" 
                    color="primary"
                    onClick={handleSaveChanges}
                  >
                    Save Changes
                  </Button>
                  <Button 
                    variant="outlined"
                    color="inherit"
                  >
                    Cancel
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Settings;