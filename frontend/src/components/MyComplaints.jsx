// import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
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
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   TextField,
// } from '@mui/material';
// import { ThemeProvider } from '@mui/material/styles';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import theme from '../theme';
// import { format } from 'date-fns';

// const MyComplaints = ({ user, onLogout }) => {
//   const [complaints, setComplaints] = useState([]);
//   const [filteredComplaints, setFilteredComplaints] = useState([]);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [statusFilter, setStatusFilter] = useState('All');
//   const [dateFilter, setDateFilter] = useState(null);
//   const navigate = useNavigate();

//   // Fetch complaints
//   useEffect(() => {
//     const fetchComplaints = async () => {
//       try {
//         console.log('Fetching complaints for user:', user.email);
//         const response = await axios.get('https://ccrs-final.onrender.com/api/complaints/my-complaints', {
//           withCredentials: true,
//         });
//         console.log('Complaints response:', response.data);
//         // Sort complaints by createdAt (newest first)
//         const sortedComplaints = response.data.sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         );
//         setComplaints(sortedComplaints);
//         setFilteredComplaints(sortedComplaints);
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

//   // Apply filters
//   useEffect(() => {
//     let filtered = complaints;

//     // Status filter
//     if (statusFilter !== 'All') {
//       filtered = filtered.filter((complaint) =>
//         complaint.status.toLowerCase() === statusFilter.toLowerCase()
//       );
//     }

//     // Date filter
//     if (dateFilter) {
//       filtered = filtered.filter((complaint) => {
//         const complaintDate = format(new Date(complaint.createdAt), 'yyyy-MM-dd');
//         const filterDate = format(dateFilter, 'yyyy-MM-dd');
//         return complaintDate === filterDate;
//       });
//     }

//     setFilteredComplaints(filtered);
//   }, [statusFilter, dateFilter, complaints]);

//   // Status options
//   const statusOptions = ['All', 'Open', 'In-Progress', 'Resolved', 'Escalated'];

//   // Truncate description
//   const truncateDescription = (text, maxLength) => {
//     if (text.length <= maxLength) return text;
//     return text.substring(0, maxLength) + '...';
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <LocalizationProvider dateAdapter={AdapterDateFns}>
//         <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh', py: 4 }}>
//           <Box sx={{ maxWidth: 1200, mx: 'auto', px: 2 }}>
//             {/* Header */}
//             <Typography
//               variant="h4"
//               color="primary"
//               gutterBottom
//               sx={{ fontWeight: 'bold', mb: 4 }}
//               aria-label="My Complaints"
//             >
//               My Complaints
//             </Typography>

//             {/* Filters */}
//             <Grid container spacing={2} sx={{ mb: 4 }}>
//               <Grid item xs={12} sm={6} md={4}>
//                 <FormControl fullWidth>
//                   <InputLabel id="status-filter-label">Filter by Status</InputLabel>
//                   <Select
//                     labelId="status-filter-label"
//                     value={statusFilter}
//                     label="Filter by Status"
//                     onChange={(e) => setStatusFilter(e.target.value)}
//                   >
//                     {statusOptions.map((status) => (
//                       <MenuItem key={status} value={status}>
//                         {status}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} sm={6} md={4}>
//                 <DatePicker
//                   label="Filter by Date"
//                   value={dateFilter}
//                   onChange={(newValue) => setDateFilter(newValue)}
//                   renderInput={(params) => <TextField {...params} fullWidth />}
//                 />
//               </Grid>
//             </Grid>

//             {/* Error Alert */}
//             {error && (
//               <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
//                 {error}
//               </Alert>
//             )}

//             {/* Loading State */}
//             {loading ? (
//               <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
//                 <CircularProgress aria-label="Loading complaints" />
//               </Box>
//             ) : filteredComplaints.length === 0 ? (
//               <Typography color="text.secondary" align="center">
//                 No complaints found matching the selected filters.
//               </Typography>
//             ) : (
//               <Grid container spacing={3}>
//                 {filteredComplaints.map((complaint) => (
//                   <Grid item xs={12} sm={6} md={4} key={complaint._id}>
//                     <Card
//                       sx={{
//                         borderRadius: 3,
//                         boxShadow: 3,
//                         p: 2,
//                         transition: 'transform 0.3s ease',
//                         '&:hover': {
//                           transform: 'scale(1.05)',
//                           boxShadow: 6,
//                         },
//                       }}
//                     >
//                       <CardContent sx={{ p: 2 }}>
//                         <Typography
//                           variant="h6"
//                           color="primary"
//                           component={Link}
//                           to={`/complaint/${complaint._id}`}
//                           sx={{
//                             textDecoration: 'none',
//                             '&:hover': { textDecoration: 'underline' },
//                             mb: 1,
//                           }}
//                           aria-label={`Complaint: ${complaint.title}`}
//                         >
//                           {complaint.title}
//                         </Typography>
//                         <Typography
//                           variant="body2"
//                           color="text.secondary"
//                           sx={{ mb: 2 }}
//                         >
//                           {truncateDescription(complaint.description, 100)}
//                         </Typography>
//                         <Chip
//                           label={complaint.status}
//                           color={
//                             complaint.status.toLowerCase() === 'open'
//                               ? 'warning'
//                               : complaint.status.toLowerCase() === 'in-progress'
//                               ? 'info'
//                               : complaint.status.toLowerCase() === 'resolved'
//                               ? 'success'
//                               : complaint.status.toLowerCase() === 'escalated'
//                               ? 'error'
//                               : 'default'
//                           }
//                           size="small"
//                           sx={{ mb: 2 }}
//                           aria-label={`Status: ${complaint.status}`}
//                         />
//                         <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//                           Submitted: {new Date(complaint.createdAt).toLocaleDateString()}
//                         </Typography>
//                         <Box sx={{ display: 'flex', gap: 2 }}>
//                           <Button
//                             variant="contained"
//                             color="primary"
//                             size="small"
//                             component={Link}
//                             to={`/complaint/${complaint._id}`}
//                             aria-label={`View details for ${complaint.title}`}
//                           >
//                             View Details
//                           </Button>
//                           <Button
//                             variant="outlined"
//                             color="primary"
//                             size="small"
//                             component={Link}
//                             to={`/track/${complaint._id}`}
//                             aria-label={`Track complaint ${complaint.title}`}
//                           >
//                             Track Complaint
//                           </Button>
//                         </Box>
//                       </CardContent>
//                     </Card>
//                   </Grid>
//                 ))}
//               </Grid>
//             )}
//           </Box>
//         </Box>
//       </LocalizationProvider>
//     </ThemeProvider>
//   );
// };

// export default MyComplaints;
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Grid,
  Typography,
  Chip,
  Button,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Breadcrumbs,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import theme from '../theme';
import { format } from 'date-fns';

const MyComplaints = ({ user, onLogout }) => {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState(null);
  const navigate = useNavigate();

  // Fetch complaints
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        console.log('Fetching complaints for user:', user.email);
        const response = await axios.get('https://ccrs-final.onrender.com/api/complaints/my-complaints', {
          withCredentials: true,
        });
        console.log('Complaints response:', response.data);
        // Sort complaints by createdAt (newest first)
        const sortedComplaints = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setComplaints(sortedComplaints);
        setFilteredComplaints(sortedComplaints);
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

  // Apply filters
  useEffect(() => {
    let filtered = complaints;

    // Status filter
    if (statusFilter !== 'All') {
      filtered = filtered.filter((complaint) =>
        complaint.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    // Date filter
    if (dateFilter) {
      filtered = filtered.filter((complaint) => {
        const complaintDate = format(new Date(complaint.createdAt), 'yyyy-MM-dd');
        const filterDate = format(dateFilter, 'yyyy-MM-dd');
        return complaintDate === filterDate;
      });
    }

    setFilteredComplaints(filtered);
  }, [statusFilter, dateFilter, complaints]);

  // Status options
  const statusOptions = ['All', 'Open', 'In-Progress', 'Resolved', 'Escalated'];

  // DataGrid columns
  const columns = [
    {
      field: 'title',
      headerName: 'Complaint Title',
      flex: 2,
      renderCell: (params) => (
        <Typography
          component={Link}
          to={`/complaint/${params.row._id}`}
          sx={{
            textDecoration: 'none',
            color: 'primary.main',
            '&:hover': { textDecoration: 'underline' },
          }}
          aria-label={`View complaint: ${params.value}`}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'category',
      headerName: 'Category',
      flex: 1,
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={
            params.value.toLowerCase() === 'open'
              ? 'warning'
              : params.value.toLowerCase() === 'in-progress'
              ? 'info'
              : params.value.toLowerCase() === 'resolved'
              ? 'success'
              : params.value.toLowerCase() === 'escalated'
              ? 'error'
              : 'default'
          }
          size="small"
          aria-label={`Status: ${params.value}`}
        />
      ),
    },
    {
      field: 'createdAt',
      headerName: 'Submitted Date',
      flex: 1,
      renderCell: (params) => new Date(params.value).toLocaleDateString(),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            component={Link}
            to={`/complaint/${params.row._id}`}
            aria-label={`View details for ${params.row.title}`}
          >
            View
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            component={Link}
            to={`/track/${params.row._id}`}
            aria-label={`Track complaint ${params.row.title}`}
          >
            Track
          </Button>
        </Box>
      ),
    },
  ];

  // DataGrid rows
  const rows = filteredComplaints.map((complaint) => ({
    _id: complaint._id,
    title: complaint.title,
    category: complaint.category,
    status: complaint.status,
    createdAt: complaint.createdAt,
  }));

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh', py: 4 }}>
          <Box sx={{ maxWidth: 1200, mx: 'auto', px: 2 }}>
            {/* Breadcrumbs */}
            <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
              <Link
                to="/dashboard"
                style={{ textDecoration: 'none', color: theme.palette.primary.main }}
              >
                Dashboard
              </Link>
              <Typography color="text.primary">My Complaints</Typography>
            </Breadcrumbs>

            {/* Header */}
            <Typography
              variant="h4"
              color="primary"
              gutterBottom
              sx={{ fontWeight: 'bold', mb: 4 }}
              aria-label="My Complaints"
            >
              My Complaints
            </Typography>

            {/* Filters */}
            <Grid container spacing={2} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="status-filter-label">Filter by Status</InputLabel>
                  <Select
                    labelId="status-filter-label"
                    value={statusFilter}
                    label="Filter by Status"
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    {statusOptions.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <DatePicker
                  label="Filter by Date"
                  value={dateFilter}
                  onChange={(newValue) => setDateFilter(newValue)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>
            </Grid>

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
            ) : filteredComplaints.length === 0 ? (
              <Typography color="text.secondary" align="center">
                No complaints found matching the selected filters.
              </Typography>
            ) : (
              <Box
                sx={{
                  bgcolor: 'white',
                  borderRadius: 2,
                  boxShadow: 3,
                  p: 2,
                  '& .MuiDataGrid-root': {
                    border: 'none',
                  },
                  '& .MuiDataGrid-row:hover': {
                    bgcolor: 'grey.100',
                  },
                }}
              >
                <DataGrid
                  rows={rows}
                  columns={columns}
                  getRowId={(row) => row._id}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  autoHeight
                  disableSelectionOnClick
                  sortingOrder={['desc', 'asc']}
                  initialState={{
                    sorting: {
                      sortModel: [{ field: 'createdAt', sort: 'desc' }],
                    },
                  }}
                  sx={{ '& .MuiDataGrid-cell': { py: 1 } }}
                  aria-label="Complaints table"
                />
              </Box>
            )}
          </Box>
        </Box>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default MyComplaints;