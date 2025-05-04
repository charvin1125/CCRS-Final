// import { useState } from 'react';
// import {
//   Box,
//   TextField,
//   MenuItem,
//   Button,
//   Typography,
//   Alert,
//   CircularProgress,
//   Card,
//   CardContent,
//   Grid,
//   Input,
// } from '@mui/material';
// import { ThemeProvider } from '@mui/material/styles';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import theme from '../theme';

// const ComplaintForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     phone: '',
//     email: '',
//     category: '',
//     description: '',
//     photo: null,
//   });
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [submission, setSubmission] = useState(null);
//   const qrCodeUrl = 'http://localhost:5000/public/qr-code.png';

//   const categories = ['Water Supply', 'Electricity', 'Roads', 'Sanitation', 'Public Transport'];

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.name) newErrors.name = 'Name is required';
//     if (!formData.phone) newErrors.phone = 'Phone number is required';
//     else if (!/^\+?\d{10,15}$/.test(formData.phone)) newErrors.phone = 'Invalid phone number';
//     if (!formData.category) newErrors.category = 'Category is required';
//     if (!formData.description) newErrors.description = 'Description is required';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     setErrors({ ...errors, [name]: '' });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file && !file.type.startsWith('image/')) {
//       setErrors({ ...errors, photo: 'Only image files are allowed' });
//       return;
//     }
//     if (file && file.size > 5 * 1024 * 1024) {
//       setErrors({ ...errors, photo: 'File size must be less than 5MB' });
//       return;
//     }
//     setFormData({ ...formData, photo: file });
//     setErrors({ ...errors, photo: '' });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setLoading(true);
//     const data = new FormData();
//     data.append('name', formData.name);
//     data.append('phone', formData.phone);
//     data.append('email', formData.email);
//     data.append('category', formData.category);
//     data.append('description', formData.description);
//     if (formData.photo) data.append('photo', formData.photo);

//     try {
//       const response = await axios.post('http://localhost:5000/api/complaints/public', data, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       setSubmission(response.data);
//       setFormData({ name: '', phone: '', email: '', category: '', description: '', photo: null });
//       setErrors({});
//     } catch (error) {
//       setErrors({
//         submit: error.response?.data?.error || 'An error occurred while submitting the complaint',
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const downloadQRCode = () => {
//     const downloadLink = document.createElement('a');
//     downloadLink.href = qrCodeUrl;
//     downloadLink.download = 'complaint-form-qr.png';
//     document.body.appendChild(downloadLink);
//     downloadLink.click();
//     document.body.removeChild(downloadLink);
//   };

//   if (submission) {
//     return (
//       <ThemeProvider theme={theme}>
//         <Box sx={{ maxWidth: 800, mx: 'auto', py: 4 }}>
//           <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', p: 3 }}>
//             <CardContent>
//               <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
//                 Complaint Submitted
//               </Typography>
//               <Typography variant="body1" sx={{ mb: 2 }}>
//                 Your complaint has been successfully submitted.
//               </Typography>
//               <Typography variant="body2" sx={{ mb: 1 }}>
//                 <strong>Complaint ID:</strong> {submission.complaintId}
//               </Typography>
//               <Typography variant="body2" sx={{ mb: 3 }}>
//                 <strong>Tracking Link:</strong>{' '}
//                 <a href={submission.trackingLink}>{submission.trackingLink}</a>
//               </Typography>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 component={Link}
//                 to={`/track/${submission.trackingId}`}
//                 sx={{ mb: 2 }}
//               >
//                 Track Complaint
//               </Button>
//             </CardContent>
//           </Card>
//         </Box>
//       </ThemeProvider>
//     );
//   }

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ maxWidth: 800, mx: 'auto', py: 4 }}>
//         <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', p: 3 }}>
//           <CardContent>
//             <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
//               Submit a Complaint
//             </Typography>
//             {errors.submit && (
//               <Alert severity="error" sx={{ mb: 3 }}>
//                 {errors.submit}
//               </Alert>
//             )}
//             <form onSubmit={handleSubmit}>
//               <Grid container spacing={3}>
//                 <Grid item xs={12}>
//                   <TextField
//                     fullWidth
//                     label="Name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     error={!!errors.name}
//                     helperText={errors.name}
//                     required
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     fullWidth
//                     label="Phone Number"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     error={!!errors.phone}
//                     helperText={errors.phone}
//                     required
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     fullWidth
//                     label="Email (Optional)"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     type="email"
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     fullWidth
//                     select
//                     label="Category"
//                     name="category"
//                     value={formData.category}
//                     onChange={handleChange}
//                     error={!!errors.category}
//                     helperText={errors.category}
//                     required
//                   >
//                     {categories.map((cat) => (
//                       <MenuItem key={cat} value={cat}>
//                         {cat}
//                       </MenuItem>
//                     ))}
//                   </TextField>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     fullWidth
//                     label="Description"
//                     name="description"
//                     value={formData.description}
//                     onChange={handleChange}
//                     multiline
//                     rows={4}
//                     error={!!errors.description}
//                     helperText={errors.description}
//                     required
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Input
//                     type="file"
//                     onChange={handleFileChange}
//                     accept="image/*"
//                     fullWidth
//                     sx={{ mb: 1 }}
//                   />
//                   {errors.photo && (
//                     <Typography color="error" variant="caption">
//                       {errors.photo}
//                     </Typography>
//                   )}
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Button
//                     type="submit"
//                     variant="contained"
//                     color="primary"
//                     disabled={loading}
//                     fullWidth
//                     sx={{ py: 1.5 }}
//                   >
//                     {loading ? <CircularProgress size={24} /> : 'Submit Complaint'}
//                   </Button>
//                 </Grid>
//               </Grid>
//             </form>
//           </CardContent>
//         </Card>
//         <Card sx={{ mt: 4, borderRadius: '16px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', p: 3 }}>
//           <CardContent>
//             <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
//               Scan to Submit a Complaint
//             </Typography>
//             <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
//               <img
//                 src={qrCodeUrl}
//                 alt="QR Code"
//                 style={{ width: 200, height: 200 }}
//                 onError={() => setErrors({ ...errors, qr: 'Failed to load QR code' })}
//               />
//             </Box>
//             {errors.qr ? (
//               <Alert severity="error" sx={{ mb: 2 }}>
//                 {errors.qr}
//               </Alert>
//             ) : (
//               <Button
//                 variant="outlined"
//                 color="primary"
//                 onClick={downloadQRCode}
//                 sx={{ display: 'block', mx: 'auto' }}
//               >
//                 Download QR Code
//               </Button>
//             )}
//           </CardContent>
//         </Card>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default ComplaintForm;
import { useState } from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  Grid,
  Input,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { Link } from 'react-router-dom';
import theme from '../theme';

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    category: '',
    description: '',
    photo: null,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submission, setSubmission] = useState(null);
  const qrCodeUrl = 'http://localhost:5000/public/qr-code.png';
  const gupshupQrCodeUrl = 'http://localhost:5000/public/gupshup-whatsapp-qr.png';
  const gupshupChatLink = `https://wa.me/${process.env.REACT_APP_GUPSHUP_PHONE_NUMBER}?text=File%20Complaint`;

  const categories = ['Water Supply', 'Electricity', 'Roads', 'Sanitation', 'Public Transport'];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    else if (!/^\+?\d{10,15}$/.test(formData.phone)) newErrors.phone = 'Invalid phone number';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.description) newErrors.description = 'Description is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && !file.type.startsWith('image/')) {
      setErrors({ ...errors, photo: 'Only image files are allowed' });
      return;
    }
    if (file && file.size > 5 * 1024 * 1024) {
      setErrors({ ...errors, photo: 'File size must be less than 5MB' });
      return;
    }
    setFormData({ ...formData, photo: file });
    setErrors({ ...errors, photo: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const data = new FormData();
    data.append('name', formData.name);
    data.append('phone', formData.phone);
    data.append('email', formData.email);
    data.append('category', formData.category);
    data.append('description', formData.description);
    if (formData.photo) data.append('photo', formData.photo);

    try {
      const response = await axios.post('http://localhost:5000/api/complaints/public', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSubmission(response.data);
      setFormData({ name: '', phone: '', email: '', category: '', description: '', photo: null });
      setErrors({});
    } catch (error) {
      setErrors({
        submit: error.response?.data?.error || 'An error occurred while submitting the complaint',
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadQRCode = (type) => {
    const url = type === 'website' ? qrCodeUrl : gupshupQrCodeUrl;
    const filename = type === 'website' ? 'complaint-form-qr.png' : 'gupshup-whatsapp-qr.png';
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = filename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  if (submission) {
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ maxWidth: 800, mx: 'auto', py: 4 }}>
          <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', p: 3 }}>
            <CardContent>
              <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
                Complaint Submitted
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Your complaint has been successfully submitted.
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Complaint ID:</strong> {submission.complaintId}
              </Typography>
              <Typography variant="body2" sx={{ mb: 3 }}>
                <strong>Tracking Link:</strong>{' '}
                <a href={submission.trackingLink}>{submission.trackingLink}</a>
              </Typography>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to={`/track/${submission.trackingId}`}
                sx={{ mb: 2 }}
              >
                Track Complaint
              </Button>
            </CardContent>
          </Card>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ maxWidth: 800, mx: 'auto', py: 4 }}>
        <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', p: 3 }}>
          <CardContent>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
              Submit a Complaint
            </Typography>
            {errors.submit && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {errors.submit}
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={!!errors.name}
                    helperText={errors.name}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    error={!!errors.phone}
                    helperText={errors.phone}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email (Optional)"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    select
                    label="Category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    error={!!errors.category}
                    helperText={errors.category}
                    required
                  >
                    {categories.map((cat) => (
                      <MenuItem key={cat} value={cat}>
                        {cat}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    error={!!errors.description}
                    helperText={errors.description}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    fullWidth
                    sx={{ mb: 1 }}
                  />
                  {errors.photo && (
                    <Typography color="error" variant="caption">
                      {errors.photo}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    fullWidth
                    sx={{ py: 1.5 }}
                  >
                    {loading ? <CircularProgress size={24} /> : 'Submit Complaint'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
        <Card sx={{ mt: 4, borderRadius: '16px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', p: 3 }}>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
              Scan to Submit a Complaint
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <img
                src={qrCodeUrl}
                alt="Website QR Code"
                style={{ width: 200, height: 200 }}
                onError={() => setErrors({ ...errors, qr: 'Failed to load website QR code' })}
              />
            </Box>
            {errors.qr ? (
              <Alert severity="error" sx={{ mb: 2 }}>
                {errors.qr}
              </Alert>
            ) : (
              <Button
                variant="outlined"
                color="primary"
                onClick={() => downloadQRCode('website')}
                sx={{ display: 'block', mx: 'auto', mb: 2 }}
              >
                Download Website QR Code
              </Button>
            )}
          </CardContent>
        </Card>
        <Card sx={{ mt: 4, borderRadius: '16px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', p: 3 }}>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
              Track via WhatsApp
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              File a complaint directly through WhatsApp by scanning the QR code below or clicking the chat link.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <img
                src={gupshupQrCodeUrl}
                alt="WhatsApp QR Code"
                style={{ width: 200, height: 200 }}
                onError={() => setErrors({ ...errors, gupshupQr: 'Failed to load WhatsApp QR code' })}
              />
            </Box>
            {errors.gupshupQr ? (
              <Alert severity="error" sx={{ mb: 2 }}>
                {errors.gupshupQr}
              </Alert>
            ) : (
              <>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => downloadQRCode('gupshup')}
                  sx={{ display: 'block', mx: 'auto', mb: 2 }}
                >
                  Download WhatsApp QR Code
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  href={gupshupChatLink}
                  target="_blank"
                  sx={{ display: 'block', mx: 'auto' }}
                >
                  Start WhatsApp Chat
                </Button>
              </>
            )}
            <Typography variant="body2" sx={{ mt: 2 }}>
              <strong>Steps to File a Complaint via WhatsApp:</strong>
              <ol>
                <li>Scan the QR code or click the "Start WhatsApp Chat" button.</li>
                <li>Send "File Complaint" to start the process.</li>
                <li>Follow the bot’s instructions to provide your name, phone, category, description, and optional photo or email.</li>
                <li>Receive a complaint ID and tracking link to monitor your complaint’s status.</li>
              </ol>
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
};

export default ComplaintForm;