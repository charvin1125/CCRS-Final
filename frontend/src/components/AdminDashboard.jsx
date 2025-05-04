// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   Alert,
//   CircularProgress,
// } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
// import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
// import { keyframes } from '@mui/system';
// import { ThemeProvider } from '@mui/material/styles';
// import theme from '../theme';

// // Fade-in animation
// const fadeIn = keyframes`
//   from { opacity: 0; transform: translateY(20px); }
//   to { opacity: 1; transform: translateY(0); }
// `;

// const AdminDashboard = () => {
//   const [data, setData] = useState({ complaints: [], users: [], officers: [] });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('https://ccrs-final.onrender.com/api/admin/dashboard', {
//           withCredentials: true,
//         });
//         setData(response.data);
//         setError('');
//       } catch (error) {
//         console.error('Fetch dashboard error:', error.response?.data || error.message);
//         setError(error.response?.data?.error || 'An error occurred while fetching data');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   // KPI Calculations
//   const totalComplaints = data.complaints.length;
//   const openComplaints = data.complaints.filter((c) => c.status === 'open').length;
//   const resolvedComplaints = data.complaints.filter((c) => c.status === 'resolved').length;
//   const escalatedComplaints = data.complaints.filter((c) => c.status === 'escalated').length;

//   const kpiData = [
//     {
//       label: 'Total Complaints',
//       value: totalComplaints,
//       gradient: 'linear-gradient(45deg, #1976d2, #42a5f5)',
//       hoverGradient: 'linear-gradient(45deg, #1565c0, #1976d2)',
//     },
//     {
//       label: 'Open',
//       value: openComplaints,
//       gradient: 'linear-gradient(45deg, #ed6c02, #f57c00)',
//       hoverGradient: 'linear-gradient(45deg, #d45d00, #ed6c02)',
//     },
//     {
//       label: 'Resolved',
//       value: resolvedComplaints,
//       gradient: 'linear-gradient(45deg, #2e7d32, #4caf50)',
//       hoverGradient: 'linear-gradient(45deg, #1b5e20, #2e7d32)',
//     },
//     {
//       label: 'Escalated',
//       value: escalatedComplaints,
//       gradient: 'linear-gradient(45deg, #d32f2f, #f44336)',
//       hoverGradient: 'linear-gradient(45deg, #b71c1c, #d32f2f)',
//     },
//   ];

//   // Chart Data
//   const statusData = [
//     { name: 'Open', value: openComplaints },
//     { name: 'In-Progress', value: data.complaints.filter((c) => c.status === 'in-progress').length },
//     { name: 'Resolved', value: resolvedComplaints },
//     { name: 'Escalated', value: escalatedComplaints },
//   ];

//   const categoryData = Object.entries(
//     data.complaints.reduce((acc, c) => {
//       acc[c.category] = (acc[c.category] || 0) + 1;
//       return acc;
//     }, {})
//   ).map(([name, value]) => ({ name, value }));

//   const COLORS = ['#ed6c02', '#0288d1', '#2e7d32', '#d32f2f'];

//   // DataGrid Columns
//   const complaintColumns = [
//     { field: 'title', headerName: 'Title', width: 200 },
//     { field: 'status', headerName: 'Status', width: 120 },
//     { field: 'category', headerName: 'Category', width: 150 },
//     {
//       field: 'complainant',
//       headerName: 'Complainant',
//       width: 150,
//       valueGetter: (params) => params.row.complainant?.name || 'Unknown',
//     },
//     {
//       field: 'createdAt',
//       headerName: 'Submitted',
//       width: 120,
//       valueGetter: (params) => new Date(params.row.createdAt).toLocaleDateString(),
//     },
//     {
//       field: 'actions',
//       headerName: 'Actions',
//       width: 100,
//       renderCell: (params) => (
//         <Button
//           variant="outlined"
//           color="primary"
//           size="small"
//           component={Link}
//           to={`/complaint/${params.row._id}`}
//         >
//           View
//         </Button>
//       ),
//     },
//   ];

//   if (loading) {
//     return (
//       <ThemeProvider theme={theme}>
//         <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
//           <CircularProgress aria-label="Loading dashboard" />
//         </Box>
//       </ThemeProvider>
//     );
//   }

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
//         {error && (
//           <Alert severity="error" sx={{ mb: 3, borderRadius: 8 }}>
//             {error}
//           </Alert>
//         )}

//         {/* KPI Cards */}
//         <Grid container spacing={3} sx={{ mb: 4 }}>
//           {kpiData.map((kpi, index) => (
//             <Grid item xs={12} sm={6} md={3} key={kpi.label}>
//               <Card
//                 sx={{
//                   background: kpi.gradient,
//                   borderRadius: '12px',
//                   boxShadow: 4,
//                   color: 'white',
//                   textAlign: 'center',
//                   p: 2,
//                   animation: `${fadeIn} 0.5s ease-out ${index * 0.1}s both`,
//                   transition: 'transform 0.2s, box-shadow 0.2s',
//                   '&:hover': {
//                     transform: 'scale(1.05)',
//                     boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
//                     background: kpi.hoverGradient,
//                   },
//                 }}
//               >
//                 <CardContent>
//                   <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
//                     {kpi.value}
//                   </Typography>
//                   <Typography variant="body2">{kpi.label}</Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>

//         {/* Charts */}
//         <Grid container spacing={3} sx={{ mb: 4 }}>
//           <Grid item xs={12} md={6}>
//             <Card sx={{ borderRadius: '12px', boxShadow: 4, p: 2 }}>
//               <CardContent>
//                 <Typography variant="h6" sx={{ mb: 2 }}>
//                   Complaint Status Distribution
//                 </Typography>
//                 <PieChart width={300} height={300}>
//                   <Pie
//                     data={statusData}
//                     cx="50%"
//                     cy="50%"
//                     outerRadius={100}
//                     fill="#8884d8"
//                     dataKey="value"
//                     label
//                   >
//                     {statusData.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </CardContent>
//             </Card>
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <Card sx={{ borderRadius: '12px', boxShadow: 4, p: 2 }}>
//               <CardContent>
//                 <Typography variant="h6" sx={{ mb: 2 }}>
//                   Complaints by Category
//                 </Typography>
//                 <BarChart width={300} height={300} data={categoryData}>
//                   <XAxis dataKey="name" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Bar dataKey="value" fill="#1976d2" />
//                 </BarChart>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>

//         {/* Complaints Table */}
//         <Card sx={{ borderRadius: '12px', boxShadow: 4 }}>
//           <CardContent>
//             <Typography variant="h6" sx={{ mb: 2 }}>
//               Recent Complaints
//             </Typography>
//             <Box sx={{ height: 400, width: '100%' }}>
//               <DataGrid
//                 rows={data.complaints}
//                 columns={complaintColumns}
//                 pageSize={5}
//                 rowsPerPageOptions={[5, 10, 20]}
//                 getRowId={(row) => row._id}
//                 disableSelectionOnClick
//               />
//             </Box>
//           </CardContent>
//         </Card>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default AdminDashboard;
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   Alert,
//   CircularProgress,
//   Button,
// } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
// import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
// import { keyframes } from '@mui/system';
// import { ThemeProvider } from '@mui/material/styles';
// import { Link, useNavigate } from 'react-router-dom';
// import theme from '../theme'; // Adjust path as needed

// // Fade-in animation
// const fadeIn = keyframes`
//   from { opacity: 0; transform: translateY(20px); }
//   to { opacity: 1; transform: translateY(0); }
// `;

// const AdminDashboard = () => {
//   const [data, setData] = useState({ complaints: [], users: [], officers: [] });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [retryCount, setRetryCount] = useState(0);
//   const maxRetries = 3;
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkSession = async () => {
//       try {
//         const response = await axios.get('https://ccrs-final.onrender.com/api/auth/admin', {
//           withCredentials: true,
//         });
//         console.log('Session check response:', response.data);
//       } catch (error) {
//         console.error('Session check error:', error.response?.data || error.message);
//         setError('Not authenticated. Please log in.');
//         navigate('/admin/login', { replace: true });
//       }
//     };

//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get('https://ccrs-final.onrender.com/api/admin/dashboard', {
//           withCredentials: true,
//         });
//         console.log('Raw Dashboard API response:', response.data);

//         // Validate and filter complaints
//         const validComplaints = (response.data.complaints || []).filter(complaint => {
//           if (!complaint || typeof complaint !== 'object') {
//             console.warn('Invalid complaint (undefined or not an object):', complaint);
//             return false;
//           }
//           if (!complaint._id || !complaint.complainant || !complaint.createdAt) {
//             console.warn('Invalid complaint (missing required fields):', complaint);
//             return false;
//           }
//           return true;
//         });

//         console.log('Filtered valid complaints:', validComplaints);

//         setData({
//           complaints: validComplaints,
//           users: response.data.users || [],
//           officers: response.data.officers || [],
//         });
//         setError('');
//       } catch (error) {
//         console.error('Fetch dashboard error:', error.response?.data || error.message);
//         if (error.response?.status === 401) {
//           setError('Authentication failed. Please log in again.');
//           navigate('/admin/login', { replace: true });
//         } else if (retryCount < maxRetries) {
//           setError('Failed to fetch data. Retrying...');
//           setTimeout(() => setRetryCount(retryCount + 1), 2000);
//         } else {
//           setError(error.response?.data?.error || 'An error occurred while fetching data. Please try again later.');
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkSession().then(() => fetchData());
//   }, [retryCount, navigate]);

//   // KPI Calculations
//   const totalComplaints = data.complaints.length;
//   const openComplaints = data.complaints.filter((c) => c.status === 'open').length;
//   const resolvedComplaints = data.complaints.filter((c) => c.status === 'resolved').length;
//   const escalatedComplaints = data.complaints.filter((c) => c.status === 'escalated').length;

//   const kpiData = [
//     {
//       label: 'Total Complaints',
//       value: totalComplaints,
//       gradient: 'linear-gradient(45deg, #1976d2, #42a5f5)',
//       hoverGradient: 'linear-gradient(45deg, #1565c0, #1976d2)',
//     },
//     {
//       label: 'Open',
//       value: openComplaints,
//       gradient: 'linear-gradient(45deg, #ed6c02, #f57c00)',
//       hoverGradient: 'linear-gradient(45deg, #d45d00, #ed6c02)',
//     },
//     {
//       label: 'Resolved',
//       value: resolvedComplaints,
//       gradient: 'linear-gradient(45deg, #2e7d32, #4caf50)',
//       hoverGradient: 'linear-gradient(45deg, #1b5e20, #2e7d32)',
//     },
//     {
//       label: 'Escalated',
//       value: escalatedComplaints,
//       gradient: 'linear-gradient(45deg, #d32f2f, #f44336)',
//       hoverGradient: 'linear-gradient(45deg, #b71c1c, #d32f2f)',
//     },
//   ];

//   // Chart Data
//   const statusData = [
//     { name: 'Open', value: openComplaints },
//     { name: 'In-Progress', value: data.complaints.filter((c) => c.status === 'in-progress').length },
//     { name: 'Resolved', value: resolvedComplaints },
//     { name: 'Escalated', value: escalatedComplaints },
//   ].filter(item => item.value > 0);

//   const categoryData = Object.entries(
//     data.complaints.reduce((acc, c) => {
//       acc[c.category] = (acc[c.category] || 0) + 1;
//       return acc;
//     }, {})
//   ).map(([name, value]) => ({ name, value }))
//    .filter(item => item.value > 0);

//   const COLORS = ['#ed6c02', '#0288d1', '#2e7d32', '#d32f2f'];

//   // DataGrid Columns
//   const complaintColumns = [
//     { field: 'title', headerName: 'Title', width: 200 },
//     { field: 'status', headerName: 'Status', width: 120 },
//     { field: 'category', headerName: 'Category', width: 150 },
//     {
//       field: 'complainant',
//       headerName: 'Complainant',
//       width: 150,
//       valueGetter: (params) => {
//         try {
//           if (!params.row) {
//             console.error('Row is undefined in complainant valueGetter:', params);
//             return 'Unknown';
//           }
//           return params.row.complainant?.name || 'Unknown';
//         } catch (error) {
//           console.error('Error in complainant valueGetter:', error, 'Row:', params.row);
//           return 'Unknown';
//         }
//       },
//     },
//     {
//       field: 'createdAt',
//       headerName: 'Submitted',
//       width: 120,
//       valueGetter: (params) => {
//         try {
//           if (!params.row) {
//             console.error('Row is undefined in createdAt valueGetter:', params);
//             return 'N/A';
//           }
//           return new Date(params.row.createdAt).toLocaleDateString();
//         } catch (error) {
//           console.error('Error in createdAt valueGetter:', error, 'Row:', params.row);
//           return 'N/A';
//         }
//       },
//     },
//     {
//       field: 'actions',
//       headerName: 'Actions',
//       width: 100,
//       renderCell: (params) => (
//         <Button
//           variant="outlined"
//           color="primary"
//           size="small"
//           component={Link}
//           to={`/complaint/${params.row?._id || ''}`}
//           disabled={!params.row?._id}
//         >
//           View
//         </Button>
//       ),
//     },
//   ];

//   if (loading) {
//     return (
//       <ThemeProvider theme={theme}>
//         <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
//           <CircularProgress aria-label="Loading dashboard" />
//         </Box>
//       </ThemeProvider>
//     );
//   }

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ maxWidth: 1200, mx: 'auto', py: 3 }}>
//         {error && (
//           <Alert
//             severity="error"
//             sx={{ mb: 3, borderRadius: 8 }}
//             action={
//               error.includes('Authentication failed') ? (
//                 <Button color="inherit" size="small" component={Link} to="/admin/login">
//                   Login
//                 </Button>
//               ) : (
//                 <Button color="inherit" size="small" onClick={() => setRetryCount(retryCount + 1)}>
//                   Retry
//                 </Button>
//               )
//             }
//           >
//             {error}
//           </Alert>
//         )}

//         {/* KPI Cards */}
//         <Typography variant="h5" sx={{ mb: 3 }}>Admin Dashboard</Typography>
//         <Grid container spacing={3} sx={{ mb: 4 }}>
//           {kpiData.map((kpi, index) => (
//             <Grid item xs={12} sm={6} md={3} key={kpi.label}>
//               <Card
//                 sx={{
//                   background: kpi.gradient,
//                   borderRadius: '12px',
//                   boxShadow: 4,
//                   color: 'white',
//                   textAlign: 'center',
//                   p: 2,
//                   animation: `${fadeIn} 0.5s ease-out ${index * 0.1}s both`,
//                   transition: 'transform 0.2s, box-shadow 0.2s',
//                   '&:hover': {
//                     transform: 'scale(1.05)',
//                     boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
//                     background: kpi.hoverGradient,
//                   },
//                 }}
//               >
//                 <CardContent>
//                   <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
//                     {kpi.value}
//                   </Typography>
//                   <Typography variant="body2">{kpi.label}</Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>

//         {/* Charts */}
//         <Grid container spacing={3} sx={{ mb: 4 }}>
//           <Grid item xs={12} md={6}>
//             <Card sx={{ borderRadius: '12px', boxShadow: 4, p: 2 }}>
//               <CardContent>
//                 <Typography variant="h6" sx={{ mb: 2 }}>
//                   Complaint Status Distribution
//                 </Typography>
//                 {statusData.length > 0 ? (
//                   <PieChart width={300} height={300}>
//                     <Pie
//                       data={statusData}
//                       cx="50%"
//                       cy="50%"
//                       outerRadius={100}
//                       fill="#8884d8"
//                       dataKey="value"
//                       label
//                     >
//                       {statusData.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                       ))}
//                     </Pie>
//                     <Tooltip />
//                     <Legend />
//                   </PieChart>
//                 ) : (
//                   <Typography color="text.secondary" align="center">
//                     No complaint status data available
//                   </Typography>
//                 )}
//               </CardContent>
//             </Card>
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <Card sx={{ borderRadius: '12px', boxShadow: 4, p: 2 }}>
//               <CardContent>
//                 <Typography variant="h6" sx={{ mb: 2 }}>
//                   Complaints by Category
//                 </Typography>
//                 {categoryData.length > 0 ? (
//                   <BarChart width={300} height={300} data={categoryData}>
//                     <XAxis dataKey="name" />
//                     <YAxis />
//                     <Tooltip />
//                     <Legend />
//                     <Bar dataKey="value" fill="#1976d2" />
//                   </BarChart>
//                 ) : (
//                   <Typography color="text.secondary" align="center">
//                     No category data available
//                   </Typography>
//                 )}
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>

//         {/* Complaints Table */}
//         <Card sx={{ borderRadius: '12px', boxShadow: 4 }}>
//           <CardContent>
//             <Typography variant="h6" sx={{ mb: 2 }}>
//               Recent Complaints
//             </Typography>
//             {data.complaints.length > 0 ? (
//               <Box sx={{ height: 400, width: '100%' }}>
//                 <DataGrid
//                   rows={data.complaints}
//                   columns={complaintColumns}
//                   pageSize={5}
//                   rowsPerPageOptions={[5, 10, 20]}
//                   getRowId={(row) => row._id || `fallback-${Math.random()}`}
//                   disableSelectionOnClick
//                 />
//               </Box>
//             ) : (
//               <Typography color="text.secondary" align="center">
//                 No complaints available
//               </Typography>
//             )}
//           </CardContent>
//         </Card>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default AdminDashboard;
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Alert,
  CircularProgress,
  Button,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { keyframes } from '@mui/system';
import { ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import theme from '../theme'; // Adjust path as needed

// Fade-in animation
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Custom tooltip styling
const customTooltipStyle = {
  background: 'rgba(255, 255, 255, 0.95)',
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

// Custom label for PieChart
const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
  const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
  const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
  return (
    <text
      x={x}
      y={y}
      fill="#333"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      fontSize={14}
      fontWeight="bold"
    >
      {`${name} (${(percent * 100).toFixed(0)}%)`}
    </text>
  );
};

const AdminDashboard = () => {
  const [data, setData] = useState({ complaints: [], users: [], officers: [] });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get('https://ccrs-final.onrender.com/api/auth/admin', {
          withCredentials: true,
        });
        console.log('Session check response:', response.data);
      } catch (error) {
        console.error('Session check error:', error.response?.data || error.message);
        setError('Not authenticated. Please log in.');
        navigate('/admin/login', { replace: true });
      }
    };

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://ccrs-final.onrender.com/api/admin/dashboard', {
          withCredentials: true,
        });
        console.log('Raw Dashboard API response:', response.data);

        // Validate and filter complaints
        const validComplaints = (response.data.complaints || []).filter(complaint => {
          if (!complaint || typeof complaint !== 'object') {
            console.warn('Invalid complaint (undefined or not an object):', complaint);
            return false;
          }
          if (!complaint._id || !complaint.complainant || !complaint.createdAt) {
            console.warn('Invalid complaint (missing required fields):', complaint);
            return false;
          }
          return true;
        });

        console.log('Filtered valid complaints:', validComplaints);

        setData({
          complaints: validComplaints,
          users: response.data.users || [],
          officers: response.data.officers || [],
        });
        setError('');
      } catch (error) {
        console.error('Fetch dashboard error:', error.response?.data || error.message);
        if (error.response?.status === 401) {
          setError('Authentication failed. Please log in again.');
          navigate('/admin/login', { replace: true });
        } else if (retryCount < maxRetries) {
          setError('Failed to fetch data. Retrying...');
          setTimeout(() => setRetryCount(retryCount + 1), 2000);
        } else {
          setError(error.response?.data?.error || 'An error occurred while fetching data. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    checkSession().then(() => fetchData());
  }, [retryCount, navigate]);

  // KPI Calculations
  const totalComplaints = data.complaints.length;
  const openComplaints = data.complaints.filter((c) => c.status === 'open').length;
  const resolvedComplaints = data.complaints.filter((c) => c.status === 'resolved').length;
  const escalatedComplaints = data.complaints.filter((c) => c.status === 'escalated').length;

  const kpiData = [
    {
      label: 'Total Complaints',
      value: totalComplaints,
      gradient: 'linear-gradient(45deg, #1976d2, #42a5f5)',
      hoverGradient: 'linear-gradient(45deg, #1565c0, #1976d2)',
    },
    {
      label: 'Open',
      value: openComplaints,
      gradient: 'linear-gradient(45deg, #ed6c02, #f57c00)',
      hoverGradient: 'linear-gradient(45deg, #d45d00, #ed6c02)',
    },
    {
      label: 'Resolved',
      value: resolvedComplaints,
      gradient: 'linear-gradient(45deg, #2e7d32, #4caf50)',
      hoverGradient: 'linear-gradient(45deg, #1b5e20, #2e7d32)',
    },
    {
      label: 'Escalated',
      value: escalatedComplaints,
      gradient: 'linear-gradient(45deg, #d32f2f, #f44336)',
      hoverGradient: 'linear-gradient(45deg, #b71c1c, #d32f2f)',
    },
  ];

  // Chart Data
  const statusData = [
    { name: 'Open', value: openComplaints },
    { name: 'In-Progress', value: data.complaints.filter((c) => c.status === 'in-progress').length },
    { name: 'Resolved', value: resolvedComplaints },
    { name: 'Escalated', value: escalatedComplaints },
  ].filter(item => item.value > 0);

  const categoryData = Object.entries(
    data.complaints.reduce((acc, c) => {
      acc[c.category] = (acc[c.category] || 0) + 1;
      return acc;
    }, {})
  )
    .map(([name, value]) => ({ name, value }))
    .filter(item => item.value > 0);

  const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'];

  // DataGrid Columns
  const complaintColumns = [
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'status', headerName: 'Status', width: 120 },
    { field: 'category', headerName: 'Category', width: 150 },
    {
      field: 'complainant',
      headerName: 'Complainant',
      width: 150,
      valueGetter: (params) => {
        try {
          if (!params.row) {
            console.error('Row is undefined in complainant valueGetter:', params);
            return 'Unknown';
          }
          return params.row.complainant?.name || 'Unknown';
        } catch (error) {
          console.error('Error in complainant valueGetter:', error, 'Row:', params.row);
          return 'Unknown';
        }
      },
    },
    {
      field: 'createdAt',
      headerName: 'Submitted',
      width: 120,
      valueGetter: (params) => {
        try {
          if (!params.row) {
            console.error('Row is undefined in createdAt valueGetter:', params);
            return 'N/A';
          }
          return new Date(params.row.createdAt).toLocaleDateString();
        } catch (error) {
          console.error('Error in createdAt valueGetter:', error, 'Row:', params.row);
          return 'N/A';
        }
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="primary"
          size="small"
          component={Link}
          to={`/complaint/${params.row?._id || ''}`}
          disabled={!params.row?._id}
        >
          View
        </Button>
      ),
    },
  ];

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress aria-label="Loading dashboard" />
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ maxWidth: 1400, mx: 'auto', py: 4 }}>
        {error && (
          <Alert
            severity="error"
            sx={{ mb: 3, borderRadius: 8 }}
            action={
              error.includes('Authentication failed') ? (
                <Button color="inherit" size="small" component={Link} to="/admin/login">
                  Login
                </Button>
              ) : (
                <Button color="inherit" size="small" onClick={() => setRetryCount(retryCount + 1)}>
                  Retry
                </Button>
              )
            }
          >
            {error}
          </Alert>
        )}

        {/* KPI Cards */}
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: 'primary.main' }}>
          Admin Dashboard
        </Typography>
        <Grid container spacing={3} sx={{ mb: 5 }}>
          {kpiData.map((kpi, index) => (
            <Grid item xs={12} sm={6} md={3} key={kpi.label}>
              <Card
                sx={{
                  background: kpi.gradient,
                  borderRadius: '16px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                  color: 'white',
                  textAlign: 'center',
                  p: 3,
                  animation: `${fadeIn} 0.5s ease-out ${index * 0.1}s both`,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
                    background: kpi.hoverGradient,
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {kpi.value}
                  </Typography>
                  <Typography variant="subtitle1">{kpi.label}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Charts */}
        <Grid container spacing={4} sx={{ mb: 5 }}>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                borderRadius: '16px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                p: 3,
                background: 'linear-gradient(180deg, #f5f7fa, #ffffff)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
                },
              }}
            >
              <CardContent>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: 'text.primary' }}>
                  Complaint Status Distribution
                </Typography>
                {statusData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                        label={renderCustomLabel}
                        animationBegin={0}
                        animationDuration={800}
                        animationEasing="ease-out"
                      >
                        {statusData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                            stroke="#fff"
                            strokeWidth={2}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={customTooltipStyle}
                        formatter={(value, name) => [`${value} complaints`, name]}
                      />
                      <Legend
                        verticalAlign="bottom"
                        height={36}
                        iconType="circle"
                        formatter={(value) => (
                          <span style={{ color: '#333', fontWeight: '500' }}>{value}</span>
                        )}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <Typography color="text.secondary" align="center">
                    No complaint status data available
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                borderRadius: '16px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                p: 3,
                background: 'linear-gradient(180deg, #f5f7fa, #ffffff)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
                },
              }}
            >
              <CardContent>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: 'text.primary' }}>
                  Complaints by Category
                </Typography>
                {categoryData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={categoryData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                      <XAxis
                        dataKey="name"
                        angle={-45}
                        textAnchor="end"
                        interval={0}
                        height={80}
                        tick={{ fill: '#333', fontSize: 12 }}
                      />
                      <YAxis tick={{ fill: '#333' }} />
                      <Tooltip
                        contentStyle={customTooltipStyle}
                        formatter={(value, name) => [`${value} complaints`, 'Count']}
                      />
                      <Legend
                        verticalAlign="bottom"
                        height={36}
                        formatter={(value) => (
                          <span style={{ color: '#333', fontWeight: '500' }}>{value}</span>
                        )}
                      />
                      <Bar
                        dataKey="value"
                        radius={[8, 8, 0, 0]}
                        animationDuration={800}
                        animationEasing="ease-out"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                            stroke="#fff"
                            strokeWidth={1}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <Typography color="text.secondary" align="center">
                    No category data available
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Complaints Table */}
        <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', p: 3 }}>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: 'text.primary' }}>
              Recent Complaints
            </Typography>
            {data.complaints.length > 0 ? (
              <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                  rows={data.complaints}
                  columns={complaintColumns}
                  pageSize={5}
                  rowsPerPageOptions={[5, 10, 20]}
                  getRowId={(row) => row._id || `fallback-${Math.random()}`}
                  disableSelectionOnClick
                />
              </Box>
            ) : (
              <Typography color="text.secondary" align="center">
                No complaints available
              </Typography>
            )}
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
};

export default AdminDashboard;