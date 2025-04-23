import React from 'react';
import { 
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  CssBaseline,
  useTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [plan, setPlan] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
    console.log('Sign up submitted');
    // After successful signup, you might navigate to another page
    // navigate('/dashboard');
  };

  const handlePlanChange = (event) => {
    setPlan(event.target.value);
  };

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: theme.palette.background.default,
          p: 2
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: 590,
            p: 4,
            textAlign: 'center',
            borderRadius: 2
          }}
        >
          <Typography 
            variant="h3" 
            component="h1"
            sx={{
              mb: 3,
              fontWeight: 600,
              fontSize: '2.5rem',
              color: '#08197B'
            }}
          >
            Create Account
          </Typography>
          
          <Box 
            component="form" 
            onSubmit={handleSubmit}
            sx={{
              width: '100%'
            }}
          >
            <TextField
              fullWidth
              label="Full Name"
              variant="outlined"
              placeholder="Enter Your Name"
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#F3F3F3',
                  '& fieldset': {
                    border: 'none'
                  }
                }
              }}
            />
            
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              placeholder="Enter Your Email"
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#F3F3F3',
                  '& fieldset': {
                    border: 'none'
                  }
                }
              }}
            />
            
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              placeholder="Enter Your Password"
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#F3F3F3',
                  '& fieldset': {
                    border: 'none'
                  }
                }
              }}
            />

            <Typography 
              variant="h6" 
              component="h2"
              sx={{
                fontWeight: 400,
                mb: 2,
                textAlign: 'left'
              }}
            >
              Choose a Subscription Plan
            </Typography>
            
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Choose a Plan</InputLabel>
              <Select
                value={plan}
                onChange={handlePlanChange}
                sx={{
                  textAlign: 'left',
                  backgroundColor: '#F3F3F3',
                  '& fieldset': {
                    border: 'none'
                  }
                }}
              >
                <MenuItem disabled value="">
                  <em>Choose a Plan</em>
                </MenuItem>
                <MenuItem value="6m">6 Months - 300$</MenuItem>
                <MenuItem value="1y">1 Year - 600$</MenuItem>
              </Select>
            </FormControl>
            
            <Button
              type="submit"
              variant="contained"
              sx={{
                height: 40,
                width: 150,
                fontSize: '1rem',
                mb: 2,
                backgroundColor: '#08197B',
                '&:hover': {
                  backgroundColor: '#364ab8'
                }
              }}
            >
              Sign Up
            </Button>
          </Box>
          
          <Typography variant="body1">
            Already have an account?{' '}
            <Link 
  component="button"
  variant="body1"
  onClick={() => navigate('/login')}
  sx={{
    fontWeight: 600,
    color: 'black',
    textDecoration: 'none',
    '&:hover': {
      color: '#364ab8',
      textDecoration: 'underline'
    }
  }}
>
  Login
</Link>
          </Typography>
        </Paper>
      </Box>
    </>
  );
};

export default SignUpPage;