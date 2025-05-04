// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import {
//   Card,
//   CardContent,
//   Typography,
//   Alert,
//   Button,
//   Box,
//   CircularProgress,
// } from '@mui/material';
// import { ThemeProvider } from '@mui/material/styles';
// import theme from '../theme';

// const ComplaintDetails = ({ user, officer, onLogout }) => {
//   const [complaint, setComplaint] = useState(null);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(true);
//   const { id } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchComplaint = async () => {
//       try {
//         console.log('Fetching complaint:', id);
//         const response = await axios.get(`http://localhost:5000/api/complaints/${id}`, {
//           withCredentials: true,
//         });
//         console.log('Complaint response:', response.data);
//         setComplaint(response.data);
//         setError('');
//       } catch (error) {
//         console.error('Fetch complaint error:', error.response?.data || error.message);
//         if (error.response?.status === 401) {
//           setError('Not authenticated. Redirecting to login...');
//           setTimeout(() => navigate(user ? '/login' : '/officer/login'), 2000);
//         } else if (error.response?.status === 403) {
//           setError('You are not authorized to view this complaint.');
//         } else if (error.response?.status === 404) {
//           setError('Complaint not found.');
//         } else {
//           setError(error.response?.data?.error || 'An error occurred while fetching the complaint');
//         }
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchComplaint();
//   }, [id, navigate, user, officer]);

//   const handleReopenComplaint = async () => {
//     try {
//       const response = await axios.put(
//         `http://localhost:5000/api/complaints/${id}/reopen`,
//         {},
//         { withCredentials: true }
//       );
//       setComplaint(response.data);
//       setError('');
//       alert('Complaint reopened successfully.');
//     } catch (error) {
//       console.error('Reopen complaint error:', error.response?.data || error.message);
//       setError(error.response?.data?.error || 'An error occurred while reopening the complaint');
//     }
//   };

//   if (loading) {
//     return (
//       <ThemeProvider theme={theme}>
//         <Box sx={{ maxWidth: 600, width: '100%', mx: 'auto', mt: 4 }}>
//           <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
//             <CircularProgress />
//           </Box>
//         </Box>
//       </ThemeProvider>
//     );
//   }

//   if (!complaint) {
//     return (
//       <ThemeProvider theme={theme}>
//         <Box sx={{ maxWidth: 600, width: '100%', mx: 'auto', mt: 4 }}>
//           <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
//             {error || 'Complaint not found'}
//           </Alert>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => navigate(user ? '/dashboard' : '/officer/dashboard')}
//           >
//             Back to Dashboard
//           </Button>
//         </Box>
//       </ThemeProvider>
//     );
//   }

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ maxWidth: 600, width: '100%', mx: 'auto', mt: 4 }}>
//         <Card>
//           <CardContent>
//             <Typography variant="h5" color="primary" gutterBottom>
//               Complaint Details
//             </Typography>
//             {error && (
//               <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
//                 {error}
//               </Alert>
//             )}
//             <Typography variant="h6">{complaint.title}</Typography>
//             <Typography variant="body1" paragraph sx={{ mt: 1 }}>
//               {complaint.description}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Category: <strong>{complaint.category}</strong>
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Status: <strong>{complaint.status}</strong>
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Complainant: <strong>{complaint.complainant?.name || 'Unknown'}</strong>
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Assigned Officer:{' '}
//               <strong>{complaint.assignedOfficer?.name || 'Unassigned'}</strong>
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Submitted:{' '}
//               <strong>{new Date(complaint.createdAt).toLocaleDateString()}</strong>
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Last Updated:{' '}
//               <strong>{new Date(complaint.updatedAt).toLocaleDateString()}</strong>
//             </Typography>
//             {complaint.resolutionRemarks && (
//               <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//                 Resolution Remarks: <strong>{complaint.resolutionRemarks}</strong>
//               </Typography>
//             )}
//             <Box sx={{ mt: 2 }}>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={() => navigate(user ? '/dashboard' : '/officer/dashboard')}
//                 sx={{ mr: 1 }}
//               >
//                 Back to Dashboard
//               </Button>
//               {user && (complaint.status === 'resolved' || complaint.status === 'closed') && (
//                 <Button
//                   variant="contained"
//                   color="warning"
//                   onClick={handleReopenComplaint}
//                   sx={{ mr: 1 }}
//                 >
//                   Reopen Complaint
//                 </Button>
//               )}
//               <Button
//                 variant="contained"
//                 color="secondary"
//                 onClick={onLogout}
//               >
//                 Logout
//               </Button>
//             </Box>
//           </CardContent>
//         </Card>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default ComplaintDetails;
// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import {
//   Card,
//   CardContent,
//   Typography,
//   Alert,
//   Button,
//   Box,
//   CircularProgress,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   TextField,
// } from '@mui/material';
// import { ThemeProvider } from '@mui/material/styles';
// import theme from '../theme';

// const ComplaintDetails = ({ user, officer, onLogout }) => {
//   const [complaint, setComplaint] = useState(null);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [statusUpdate, setStatusUpdate] = useState({ status: '', resolutionRemarks: '' });
//   const { id } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchComplaint = async () => {
//       try {
//         console.log('Fetching complaint:', id);
//         const response = await axios.get(`http://localhost:5000/api/complaints/${id}`, {
//           withCredentials: true,
//         });
//         console.log('Complaint response:', response.data);
//         setComplaint(response.data);
//         setError('');
//       } catch (error) {
//         console.error('Fetch complaint error:', error.response?.data || error.message);
//         if (error.response?.status === 401) {
//           setError('Not authenticated. Redirecting to login...');
//           setTimeout(() => navigate(user ? '/login' : '/officer/login'), 2000);
//         } else if (error.response?.status === 403) {
//           setError('You are not authorized to view this complaint.');
//         } else if (error.response?.status === 404) {
//           setError('Complaint not found.');
//         } else {
//           setError(error.response?.data?.error || 'An error occurred while fetching the complaint');
//         }
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchComplaint();
//   }, [id, navigate, user, officer]);

//   const handleReopenComplaint = async () => {
//     try {
//       const response = await axios.put(
//         `http://localhost:5000/api/complaints/${id}/reopen`,
//         {},
//         { withCredentials: true }
//       );
//       setComplaint(response.data);
//       setError('');
//       alert('Complaint reopened successfully.');
//     } catch (error) {
//       console.error('Reopen complaint error:', error.response?.data || error.message);
//       setError(error.response?.data?.error || 'An error occurred while reopening the complaint');
//     }
//   };

//   const handleStatusUpdate = async (e) => {
//     e.preventDefault();
//     if (!statusUpdate.status) {
//       setError('Please select a status');
//       return;
//     }
//     if (statusUpdate.status === 'resolved' && !statusUpdate.resolutionRemarks.trim()) {
//       setError('Resolution remarks are required for resolved status');
//       return;
//     }
//     try {
//       const response = await axios.put(
//         `http://localhost:5000/api/complaints/${id}/status`,
//         statusUpdate,
//         { withCredentials: true }
//       );
//       setComplaint(response.data);
//       setStatusUpdate({ status: '', resolutionRemarks: '' });
//       setError('');
//       alert('Complaint status updated successfully.');
//     } catch (error) {
//       console.error('Update status error:', error.response?.data || error.message);
//       setError(error.response?.data?.error || 'An error occurred while updating the status');
//     }
//   };

//   if (loading) {
//     return (
//       <ThemeProvider theme={theme}>
//         <Box sx={{ maxWidth: 600, width: '100%', mx: 'auto', mt: 4 }}>
//           <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
//             <CircularProgress />
//           </Box>
//         </Box>
//       </ThemeProvider>
//     );
//   }

//   if (!complaint) {
//     return (
//       <ThemeProvider theme={theme}>
//         <Box sx={{ maxWidth: 600, width: '100%', mx: 'auto', mt: 4 }}>
//           <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
//             {error || 'Complaint not found'}
//           </Alert>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => navigate(user ? '/dashboard' : '/officer/dashboard')}
//           >
//             Back to Dashboard
//           </Button>
//         </Box>
//       </ThemeProvider>
//     );
//   }

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ maxWidth: 600, width: '100%', mx: 'auto', mt: 4 }}>
//         <Card>
//           <CardContent>
//             <Typography variant="h5" color="primary" gutterBottom>
//               Complaint Details
//             </Typography>
//             {error && (
//               <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
//                 {error}
//               </Alert>
//             )}
//             <Typography variant="h6">{complaint.title}</Typography>
//             <Typography variant="body1" paragraph sx={{ mt: 1 }}>
//               {complaint.description}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Category: <strong>{complaint.category}</strong>
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Status: <strong>{complaint.status}</strong>
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Complainant: <strong>{complaint.complainant?.name || 'Unknown'}</strong>
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Assigned Officer:{' '}
//               <strong>{complaint.assignedOfficer?.name || 'Unassigned'}</strong>
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Submitted:{' '}
//               <strong>{new Date(complaint.createdAt).toLocaleDateString()}</strong>
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Last Updated:{' '}
//               <strong>{new Date(complaint.updatedAt).toLocaleDateString()}</strong>
//             </Typography>
//             {complaint.resolutionRemarks && (
//               <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//                 Resolution Remarks: <strong>{complaint.resolutionRemarks}</strong>
//               </Typography>
//             )}
//             {officer && (
//               <Box component="form" onSubmit={handleStatusUpdate} sx={{ mt: 2 }}>
//                 <FormControl fullWidth sx={{ mb: 2 }}>
//                   <InputLabel id="status-label">Update Status</InputLabel>
//                   <Select
//                     labelId="status-label"
//                     id="status"
//                     value={statusUpdate.status}
//                     label="Update Status"
//                     onChange={(e) => setStatusUpdate({ ...statusUpdate, status: e.target.value })}
//                   >
//                     <MenuItem value="">Select Status</MenuItem>
//                     <MenuItem value="in-progress">In Progress</MenuItem>
//                     <MenuItem value="resolved">Resolved</MenuItem>
//                   </Select>
//                 </FormControl>
//                 {statusUpdate.status === 'resolved' && (
//                   <TextField
//                     fullWidth
//                     label="Resolution Remarks"
//                     id="resolutionRemarks"
//                     multiline
//                     rows={3}
//                     value={statusUpdate.resolutionRemarks}
//                     onChange={(e) => setStatusUpdate({ ...statusUpdate, resolutionRemarks: e.target.value })}
//                     margin="normal"
//                     required
//                   />
//                 )}
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   color="primary"
//                   sx={{ mr: 1 }}
//                 >
//                   Update Status
//                 </Button>
//               </Box>
//             )}
//             <Box sx={{ mt: 2 }}>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={() => navigate(user ? '/dashboard' : '/officer/dashboard')}
//                 sx={{ mr: 1 }}
//               >
//                 Back to Dashboard
//               </Button>
//               {user && (complaint.status === 'resolved' || complaint.status === 'closed') && (
//                 <Button
//                   variant="contained"
//                   color="warning"
//                   onClick={handleReopenComplaint}
//                   sx={{ mr: 1 }}
//                 >
//                   Reopen Complaint
//                 </Button>
//               )}
//               <Button
//                 variant="contained"
//                 color="secondary"
//                 onClick={onLogout}
//               >
//                 Logout
//               </Button>
//             </Box>
//           </CardContent>
//         </Card>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default ComplaintDetails;
import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  Alert,
  Button,
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Breadcrumbs,
  Grid,
  Divider,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent, TimelineOppositeContent } from '@mui/lab';
import { keyframes } from '@mui/system';
import theme from '../theme';

// Fade-in animation for card
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const ComplaintDetails = ({ user, officer, onLogout }) => {
  const [complaint, setComplaint] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [statusUpdate, setStatusUpdate] = useState({ status: '', resolutionRemarks: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        console.log('Fetching complaint:', id);
        const response = await axios.get(`http://localhost:5000/api/complaints/${id}`, {
          withCredentials: true,
        });
        console.log('Complaint response:', response.data);
        setComplaint(response.data);
        setError('');
      } catch (error) {
        console.error('Fetch complaint error:', error.response?.data || error.message);
        if (error.response?.status === 401) {
          setError('Not authenticated. Redirecting to login...');
          setTimeout(() => navigate(user ? '/login' : '/officer/login'), 2000);
        } else if (error.response?.status === 403) {
          setError('You are not authorized to view this complaint.');
        } else if (error.response?.status === 404) {
          setError('Complaint not found.');
        } else {
          setError(error.response?.data?.error || 'An error occurred while fetching the complaint');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchComplaint();
  }, [id, navigate, user, officer]);

  const handleReopenComplaint = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/complaints/${id}/reopen`,
        {},
        { withCredentials: true }
      );
      setComplaint(response.data);
      setError('');
      alert('Complaint reopened successfully.');
    } catch (error) {
      console.error('Reopen complaint error:', error.response?.data || error.message);
      setError(error.response?.data?.error || 'An error occurred while reopening the complaint');
    }
  };

  const handleStatusUpdate = async (e) => {
    e.preventDefault();
    if (!statusUpdate.status) {
      setError('Please select a status');
      return;
    }
    if (statusUpdate.status === 'resolved' && !statusUpdate.resolutionRemarks.trim()) {
      setError('Resolution remarks are required for resolved status');
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:5000/api/complaints/${id}/status`,
        statusUpdate,
        { withCredentials: true }
      );
      setComplaint(response.data);
      setStatusUpdate({ status: '', resolutionRemarks: '' });
      setError('');
      alert('Complaint status updated successfully.');
    } catch (error) {
      console.error('Update status error:', error.response?.data || error.message);
      setError(error.response?.data?.error || 'An error occurred while updating the status');
    }
  };

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4, px: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress aria-label="Loading complaint details" />
          </Box>
        </Box>
      </ThemeProvider>
    );
  }

  if (!complaint) {
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4, px: 2 }}>
          <Alert severity="error" sx={{ mb: 3, borderRadius: 8 }}>
            {error || 'Complaint not found'}
          </Alert>
          <Button
            variant="contained"
            sx={{
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
            onClick={() => navigate(user ? '/dashboard' : '/officer/dashboard')}
          >
            Back to Dashboard
          </Button>
        </Box>
      </ThemeProvider>
    );
  }

  // Sort history by changedAt descending (latest first)
  const sortedHistory = complaint.history
    ? [...complaint.history].sort((a, b) => new Date(b.changedAt) - new Date(a.changedAt))
    : [];

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh', py: 4, px: 2 }}>
        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
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
            <Link
              to="/complaints"
              style={{
                textDecoration: 'none',
                color: theme.palette.primary.main,
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              My Complaints
            </Link>
            <Typography color="text.primary">Complaint Details</Typography>
          </Breadcrumbs>

          {/* Complaint Details Card */}
          <Card
            sx={{
              background: 'linear-gradient(135deg, #e3f2fd 0%, #ffffff 100%)',
              borderRadius: '12px',
              boxShadow: 6,
              animation: `${fadeIn} 0.5s ease-out`,
              p: 3,
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 'bold',
                  background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 3,
                }}
                aria-label="Complaint Details"
              >
                Complaint Details
              </Typography>

              {error && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: 8 }}>
                  {error}
                </Alert>
              )}

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
                    {complaint.title}
                  </Typography>
                  <Typography variant="body1" paragraph sx={{ mt: 1, color: 'text.secondary' }}>
                    {complaint.description}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Category:</strong> {complaint.category}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Status:</strong> {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Complainant:</strong> {complaint.complainant?.name || 'Unknown'}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Assigned Officer:</strong> {complaint.assignedOfficer?.name || 'Unassigned'}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Submitted:</strong> {new Date(complaint.createdAt).toLocaleDateString()}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Last Updated:</strong> {new Date(complaint.updatedAt).toLocaleDateString()}
                  </Typography>
                </Grid>
                {complaint.resolutionRemarks && (
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Resolution Remarks:</strong> {complaint.resolutionRemarks}
                    </Typography>
                  </Grid>
                )}
              </Grid>

              <Divider sx={{ my: 3 }} />

              {/* Complaint History Timeline */}
              <Typography variant="h6" sx={{ fontWeight: 'medium', mb: 2 }}>
                Complaint History
              </Typography>
              {sortedHistory.length > 0 ? (
                <Timeline position="alternate">
                  {sortedHistory.map((entry, index) => (
                    <TimelineItem key={index}>
                      <TimelineOppositeContent sx={{ m: 'auto 0' }}>
                        <Typography variant="body2" color="text.secondary">
                          {new Date(entry.changedAt).toLocaleString()}
                        </Typography>
                      </TimelineOppositeContent>
                      <TimelineSeparator>
                        <TimelineDot
                          color={
                            entry.status === 'open' || entry.status === 'reopened'
                              ? 'warning'
                              : entry.status === 'in-progress'
                              ? 'info'
                              : entry.status === 'resolved'
                              ? 'success'
                              : entry.status === 'escalated'
                              ? 'error'
                              : 'default'
                          }
                          sx={{
                            transition: 'transform 0.2s',
                            '&:hover': { transform: 'scale(1.2)' },
                          }}
                        />
                        {index < sortedHistory.length - 1 && <TimelineConnector />}
                      </TimelineSeparator>
                      <TimelineContent>
                        <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                          Status: {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Changed by: {entry.changedBy?.name || 'System'}
                        </Typography>
                      </TimelineContent>
                    </TimelineItem>
                  ))}
                </Timeline>
              ) : (
                <Typography variant="body2" color="text.secondary" align="center">
                  No history available.
                </Typography>
              )}

              <Divider sx={{ my: 3 }} />

              {/* Officer Status Update Form */}
              {officer && (
                <Box component="form" onSubmit={handleStatusUpdate} sx={{ mt: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'medium', mb: 2 }}>
                    Update Complaint Status
                  </Typography>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="status-label">Update Status</InputLabel>
                    <Select
                      variant="filled"
                      labelId="status-label"
                      id="status"
                      value={statusUpdate.status}
                      label="Update Status"
                      onChange={(e) => setStatusUpdate({ ...statusUpdate, status: e.target.value })}
                      sx={{ borderRadius: '8px' }}
                    >
                      <MenuItem value="">Select Status</MenuItem>
                      <MenuItem value="in-progress">In Progress</MenuItem>
                      <MenuItem value="resolved">Resolved</MenuItem>
                    </Select>
                  </FormControl>
                  {statusUpdate.status === 'resolved' && (
                    <TextField
                      fullWidth
                      variant="filled"
                      label="Resolution Remarks"
                      id="resolutionRemarks"
                      multiline
                      rows={3}
                      value={statusUpdate.resolutionRemarks}
                      onChange={(e) => setStatusUpdate({ ...statusUpdate, resolutionRemarks: e.target.value })}
                      margin="normal"
                      required
                      helperText="Provide details on how the complaint was resolved"
                      sx={{ '& .MuiFilledInput-root': { borderRadius: '8px' } }}
                    />
                  )}
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
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
                    Update Status
                  </Button>
                </Box>
              )}

              {/* Action Buttons */}
              <Box sx={{ mt: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  sx={{
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
                  onClick={() => navigate(user ? '/dashboard' : '/officer/dashboard')}
                >
                  Back to Dashboard
                </Button>
                {user && (complaint.status === 'resolved' || complaint.status === 'closed') && (
                  <Button
                    variant="contained"
                    sx={{
                      background: 'linear-gradient(45deg, #ed6c02, #f57c00)',
                      color: 'white',
                      borderRadius: '8px',
                      py: 1.5,
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                        background: 'linear-gradient(45deg, #d45d00, #ed6c02)',
                      },
                    }}
                    onClick={handleReopenComplaint}
                  >
                    Reopen Complaint
                  </Button>
                )}
                <Button
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
                  onClick={onLogout}
                >
                  Logout
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ComplaintDetails;