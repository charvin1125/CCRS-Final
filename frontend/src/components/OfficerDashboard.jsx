// import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import {
//   Card,
//   CardContent,
//   Typography,
//   Alert,
//   Button,
//   List,
//   ListItem,
//   ListItemText,
//   Divider,
//   Box,
//   CircularProgress,
// } from '@mui/material';
// import { ThemeProvider } from '@mui/material/styles';
// import theme from '../theme';

// const OfficerDashboard = ({ officer, setOfficer }) => {
//   const [complaints, setComplaints] = useState([]);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchComplaints = async () => {
//       if (!officer) {
//         setError('No officer logged in. Redirecting to login...');
//         setTimeout(() => navigate('/officer/login'), 2000);
//         setLoading(false);
//         return;
//       }
//       try {
//         console.log('Fetching assigned complaints for officer:', officer.email);
//         const response = await axios.get('http://localhost:5000/api/complaints/assigned', {
//           withCredentials: true,
//         });
//         console.log('Assigned complaints response:', response.data);
//         setComplaints(response.data);
//         setError('');
//       } catch (error) {
//         console.error('Fetch assigned complaints error:', error.response?.data || error.message);
//         if (error.response?.status === 401) {
//           setError('Not authenticated. Redirecting to login...');
//           setTimeout(() => {
//             setOfficer(null);
//             navigate('/officer/login');
//           }, 2000);
//         } else {
//           setError(error.response?.data?.error || 'An error occurred while fetching complaints');
//         }
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchComplaints();
//   }, [navigate, setOfficer, officer]);

//   const handleLogout = async () => {
//     try {
//       await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
//       setOfficer(null);
//       navigate('/officer/login');
//     } catch (error) {
//       console.error('Logout error:', error.response?.data || error.message);
//       setError('An error occurred during logout');
//     }
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ maxWidth: 800, width: '100%', mx: 'auto', mt: 4 }}>
//         <Card>
//           <CardContent>
//             <Typography variant="h5" align="center" color="primary" gutterBottom>
//               Assigned Complaints, {officer?.name || 'Officer'}
//             </Typography>
//             <Typography variant="subtitle1" align="center" color="text.secondary" gutterBottom>
//               Department: {officer?.department || 'Unknown'}
//             </Typography>
//             {error && (
//               <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
//                 {error}
//               </Alert>
//             )}
//             {loading ? (
//               <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
//                 <CircularProgress />
//               </Box>
//             ) : complaints.length === 0 ? (
//               <Typography align="center" color="text.secondary">
//                 No complaints assigned to you.
//               </Typography>
//             ) : (
//               <List>
//                 {complaints.map((complaint, index) => (
//                   <Box key={complaint._id}>
//                     <ListItem>
//                       <ListItemText
//                         primary={
//                           <Typography
//                             variant="h6"
//                             color="primary"
//                             component={Link}
//                             to={`/complaint/${complaint._id}`}
//                             sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
//                           >
//                             {complaint.title}
//                           </Typography>
//                         }
//                         secondary={
//                           <>
//                             <Typography variant="body2" color="text.secondary" paragraph>
//                               {complaint.description}
//                             </Typography>
//                             <Typography variant="caption" color="text.secondary">
//                               Category: <strong>{complaint.category}</strong>
//                             </Typography>
//                             <br />
//                             <Typography variant="caption" color="text.secondary">
//                               Status: <strong>{complaint.status}</strong>
//                             </Typography>
//                             <br />
//                             <Typography variant="caption" color="text.secondary">
//                               Complainant: <strong>{complaint.complainant?.name || 'Unknown'}</strong>
//                             </Typography>
//                             <br />
//                             <Typography variant="caption" color="text.secondary">
//                               Submitted: {new Date(complaint.createdAt).toLocaleDateString()}
//                             </Typography>
//                           </>
//                         }
//                       />
//                     </ListItem>
//                     {index < complaints.length - 1 && <Divider />}
//                   </Box>
//                 ))}
//               </List>
//             )}
//             <Button
//               fullWidth
//               variant="contained"
//               color="secondary"
//               onClick={handleLogout}
//               sx={{ mt: 3 }}
//             >
//               Logout
//             </Button>
//           </CardContent>
//         </Card>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default OfficerDashboard;
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  Alert,
  Button,
  Box,
  CircularProgress,
  Grid,
  Chip,
  Divider,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { keyframes } from '@mui/system';
import theme from '../theme';

// Fade-in animation for cards
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const OfficerDashboard = ({ officer, setOfficer }) => {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComplaints = async () => {
      if (!officer) {
        setError('No officer logged in. Redirecting to login...');
        setTimeout(() => navigate('/officer/login'), 2000);
        setLoading(false);
        return;
      }
      try {
        console.log('Fetching assigned complaints for officer:', officer.email);
        const response = await axios.get('http://localhost:5000/api/complaints/assigned', {
          withCredentials: true,
        });
        console.log('Assigned complaints response:', response.data);
        setComplaints(response.data);
        setError('');
      } catch (error) {
        console.error('Fetch assigned complaints error:', error.response?.data || error.message);
        if (error.response?.status === 401) {
          setError('Not authenticated. Redirecting to login...');
          setTimeout(() => {
            setOfficer(null);
            navigate('/officer/login');
          }, 2000);
        } else {
          setError(error.response?.data?.error || 'An error occurred while fetching complaints');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, [navigate, setOfficer, officer]);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
      setOfficer(null);
      navigate('/officer/login');
    } catch (error) {
      console.error('Logout error:', error.response?.data || error.message);
      setError('An error occurred during logout');
    }
  };

  // Calculate KPIs
  const totalComplaints = complaints.length;
  const resolvedComplaints = complaints.filter((c) => c.status === 'resolved').length;
  const inProgressComplaints = complaints.filter((c) => c.status === 'in-progress').length;
  const escalatedComplaints = complaints.filter((c) => c.status === 'escalated').length;

  // KPI data
  const kpiData = [
    {
      label: 'Total Complaints',
      value: totalComplaints,
      gradient: 'linear-gradient(45deg, #1976d2, #42a5f5)',
      hoverGradient: 'linear-gradient(45deg, #1565c0, #1976d2)',
    },
    {
      label: 'Resolved',
      value: resolvedComplaints,
      gradient: 'linear-gradient(45deg, #2e7d32, #4caf50)',
      hoverGradient: 'linear-gradient(45deg, #1b5e20, #2e7d32)',
    },
    {
      label: 'In-Progress',
      value: inProgressComplaints,
      gradient: 'linear-gradient(45deg, #0288d1, #29b6f6)',
      hoverGradient: 'linear-gradient(45deg, #01579b, #0288d1)',
    },
    {
      label: 'Escalated',
      value: escalatedComplaints,
      gradient: 'linear-gradient(45deg, #d32f2f, #f44336)',
      hoverGradient: 'linear-gradient(45deg, #b71c1c, #d32f2f)',
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh', py: 4, px: 2 }}>
        <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
          {/* Header */}
          <Typography
            variant="h4"
            align="center"
            sx={{
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
            }}
            aria-label="Officer Dashboard"
          >
            Officer Dashboard, {officer?.name || 'Officer'}
          </Typography>
          <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 4 }}>
            Department: {officer?.department || 'Unknown'}
          </Typography>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 4, borderRadius: 8, maxWidth: 800, mx: 'auto' }}>
              {error}
            </Alert>
          )}

          {/* Summary Section */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {kpiData.map((kpi, index) => (
              <Grid item xs={12} sm={6} md={3} key={kpi.label}>
                <Card
                  sx={{
                    background: kpi.gradient,
                    borderRadius: '12px',
                    boxShadow: 4,
                    color: 'white',
                    textAlign: 'center',
                    p: 2,
                    animation: `${fadeIn} 0.5s ease-out ${index * 0.1}s both`,
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
                      background: kpi.hoverGradient,
                    },
                  }}
                >
                  <CardContent>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                      {kpi.value}
                    </Typography>
                    <Typography variant="body2">{kpi.label}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Assigned Complaints */}
          <Typography variant="h5" sx={{ fontWeight: 'medium', mb: 3, color: 'primary.main' }}>
            Assigned Complaints
          </Typography>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <CircularProgress aria-label="Loading complaints" />
            </Box>
          ) : complaints.length === 0 ? (
            <Typography align="center" color="text.secondary" sx={{ my: 4 }}>
              No complaints assigned to you.
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {complaints.map((complaint, index) => (
                <Grid item xs={12} key={complaint._id}>
                  <Card
                    sx={{
                      background: 'linear-gradient(135deg, #e3f2fd 0%, #ffffff 100%)',
                      borderRadius: '12px',
                      boxShadow: 4,
                      animation: `${fadeIn} 0.5s ease-out ${index * 0.1}s both`,
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'scale(1.02)',
                        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
                      },
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="h6"
                        color="primary"
                        component={Link}
                        to={`/complaint/${complaint._id}`}
                        sx={{
                          textDecoration: 'none',
                          '&:hover': { textDecoration: 'underline' },
                        }}
                        aria-label={`View complaint: ${complaint.title}`}
                      >
                        {complaint.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        paragraph
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {complaint.description}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                        <Chip
                          label={complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
                          color={
                            complaint.status === 'open' || complaint.status === 'reopened'
                              ? 'warning'
                              : complaint.status === 'in-progress'
                              ? 'info'
                              : complaint.status === 'resolved'
                              ? 'success'
                              : complaint.status === 'escalated'
                              ? 'error'
                              : 'default'
                          }
                          size="small"
                          sx={{ borderRadius: '6px' }}
                          aria-label={`Status: ${complaint.status}`}
                        />
                        <Typography variant="caption" color="text.secondary">
                          Category: <strong>{complaint.category}</strong>
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Complainant: <strong>{complaint.complainant?.name || 'Unknown'}</strong>
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Submitted: {new Date(complaint.createdAt).toLocaleDateString()}
                        </Typography>
                      </Box>
                      <Button
                        variant="contained"
                        sx={{
                          background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                          color: 'white',
                          borderRadius: '8px',
                          transition: 'transform 0.2s, box-shadow 0.2s',
                          '&:hover': {
                            transform: 'scale(1.05)',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                            background: 'linear-gradient(45deg, #1565c0, #1976d2)',
                          },
                        }}
                        component={Link}
                        to={`/complaint/${complaint._id}`}
                        aria-label={`View details for ${complaint.title}`}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {/* Logout Button */}
          <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
            <Button
              fullWidth
              variant="contained"
              sx={{
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
              onClick={handleLogout}
              aria-label="Logout"
            >
              Logout
            </Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default OfficerDashboard;