// import { useState } from 'react';
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
//   Snackbar,
// } from '@mui/material';
// import { Subject, Description, Logout } from '@mui/icons-material';
// import { ThemeProvider } from '@mui/material/styles';
// import theme from '../theme';

// const RegisteredComplaint = ({ user, onLogout }) => {
//   const [complaint, setComplaint] = useState({ title: '', description: '' });
//   const [error, setError] = useState('');
//   const [openSnackbar, setOpenSnackbar] = useState(false);

//   const handleComplaintSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       console.log('Submitting complaint:', complaint);
//       const response = await axios.post('http://localhost:5000/api/complaints', complaint, {
//         withCredentials: true,
//       });
//       console.log('Complaint response:', response.data);
//       setComplaint({ title: '', description: '' });
//       setError('');
//       setOpenSnackbar(true);
//     } catch (error) {
//       console.error('Complaint submission error:', error.response);
//       if (error.response?.status === 404) {
//         setError('Complaint endpoint not found. Please check the server configuration.');
//       } else if (error.response?.status === 401) {
//         setError('Not authenticated. Please log in again.');
//       } else {
//         setError(error.response?.data?.error || 'An error occurred');
//       }
//     }
//   };

//   const handleCloseSnackbar = () => {
//     setOpenSnackbar(false);
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ maxWidth: 500, width: '100%', mx: 'auto', mt: 4 }}>
//         <Card>
//           <CardContent>
//             <Typography variant="h5" align="center" color="primary" gutterBottom>
//               Submit Complaint, {user.name}
//             </Typography>
//             {error && (
//               <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
//                 {error}
//               </Alert>
//             )}
//             <form onSubmit={handleComplaintSubmit}>
//               <TextField
//                 fullWidth
//                 label="Complaint Title"
//                 id="title"
//                 type="text"
//                 value={complaint.title}
//                 onChange={(e) => setComplaint({ ...complaint, title: e.target.value })}
//                 margin="normal"
//                 required
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <Subject />
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//               <TextField
//                 fullWidth
//                 label="Complaint Description"
//                 id="description"
//                 multiline
//                 rows={5}
//                 value={complaint.description}
//                 onChange={(e) => setComplaint({ ...complaint, description: e.target.value })}
//                 margin="normal"
//                 required
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <Description />
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
//                 Submit Complaint
//               </Button>
//             </form>
//             <Button
//               fullWidth
//               variant="contained"
//               color="secondary"
//               startIcon={<Logout />}
//               onClick={onLogout}
//               sx={{ mt: 2 }}
//             >
//               Logout
//             </Button>
//           </CardContent>
//         </Card>
//         <Snackbar
//           open={openSnackbar}
//           autoHideDuration={6000}
//           onClose={handleCloseSnackbar}
//           message="Complaint submitted successfully! A confirmation email has been sent."
//         />
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default RegisteredComplaint;
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
//   Snackbar,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
// } from '@mui/material';
// import { Subject, Description, Logout, Category } from '@mui/icons-material';
// import { ThemeProvider } from '@mui/material/styles';
// import theme from '../theme';

// const categories = ['Water Supply', 'Electricity', 'Roads', 'Sanitation', 'Public Transport'];

// const RegisteredComplaint = ({ user, onLogout }) => {
//   const [complaint, setComplaint] = useState({ title: '', description: '', category: '' });
//   const [error, setError] = useState('');
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const navigate = useNavigate();

//   const handleComplaintSubmit = async (e) => {
//     e.preventDefault();
//     // Basic input validation
//     if (!complaint.title.trim() || !complaint.description.trim() || !complaint.category) {
//       setError('All fields are required');
//       return;
//     }
//     try {
//       console.log('Submitting complaint:', complaint);
//       const response = await axios.post('http://localhost:5000/api/complaints', complaint, {
//         withCredentials: true,
//       });
//       console.log('Complaint response:', response.data);
//       setComplaint({ title: '', description: '', category: '' });
//       setError('');
//       setOpenSnackbar(true);
//       // Navigate to dashboard after a short delay to show snackbar
//       setTimeout(() => navigate('/dashboard'), 2000);
//     } catch (error) {
//       console.error('Complaint submission error:', error.response?.data || error.message);
//       if (error.response?.status === 401) {
//         setError('Not authenticated. Please log in again.');
//         setTimeout(() => navigate('/login'), 2000); // Redirect to login
//       } else if (error.response?.status === 400) {
//         setError(error.response.data.error || 'Invalid complaint data');
//       } else {
//         setError('An error occurred while submitting the complaint');
//       }
//     }
//   };

//   const handleCloseSnackbar = () => {
//     setOpenSnackbar(false);
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ maxWidth: 500, width: '100%', mx: 'auto', mt: 4 }}>
//         <Card>
//           <CardContent>
//             <Typography variant="h5" align="center" color="primary" gutterBottom>
//               Submit Complaint, {user.name}
//             </Typography>
//             {error && (
//               <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
//                 {error}
//               </Alert>
//             )}
//             <form onSubmit={handleComplaintSubmit}>
//               <TextField
//                 fullWidth
//                 label="Complaint Title"
//                 id="title"
//                 type="text"
//                 value={complaint.title}
//                 onChange={(e) => setComplaint({ ...complaint, title: e.target.value })}
//                 margin="normal"
//                 required
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <Subject />
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//               <TextField
//                 fullWidth
//                 label="Complaint Description"
//                 id="description"
//                 multiline
//                 rows={5}
//                 value={complaint.description}
//                 onChange={(e) => setComplaint({ ...complaint, description: e.target.value })}
//                 margin="normal"
//                 required
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <Description />
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//               <FormControl fullWidth margin="normal" required>
//                 <InputLabel id="category-label">Category</InputLabel>
//                 <Select
//                   labelId="category-label"
//                   id="category"
//                   value={complaint.category}
//                   label="Category"
//                   onChange={(e) => setComplaint({ ...complaint, category: e.target.value })}
//                   startAdornment={
//                     <InputAdornment position="start">
//                       <Category />
//                     </InputAdornment>
//                   }
//                 >
//                   {categories.map((cat) => (
//                     <MenuItem key={cat} value={cat}>
//                       {cat}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 color="primary"
//                 sx={{ mt: 2 }}
//               >
//                 Submit Complaint
//               </Button>
//             </form>
//             <Button
//               fullWidth
//               variant="contained"
//               color="secondary"
//               startIcon={<Logout />}
//               onClick={onLogout}
//               sx={{ mt: 2 }}
//             >
//               Logout
//             </Button>
//           </CardContent>
//         </Card>
//         <Snackbar
//           open={openSnackbar}
//           autoHideDuration={6000}
//           onClose={handleCloseSnackbar}
//           message="Complaint submitted successfully! A confirmation email has been sent."
//         />
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default RegisteredComplaint;
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  Snackbar,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Breadcrumbs,
  IconButton,
} from '@mui/material';
import { Subject, Description, Logout, Category, CheckCircle } from '@mui/icons-material';
import { ThemeProvider } from '@mui/material/styles';
import { keyframes } from '@mui/system';
import theme from '../theme';

const categories = ['Water Supply', 'Electricity', 'Roads', 'Sanitation', 'Public Transport'];

// Fade-in animation for card
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const RegisteredComplaint = ({ user, onLogout }) => {
  const [complaint, setComplaint] = useState({ title: '', description: '', category: '' });
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleComplaintSubmit = async (e) => {
    e.preventDefault();
    // Basic input validation
    if (!complaint.title.trim() || !complaint.description.trim() || !complaint.category) {
      setError('All fields are required');
      return;
    }
    try {
      console.log('Submitting complaint:', complaint);
      const response = await axios.post('http://localhost:5000/api/complaints', complaint, {
        withCredentials: true,
      });
      console.log('Complaint response:', response.data);
      setComplaint({ title: '', description: '', category: '' });
      setError('');
      setOpenSnackbar(true);
      // Navigate to dashboard after a short delay to show snackbar
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (error) {
      console.error('Complaint submission error:', error.response?.data || error.message);
      if (error.response?.status === 401) {
        setError('Not authenticated. Please log in again.');
        setTimeout(() => navigate('/login'), 2000); // Redirect to login
      } else if (error.response?.status === 400) {
        setError(error.response.data.error || 'Invalid complaint data');
      } else {
        setError('An error occurred while submitting the complaint');
      }
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh', py: 4, px: 2 }}>
        <Box sx={{ maxWidth: 600, mx: 'auto' }}>
          {/* Breadcrumbs */}
          <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
            <Link
              to="/dashboard"
              style={{
                textDecoration: 'none',
                color: theme.palette.primary.main,
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              Dashboard
            </Link>
            <Typography color="text.primary">Submit Complaint</Typography>
          </Breadcrumbs>

          {/* Form Card */}
          <Card
            sx={{
              background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
              borderRadius: '12px',
              boxShadow: 6,
              animation: `${fadeIn} 0.5s ease-out`,
              p: 3,
            }}
          >
            <CardContent>
              <Typography
                variant="h4"
                align="center"
                sx={{
                  fontWeight: 'bold',
                  background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 4,
                }}
                aria-label="Submit Complaint"
              >
                Submit Complaint, {user.name}
              </Typography>

              {error && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: 8 }}>
                  {error}
                </Alert>
              )}

              <form onSubmit={handleComplaintSubmit}>
                <TextField
                  fullWidth
                  variant="filled"
                  label="Complaint Title"
                  id="title"
                  type="text"
                  value={complaint.title}
                  onChange={(e) => setComplaint({ ...complaint, title: e.target.value })}
                  margin="normal"
                  required
                  helperText="Enter a brief title for your complaint"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Subject sx={{ color: 'primary.main', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.2)' } }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiFilledInput-root': {
                      borderRadius: '8px',
                      transition: 'all 0.3s',
                      '&:hover': { transform: 'scale(1.02)' },
                    },
                  }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  label="Complaint Description"
                  id="description"
                  multiline
                  rows={5}
                  value={complaint.description}
                  onChange={(e) => setComplaint({ ...complaint, description: e.target.value })}
                  margin="normal"
                  required
                  helperText="Describe the issue in detail (max 500 characters)"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Description sx={{ color: 'primary.main', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.2)' } }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiFilledInput-root': {
                      borderRadius: '8px',
                      transition: 'all 0.3s',
                      '&:hover': { transform: 'scale(1.02)' },
                    },
                  }}
                />
                <FormControl fullWidth margin="normal" required>
                  <InputLabel id="category-label">Category</InputLabel>
                  <Select
                    variant="filled"
                    labelId="category-label"
                    id="category"
                    value={complaint.category}
                    label="Category"
                    onChange={(e) => setComplaint({ ...complaint, category: e.target.value })}
                    startAdornment={
                      <InputAdornment position="start">
                        <Category sx={{ color: 'primary.main', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.2)' } }} />
                      </InputAdornment>
                    }
                    sx={{
                      borderRadius: '8px',
                      transition: 'all 0.3s',
                      '&:hover': { transform: 'scale(1.02)' },
                    }}
                  >
                    {categories.map((cat) => (
                      <MenuItem key={cat} value={cat}>
                        {cat}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                    color: 'white',
                    borderRadius: '8px',
                    py: 1.5,
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                      background: 'linear-gradient(45deg, #1565c0, #1976d2)',
                    },
                  }}
                >
                  Submit Complaint
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 2,
                    background: 'linear-gradient(45deg, #d32f2f, #f44336)',
                    color: 'white',
                    borderRadius: '8px',
                    py: 1.5,
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                      background: 'linear-gradient(45deg, #b71c1c, #d32f2f)',
                    },
                  }}
                  startIcon={<Logout />}
                  onClick={onLogout}
                >
                  Logout
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Snackbar for success feedback */}
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity="success"
              icon={<CheckCircle />}
              sx={{ width: '100%', borderRadius: 8, bgcolor: 'success.main', color: 'white' }}
            >
              Complaint submitted successfully! A confirmation email has been sent.
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default RegisteredComplaint;