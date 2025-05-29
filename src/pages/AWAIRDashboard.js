// App.jsx - Main component
import React, { useState, useEffect } from "react";
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
  CardContent,
} from "@mui/material";
import {
  Check as CheckIcon,
  Close as CloseIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Download as DownloadIcon,
  Send as SendIcon,
} from "@mui/icons-material";

// Create theme with blue primary color
const theme = createTheme({
  palette: {
    primary: {
      main: "#3498db",
    },
    secondary: {
      main: "#2ecc71",
    },
    error: {
      main: "#e74c3c",
    },
    warning: {
      main: "#f1c40f",
    },
    background: {
      default: "#f5f5f5",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});

const AWAIRDashboard = () => {
  
    const [garages, setGarages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

 useEffect(() => {
    const fetchPendingGarages = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(
          'https://garage-management-zi5z.onrender.com/api/admin/garages/pending',
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setGarages(data.garages || []); // Extract the `garages` array from the response
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPendingGarages();
  }, []);

const handleApprove = async (garageId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `https://garage-management-zi5z.onrender.com /api/admin/garages/approve/${garageId}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status: "approved"
          })
        }
      );
      if (!response.ok) throw new Error('Failed to approve');
      // Refresh the list after approval
      setGarages(garages.filter(garage => garage.id !== garageId));
    } catch (err) {
      console.error('Approval error:', err);
    }
  };

  const handleReject = async (garageId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `https://garage-management-zi5z.onrender.com /api/admin/garages/${garageId}/reject`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error('Failed to reject');
      // Refresh the list after rejection
      setGarages(garages.filter(garage => garage.id !== garageId));
    } catch (err) {
      console.error('Rejection error:', err);
    }
  };

  const handleSendAlert = (garageId) => {
    console.log(`Alert sent for garage ${garageId}`);
  };



  // Monthly data for chart
  const monthlyData = [
    25, 20, 15, 10, 5, 0, 7.5, 12.5, 17.5, 11.25, 16.25, 21.25,
  ];
  const [plans, setPlans] = useState([
    { name: "Basic Plan", month: "3 Month", price: 1000 },
    { name: "Premium Plan", month: "6 Month", price: 5000 },
    { name: "Golden Plan", month: "1 Year", price: 7000 },
  ]);

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [insuranceTypes, setInsuranceTypes] = useState([
    "Full Insurance",
    "Third Party",
    "Comprehensive",
    "Liability Only",
  ]);

  const [selectedInsuranceType, setSelectedInsuranceType] = useState("");
  const [newInsuranceType, setNewInsuranceType] = useState("");

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

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
            color: "primary.dark",
            borderBottom: "2px solid",
            borderColor: "primary.main",
            pb: 1,
            mb: 4,
          }}
        >
          AWAIR LEADERSHIP
        </Typography>

        {/* Gauge Request Management */}
        <Typography
          variant="h6"
          component="h2"
          sx={{ mt: 4, mb: 2, color: "text.primary" }}
        >
          Garage Request Management
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
                       {garages.length === 0 ? (
                         <TableRow>
                           <TableCell colSpan={6} align="center">
                             No pending garages found.
                           </TableCell>
                         </TableRow>
                       ) : (
                         garages.map((garage) => (
                           <TableRow key={garage.id}>
                             <TableCell>{garage.name}</TableCell>
                             <TableCell>{garage.type || 'Basic'}</TableCell>
                             <TableCell sx={{ color: 'secondary.main' }}>
                               {garage.status || 'Pending'}
                             </TableCell>
                             <TableCell>
                               {new Date(garage.createdAt).toLocaleDateString()}
                             </TableCell>
                             <TableCell sx={{ color: 'secondary.main' }}>
                               {garage.isAccessible ? 'Accessible' : 'Not Accessible'}
                             </TableCell>
                             <TableCell align="center">
                               <Button
                                 variant="contained"
                                 color="success"
                                 size="small"
                                 sx={{ marginRight: 1 }}
                                 onClick={() => handleApprove(garage._id)}
                               >
                                 Approve
                               </Button>
                               <Button
                                 variant="contained"
                                 color="error"
                                 size="small"
                                 sx={{ marginRight: 1 }}
                                 onClick={() => handleReject(garage._id)}
                               >
                                 Reject
                               </Button>
                               <Button
                                 variant="contained"
                                 color="secondary"
                                 size="small"
                                 onClick={() => handleSendAlert(garage.id)}
                               >
                                 Send Alert
                               </Button>
                             </TableCell>
                           </TableRow>
                         ))
                       )}
                     </TableBody>
          </Table>
        </TableContainer>
        {/* Insurance Type Management */}
        {/* Insurance Type Management */}
        <Typography
          variant="h6"
          component="h2"
          align="center"
          sx={{
            mt: 6,
            mb: 2,
            color: "primary.main",
            borderBottom: "2px solid",
            borderColor: "primary.main",
            pb: 1,
            fontWeight: 600,
            mx: "auto",
            width: "fit-content",
          }}
        >
          Insurance Type Management
        </Typography>

        <Paper
          elevation={4}
          sx={{
            p: 3,
            mb: 4,
            maxWidth: 550,
            borderRadius: 3,
            background: "#ffffff",
            mx: "auto",
          }}
        >
          <Stack spacing={2}>
            {/* Select Existing */}
            <FormControl fullWidth size="small">
              <InputLabel id="insurance-type-label">
                Select Insurance Type
              </InputLabel>
              <Select
                labelId="insurance-type-label"
                value={selectedInsuranceType}
                label="Select Insurance Type"
                onChange={(e) => setSelectedInsuranceType(e.target.value)}
                sx={{ borderRadius: 2 }}
              >
                {insuranceTypes.map((type, index) => (
                  <MenuItem key={index} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Add New Insurance Type */}
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                label="New Insurance Type"
                value={newInsuranceType}
                onChange={(e) => setNewInsuranceType(e.target.value)}
                fullWidth
                size="small"
                sx={{ borderRadius: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => {
                  const trimmed = newInsuranceType.trim();
                  if (trimmed && !insuranceTypes.includes(trimmed)) {
                    setInsuranceTypes([...insuranceTypes, trimmed]);
                    setSelectedInsuranceType(trimmed);
                    setNewInsuranceType("");
                  }
                }}
                sx={{ px: 2 }}
              >
                Add
              </Button>
            </Box>

            {/* List with Delete */}
            <Box>
              <Typography
                variant="subtitle2"
                sx={{ mb: 1, color: "text.secondary", fontWeight: 600 }}
              >
                Current Insurance Types:
              </Typography>

              <Stack spacing={1}>
                {insuranceTypes.map((type, index) => (
                  <Paper
                    key={index}
                    elevation={1}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      backgroundColor: "#f9f9f9",
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {type}
                    </Typography>
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => {
                        setInsuranceTypes(
                          insuranceTypes.filter((t) => t !== type)
                        );
                        if (selectedInsuranceType === type)
                          setSelectedInsuranceType("");
                      }}
                      sx={{ borderRadius: 2 }}
                    >
                      Delete
                    </Button>
                  </Paper>
                ))}
              </Stack>
            </Box>
          </Stack>
        </Paper>

        {/* Plan Based Approval */}
        {/* <Typography
          variant="h6"
          component="h2"
          sx={{ mt: 4, mb: 2, color: "text.primary" }}
        >
          Plan Based Approval
        </Typography>
        <TableContainer component={Paper} elevation={2} sx={{ mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Garage Name</TableCell>
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
                  <Button variant="contained" color="secondary" size="small">
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
                  <Button variant="contained" color="secondary" size="small">
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer> */}

        {/* Plan Expiry Tracking */}
        <Typography
          variant="h6"
          component="h2"
          sx={{ mt: 4, mb: 2, color: "text.primary" }}
        >
          Plan Expiry Tracking
        </Typography>
        <TableContainer component={Paper} elevation={2} sx={{ mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Garage Name</TableCell>
                <TableCell>Plan</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Expiry Date</TableCell>
                <TableCell>Feature Access</TableCell>
                <TableCell align="center">Alert</TableCell>
              </TableRow>
            </TableHead>
             <TableBody>
          {garages.map((garage) => (
            <TableRow key={garage.id}>
              <TableCell>{garage.name}</TableCell> {/* Replace with actual field */}
              <TableCell>{garage.type || 'Basic'}</TableCell>
              <TableCell sx={{ color: 'secondary.main' }}>
                {garage.status || 'Active'}
              </TableCell>
              <TableCell>
                {new Date(garage.createdAt).toLocaleDateString()} {/* Format date */}
              </TableCell>
              <TableCell sx={{ color: 'secondary.main' }}>
                {garage.isAccessible ? 'Accessible' : 'Not Accessible'}
              </TableCell>
              <TableCell align="center">
                <Button variant="contained" color="secondary" size="small">
                  Send Alert
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
          </Table>
        </TableContainer>

        {/* Dashboard Overview */}
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Typography
            variant="h6"
            component="h2"
            sx={{ mb: 3, color: "text.primary" }}
          >
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
            <Box
              sx={{ display: "flex", alignItems: "flex-end", height: "320px" }}
            >
              {/* Y-axis labels */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column-reverse",
                  justifyContent: "space-between",
                  pr: 2,
                  height: "300px",
                  color: "text.secondary",
                  fontSize: "0.75rem",
                }}
              >
                <Typography variant="caption">0</Typography>
                <Typography variant="caption">5</Typography>
                <Typography variant="caption">10</Typography>
                <Typography variant="caption">15</Typography>
                <Typography variant="caption">20</Typography>
                <Typography variant="caption">25</Typography>
              </Box>

              {/* Chart bars */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  flex: 1,
                  height: "300px",
                  position: "relative",
                }}
              >
                {/* Grid lines */}
                <Box
                  sx={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    zIndex: 0,
                  }}
                >
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <Box
                      key={i}
                      sx={{ borderTop: "1px solid", borderColor: "divider" }}
                    />
                  ))}
                </Box>

                {/* Bars */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    height: "100%",
                    zIndex: 1,
                    position: "relative",
                  }}
                >
                  {monthlyData.map((value, index) => (
                    <Box
                      key={index}
                      sx={{
                        width: 30,
                        height: `${(value / 25) * 100}%`,
                        bgcolor: "primary.main",
                        borderRadius: "4px 4px 0 0",
                        mx: 0.5,
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Box>

            {/* X-axis labels */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                pt: 1,
                borderTop: "1px solid",
                borderColor: "divider",
                color: "text.secondary",
                fontSize: "0.75rem",
              }}
            >
              {months.map((month, index) => (
                <Typography
                  key={index}
                  variant="caption"
                  sx={{ width: 30, textAlign: "center" }}
                >
                  {month}
                </Typography>
              ))}
            </Box>
          </Box>
        </Paper>

        {/* Plan Management Table */}
        <Typography
          variant="h6"
          component="h2"
          sx={{ mt: 4, mb: 2, color: "text.primary" }}
        >
          Plan Management
        </Typography>
        <TableContainer component={Paper} elevation={2} sx={{ mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Plan Name</TableCell>
                <TableCell>Month</TableCell>
                <TableCell>Price</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {plans.map((plan, index) => (
                <TableRow key={index}>
                  <TableCell>{plan.name}</TableCell>
                  <TableCell>{plan.month}</TableCell>
                  <TableCell>{plan.price}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      startIcon={<EditIcon />}
                      sx={{ mr: 1 }}
                      onClick={() => {
                        setSelectedPlan(plan); // load plan into form
                        setSelectedPlanIndex(index); // remember which one we’re editing
                        setShowEditForm(true); // show form
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      startIcon={<DeleteIcon />}
                      onClick={() => {
                        const updated = plans.filter((_, i) => i !== index); // remove plan
                        setPlans(updated);
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Add/Edit Plan Section */}
        {showEditForm && (
          <>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{
                color: "primary.dark",
                borderBottom: "2px solid",
                borderColor: "primary.main",
                pb: 1,
                mt: 6,
                mb: 4,
              }}
            >
              Add/Edit Plan
            </Typography>

            <Paper
              elevation={3}
              sx={{
                p: 4,
                maxWidth: 600,
                mx: "auto",
                mb: 4,
                background: "linear-gradient(145deg, #ffffff, #f8f9fa)",
                borderRadius: 2,
              }}
            >
              <Stack spacing={3}>
                <FormControl fullWidth>
                  <TextField
                    label="Plan Name"
                    value={selectedPlan?.name || ""}
                    onChange={(e) =>
                      setSelectedPlan({ ...selectedPlan, name: e.target.value })
                    }
                    variant="outlined"
                  />
                </FormControl>

                <FormControl fullWidth>
                  <TextField
                    label="Duration"
                    value={selectedPlan?.month || ""}
                    onChange={(e) =>
                      setSelectedPlan({
                        ...selectedPlan,
                        month: e.target.value,
                      })
                    }
                    variant="outlined"
                  />
                </FormControl>

                <FormControl fullWidth>
                  <TextField
                    label="Price"
                    type="number"
                    value={selectedPlan?.price || ""}
                    onChange={(e) =>
                      setSelectedPlan({
                        ...selectedPlan,
                        price: e.target.value,
                      })
                    }
                    variant="outlined"
                  />
                </FormControl>

                <Box sx={{ textAlign: "center", mt: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => {
                      if (selectedPlanIndex !== null) {
                        const updatedPlans = [...plans];
                        updatedPlans[selectedPlanIndex] = selectedPlan;
                        setPlans(updatedPlans); // 🔁 update the table
                        setShowEditForm(false); // hide the form
                        setSelectedPlan(null);
                        setSelectedPlanIndex(null);
                      }
                    }}
                  >
                    Save Plan
                  </Button>
                </Box>

                <Box sx={{ textAlign: "center" }}>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      setShowEditForm(false);
                      setSelectedPlan(null);
                      setSelectedPlanIndex(null);
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              </Stack>
            </Paper>
          </>
        )}

   

        <Divider sx={{ my: 3 }} />

        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Typography
            variant="h6"
            component="h3"
            sx={{ mb: 2, color: "text.primary" }}
          >
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

        {/* Notifications & Alerts Section */}
        <Box sx={{ py: 5, mb: 4 }}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              mx: "auto",
              maxWidth: 800,
              background: "linear-gradient(145deg, #f8f9fa, #ffffff)",
              borderRadius: 2,
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              align="center"
              gutterBottom
              sx={{
                color: "primary.dark",
                mb: 4,
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
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #bdc3c7",
                    borderRadius: "4px",
                    marginTop: "8px",
                    fontFamily: "inherit",
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{ textAlign: "right", mt: 0.5, color: "text.secondary" }}
                >
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
              <Box sx={{ textAlign: "center", mt: 2 }}>
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
