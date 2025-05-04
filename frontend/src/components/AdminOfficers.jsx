import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Card, CardContent, Typography, Alert, CircularProgress, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';

const AdminOfficers = () => {
  const [officers, setOfficers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOfficers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/officers', {
          withCredentials: true,
        });
        setOfficers(response.data);
        setError('');
      } catch (error) {
        setError(error.response?.data?.error || 'An error occurred while fetching officers');
      } finally {
        setLoading(false);
      }
    };
    fetchOfficers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/officers/${id}`, {
        withCredentials: true,
      });
      setOfficers(officers.filter((officer) => officer._id !== id));
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred while deleting officer');
    }
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'department', headerName: 'Department', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            sx={{ mr: 1 }}
            onClick={() => alert('Edit functionality TBD')}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => handleDelete(params.row._id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress aria-label="Loading officers" />
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 8 }}>
            {error}
          </Alert>
        )}
        <Card sx={{ borderRadius: '12px', boxShadow: 4 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Manage Officers
            </Typography>
            <Box sx={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={officers}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20]}
                getRowId={(row) => row._id}
                disableSelectionOnClick
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
};

export default AdminOfficers;