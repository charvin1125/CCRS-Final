import { Box, Card, CardContent, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';

const AdminSettings = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Card sx={{ borderRadius: '12px', boxShadow: 4 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Settings
            </Typography>
            <Typography color="text.secondary">
              System settings and configurations will be implemented here.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
};

export default AdminSettings;