// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import {
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   Chip,
//   Button,
//   Alert,
//   CircularProgress,
//   List,
//   ListItem,
//   ListItemText,
// } from '@mui/material';
// import { ThemeProvider } from '@mui/material/styles';
// import theme from '../theme';

// const TrackComplaint = ({ user, onLogout }) => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [trackingData, setTrackingData] = useState(null);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(true);

//   // Fetch tracking data
//   useEffect(() => {
//     const fetchTracking = async () => {
//       try {
//         console.log('Fetching tracking for complaint:', id);
//         // Attempt to fetch from tracking endpoint
//         let response;
//         try {
//           response = await axios.get(`http://localhost:5000/api/complaints/${id}/track`, {
//             withCredentials: true,
//           });
//         } catch (trackError) {
//           console.warn('Tracking endpoint failed, falling back to complaint details:', trackError);
//           // Fallback to complaint details endpoint
//           response = await axios.get(`http://localhost:5000/api/complaints/${id}`, {
//             withCredentials: true,
//           });
//           // Simulate history if not provided
//           response.data.history = response.data.history || [
//             {
//               status: response.data.status,
//               timestamp: response.data.createdAt,
//               remarks: `Complaint ${response.data.status.toLowerCase()}`,
//             },
//           ];
//         }
//         console.log('Tracking response:', response.data);
//         setTrackingData(response.data);
//         setError('');
//       } catch (error) {
//         console.error('Fetch tracking error:', error.response?.data || error.message);
//         if (error.response?.status === 401) {
//           setError('Not authenticated. Redirecting to login...');
//           setTimeout(() => navigate('/login'), 2000);
//         } else if (error.response?.status === 404) {
//           setError('Complaint not found.');
//         } else {
//           setError(error.response?.data?.error || 'An error occurred while fetching tracking data');
//         }
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTracking();
//   }, [id, navigate]);

//   // Status chip color
//   const getStatusColor = (status) => {
//     switch (status.toLowerCase()) {
//       case 'open':
//         return 'warning';
//       case 'in-progress':
//         return 'info';
//       case 'resolved':
//         return 'success';
//       case 'escalated':
//         return 'error';
//       case 'closed':
//         return 'default';
//       default:
//         return 'default';
//     }
//   };

//   if (loading) {
//     return (
//       <ThemeProvider theme={theme}>
//         <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
//           <CircularProgress aria-label="Loading tracking data" />
//         </Box>
//       </ThemeProvider>
//     );
//   }

//   if (error || !trackingData) {
//     return (
//       <ThemeProvider theme={theme}>
//         <Box sx={{ maxWidth: 800, mx: 'auto', py: 4, px: 2, bgcolor: 'grey.50' }}>
//           <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
//             {error || 'Unable to load tracking data'}
//           </Alert>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => navigate('/complaints')}
//             aria-label="Back to complaints"
//           >
//             Back to Complaints
//           </Button>
//         </Box>
//       </ThemeProvider>
//     );
//   }

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh', py: 4, px: 2 }}>
//         <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
//           <Typography
//             variant="h4"
//             color="primary"
//             gutterBottom
//             sx={{ fontWeight: 'bold', mb: 4 }}
//             aria-label={`Track Complaint ${trackingData.title}`}
//           >
//             Track Complaint #{id}
//           </Typography>

//           <Grid container spacing={3}>
//             {/* Complaint Details */}
//             <Grid item xs={12} md={6}>
//               <Card
//                 sx={{
//                   borderRadius: 3,
//                   boxShadow: 3,
//                   p: 2,
//                 }}
//               >
//                 <CardContent>
//                   <Typography variant="h5" color="primary" gutterBottom>
//                     Complaint Details
//                   </Typography>
//                   <Typography variant="h6" sx={{ mb: 1 }}>
//                     {trackingData.title}
//                   </Typography>
//                   <Chip
//                     label={trackingData.status}
//                     color={getStatusColor(trackingData.status)}
//                     size="small"
//                     sx={{ mb: 2 }}
//                     aria-label={`Status: ${trackingData.status}`}
//                   />
//                   <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
//                     Category: <strong>{trackingData.category}</strong>
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
//                     Submitted: <strong>{new Date(trackingData.createdAt).toLocaleDateString()}</strong>
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
//                     Assigned Officer:{' '}
//                     <strong>{trackingData.assignedOfficer?.name || 'Unassigned'}</strong>
//                   </Typography>
//                   {trackingData.resolutionRemarks && (
//                     <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
//                       Resolution Remarks: <strong>{trackingData.resolutionRemarks}</strong>
//                     </Typography>
//                   )}
//                   <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       component={Link}
//                       to={`/complaint/${id}`}
//                       aria-label="View complaint details"
//                     >
//                       View Details
//                     </Button>
//                     <Button
//                       variant="outlined"
//                       color="primary"
//                       onClick={() => navigate('/complaints')}
//                       aria-label="Back to complaints"
//                     >
//                       Back to Complaints
//                     </Button>
//                     <Button
//                       variant="contained"
//                       color="secondary"
//                       onClick={onLogout}
//                       aria-label="Logout"
//                     >
//                       Logout
//                     </Button>
//                   </Box>
//                 </CardContent>
//               </Card>
//             </Grid>

//             {/* Status History */}
//             <Grid item xs={12} md={6}>
//               <Card
//                 sx={{
//                   borderRadius: 3,
//                   boxShadow: 3,
//                   p: 2,
//                 }}
//               >
//                 <CardContent>
//                   <Typography variant="h5" color="primary" gutterBottom>
//                     Status History
//                   </Typography>
//                   {trackingData.history && trackingData.history.length > 0 ? (
//                     <List>
//                       {trackingData.history.map((event, index) => (
//                         <ListItem key={index} sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
//                           <ListItemText
//                             primary={
//                               <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
//                                 {event.status}
//                               </Typography>
//                             }
//                             secondary={
//                               <>
//                                 <Typography variant="body2" color="text.secondary">
//                                   {new Date(event.timestamp).toLocaleString()}
//                                 </Typography>
//                                 {event.remarks && (
//                                   <Typography variant="body2" color="text.secondary">
//                                     {event.remarks}
//                                   </Typography>
//                                 )}
//                               </>
//                             }
//                           />
//                         </ListItem>
//                       ))}
//                     </List>
//                   ) : (
//                     <Typography color="text.secondary">
//                       No status history available.
//                     </Typography>
//                   )}
//                 </CardContent>
//               </Card>
//             </Grid>
//           </Grid>
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default TrackComplaint;
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';

const TrackComplaint = () => {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/complaints/track/${id}`);
        setComplaint(response.data);
        setError('');
      } catch (error) {
        setError(error.response?.data?.error || 'An error occurred while fetching complaint details');
      } finally {
        setLoading(false);
      }
    };
    fetchComplaint();
  }, [id]);

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress aria-label="Loading complaint details" />
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ maxWidth: 800, mx: 'auto', py: 4 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 8 }}>
            {error}
          </Alert>
        )}
        {complaint ? (
          <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', p: 3 }}>
            <CardContent>
              <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
                Complaint Details
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Complaint ID:</strong> {complaint._id}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Tracking ID:</strong> {complaint.trackingId}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Title:</strong> {complaint.title}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Status:</strong> {complaint.status}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Category:</strong> {complaint.category}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Description:</strong> {complaint.description}
              </Typography>
              {complaint.photo && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Photo:</strong>
                  </Typography>
                  <img
                    src={`http://localhost:5000${complaint.photo}`}
                    alt="Complaint"
                    style={{ maxWidth: '100%', borderRadius: '8px' }}
                  />
                </Box>
              )}
              <Typography variant="body1" sx={{ mt: 2 }}>
                <strong>Submitted:</strong> {new Date(complaint.createdAt).toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Typography color="text.secondary" align="center">
            No complaint found
          </Typography>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default TrackComplaint;