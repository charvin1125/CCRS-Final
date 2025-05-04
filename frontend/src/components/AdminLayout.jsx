// import { useState } from 'react';
// import { Outlet, useNavigate } from 'react-router-dom';
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Box,
//   IconButton,
//   Divider,
//   Button,
// } from '@mui/material';
// import {
//   Menu as MenuIcon,
//   Dashboard as DashboardIcon,
//   People as PeopleIcon,
//   Work as WorkIcon,
//   Report as ReportIcon,
//   Settings as SettingsIcon,
// } from '@mui/icons-material';
// import { ThemeProvider } from '@mui/material/styles';
// import theme from '../theme';

// const drawerWidth = 240;

// const AdminLayout = ({ admin, setAdmin }) => {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const navigate = useNavigate();

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const handleLogout = async () => {
//     try {
//       await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
//       setAdmin(null);
//       navigate('/admin/login');
//     } catch (error) {
//       console.error('Logout error:', error);
//     }
//   };

//   const menuItems = [
//     { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
//     { text: 'Users', icon: <PeopleIcon />, path: '/admin/users' },
//     { text: 'Officers', icon: <WorkIcon />, path: '/admin/officers' },
//     { text: 'Complaints', icon: <ReportIcon />, path: '/admin/complaints' },
//     { text: 'Settings', icon: <SettingsIcon />, path: '/admin/settings' },
//   ];

//   const drawer = (
//     <Box>
//       <Toolbar>
//         <Typography variant="h6" noWrap>
//           Admin Panel
//         </Typography>
//       </Toolbar>
//       <Divider />
//       <List>
//         {menuItems.map((item) => (
//           <ListItem
//             button
//             key={item.text}
//             onClick={() => navigate(item.path)}
//             sx={{
//               '&:hover': {
//                 background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
//                 color: 'white',
//               },
//             }}
//           >
//             <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
//             <ListItemText primary={item.text} />
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ display: 'flex' }}>
//         {/* AppBar */}
//         <AppBar
//           position="fixed"
//           sx={{
//             zIndex: (theme) => theme.zIndex.drawer + 1,
//             background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
//           }}
//         >
//           <Toolbar>
//             <IconButton
//               color="inherit"
//               aria-label="open drawer"
//               edge="start"
//               onClick={handleDrawerToggle}
//               sx={{ mr: 2, display: { sm: 'none' } }}
//             >
//               <MenuIcon />
//             </IconButton>
//             <Typography variant="h6" sx={{ flexGrow: 1 }}>
//               Complaint Redressal System
//             </Typography>
//             <Typography variant="subtitle1" sx={{ mr: 2 }}>
//               {admin?.name || 'Admin'}
//             </Typography>
//             <Button
//               color="inherit"
//               onClick={handleLogout}
//               sx={{
//                 background: 'rgba(255, 255, 255, 0.2)',
//                 '&:hover': { background: 'rgba(255, 255, 255, 0.3)' },
//               }}
//               aria-label="Logout"
//             >
//               Logout
//             </Button>
//           </Toolbar>
//         </AppBar>

//         {/* Drawer */}
//         <Box
//           component="nav"
//           sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
//         >
//           <Drawer
//             variant="temporary"
//             open={mobileOpen}
//             onClose={handleDrawerToggle}
//             ModalProps={{ keepMounted: true }}
//             sx={{
//               display: { xs: 'block', sm: 'none' },
//               '& .MuiDrawer-paper': {
//                 boxSizing: 'border-box',
//                 width: drawerWidth,
//               },
//             }}
//           >
//             {drawer}
//           </Drawer>
//           <Drawer
//             variant="permanent"
//             sx={{
//               display: { xs: 'none', sm: 'block' },
//               '& .MuiDrawer-paper': {
//                 boxSizing: 'border-box',
//                 width: drawerWidth,
//                 background: 'linear-gradient(180deg, #e3f2fd, #ffffff)',
//               },
//             }}
//             open
//           >
//             {drawer}
//           </Drawer>
//         </Box>

//         {/* Content */}
//         <Box
//           component="main"
//           sx={{
//             flexGrow: 1,
//             p: 3,
//             mt: { xs: 8, sm: 8 },
//             bgcolor: 'grey.50',
//             minHeight: '100vh',
//           }}
//         >
//           <Outlet />
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default AdminLayout;
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
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
  IconButton,
  Divider,
  Button,
  Alert,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Work as WorkIcon,
  Report as ReportIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import theme from '../theme'; // Adjust path as needed

const drawerWidth = 240;

const AdminLayout = ({ admin, setAdmin }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = async () => {
    try {
      console.log('Attempting logout...');
      await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
      console.log('Logout successful, clearing admin state');
      setAdmin(null); // Trigger App.jsx's handleLogout via state change
      navigate('/admin/login', { replace: true });
    } catch (error) {
      console.error('Logout error:', error.response?.data || error.message);
      setError(error.response?.data?.error || 'Failed to log out. Please try again.');
    }
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
    { text: 'Users', icon: <PeopleIcon />, path: '/admin/users' },
    { text: 'Officers', icon: <WorkIcon />, path: '/admin/officers' },
    { text: 'Complaints', icon: <ReportIcon />, path: '/admin/complaints' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/admin/settings' },
  ];

  const drawer = (
    <Box>
      <Toolbar>
        <Typography variant="h6" noWrap>
          Admin Panel
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => navigate(item.path)}
            sx={{
              '&:hover': {
                background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                color: 'white',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Complaint Redressal System
            </Typography>
            <Typography variant="subtitle1" sx={{ mr: 2 }}>
              {admin?.name || 'Admin'}
            </Typography>
            <Button
              color="inherit"
              onClick={handleLogout}
              sx={{
                background: 'rgba(255, 255, 255, 0.2)',
                '&:hover': { background: 'rgba(255, 255, 255, 0.3)' },
              }}
              aria-label="Logout"
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
                background: 'linear-gradient(180deg, #e3f2fd, #ffffff)',
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            mt: { xs: 8, sm: 8 },
            bgcolor: 'grey.50',
            minHeight: '100vh',
          }}
        >
          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 8 }} onClose={() => setError('')}>
              {error}
            </Alert>
          )}
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AdminLayout;