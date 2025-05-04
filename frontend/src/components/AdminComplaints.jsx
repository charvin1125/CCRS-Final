// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Box, Card, CardContent, Typography, Alert, CircularProgress, Button } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
// import { ThemeProvider } from '@mui/material/styles';
// import theme from '../theme';
// import { Link } from 'react-router-dom';

// const AdminComplaints = () => {
//   const [complaints, setComplaints] = useState([]);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchComplaints = async () => {
//       try {
//         const response = await axios.get('https://ccrs-final.onrender.com/api/admin/complaints', {
//           withCredentials: true,
//         });
//         setComplaints(response.data);
//         setError('');
//       } catch (error) {
//         setError(error.response?.data?.error || 'An error occurred while fetching complaints');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchComplaints();
//   }, []);

//   const columns = [
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
//           <CircularProgress aria-label="Loading complaints" />
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
//         <Card sx={{ borderRadius: '12px', boxShadow: 4 }}>
//           <CardContent>
//             <Typography variant="h6" sx={{ mb: 2 }}>
//               Manage Complaints
//             </Typography>
//             <Box sx={{ height: 400, width: '100%' }}>
//               <DataGrid
//                 rows={complaints}
//                 columns={columns}
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

// export default AdminComplaints;
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Card, CardContent, Typography, Alert, CircularProgress, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import theme from '../theme';

const AdminComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get('https://ccrs-final.onrender.com/api/admin/complaints', {
          withCredentials: true,
        });
        console.log('Raw Complaints API response:', response.data);

        // Validate and filter complaints
        const validComplaints = (response.data || []).filter(complaint => {
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
        setComplaints(validComplaints);
        setError('');
      } catch (error) {
        console.error('Fetch complaints error:', error.response?.data || error.message);
        if (error.response?.status === 401) {
          setError('Authentication failed. Please log in again.');
          navigate('/admin/login', { replace: true });
        } else {
          setError(error.response?.data?.error || 'An error occurred while fetching complaints');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, [navigate]);

  const columns = [
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
          <CircularProgress aria-label="Loading complaints" />
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ maxWidth: 1200, mx: 'auto', py: 3 }}>
        {error && (
          <Alert
            severity="error"
            sx={{ mb: 3, borderRadius: 8 }}
            action={
              error.includes('Authentication failed') ? (
                <Button color="inherit" size="small" component={Link} to="/admin/login">
                  Login
                </Button>
              ) : null
            }
          >
            {error}
          </Alert>
        )}
        <Card sx={{ borderRadius: '12px', boxShadow: 4 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Manage Complaints
            </Typography>
            {complaints.length > 0 ? (
              <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                  rows={complaints}
                  columns={columns}
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

export default AdminComplaints;