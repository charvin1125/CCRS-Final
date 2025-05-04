// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import {
//   Card,
//   CardContent,
//   TextField,
//   Button,
//   Typography,
//   Alert,
//   Box,
//   InputAdornment,
// } from '@mui/material';
// import { Email, Lock } from '@mui/icons-material';
// import { ThemeProvider } from '@mui/material/styles';
// import theme from '../theme';

// const OfficerLogin = ({ setOfficer }) => {
//   const [credentials, setCredentials] = useState({ email: '', password: '' });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (!credentials.email || !credentials.password) {
//       setError('Email and password are required');
//       return;
//     }
//     try {
//       console.log('Sending officer login request:', credentials);
//       const response = await axios.post('https://ccrs-final.onrender.com/api/auth/officer/login', credentials, {
//         withCredentials: true,
//       });
//       console.log('Officer login response:', response.data);
//       setOfficer(response.data.officer);
//       setError('');
//       navigate('/officer/dashboard');
//     } catch (error) {
//       console.error('Officer login error:', error.response?.data);
//       setError(error.response?.data?.error || 'An error occurred during login');
//     }
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ maxWidth: 400, width: '100%', mx: 'auto', mt: 8 }}>
//         <Card>
//           <CardContent>
//             <Typography variant="h5" align="center" color="primary" gutterBottom>
//               Officer Login
//             </Typography>
//             {error && (
//               <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
//                 {error}
//               </Alert>
//             )}
//             <form onSubmit={handleLogin}>
//               <TextField
//                 fullWidth
//                 label="Email"
//                 id="email"
//                 type="email"
//                 value={credentials.email}
//                 onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
//                 margin="normal"
//                 required
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <Email />
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//               <TextField
//                 fullWidth
//                 label="Password"
//                 id="password"
//                 type="password"
//                 value={credentials.password}
//                 onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
//                 margin="normal"
//                 required
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <Lock />
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 color="primary"
//                 sx={{ mt: 2 }}
//               >
//                 Login
//               </Button>
//             </form>
//             <Button
//               fullWidth
//               variant="text"
//               color="primary"
//               onClick={() => navigate('/login')}
//               sx={{ mt: 2 }}
//             >
//               Citizen Login
//             </Button>
//           </CardContent>
//         </Card>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default OfficerLogin;
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

const OfficerLogin = ({ setOfficer }) => {
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
      console.log('Sending officer login request:', credentials);
      const response = await axios.post('https://ccrs-final.onrender.com/api/auth/officer/login', credentials, {
        withCredentials: true,
      });
      console.log('Officer login response:', response.data);
      setOfficer(response.data.officer);
      setCredentials({ email: '', password: '' });
      setError('');
      if (response.data.officer.role === 'admin') {
        navigate('/admin/register-officer', { replace: true });
      } else {
        navigate('/officer/dashboard', { replace: true });
      }
    } catch (error) {
      console.error('Officer login error:', error.response?.data || error.message);
      setError(error.response?.data?.error || 'An error occurred during login');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ maxWidth: 400, width: '100%', mx: 'auto', mt: 8 }}>
        <Card>
          <CardContent>
            <Typography variant="h5" align="center" color="primary" gutterBottom>
              Officer Login
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
              Are you a citizen?{' '}
              <Link href="/login" color="secondary">
                Citizen Login
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
};

export default OfficerLogin;