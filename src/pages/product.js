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
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
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
  CloudUpload as CloudUploadIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Styled components
const ProductCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8],
  },
}));

const ProductCategory = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(76, 175, 80, 0.2)' : '#e8f5e9',
  color: theme.palette.success.main,
  fontWeight: 500,
  fontSize: '0.75rem',
}));

// Products component
const Products = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [stockFilter, setStockFilter] = useState('all');
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
    { text: 'Invoices', icon: <ReceiptIcon />, active: false, link: '/invoices' },
    { text: 'Products', icon: <InventoryIcon />, active: true, link: '/products' },
    { text: 'Reports', icon: <AssessmentIcon />, active: false, link: '/reports' },
    { text: 'Settings', icon: <SettingsIcon />, active: false, link: '/settings' },
  ];

  // Mock product data
  const products = [
    {
      id: 1,
      name: 'Enterprise Software License',
      description: 'Full-featured enterprise software license with unlimited users and premium support.',
      price: '$999.00',
      category: 'Software',
      stock: 'In Stock: 50'
    },
    {
      id: 2,
      name: 'Cloud Storage Plan',
      description: '1TB cloud storage with advanced security features and 24/7 support.',
      price: '$49.99/mo',
      category: 'Services',
      stock: 'Unlimited'
    },
    {
      id: 3,
      name: 'Premium Support Package',
      description: '24/7 priority support with dedicated account manager and SLA guarantee.',
      price: '$299.00/mo',
      category: 'Services',
      stock: 'Available'
    },
    {
      id: 4,
      name: 'Business Analytics Tool',
      description: 'Advanced analytics and reporting tool for business intelligence.',
      price: '$799.00',
      category: 'Software',
      stock: 'In Stock: 25'
    },
    {
      id: 5,
      name: 'Security Suite',
      description: 'Comprehensive security solution with firewall and antivirus protection.',
      price: '$149.99',
      category: 'Software',
      stock: 'In Stock: 100'
    },
    {
      id: 6,
      name: 'Consulting Services',
      description: 'Professional IT consulting services for business optimization.',
      price: '$150.00/hr',
      category: 'Services',
      stock: 'Available'
    }
  ];

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  const handleCategoryFilterChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleStockFilterChange = (event) => {
    setStockFilter(event.target.value);
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
                Products
              </Typography>
              <Button 
                variant="outlined" 
                startIcon={<CloudUploadIcon />} 
                sx={{ 
                  mr: 2,
                  color: theme.palette.mode === 'dark' ? 'white' : 'inherit',
                  borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.23)'
                }}
              >
                Import
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
                Add Product
              </Button>
            </Toolbar>
          </AppBar>

          {/* Filters */}
          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={categoryFilter}
                onChange={handleCategoryFilterChange}
                label="Category"
              >
                <MenuItem value="all">All Categories</MenuItem>
                <MenuItem value="software">Software</MenuItem>
                <MenuItem value="hardware">Hardware</MenuItem>
                <MenuItem value="services">Services</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                onChange={handleSortChange}
                label="Sort By"
              >
                <MenuItem value="name">Sort by: Name</MenuItem>
                <MenuItem value="price">Sort by: Price</MenuItem>
                <MenuItem value="stock">Sort by: Stock</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Stock</InputLabel>
              <Select
                value={stockFilter}
                onChange={handleStockFilterChange}
                label="Stock"
              >
                <MenuItem value="all">Show: All</MenuItem>
                <MenuItem value="instock">Show: In Stock</MenuItem>
                <MenuItem value="lowstock">Show: Low Stock</MenuItem>
                <MenuItem value="outofstock">Show: Out of Stock</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Products Grid */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <ProductCard elevation={3}>
                  <CardMedia
                    component="div"
                    sx={{ 
                      height: 200, 
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'
                    }}
                  >
                    <Typography variant="h6" color="text.secondary">
                      Product Image
                    </Typography>
                  </CardMedia>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, height: 60, overflow: 'hidden' }}>
                      {product.description}
                    </Typography>
                    <Typography variant="h6" component="div" color="primary" sx={{ fontWeight: 600, mb: 2 }}>
                      {product.price}
                    </Typography>
                    <Divider sx={{ my: 1.5 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                      <ProductCategory label={product.category} size="small" />
                      <Typography variant="body2" color="text.secondary">
                        {product.stock}
                      </Typography>
                    </Box>
                  </CardContent>
                </ProductCard>
              </Grid>
            ))}
          </Grid>

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

export default Products;