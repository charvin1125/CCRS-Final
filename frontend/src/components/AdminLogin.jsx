import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  Box,
  InputAdornment,
  Link,
} from '@mui/material';
import { Email, Lock } from '@mui/icons-material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';

const AdminLogin = ({ setAdmin }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!credentials.email.trim() || !credentials.password.trim()) {
      setError('Email and password are required');
      return;
    }
    try {
      console.log('Sending admin login request:', credentials);
      const response = await axios.post('https://ccrs-final.onrender.com/api/auth/admin/login', credentials, {
        withCredentials: true,
      });
      console.log('Admin login response:', response.data);
      setAdmin(response.data.admin);
      setCredentials({ email: '', password: '' });
      setError('');
      navigate('/admin/dashboard', { replace: true });
    } catch (error) {
      console.error('Admin login error:', error.response?.data || error.message);
      setError(error.response?.data?.error || 'An error occurred during login');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh', py: 8, px: 2 }}>
        <Box sx={{ maxWidth: 400, width: '100%', mx: 'auto' }}>
          <Card sx={{ borderRadius: '12px', boxShadow: 4 }}>
            <CardContent>
              <Typography
                variant="h5"
                align="center"
                sx={{
                  fontWeight: 'bold',
                  background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 3,
                }}
                aria-label="Admin Login"
              >
                Admin Login
              </Typography>
              {error && (
                <Alert severity="error" sx={{ mb: 2, borderRadius: 8 }}>
                  {error}
                </Alert>
              )}
              <form onSubmit={handleLogin}>
                <TextField
                  fullWidth
                  label="Email"
                  id="email"
                  type="email"
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  margin="normal"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                  aria-label="Admin email"
                />
                <TextField
                  fullWidth
                  label="Password"
                  id="password"
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  margin="normal"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    ),
                  }}
                  aria-label="Admin password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                    color: 'white',
                    borderRadius: '8px',
                    py: 1.5,
                    mt: 2,
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                      background: 'linear-gradient(45deg, #1565c0, #1976d2)',
                    },
                  }}
                  aria-label="Login"
                >
                  Login
                </Button>
              </form>
              <Typography align="center" sx={{ mt: 2 }}>
                Are you a citizen?{' '}
                <Link href="/login" color="secondary" aria-label="Citizen Login">
                  Citizen Login
                </Link>
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AdminLogin;