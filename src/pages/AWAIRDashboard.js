// App.jsx - Main component
import React from 'react';
import { 
  ThemeProvider, 
  createTheme,
  CssBaseline,
  Container,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextareaAutosize,
  Divider,
  Stack,
  Card,
  CardContent
} from '@mui/material';
import { 
  Check as CheckIcon, 
  Close as CloseIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Download as DownloadIcon,
  Send as SendIcon
} from '@mui/icons-material';

// Create theme with blue primary color
const theme = createTheme({
  palette: {
    primary: {
      main: '#3498db',
    },
    secondary: {
      main: '#2ecc71',
    },
    error: {
      main: '#e74c3c',
    },
    warning: {
      main: '#f1c40f',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

const AWAIRDashboard = () => {
  // Monthly data for chart
  const monthlyData = [25, 20, 15, 10, 5, 0, 7.5, 12.5, 17.5, 11.25, 16.25, 21.25];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        
        {/* AWAIR LEADERSHIP Section */}
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          sx={{ 
            color: 'primary.dark',
            borderBottom: '2px solid',
            borderColor: 'primary.main',
            pb: 1,
            mb: 4 
          }}
        >
          AWAIR LEADERSHIP
        </Typography>

        {/* Gauge Request Management */}
        <Typography variant="h6" component="h2" sx={{ mt: 4, mb: 2, color: 'text.primary' }}>
          Gauge Request Management
        </Typography>
        <TableContainer component={Paper} elevation={2} sx={{ mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Garage Name</TableCell>
                <TableCell>Owner Name</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Sign up Date</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>XYZ</TableCell>
                <TableCell>John</TableCell>
                <TableCell>Rajkot</TableCell>
                <TableCell>6. April 2025</TableCell>
                <TableCell align="center">
                  <Button 
                    variant="contained" 
                    color="primary" 
                    size="small" 
                    sx={{ mr: 1 }}
                  >
                    Approve
                  </Button>
                  <Button 
                    variant="contained" 
                    color="error" 
                    size="small"
                  >
                    Reject
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Plan Based Approval */}
        <Typography variant="h6" component="h2" sx={{ mt: 4, mb: 2, color: 'text.primary' }}>
          Plan Based Approval
        </Typography>
        <TableContainer component={Paper} elevation={2} sx={{ mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Grazier Name</TableCell>
                <TableCell>Plan</TableCell>
                <TableCell>Payment Status</TableCell>
                <TableCell>Plan Expiry</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>XYZ</TableCell>
                <TableCell>Basic</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>6. April 2025</TableCell>
                <TableCell align="center">
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    size="small"
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>XYZ</TableCell>
                <TableCell>Premium</TableCell>
                <TableCell>Expired</TableCell>
                <TableCell>6. April 2025</TableCell>
                <TableCell align="center">
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    size="small"
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Plan Expiry Tracking */}
        <Typography variant="h6" component="h2" sx={{ mt: 4, mb: 2, color: 'text.primary' }}>
          Plan Expiry Tracking
        </Typography>
        <TableContainer component={Paper} elevation={2} sx={{ mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Grazier Name</TableCell>
                <TableCell>Plan</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Expiry Date</TableCell>
                <TableCell>Feature Access</TableCell>
                <TableCell align="center">Alert</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>XYZ</TableCell>
                <TableCell>Basic</TableCell>
                <TableCell sx={{ color: 'warning.main' }}>Expired</TableCell>
                <TableCell>6. April 2025</TableCell>
                <TableCell sx={{ color: 'error.main' }}>Blocked</TableCell>
                <TableCell align="center">
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    size="small"
                  >
                    Send Alert
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>XYZ</TableCell>
                <TableCell>Basic</TableCell>
                <TableCell sx={{ color: 'secondary.main' }}>Active</TableCell>
                <TableCell>6. April 2025</TableCell>
                <TableCell sx={{ color: 'secondary.main' }}>Accessible</TableCell>
                <TableCell align="center">
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    size="small"
                  >
                    Send Alert
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>XYZ</TableCell>
                <TableCell>Premium</TableCell>
                <TableCell sx={{ color: 'warning.main' }}>Expiring Soon</TableCell>
                <TableCell>6. April 2025</TableCell>
                <TableCell sx={{ color: 'secondary.main' }}>Accessible</TableCell>
                <TableCell align="center">
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    size="small"
                  >
                    Send Alert
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Dashboard Overview */}
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" component="h2" sx={{ mb: 3, color: 'text.primary' }}>
            Dashboard Overview
          </Typography>

          <TableContainer component={Paper} variant="outlined" sx={{ mb: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Total Registered Garages</TableCell>
                  <TableCell>Active Garages</TableCell>
                  <TableCell>Inactive Garages</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>120</TableCell>
                  <TableCell>94</TableCell>
                  <TableCell>25</TableCell>
                </TableRow>
              </TableBody>
              <TableHead>
                <TableRow>
                  <TableCell>Premium Plan Users</TableCell>
                  <TableCell>Standard Plan Users</TableCell>
                  <TableCell>Basic Plan Users</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>45</TableCell>
                  <TableCell>90</TableCell>
                  <TableCell>45</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          {/* Chart Section */}
          <Box sx={{ mt: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', height: '320px' }}>
              {/* Y-axis labels */}
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column-reverse', 
                justifyContent: 'space-between',
                pr: 2,
                height: '300px',
                color: 'text.secondary',
                fontSize: '0.75rem'
              }}>
                <Typography variant="caption">0</Typography>
                <Typography variant="caption">5</Typography>
                <Typography variant="caption">10</Typography>
                <Typography variant="caption">15</Typography>
                <Typography variant="caption">20</Typography>
                <Typography variant="caption">25</Typography>
              </Box>
              
              {/* Chart bars */}
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'flex-end',
                flex: 1,
                height: '300px',
                position: 'relative'
              }}>
                {/* Grid lines */}
                <Box sx={{ 
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  zIndex: 0
                }}>
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <Box key={i} sx={{ borderTop: '1px solid', borderColor: 'divider' }} />
                  ))}
                </Box>
                
                {/* Bars */}
                <Box sx={{ 
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  height: '100%',
                  zIndex: 1,
                  position: 'relative'
                }}>
                  {monthlyData.map((value, index) => (
                    <Box
                      key={index}
                      sx={{
                        width: 30,
                        height: `${(value / 25) * 100}%`,
                        bgcolor: 'primary.main',
                        borderRadius: '4px 4px 0 0',
                        mx: 0.5
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Box>
            
            {/* X-axis labels */}
            <Box sx={{ 
              display: 'flex',
              justifyContent: 'space-between',
              pt: 1,
              borderTop: '1px solid',
              borderColor: 'divider',
              color: 'text.secondary',
              fontSize: '0.75rem'
            }}>
              {months.map((month, index) => (
                <Typography key={index} variant="caption" sx={{ width: 30, textAlign: 'center' }}>
                  {month}
                </Typography>
              ))}
            </Box>
          </Box>
        </Paper>

        {/* Plan Management Table */}
        <Typography variant="h6" component="h2" sx={{ mt: 4, mb: 2, color: 'text.primary' }}>
          Plan Management
        </Typography>
        <TableContainer component={Paper} elevation={2} sx={{ mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Plan Name</TableCell>
                <TableCell>Month</TableCell>
                <TableCell>Discount</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Basic Plan</TableCell>
                <TableCell>3 Month</TableCell>
                <TableCell>5%</TableCell>
                <TableCell align="center">
                  <Button 
                    variant="contained" 
                    color="primary" 
                    size="small" 
                    startIcon={<EditIcon />}
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="contained" 
                    color="error" 
                    size="small"
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Premium Plan</TableCell>
                <TableCell>6 Month</TableCell>
                <TableCell>10%</TableCell>
                <TableCell align="center">
                  <Button 
                    variant="contained" 
                    color="primary" 
                    size="small" 
                    startIcon={<EditIcon />}
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="contained" 
                    color="error" 
                    size="small"
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Golden Plan</TableCell>
                <TableCell>1 Year</TableCell>
                <TableCell>12%</TableCell>
                <TableCell align="center">
                  <Button 
                    variant="contained" 
                    color="primary" 
                    size="small" 
                    startIcon={<EditIcon />}
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="contained" 
                    color="error" 
                    size="small"
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Add/Edit Plan Section */}
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          sx={{ 
            color: 'primary.dark',
            borderBottom: '2px solid',
            borderColor: 'primary.main',
            pb: 1,
            mt: 6,
            mb: 4 
          }}
        >
          Add/Edit Plan
        </Typography>

        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            maxWidth: 600, 
            mx: 'auto', 
            mb: 4,
            background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
            borderRadius: 2
          }}
        >
          <Stack spacing={3}>
            <FormControl fullWidth>
              <InputLabel htmlFor="plan-name">Plan Name</InputLabel>
              <TextField
                id="plan-name"
                placeholder="Enter Plan name"
                variant="outlined"
                fullWidth
              />
            </FormControl>

            <FormControl fullWidth>
              <InputLabel htmlFor="duration">Duration</InputLabel>
              <TextField
                id="duration"
                placeholder="Enter Duration"
                variant="outlined"
                fullWidth
              />
            </FormControl>

            <FormControl fullWidth>
              <InputLabel htmlFor="discount">Discount(%)</InputLabel>
              <TextField
                id="discount"
                placeholder="Enter Discount"
                variant="outlined"
                fullWidth
              />
            </FormControl>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Button 
                variant="contained" 
                color="primary" 
                size="large"
              >
                Save Plan
              </Button>
            </Box>
          </Stack>
        </Paper>

        {/* Garage Activity Logs */}
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          sx={{ 
            color: 'primary.dark',
            borderBottom: '2px solid',
            borderColor: 'primary.main',
            pb: 1,
            mt: 6,
            mb: 4 
          }}
        >
          Garage Activity Logs
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <TextField
            placeholder="Search by garage name"
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
            }}
            sx={{ width: 300 }}
          />
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<DownloadIcon />}
          >
            Download Logs
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" component="h3" sx={{ mb: 2, color: 'text.primary' }}>
            Activity History
          </Typography>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell width={120}>Date</TableCell>
                  <TableCell>Garage Name</TableCell>
                  <TableCell>Activity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>2025-04-16</TableCell>
                  <TableCell>Garage Alpha</TableCell>
                  <TableCell>Maintenance check completed</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2025-04-15</TableCell>
                  <TableCell>Garage Beta</TableCell>
                  <TableCell>New user registration</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2025-04-14</TableCell>
                  <TableCell>Garage Gamma</TableCell>
                  <TableCell>Plan upgraded to Premium</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2025-04-13</TableCell>
                  <TableCell>Garage Delta</TableCell>
                  <TableCell>Security system updated</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Support Ticket System */}
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          sx={{ 
            color: 'primary.dark',
            borderBottom: '2px solid',
            borderColor: 'primary.main',
            pb: 1,
            mt: 6,
            mb: 4 
          }}
        >
          Support Ticket System
        </Typography>

        <TableContainer component={Paper} elevation={2} sx={{ mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Garage Name</TableCell>
                <TableCell>Issue</TableCell>
                <TableCell>Assigned To</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>XYZ Gorage</TableCell>
                <TableCell>XYZ</TableCell>
                <TableCell></TableCell>
                <TableCell sx={{ color: 'error.main' }}>Open</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>XYZ Gorage</TableCell>
                <TableCell>XYZ</TableCell>
                <TableCell></TableCell>
                <TableCell sx={{ color: 'warning.main' }}>in progress</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>XYZ Gorage</TableCell>
                <TableCell>XYZ</TableCell>
                <TableCell></TableCell>
                <TableCell sx={{ color: 'secondary.main' }}>Solved</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Notifications & Alerts Section */}
        <Box sx={{ py: 5, mb: 4 }}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              mx: 'auto',
              maxWidth: 800,
              background: 'linear-gradient(145deg, #f8f9fa, #ffffff)',
              borderRadius: 2
            }}
          >
            <Typography 
              variant="h4" 
              component="h1" 
              align="center"
              gutterBottom 
              sx={{ 
                color: 'primary.dark',
                mb: 4
              }}
            >
              Notifications & Alerts
            </Typography>

            <Stack spacing={4}>
              {/* Select Alert Type */}
              <FormControl fullWidth>
                <InputLabel id="alert-type-label">Select Alert Type</InputLabel>
                <Select
                  labelId="alert-type-label"
                  id="alert-type"
                  label="Select Alert Type"
                  defaultValue="plan-expiry"
                >
                  <MenuItem value="plan-expiry">Plan Expiry</MenuItem>
                  <MenuItem disabled>──────────────────</MenuItem>
                </Select>
              </FormControl>

              {/* Alert Message */}
              <FormControl fullWidth>
                <InputLabel htmlFor="alert-message" shrink>
                  Alert Message
                </InputLabel>
                <TextareaAutosize
                  id="alert-message"
                  placeholder="Reminder: Your garage plan will expire in 7 days"
                  minRows={4}
                  style={{ 
                    width: '100%', 
                    padding: '12px', 
                    border: '1px solid #bdc3c7',
                    borderRadius: '4px',
                    marginTop: '8px',
                    fontFamily: 'inherit'
                  }}
                />
                <Typography variant="caption" sx={{ textAlign: 'right', mt: 0.5, color: 'text.secondary' }}>
                  [1659 x 53]
                </Typography>
              </FormControl>

              {/* Send Via */}
              <FormControl fullWidth>
                <InputLabel htmlFor="email-input">Send Via</InputLabel>
                <TextField
                  id="email-input"
                  placeholder="Enter email address"
                  variant="outlined"
                  fullWidth
                  type="email"
                />
              </FormControl>

              {/* Send Alert Button */}
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="large"
                  startIcon={<SendIcon />}
                  sx={{ px: 4, py: 1.5 }}
                >
                  Send Alert
                </Button>
              </Box>
            </Stack>
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default AWAIRDashboard;