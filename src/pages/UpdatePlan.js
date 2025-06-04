import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Divider,
  TextField,
  IconButton,
  FormControlLabel,
  Checkbox,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const API_BASE_URL = 'https://garage-management-zi5z.onrender.com/api/admin';

const SubscriptionPlansAdmin = () => {
  const [plans, setPlans] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [planToDelete, setPlanToDelete] = useState(null);

  // Get JWT token from localStorage or your auth context
  const getAuthToken = () => {
    return localStorage.getItem('authToken') || 'your_jwt_token_here';
  };

  // API Headers
  const getHeaders = () => ({
    'Authorization': `Bearer ${getAuthToken()}`,
    'Content-Type': 'application/json',
  });

  // Fetch all plans
  const fetchPlans = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/plan`, {
        headers: getHeaders(),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch plans: ${response.status}`);
      }
      
      const result = await response.json();
      // Handle API response structure with success and data properties
      if (result.success && Array.isArray(result.data)) {
        setPlans(result.data);
      } else {
        // Fallback for direct array response
        setPlans(Array.isArray(result) ? result : []);
      }
    } catch (err) {
      setError(`Error fetching plans: ${err.message}`);
      console.error('Fetch plans error:', err);
      setPlans([]); // Ensure plans is always an array
    } finally {
      setLoading(false);
    }
  };

  // Create new plan
  const createPlan = async (planData) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/plan`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(planData),
      });

      if (!response.ok) {
        throw new Error(`Failed to create plan: ${response.status}`);
      }

      const newPlan = await response.json();
      setPlans([...plans, newPlan]);
      setSuccess('Plan created successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(`Error creating plan: ${err.message}`);
      console.error('Create plan error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Update plan
  const updatePlan = async (planId, planData) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/plan/${planId}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(planData),
      });

      if (!response.ok) {
        throw new Error(`Failed to update plan: ${response.status}`);
      }

      const updatedPlan = await response.json();
      setPlans(plans.map(plan => plan._id === planId ? updatedPlan : plan));
      setSuccess('Plan updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
      setEditingId(null);
    } catch (err) {
      setError(`Error updating plan: ${err.message}`);
      console.error('Update plan error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Delete plan
  const deletePlan = async (planId) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/plan/${planId}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Failed to delete plan: ${response.status}`);
      }

      setPlans(plans.filter(plan => plan._id !== planId));
      setSuccess('Plan deleted successfully!');
      setTimeout(() => setSuccess(''), 3000);
      
      if (selectedPlan === planId) setSelectedPlan(null);
      if (editingId === planId) setEditingId(null);
    } catch (err) {
      setError(`Error deleting plan: ${err.message}`);
      console.error('Delete plan error:', err);
    } finally {
      setLoading(false);
      setDeleteDialogOpen(false);
      setPlanToDelete(null);
    }
  };

  // Load plans on component mount
  useEffect(() => {
    fetchPlans();
  }, []);

  // Add new empty plan
  const addNewPlan = () => {
    const newPlanData = {
      name: 'New Plan',
      price: 'Free',
      amount: 0,
      subscriptionType: 'monthly',
      features: ['Basic feature'],
      popular: false,
      durationInMonths: 1
    };
    createPlan(newPlanData);
    fetchPlans();
    
  };

  // Handle delete confirmation
  const handleDeleteClick = (planId) => {
    setPlanToDelete(planId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (planToDelete) {
      deletePlan(planToDelete);
    }
  };

  // Toggle edit mode
  const toggleEdit = (id) => {
    fetchPlans();
    setEditingId(editingId === id ? null : id);

  };

  // Handle input change
  const handleInputChange = (planId, field, value) => {
    setPlans(
      plans.map((plan) =>
        plan._id === planId ? { ...plan, [field]: value } : plan
      )
    );
  };

  // Handle feature input change
  const handleFeatureChange = (planId, index, value) => {
    setPlans(
      plans.map((plan) => {
        if (plan._id === planId) {
          const newFeatures = [...plan.features];
          newFeatures[index] = value;
          return { ...plan, features: newFeatures };
        }
        return plan;
      })
    );
  };

  // Add new feature
  const addFeature = (planId) => {
    setPlans(
      plans.map((plan) => {
        if (plan._id === planId) {
          return {
            ...plan,
            features: [...plan.features, 'New Feature']
          };
        }
        return plan;
      })
    );
  };

  // Remove feature
  const removeFeature = (planId, index) => {
    setPlans(
      plans.map((plan) => {
        if (plan._id === planId) {
          const newFeatures = plan.features.filter((_, i) => i !== index);
          return { ...plan, features: newFeatures };
        }
        return plan;
      })
    );
    fetchPlans();
  };

  // Save changes
  const savePlan = (plan) => {
    const planData = {
      name: plan.name,
      price: plan.price,
      amount: parseFloat(plan.amount) || 0,
      subscriptionType: plan.subscriptionType || 'monthly',
      features: plan.features,
      popular: plan.popular,
      durationInMonths: parseInt(plan.durationInMonths) || 1
    };
    console.log(plan._id)
    updatePlan(plan._id, planData);
    fetchPlans();
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    fetchPlans(); // Refresh to get original data
  };

  if (loading && plans.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ py: 6, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        {/* Alerts */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>
            {success}
          </Alert>
        )}

        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4" fontWeight="bold">
            Manage Subscription Plans
          </Typography>
          <Button
            startIcon={<AddCircleIcon />}
            variant="contained"
            color="primary"
            onClick={addNewPlan}
            disabled={loading}
          >
            Add New Plan
          </Button>
        </Box>

        {/* Plans Grid */}
        <Grid container spacing={4} justifyContent="center">
          {plans.map((plan) => (
            <Grid item xs={12} sm={6} md={4} key={plan._id}>
              <Card
                elevation={plan.popular ? 10 : 3}
                sx={{
                  borderRadius: 4,
                  position: 'relative',
                  transition: 'transform 0.3s',
                  transform: plan.popular ? 'scale(1.05)' : 'none',
                  '&:hover': { transform: 'translateY(-6px)' },
                }}
              >
                {plan.popular && (
                  <Box sx={{ position: 'absolute', top: -16, left: '50%', transform: 'translateX(-50%)' }}>
                    <Chip icon={<StarIcon />} label="Most Popular" color="primary" />
                  </Box>
                )}

                <CardContent sx={{ p: 3 }}>
                  {/* Edit Mode Toggle */}
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    {editingId === plan._id ? (
                      <>
                        <TextField
                          size="small"
                          value={plan.name}
                          onChange={(e) => handleInputChange(plan._id, 'name', e.target.value)}
                          fullWidth
                          sx={{ mr: 1 }}
                        />
                        <Box>
                          <IconButton 
                            onClick={() => savePlan(plan)} 
                            color="success"
                            disabled={loading}
                          >
                            <SaveIcon />
                          </IconButton>
                          <IconButton onClick={cancelEdit} color="default">
                            <CancelIcon />
                          </IconButton>
                        </Box>
                      </>
                    ) : (
                      <>
                        <Typography variant="h6" fontWeight="bold">
                          {plan.name}
                        </Typography>
                        <Box>
                          <IconButton onClick={() => toggleEdit(plan._id)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton 
                            onClick={() => handleDeleteClick(plan._id)} 
                            color="error"
                            disabled={loading}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </>
                    )}
                  </Box>

                  {/* Price & Period */}
                  {editingId === plan._id ? (
                    <>
                      <TextField
                        label="Price Display"
                        value={plan.price}
                        onChange={(e) => handleInputChange(plan._id, 'price', e.target.value)}
                        size="small"
                        fullWidth
                        sx={{ mb: 1 }}
                      />
                      <TextField
                        label="Amount (Number)"
                        type="number"
                        value={plan.amount || 0}
                        onChange={(e) => handleInputChange(plan._id, 'amount', e.target.value)}
                        size="small"
                        fullWidth
                        sx={{ mb: 1 }}
                      />
                      <TextField
                        label="Subscription Type"
                        value={plan.subscriptionType || 'monthly'}
                        onChange={(e) => handleInputChange(plan._id, 'subscriptionType', e.target.value)}
                        size="small"
                        fullWidth
                        sx={{ mb: 1 }}
                      />
                      <TextField
                        label="Duration (Months)"
                        type="number"
                        value={plan.durationInMonths || 1}
                        onChange={(e) => handleInputChange(plan._id, 'durationInMonths', e.target.value)}
                        size="small"
                        fullWidth
                        sx={{ mb: 1 }}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={plan.popular || false}
                            onChange={(e) => handleInputChange(plan._id, 'popular', e.target.checked)}
                          />
                        }
                        label="Popular Plan"
                      />
                    </>
                  ) : (
                    <Box textAlign="center" my={2}>
                      <Typography variant="h5" color="primary" fontWeight="bold">
                        {plan.price}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {plan.subscriptionType} • {plan.durationInMonths} month(s)
                      </Typography>
                    </Box>
                  )}

                  {/* Features List */}
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle2" gutterBottom>
                    Features:
                  </Typography>
                  <Box mt={1}>
                    {plan.features?.map((feature, index) => (
                      <Box key={index} display="flex" alignItems="center" gap={1} mb={1}>
                        {editingId === plan._id ? (
                          <>
                            <TextField
                              value={feature}
                              onChange={(e) =>
                                handleFeatureChange(plan._id, index, e.target.value)
                              }
                              size="small"
                              sx={{ flexGrow: 1 }}
                            />
                            <IconButton 
                              size="small" 
                              color="error"
                              onClick={() => removeFeature(plan._id, index)}
                            >
                              <CloseIcon />
                            </IconButton>
                          </>
                        ) : (
                          <>
                            <CheckIcon fontSize="small" color="success" />
                            <Typography variant="body2">{feature}</Typography>
                          </>
                        )}
                      </Box>
                    ))}
                    {editingId === plan._id && (
                      <Button 
                        size="small" 
                        onClick={() => addFeature(plan._id)}
                        startIcon={<AddCircleIcon />}
                      >
                        Add Feature
                      </Button>
                    )}
                  </Box>

                  {/* Select Plan Button */}
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => setSelectedPlan(plan._id)}
                    sx={{ mt: 2 }}
                    disabled={editingId === plan._id}
                  >
                    Select Plan
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Selected Plan Feedback */}
        {selectedPlan && (
          <Box
            sx={{
              mt: 4,
              p: 2,
              bgcolor: 'success.light',
              color: 'common.white',
              borderRadius: 2,
              textAlign: 'center',
            }}
          >
            <Typography fontWeight="bold">
              Selected Plan: {plans.find((p) => p._id === selectedPlan)?.name}
            </Typography>
          </Box>
        )}

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete this plan? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button onClick={confirmDelete} color="error" disabled={loading}>
              {loading ? <CircularProgress size={20} /> : 'Delete'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Loading Overlay */}
        {loading && (
          <Box
            position="fixed"
            top={0}
            left={0}
            width="100%"
            height="100%"
            bgcolor="rgba(0,0,0,0.3)"
            display="flex"
            justifyContent="center"
            alignItems="center"
            zIndex={9999}
          >
            <CircularProgress />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default SubscriptionPlansAdmin;