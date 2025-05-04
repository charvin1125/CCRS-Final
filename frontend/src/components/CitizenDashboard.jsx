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

// const CitizenDashboard = ({ user, onLogout }) => {
//   const [complaints, setComplaints] = useState([]);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchComplaints = async () => {
//       try {
//         console.log('Fetching complaints for user:', user.email);
//         const response = await axios.get('http://localhost:5000/api/complaints/my-complaints', {
//           withCredentials: true,
//         });
//         console.log('Complaints response:', response.data);
//         setComplaints(response.data);
//         setError('');
//       } catch (error) {
//         console.error('Fetch complaints error:', error.response?.data || error.message);
//         if (error.response?.status === 401) {
//           setError('Not authenticated. Redirecting to login...');
//           setTimeout(() => navigate('/login'), 2000);
//         } else {
//           setError(error.response?.data?.error || 'An error occurred while fetching complaints');
//         }
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchComplaints();
//   }, [navigate, user.email]);

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ maxWidth: 800, width: '100%', mx: 'auto', mt: 4 }}>
//         <Card>
//           <CardContent>
//             <Typography variant="h5" align="center" color="primary" gutterBottom>
//               Your Complaints, {user.name}
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
//                 You have not submitted any complaints yet.
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
//                               Assigned Officer:{' '}
//                               <strong>
//                                 {complaint.assignedOfficer?.name || 'Unassigned'}
//                               </strong>
//                             </Typography>
//                             <br />
//                             <Typography variant="caption" color="text.secondary">
//                               Submitted:{' '}
//                               {new Date(complaint.createdAt).toLocaleDateString()}
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
//               color="primary"
//               onClick={() => navigate('/complaint')}
//               sx={{ mt: 3 }}
//             >
//               Submit New Complaint
//             </Button>
//             <Button
//               fullWidth
//               variant="contained"
//               color="secondary"
//               onClick={onLogout}
//               sx={{ mt: 2 }}
//             >
//               Logout
//             </Button>
//           </CardContent>
//         </Card>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default CitizenDashboard;
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Alert,
  CircularProgress,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import theme from '../theme';

const drawerWidth = 240;

const CitizenDashboard = ({ user, onLogout }) => {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const themeInstance = useTheme();
  const isMobile = useMediaQuery(themeInstance.breakpoints.down('md'));

  // Fetch complaints
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        console.log('Fetching complaints for user:', user.email);
        const response = await axios.get('http://localhost:5000/api/complaints/my-complaints', {
          withCredentials: true,
        });
        console.log('Complaints response:', response.data);
        // Sort complaints by createdAt (newest first)
        const sortedComplaints = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setComplaints(sortedComplaints);
        setError('');
      } catch (error) {
        console.error('Fetch complaints error:', error.response?.data || error.message);
        if (error.response?.status === 401) {
          setError('Not authenticated. Redirecting to login...');
          setTimeout(() => navigate('/login'), 2000);
        } else {
          setError(error.response?.data?.error || 'An error occurred while fetching complaints');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, [navigate, user.email]);

  // Handle drawer toggle for mobile
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Navigation items
  const navItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'My Complaints', icon: <ListAltIcon />, path: '/complaints' },
    { text: 'Submit Complaint', icon: <AddCircleIcon />, path: '/complaint' },
    { text: 'Logout', icon: <LogoutIcon />, action: onLogout },
  ];

  // Drawer content
  const drawerContent = (
    <Box sx={{ p: 2 }}>
      <Typography
        variant="h6"
        color="primary"
        sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}
        aria-label="CCRS Logo"
      >
        CCRS
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.text}
            button
            component={item.path ? Link : 'button'}
            to={item.path}
            onClick={item.action}
            sx={{
              borderRadius: 2,
              mb: 1,
              '&:hover': {
                bgcolor: 'primary.main',
                color: 'white',
                '& .MuiListItemIcon-root': { color: 'white' },
              },
            }}
          >
            <ListItemIcon sx={{ color: 'primary.main' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  // Calculate active complaints
  const activeComplaints = complaints.filter((c) =>
    ['pending', 'in-progress'].includes(c.status.toLowerCase())
  ).length;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'grey.50' }}>
        {/* AppBar */}
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            bgcolor: 'primary.main',
            boxShadow: 3,
          }}
        >
          <Toolbar>
            {isMobile && (
              <IconButton
                color="inherit"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
                aria-label="Toggle navigation drawer"
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, fontWeight: 'bold' }}
              aria-label="CCRS Dashboard"
            >
              CCRS Dashboard
            </Typography>
            <Typography variant="body1" sx={{ display: { xs: 'none', sm: 'block' } }}>
              {user.name}
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Drawer */}
        <Box
          component="nav"
          sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
          aria-label="Navigation drawer"
        >
          {/* Mobile Temporary Drawer */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
                bgcolor: 'background.paper',
                boxShadow: 3,
              },
            }}
          >
            {drawerContent}
          </Drawer>
          {/* Desktop Permanent Drawer */}
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', md: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
                bgcolor: 'background.paper',
                boxShadow: 3,
              },
            }}
            open
          >
            {drawerContent}
          </Drawer>
        </Box>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            mt: 8, // Offset for AppBar
            ml: { md: `${drawerWidth}px` },
            width: { xs: '100%', md: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
            {/* Welcome Message */}
            <Typography
              variant="h4"
              color="primary"
              gutterBottom
              sx={{ fontWeight: 'bold', mb: 4 }}
              aria-label={`Welcome message for ${user.name}`}
            >
              Welcome, {user.name}
            </Typography>

            {/* Error Alert */}
            {error && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            {/* Loading State */}
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                <CircularProgress aria-label="Loading complaints" />
              </Box>
            ) : (
              <Grid container spacing={3}>
                {/* Active Complaints Summary */}
                <Grid item xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      boxShadow: 3,
                      transition: 'transform 0.3s ease',
                      '&:hover': { transform: 'scale(1.05)' },
                    }}
                  >
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Typography
                        variant="h6"
                        color="primary"
                        gutterBottom
                        sx={{ fontWeight: 'bold' }}
                      >
                        Active Complaints
                      </Typography>
                      <Typography variant="h4" color="text.primary">
                        {activeComplaints}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Submit Complaint Button */}
                <Grid item xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      boxShadow: 3,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                    }}
                  >
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={<AddCircleIcon />}
                        onClick={() => navigate('/complaint')}
                        sx={{ px: 4, py: 2 }}
                        aria-label="Submit a new complaint"
                      >
                        Submit New Complaint
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Recent Complaints */}
                <Grid item xs={12}>
                  <Typography
                    variant="h5"
                    color="primary"
                    gutterBottom
                    sx={{ fontWeight: 'bold', mt: 2 }}
                    aria-label="Recent Complaints"
                  >
                    Recent Complaints
                  </Typography>
                  {complaints.length === 0 ? (
                    <Typography color="text.secondary" align="center">
                      You have not submitted any complaints yet.
                    </Typography>
                  ) : (
                    <Grid container spacing={3}>
                      {complaints.map((complaint) => (
                        <Grid item xs={12} sm={6} md={4} key={complaint._id}>
                          <Card
                            sx={{
                              borderRadius: 3,
                              boxShadow: 3,
                              transition: 'transform 0.3s ease',
                              '&:hover': {
                                transform: 'scale(1.05)',
                                boxShadow: 6,
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
                                  mb: 1,
                                }}
                                aria-label={`Complaint: ${complaint.title}`}
                              >
                                {complaint.title}
                              </Typography>
                              <Chip
                                label={complaint.status}
                                color={
                                  complaint.status.toLowerCase() === 'pending'
                                    ? 'warning'
                                    : complaint.status.toLowerCase() === 'in-progress'
                                    ? 'info'
                                    : complaint.status.toLowerCase() === 'resolved'
                                    ? 'success'
                                    : 'default'
                                }
                                size="small"
                                sx={{ mb: 1 }}
                                aria-label={`Status: ${complaint.status}`}
                              />
                              <Typography variant="body2" color="text.secondary">
                                Submitted:{' '}
                                {new Date(complaint.createdAt).toLocaleDateString()}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </Grid>
              </Grid>
            )}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default CitizenDashboard;