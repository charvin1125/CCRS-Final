// import { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate, Link as RouterLink } from 'react-router-dom';
// import axios from 'axios';
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Box,
//   Container,
//   CircularProgress,
// } from '@mui/material';
// import { ThemeProvider } from '@mui/material/styles';
// import theme from './theme';
// import Register from './components/Register';
// import Login from './components/Login';
// import RegisteredComplaint from './components/RegisteredComplaint';
// import CitizenDashboard from './components/CitizenDashboard';
// import ComplaintDetails from './components/ComplaintDetails';

// const App = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/user', {
//           withCredentials: true,
//         });
//         console.log('Fetch user response:', response.data);
//         setUser(response.data);
//       } catch (error) {
//         console.error('Fetch user error:', error.response);
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUser();
//   }, []);

//   const handleLoginSuccess = (userData) => {
//     console.log('Login success:', userData);
//     setUser(userData);
//   };

//   const handleRegisterSuccess = () => {
//     alert('Registration successful! Please login.');
//   };

//   const handleLogout = async () => {
//     try {
//       await axios.post('http://localhost:5000/api/logout', {}, { withCredentials: true });
//       setUser(null);
//     } catch (error) {
//       console.error('Logout failed:', error);
//     }
//   };

//   const ProtectedRoute = ({ children }) => {
//     if (loading) {
//       return (
//         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
//           <CircularProgress />
//         </Box>
//       );
//     }
//     return user ? children : <Navigate to="/login" />;
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Router>
//         <Box sx={{ flexGrow: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
//           <AppBar position="static">
//             <Toolbar>
//               <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//                 CCRS
//               </Typography>
//               <Box sx={{ display: 'flex', gap: 2 }}>
//                 {!user && !loading ? (
//                   <>
//                     <Button color="inherit" component={RouterLink} to="/register">
//                       Register
//                     </Button>
//                     <Button color="inherit" component={RouterLink} to="/login">
//                       Login
//                     </Button>
//                   </>
//                 ) : (
//                   user && (
//                     <>
//                       <Button color="inherit" component={RouterLink} to="/dashboard">
//                         Dashboard
//                       </Button>
//                       <Button color="inherit" component={RouterLink} to="/complaint">
//                         Submit Complaint
//                       </Button>
//                       <Button color="inherit" onClick={handleLogout}>
//                         Logout
//                       </Button>
//                     </>
//                   )
//                 )}
//               </Box>
//             </Toolbar>
//           </AppBar>
//           <Container sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', py: 4 }}>
//             {loading ? (
//               <CircularProgress />
//             ) : (
//               <Routes>
//                 <Route
//                   path="/register"
//                   element={<Register onRegisterSuccess={handleRegisterSuccess} />}
//                 />
//                 <Route
//                   path="/login"
//                   element={<Login onLoginSuccess={handleLoginSuccess} />}
//                 />
//                 <Route
//                   path="/complaint"
//                   element={
//                     <ProtectedRoute>
//                       <RegisteredComplaint user={user} onLogout={handleLogout} />
//                     </ProtectedRoute>
//                   }
//                 />
//                 <Route
//                   path="/dashboard"
//                   element={
//                     <ProtectedRoute>
//                       <CitizenDashboard user={user} onLogout={handleLogout} />
//                     </ProtectedRoute>
//                   }
//                 />
//                 <Route
//                   path="/complaint/:id"
//                   element={
//                     <ProtectedRoute>
//                       <ComplaintDetails user={user} onLogout={handleLogout} />
//                     </ProtectedRoute>
//                   }
//                 />
//                 <Route path="/" element={<Navigate to="/login" />} />
//               </Routes>
//             )}
//           </Container>
//         </Box>
//       </Router>
//     </ThemeProvider>
//   );
// };

// export default App;
// import { useState, useEffect } from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import axios from 'axios';
// import Register from './components/Register';
// import Login from './components/Login';
// import RegisteredComplaint from './components/RegisteredComplaint';
// import CitizenDashboard from './components/CitizenDashboard';
// import ComplaintDetails from './components/ComplaintDetails';
// import OfficerLogin from './components/OfficerLogin';
// import OfficerDashboard from './components/OfficerDashboard';
// import AdminRegisterOfficer from './components/AdminRegisterOfficer';

// const App = () => {
//   const [user, setUser] = useState(null);
//   const [officer, setOfficer] = useState(null);

//   useEffect(() => {
//     const fetchAuth = async () => {
//       try {
//         // Only fetch user if no officer is set
//         if (!officer) {
//           const userResponse = await axios.get('http://localhost:5000/api/auth/user', {
//             withCredentials: true,
//           });
//           setUser(userResponse.data);
//         }
//         // Only fetch officer if no user is set
//         if (!user) {
//           const officerResponse = await axios.get('http://localhost:5000/api/auth/officer', {
//             withCredentials: true,
//           });
//           setOfficer(officerResponse.data);
//         }
//       } catch (error) {
//         console.error('Auth fetch error:', error.response?.data || error.message);
//         setUser(null);
//         setOfficer(null);
//       }
//     };
//     fetchAuth();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
//       setUser(null);
//       setOfficer(null);
//     } catch (error) {
//       console.error('Logout error:', error.response?.data || error.message);
//     }
//   };

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
//         <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login setUser={setUser} />} />
//         <Route path="/officer/login" element={officer ? <Navigate to="/officer/dashboard" /> : <OfficerLogin setOfficer={setOfficer} />} />
//         <Route
//           path="/admin/register-officer"
//           element={(user?.role === 'admin' || officer?.role === 'admin') ? <AdminRegisterOfficer /> : <Navigate to="/login" />}
//         />
//         <Route
//           path="/complaint"
//           element={user ? <RegisteredComplaint user={user} onLogout={handleLogout} /> : <Navigate to="/login" />}
//         />
//         <Route
//           path="/dashboard"
//           element={user ? <CitizenDashboard user={user} onLogout={handleLogout} /> : <Navigate to="/login" />}
//         />
//         <Route
//           path="/officer/dashboard"
//           element={officer ? <OfficerDashboard officer={officer} setOfficer={setOfficer} /> : <Navigate to="/officer/login" />}
//         />
//         <Route
//           path="/complaint/:id"
//           element={user || officer ? <ComplaintDetails user={user} officer={officer} onLogout={handleLogout} /> : <Navigate to="/login" />}
//         />
//         <Route path="/" element={<Navigate to="/login" />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;
// import { useState, useEffect } from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import axios from 'axios';
// import Home from './components/Home';
// import Register from './components/Register';
// import Login from './components/Login';
// import RegisteredComplaint from './components/RegisteredComplaint';
// import CitizenDashboard from './components/CitizenDashboard';
// import ComplaintDetails from './components/ComplaintDetails';
// import OfficerLogin from './components/OfficerLogin';
// import OfficerDashboard from './components/OfficerDashboard';
// import AdminRegisterOfficer from './components/AdminRegisterOfficer';

// const App = () => {
//   const [user, setUser] = useState(null);
//   const [officer, setOfficer] = useState(null);

//   useEffect(() => {
//     const fetchAuth = async () => {
//       try {
//         // Only fetch user if no officer is set
//         if (!officer) {
//           const userResponse = await axios.get('http://localhost:5000/api/auth/user', {
//             withCredentials: true,
//           });
//           setUser(userResponse.data);
//         }
//         // Only fetch officer if no user is set
//         if (!user) {
//           const officerResponse = await axios.get('http://localhost:5000/api/auth/officer', {
//             withCredentials: true,
//           });
//           setOfficer(officerResponse.data);
//         }
//       } catch (error) {
//         console.error('Auth fetch error:', error.response?.data || error.message);
//         setUser(null);
//         setOfficer(null);
//       }
//     };
//     fetchAuth();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
//       setUser(null);
//       setOfficer(null);
//     } catch (error) {
//       console.error('Logout error:', error.response?.data || error.message);
//     }
//   };

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
//         <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login setUser={setUser} />} />
//         <Route path="/officer/login" element={officer ? <Navigate to="/officer/dashboard" /> : <OfficerLogin setOfficer={setOfficer} />} />
//         <Route
//           path="/admin/register-officer"
//           element={(user?.role === 'admin' || officer?.role === 'admin') ? <AdminRegisterOfficer /> : <Navigate to="/login" />}
//         />
//         <Route
//           path="/complaint"
//           element={user ? <RegisteredComplaint user={user} onLogout={handleLogout} /> : <Navigate to="/login" />}
//         />
//         <Route
//           path="/dashboard"
//           element={user ? <CitizenDashboard user={user} onLogout={handleLogout} /> : <Navigate to="/login" />}
//         />
//         <Route
//           path="/officer/dashboard"
//           element={officer ? <OfficerDashboard officer={officer} setOfficer={setOfficer} /> : <Navigate to="/officer/login" />}
//         />
//         <Route
//           path="/complaint/:id"
//           element={user || officer ? <ComplaintDetails user={user} officer={officer} onLogout={handleLogout} /> : <Navigate to="/login" />}
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;
// import { useState, useEffect } from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import axios from 'axios';
// import Home from './components/Home';
// import Register from './components/Register';
// import Login from './components/Login';
// import RegisteredComplaint from './components/RegisteredComplaint';
// import CitizenDashboard from './components/CitizenDashboard';
// import ComplaintDetails from './components/ComplaintDetails';
// import OfficerLogin from './components/OfficerLogin';
// import OfficerDashboard from './components/OfficerDashboard';
// import AdminRegisterOfficer from './components/AdminRegisterOfficer';
// import MyComplaints from './components/MyComplaints';
// import TrackComplaint from './components/TrackComplaint';

// const App = () => {
//   const [user, setUser] = useState(null);
//   const [officer, setOfficer] = useState(null);

//   useEffect(() => {
//     const fetchAuth = async () => {
//       try {
//         // Only fetch user if no officer is set
//         if (!officer) {
//           const userResponse = await axios.get('http://localhost:5000/api/auth/user', {
//             withCredentials: true,
//           });
//           setUser(userResponse.data);
//         }
//         // Only fetch officer if no user is set
//         if (!user) {
//           const officerResponse = await axios.get('http://localhost:5000/api/auth/officer', {
//             withCredentials: true,
//           });
//           setOfficer(officerResponse.data);
//         }
//       } catch (error) {
//         console.error('Auth fetch error:', error.response?.data || error.message);
//         setUser(null);
//         setOfficer(null);
//       }
//     };
//     fetchAuth();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
//       setUser(null);
//       setOfficer(null);
//     } catch (error) {
//       console.error('Logout error:', error.response?.data || error.message);
//     }
//   };

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
//         <Route
//           path="/login"
//           element={user ? <Navigate to="/dashboard" /> : <Login setUser={setUser} />}
//         />
//         <Route
//           path="/officer/login"
//           element={officer ? <Navigate to="/officer/dashboard" /> : <OfficerLogin setOfficer={setOfficer} />}
//         />
//         <Route
//           path="/admin/register-officer"
//           element={
//             (user?.role === 'admin' || officer?.role === 'admin') ? (
//               <AdminRegisterOfficer />
//             ) : (
//               <Navigate to="/login" />
//             )
//           }
//         />
//         <Route
//           path="/complaint"
//           element={
//             user ? <RegisteredComplaint user={user} onLogout={handleLogout} /> : <Navigate to="/login" />
//           }
//         />
//         <Route
//           path="/dashboard"
//           element={
//             user ? <CitizenDashboard user={user} onLogout={handleLogout} /> : <Navigate to="/login" />
//           }
//         />
//         <Route
//           path="/complaints"
//           element={
//             user ? <MyComplaints user={user} onLogout={handleLogout} /> : <Navigate to="/login" />
//           }
//         />
//         <Route
//           path="/officer/dashboard"
//           element={
//             officer ? (
//               <OfficerDashboard officer={officer} setOfficer={setOfficer} />
//             ) : (
//               <Navigate to="/officer/login" />
//             )
//           }
//         />
//         <Route
//           path="/complaint/:id"
//           element={
//             user || officer ? (
//               <ComplaintDetails user={user} officer={officer} onLogout={handleLogout} />
//             ) : (
//               <Navigate to="/login" />
//             )
//           }
//         />
//         <Route
//           path="/track/:id"
//           element={
//             user ? <TrackComplaint user={user} onLogout={handleLogout} /> : <Navigate to="/login" />
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;
// import { useState, useEffect } from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import axios from 'axios';
// import Home from './components/Home';
// import Register from './components/Register';
// import Login from './components/Login';
// import RegisteredComplaint from './components/RegisteredComplaint';
// import CitizenDashboard from './components/CitizenDashboard';
// import ComplaintDetails from './components/ComplaintDetails';
// import OfficerLogin from './components/OfficerLogin';
// import OfficerDashboard from './components/OfficerDashboard';
// import AdminRegisterOfficer from './components/AdminRegisterOfficer';
// import MyComplaints from './components/MyComplaints';
// import TrackComplaint from './components/TrackComplaint';
// import AdminLogin from './components/AdminLogin';
// import AdminLayout from './components/AdminLayout';
// import AdminDashboard from './components/AdminDashboard';
// import AdminUsers from './components/AdminUsers';
// import AdminOfficers from './components/AdminOfficers';
// import AdminComplaints from './components/AdminComplaints';
// import AdminSettings from './components/AdminSettings';

// const App = () => {
//   const [user, setUser] = useState(null);
//   const [officer, setOfficer] = useState(null);
//   const [admin, setAdmin] = useState(null);

//   useEffect(() => {
//     const fetchAuth = async () => {
//       try {
//         // Fetch admin
//         if (!user && !officer) {
//           const adminResponse = await axios.get('http://localhost:5000/api/auth/admin', {
//             withCredentials: true,
//           });
//           setAdmin(adminResponse.data);
//           return;
//         }
//         // Fetch user
//         if (!officer && !admin) {
//           const userResponse = await axios.get('http://localhost:5000/api/auth/user', {
//             withCredentials: true,
//           });
//           setUser(userResponse.data);
//           return;
//         }
//         // Fetch officer
//         if (!user && !admin) {
//           const officerResponse = await axios.get('http://localhost:5000/api/auth/officer', {
//             withCredentials: true,
//           });
//           setOfficer(officerResponse.data);
//         }
//       } catch (error) {
//         console.error('Auth fetch error:', error.response?.data || error.message);
//         setUser(null);
//         setOfficer(null);
//         setAdmin(null);
//       }
//     };
//     fetchAuth();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
//       setUser(null);
//       setOfficer(null);
//       setAdmin(null);
//     } catch (error) {
//       console.error('Logout error:', error.response?.data || error.message);
//     }
//   };

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
//         <Route
//           path="/login"
//           element={user ? <Navigate to="/dashboard" /> : <Login setUser={setUser} />}
//         />
//         <Route
//           path="/officer/login"
//           element={officer ? <Navigate to="/officer/dashboard" /> : <OfficerLogin setOfficer={setOfficer} />}
//         />
//         <Route
//           path="/admin/login"
//           element={admin ? <Navigate to="/admin/dashboard" /> : <AdminLogin setAdmin={setAdmin} />}
//         />
//         <Route
//           path="/admin/register-officer"
//           element={
//             (user?.role === 'admin' || officer?.role === 'admin' || admin) ? (
//               <AdminRegisterOfficer />
//             ) : (
//               <Navigate to="/admin/login" />
//             )
//           }
//         />
//         <Route
//           path="/complaint"
//           element={
//             user ? <RegisteredComplaint user={user} onLogout={handleLogout} /> : <Navigate to="/login" />
//           }
//         />
//         <Route
//           path="/dashboard"
//           element={
//             user ? <CitizenDashboard user={user} onLogout={handleLogout} /> : <Navigate to="/login" />
//           }
//         />
//         <Route
//           path="/complaints"
//           element={
//             user ? <MyComplaints user={user} onLogout={handleLogout} /> : <Navigate to="/login" />
//           }
//         />
//         <Route
//           path="/officer/dashboard"
//           element={
//             officer ? (
//               <OfficerDashboard officer={officer} setOfficer={setOfficer} />
//             ) : (
//               <Navigate to="/officer/login" />
//             )
//           }
//         />
//         <Route
//           path="/complaint/:id"
//           element={
//             user || officer || admin ? (
//               <ComplaintDetails user={user} officer={officer} admin={admin} onLogout={handleLogout} />
//             ) : (
//               <Navigate to="/login" />
//             )
//           }
//         />
//         <Route
//           path="/track/:id"
//           element={
//             user ? <TrackComplaint user={user} onLogout={handleLogout} /> : <Navigate to="/login" />
//           }
//         />
//         <Route
//           path="/admin"
//           element={
//             admin ? (
//               <AdminLayout admin={admin} setAdmin={setAdmin} />
//             ) : (
//               <Navigate to="/admin/login" />
//             )
//           }
//         >
//           <Route path="dashboard" element={<AdminDashboard />} />
//           <Route path="users" element={<AdminUsers />} />
//           <Route path="officers" element={<AdminOfficers />} />
//           <Route path="complaints" element={<AdminComplaints />} />
//           <Route path="settings" element={<AdminSettings />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;
// import { useState, useEffect } from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import axios from 'axios';
// import Home from './components/Home';
// import Register from './components/Register';
// import Login from './components/Login';
// import RegisteredComplaint from './components/RegisteredComplaint';
// import CitizenDashboard from './components/CitizenDashboard';
// import ComplaintDetails from './components/ComplaintDetails';
// import OfficerLogin from './components/OfficerLogin';
// import OfficerDashboard from './components/OfficerDashboard';
// import AdminRegisterOfficer from './components/AdminRegisterOfficer';
// import MyComplaints from './components/MyComplaints';
// import TrackComplaint from './components/TrackComplaint';
// import AdminLogin from './components/AdminLogin';
// import AdminLayout from './components/AdminLayout';
// import AdminDashboard from './components/AdminDashboard';
// import AdminUsers from './components/AdminUsers';
// import AdminOfficers from './components/AdminOfficers';
// import AdminComplaints from './components/AdminComplaints';
// import AdminSettings from './components/AdminSettings';
// import ErrorBoundary from './components/ErrorBoundary'; // Add this

// const App = () => {
//   const [user, setUser] = useState(null);
//   const [officer, setOfficer] = useState(null);
//   const [admin, setAdmin] = useState(null);

//   useEffect(() => {
//     const fetchAuth = async () => {
//       try {
//         // Try admin first
//         const adminResponse = await axios.get('http://localhost:5000/api/auth/admin', {
//           withCredentials: true,
//         });
//         if (adminResponse.data) {
//           setAdmin(adminResponse.data);
//           return;
//         }
//       } catch (error) {
//         console.log('Admin auth check failed:', error.response?.data || error.message);
//       }

//       try {
//         // Try user
//         const userResponse = await axios.get('http://localhost:5000/api/auth/user', {
//           withCredentials: true,
//         });
//         if (userResponse.data) {
//           setUser(userResponse.data);
//           return;
//         }
//       } catch (error) {
//         console.log('User auth check failed:', error.response?.data || error.message);
//       }

//       try {
//         // Try officer
//         const officerResponse = await axios.get('http://localhost:5000/api/auth/officer', {
//           withCredentials: true,
//         });
//         if (officerResponse.data) {
//           setOfficer(officerResponse.data);
//         }
//       } catch (error) {
//         console.log('Officer auth check failed:', error.response?.data || error.message);
//       }
//     };
//     fetchAuth();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
//       setUser(null);
//       setOfficer(null);
//       setAdmin(null);
//     } catch (error) {
//       console.error('Logout error:', error.response?.data || error.message);
//     }
//   };

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
//         <Route
//           path="/login"
//           element={user ? <Navigate to="/dashboard" /> : <Login setUser={setUser} />}
//         />
//         <Route
//           path="/officer/login"
//           element={officer ? <Navigate to="/officer/dashboard" /> : <OfficerLogin setOfficer={setOfficer} />}
//         />
//         <Route
//           path="/admin/login"
//           element={admin ? <Navigate to="/admin/dashboard" /> : <AdminLogin setAdmin={setAdmin} />}
//         />
//         <Route
//           path="/admin/register-officer"
//           element={
//             (user?.role === 'admin' || officer?.role === 'admin' || admin) ? (
//               <AdminRegisterOfficer />
//             ) : (
//               <Navigate to="/admin/login" />
//             )
//           }
//         />
//         <Route
//           path="/complaint"
//           element={
//             user ? <RegisteredComplaint user={user} onLogout={handleLogout} /> : <Navigate to="/login" />
//           }
//         />
//         <Route
//           path="/dashboard"
//           element={
//             user ? <CitizenDashboard user={user} onLogout={handleLogout} /> : <Navigate to="/login" />
//           }
//         />
//         <Route
//           path="/complaints"
//           element={
//             user ? <MyComplaints user={user} onLogout={handleLogout} /> : <Navigate to="/login" />
//           }
//         />
//         <Route
//           path="/officer/dashboard"
//           element={
//             officer ? (
//               <OfficerDashboard officer={officer} setOfficer={setOfficer} />
//             ) : (
//               <Navigate to="/officer/login" />
//             )
//           }
//         />
//         <Route
//           path="/complaint/:id"
//           element={
//             user || officer || admin ? (
//               <ComplaintDetails user={user} officer={officer} admin={admin} onLogout={handleLogout} />
//             ) : (
//               <Navigate to="/login" />
//             )
//           }
//         />
//         <Route
//           path="/track/:id"
//           element={
//             user ? <TrackComplaint user={user} onLogout={handleLogout} /> : <Navigate to="/login" />
//           }
//         />
//         <Route
//           path="/admin"
//           element={
//             admin ? (
//               <AdminLayout admin={admin} setAdmin={setAdmin} />
//             ) : (
//               <Navigate to="/admin/login" />
//             )
//           }
//         >
//           <Route
//             path="dashboard"
//             element={
//               <ErrorBoundary>
//                 <AdminDashboard />
//               </ErrorBoundary>
//             }
//           />
//           <Route path="users" element={<AdminUsers />} />
//           <Route path="officers" element={<AdminOfficers />} />
//           <Route path="complaints" element={<AdminComplaints />} />
//           <Route path="settings" element={<AdminSettings />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import RegisteredComplaint from './components/RegisteredComplaint';
import CitizenDashboard from './components/CitizenDashboard';
import ComplaintDetails from './components/ComplaintDetails';
import OfficerLogin from './components/OfficerLogin';
import OfficerDashboard from './components/OfficerDashboard';
import AdminRegisterOfficer from './components/AdminRegisterOfficer';
import MyComplaints from './components/MyComplaints';
import TrackComplaint from './components/TrackComplaint';
import AdminLogin from './components/AdminLogin';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './components/AdminDashboard';
import AdminUsers from './components/AdminUsers';
import AdminOfficers from './components/AdminOfficers';
import AdminComplaints from './components/AdminComplaints';
import AdminSettings from './components/AdminSettings';
import ComplaintForm from './components/ComplaintForm';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
  const [user, setUser] = useState(null);
  const [officer, setOfficer] = useState(null);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const adminResponse = await axios.get('http://localhost:5000/api/auth/admin', {
          withCredentials: true,
        });
        if (adminResponse.data) {
          setAdmin(adminResponse.data);
          return;
        }
      } catch (error) {
        console.log('Admin auth check failed:', error.response?.data || error.message);
      }

      try {
        const userResponse = await axios.get('http://localhost:5000/api/auth/user', {
          withCredentials: true,
        });
        if (userResponse.data) {
          setUser(userResponse.data);
          return;
        }
      } catch (error) {
        console.log('User auth check failed:', error.response?.data || error.message);
      }

      try {
        const officerResponse = await axios.get('http://localhost:5000/api/auth/officer', {
          withCredentials: true,
        });
        if (officerResponse.data) {
          setOfficer(officerResponse.data);
        }
      } catch (error) {
        console.log('Officer auth check failed:', error.response?.data || error.message);
      }
    };
    fetchAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
      setUser(null);
      setOfficer(null);
      setAdmin(null);
    } catch (error) {
      console.error('Logout error:', error.response?.data || error.message);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" /> : <Login setUser={setUser} />}
        />
        <Route
          path="/officer/login"
          element={officer ? <Navigate to="/officer/dashboard" /> : <OfficerLogin setOfficer={setOfficer} />}
        />
        <Route
          path="/admin/login"
          element={admin ? <Navigate to="/admin/dashboard" /> : <AdminLogin setAdmin={setAdmin} />}
        />
        <Route
          path="/admin/register-officer"
          element={
            (user?.role === 'admin' || officer?.role === 'admin' || admin) ? (
              <AdminRegisterOfficer />
            ) : (
              <Navigate to="/admin/login" />
            )
          }
        />
        <Route
          path="/complaint"
          element={
            user ? <RegisteredComplaint user={user} onLogout={handleLogout} /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/complaint/public"
          element={<ComplaintForm />}
        />
        <Route
          path="/dashboard"
          element={
            user ? <CitizenDashboard user={user} onLogout={handleLogout} /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/complaints"
          element={
            user ? <MyComplaints user={user} onLogout={handleLogout} /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/officer/dashboard"
          element={
            officer ? (
              <OfficerDashboard officer={officer} setOfficer={setOfficer} />
            ) : (
              <Navigate to="/officer/login" />
            )
          }
        />
        <Route
          path="/complaint/:id"
          element={
            user || officer || admin ? (
              <ComplaintDetails user={user} officer={officer} admin={admin} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/track/:id"
          element={<TrackComplaint />}
        />
        <Route
          path="/admin"
          element={
            admin ? (
              <AdminLayout admin={admin} setAdmin={setAdmin} />
            ) : (
              <Navigate to="/admin/login" />
            )
          }
        >
          <Route
            path="dashboard"
            element={
              <ErrorBoundary>
                <AdminDashboard />
              </ErrorBoundary>
            }
          />
          <Route path="users" element={<AdminUsers />} />
          <Route path="officers" element={<AdminOfficers />} />
          <Route
            path="complaints"
            element={
              <ErrorBoundary>
                <AdminComplaints />
              </ErrorBoundary>
            }
          />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;