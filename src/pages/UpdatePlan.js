import React, { useState } from 'react';
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
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';

// Custom Rupee Icon SVG
const RupeeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9.5,12c1.4,0,2.5-1.1,2.5-2.5V7h3.5v1.5c0,1.9-1.6,3.5-3.5,3.5h-1.5l2.3,4.1H9.5L7.2,12H9.5z M5,3h14v2H5V3z M5,7h14v2H5V7z M5,11h10v2H5V11z" />
  </svg>
);

const SubscriptionPlansAdmin = () => {
  const [plans, setPlans] = useState([
    {
      id: 'free',
      name: 'Free Plan',
      price: '₹0',
      period: 'Forever',
      popular: false,
      description: 'Perfect for getting started',
      features: [
        { text: '5 Projects', included: true },
        { text: '1GB Storage', included: true },
        { text: 'Basic Support', included: true },
        { text: 'Community Access', included: true },
        { text: 'Advanced Analytics', included: false },
        { text: 'Priority Support', included: false },
        { text: 'Custom Integrations', included: false }
      ],
      buttonText: 'Get Started'
    },
    {
      id: '1month',
      name: '1 Month Plan',
      price: '₹999',
      period: 'per month',
      popular: true,
      description: 'Great for individuals and small teams',
      features: [
        { text: 'Unlimited Projects', included: true },
        { text: '50GB Storage', included: true },
        { text: 'Priority Support', included: true },
        { text: 'Advanced Analytics', included: true },
        { text: 'Custom Integrations', included: true },
        { text: 'Team Collaboration', included: true },
        { text: 'API Access', included: true }
      ],
      buttonText: 'Start Free Trial'
    },
    {
      id: '3months',
      name: '3 Months Plan',
      price: '₹2499',
      period: 'for 3 months',
      popular: false,
      savings: 'Save ₹500',
      description: 'Best value for committed users',
      features: [
        { text: 'Everything in 1 Month Plan', included: true },
        { text: '200GB Storage', included: true },
        { text: 'Dedicated Account Manager', included: true },
        { text: 'Custom Branding', included: true },
        { text: 'Advanced Security', included: true },
        { text: 'Bulk Operations', included: true },
        { text: 'Premium Templates', included: true }
      ],
      buttonText: 'Choose Plan'
    }
  ]);

  const [editingId, setEditingId] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const generateId = () =>
    Math.random().toString(36).substring(2, 10);

  // Add new empty plan
  const addNewPlan = () => {
    const newPlan = {
      id: generateId(),
      name: 'New Plan',
      price: '₹0',
      period: 'per month',
      popular: false,
      description: '',
      features: [{ text: 'Feature 1', included: true }],
      buttonText: 'Select Plan'
    };
    setPlans([...plans, newPlan]);
    setEditingId(newPlan.id); // Auto-edit new plan
  };

  // Delete plan by ID
  const deletePlan = (id) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      setPlans(plans.filter((p) => p.id !== id));
      if (selectedPlan === id) setSelectedPlan(null);
      if (editingId === id) setEditingId(null);
    }
  };

  // Toggle edit mode
  const toggleEdit = (id) => {
    setEditingId(editingId === id ? null : id);
  };

  // Handle input change
  const handleInputChange = (planId, field, value) => {
    setPlans(
      plans.map((plan) =>
        plan.id === planId ? { ...plan, [field]: value } : plan
      )
    );
  };

  // Handle feature input change
  const handleFeatureChange = (planId, index, field, value) => {
    setPlans(
      plans.map((plan) => {
        if (plan.id === planId) {
          const newFeatures = [...plan.features];
          newFeatures[index] = { ...newFeatures[index], [field]: value };
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
        if (plan.id === planId) {
          return {
            ...plan,
            features: [...plan.features, { text: 'New Feature', included: true }]
          };
        }
        return plan;
      })
    );
  };

  // Save changes
  const savePlan = (plan) => {
    console.log('Saved plan:', plan);
    alert(`Plan "${plan.name}" saved!`);
    setEditingId(null);
  };

  return (
    <Box sx={{ py: 6, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
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
          >
            Add New Plan
          </Button>
        </Box>

        {/* Plans Grid */}
        <Grid container spacing={4} justifyContent="center">
          {plans.map((plan) => (
            <Grid item xs={12} sm={6} md={4} key={plan.id}>
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
                    {editingId === plan.id ? (
                      <>
                        <TextField
                          size="small"
                          value={plan.name}
                          onChange={(e) => handleInputChange(plan.id, 'name', e.target.value)}
                          fullWidth
                          sx={{ mr: 1 }}
                        />
                        <IconButton onClick={() => savePlan(plan)} color="success">
                          <SaveIcon />
                        </IconButton>
                      </>
                    ) : (
                      <>
                        <Typography variant="h6" fontWeight="bold">
                          {plan.name}
                        </Typography>
                        <Box>
                          <IconButton onClick={() => toggleEdit(plan.id)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => deletePlan(plan.id)} color="error">
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </>
                    )}
                  </Box>

                  {/* Description */}
                  {editingId === plan.id ? (
                    <TextField
                      multiline
                      rows={2}
                      value={plan.description}
                      onChange={(e) => handleInputChange(plan.id, 'description', e.target.value)}
                      fullWidth
                      size="small"
                      sx={{ mb: 2 }}
                    />
                  ) : (
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {plan.description}
                    </Typography>
                  )}

                  {/* Price & Period */}
                  {editingId === plan.id ? (
                    <>
                      <TextField
                        label="Price"
                        value={plan.price}
                        onChange={(e) => handleInputChange(plan.id, 'price', e.target.value)}
                        size="small"
                        sx={{ mr: 1, mb: 1 }}
                      />
                      <TextField
                        label="Period"
                        value={plan.period}
                        onChange={(e) => handleInputChange(plan.id, 'period', e.target.value)}
                        size="small"
                        sx={{ mb: 1 }}
                      />
                    </>
                  ) : (
                    <Box textAlign="center" my={2}>
                      <Typography variant="h5" color="primary" fontWeight="bold">
                        {plan.price}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {plan.period}
                      </Typography>
                    </Box>
                  )}

                  {/* Features List */}
                  <Divider sx={{ my: 2 }} />
                  <Box mt={1}>
                    {plan.features.map((feature, index) => (
                      <Box key={index} display="flex" alignItems="center" gap={1} mb={1}>
                        {editingId === plan.id ? (
                          <>
                            <TextField
                              value={feature.text}
                              onChange={(e) =>
                                handleFeatureChange(plan.id, index, 'text', e.target.value)
                              }
                              size="small"
                              sx={{ width: '70%' }}
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={feature.included}
                                  onChange={(e) =>
                                    handleFeatureChange(
                                      plan.id,
                                      index,
                                      'included',
                                      e.target.checked
                                    )
                                  }
                                  size="small"
                                />
                              }
                              label="Included"
                            />
                          </>
                        ) : (
                          <>
                            {feature.included ? (
                              <CheckIcon fontSize="small" color="success" />
                            ) : (
                              <CloseIcon fontSize="small" color="disabled" />
                            )}
                            <Typography variant="body2">{feature.text}</Typography>
                          </>
                        )}
                      </Box>
                    ))}
                    {editingId === plan.id && (
                      <Button size="small" onClick={() => addFeature(plan.id)}>+ Add Feature</Button>
                    )}
                  </Box>

                  {/* Select Plan Button */}
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => setSelectedPlan(plan.id)}
                    sx={{ mt: 2 }}
                  >
                    {plan.buttonText}
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
              Selected Plan: {plans.find((p) => p.id === selectedPlan)?.name}
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default SubscriptionPlansAdmin;