import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Card, CardContent, Typography, Alert, CircularProgress, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://ccrs-final.onrender.com/api/admin/users', {
          withCredentials: true,
        });
        setUsers(response.data);
        setError('');
      } catch (error) {
        setError(error.response?.data?.error || 'An error occurred while fetching users');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://ccrs-final.onrender.com/api/admin/users/${id}`, {
        withCredentials: true,
      });
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred while deleting user');
    }
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'role', headerName: 'Role', width: 150 },
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
          <CircularProgress aria-label="Loading users" />
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
              Manage Users
            </Typography>
            <Box sx={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={users}
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

export default AdminUsers;