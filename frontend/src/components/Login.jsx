// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Login = ({ onLoginSuccess }) => {
//   const [loginData, setLoginData] = useState({ email: '', password: '' });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/api/login', {
//         email: loginData.email,
//         password: loginData.password,
//       }, { withCredentials: true });
//       onLoginSuccess(response.data.user);
//       setLoginData({ email: '', password: '' });
//       setError('');
//       navigate('/dashboard'); // Redirect to dashboard
//     } catch (error) {
//       setError(error.response?.data?.error || 'An error occurred');
//     }
//   };

//   return (
//     <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h2>
//       {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
//       <form onSubmit={handleLogin} className="space-y-4">
//         <div>
//           <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             placeholder="Enter your email"
//             value={loginData.email}
//             onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
//             className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//             Password
//           </label>
//           <input
//             type="password"
//             id="password"
//             placeholder="Enter your password"
//             value={loginData.password}
//             onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
//             className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;
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

const Login = ({ setUser }) => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email: loginData.email,
        password: loginData.password,
      }, { withCredentials: true });
      console.log('Login response:', response.data); // Debug log
      setUser(response.data.user);
      setLoginData({ email: '', password: '' });
      setError('');
      if (response.data.user.role === 'admin') {
        navigate('/admin/register-officer');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message); // Debug log
      setError(error.response?.data?.error || 'An error occurred during login');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
          p: 2,
        }}
      >
        <Card sx={{ maxWidth: 400, width: '100%' }}>
          <CardContent>
            <Typography variant="h5" align="center" color="primary" gutterBottom>
              Citizen Login
            </Typography>
            {error && (
              <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                {error}
              </Alert>
            )}
            <form onSubmit={handleLogin}>
              <TextField
                fullWidth
                label="Email"
                id="email"
                type="email"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                margin="normal"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Password"
                id="password"
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                margin="normal"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Login
              </Button>
            </form>
            <Typography align="center" sx={{ mt: 2 }}>
              Don't have an account?{' '}
              <Link href="/register" color="secondary">
                Register
              </Link>
            </Typography>
            <Typography align="center" sx={{ mt: 1 }}>
              Are you an officer?{' '}
              <Link href="/officer/login" color="secondary">
                Officer Login
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
};

export default Login;