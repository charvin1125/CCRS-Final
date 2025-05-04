// import { useNavigate } from 'react-router-dom';
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Container,
//   Grid,
//   Typography,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   IconButton,
//   List,
//   ListItem,
//   ListItemText,
//   Fade,
//   Zoom,
// } from '@mui/material';
// import { ThemeProvider } from '@mui/material/styles';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import WebIcon from '@mui/icons-material/Web';
// import QrCodeIcon from '@mui/icons-material/QrCode';
// import ChatIcon from '@mui/icons-material/Chat';
// import SupportAgentIcon from '@mui/icons-material/SupportAgent';
// import LoginIcon from '@mui/icons-material/Login';
// import ReportIcon from '@mui/icons-material/Report';
// import TrackChangesIcon from '@mui/icons-material/TrackChanges';
// import FeedbackIcon from '@mui/icons-material/Feedback';
// import LanguageIcon from '@mui/icons-material/Language';
// import EscalatorWarningIcon from '@mui/icons-material/EscalatorWarning';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import TwitterIcon from '@mui/icons-material/Twitter';
// import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import theme from '../theme';

// const Home = () => {
//   const navigate = useNavigate();

//   const features = [
//     {
//       icon: <LanguageIcon color="primary" fontSize="large" />,
//       title: 'Multi-channel Support',
//       description: 'Submit complaints via QR, WhatsApp, or Website.',
//     },
//     {
//       icon: <EscalatorWarningIcon color="primary" fontSize="large" />,
//       title: 'Auto-escalation',
//       description: 'Unresolved complaints are escalated automatically.',
//     },
//     {
//       icon: <VisibilityIcon color="primary" fontSize="large" />,
//       title: 'Transparent Tracking',
//       description: 'Track your complaint status in real-time.',
//     },
//     {
//       icon: <AccountCircleIcon color="primary" fontSize="large" />,
//       title: 'Officer Accountability',
//       description: 'Officers are accountable for timely resolution.',
//     },
//   ];

//   const steps = [
//     {
//       icon: <LoginIcon color="primary" fontSize="large" />,
//       title: 'Register / Login',
//       description: 'Create an account or log in to start filing complaints.',
//     },
//     {
//       icon: <ReportIcon color="primary" fontSize="large" />,
//       title: 'Submit Complaint',
//       description: 'File your grievance through our easy-to-use platform.',
//     },
//     {
//       icon: <TrackChangesIcon color="primary" fontSize="large" />,
//       title: 'Track Status via Email/WhatsApp',
//       description: 'Receive updates on your complaint status.',
//     },
//     {
//       icon: <FeedbackIcon color="primary" fontSize="large" />,
//       title: 'Resolution + Feedback',
//       description: 'Get your issue resolved and provide feedback.',
//     },
//   ];

//   const accessPoints = [
//     {
//       icon: <WebIcon fontSize="large" color="primary" />,
//       title: 'Website',
//       description: 'Access CCRS through our user-friendly website.',
//     },
//     {
//       icon: <QrCodeIcon fontSize="large" color="primary" />,
//       title: 'QR Code at Office',
//       description: 'Scan QR codes at government offices to file complaints.',
//     },
//     {
//       icon: <ChatIcon fontSize="large" color="primary" />,
//       title: 'WhatsApp Bot',
//       description: 'Use our WhatsApp bot for quick complaint submission.',
//     },
//     {
//       icon: <SupportAgentIcon fontSize="large" color="primary" />,
//       title: 'Helpdesk Operator',
//       description: 'Contact our helpdesk for assisted complaint filing.',
//     },
//   ];

//   const faqs = [
//     {
//       question: 'What is CCRS?',
//       answer: 'CCRS is a Comprehensive Complaint Redressal System that allows citizens to submit and track grievances across multiple channels.',
//     },
//     {
//       question: 'How do I submit a complaint?',
//       answer: 'You can submit a complaint via our website, WhatsApp bot, QR code at offices, or through a helpdesk operator after registering or logging in.',
//     },
//     {
//       question: 'How can I track my complaint?',
//       answer: 'After submitting a complaint, you’ll receive status updates via email or WhatsApp, and you can track it on the website.',
//     },
//     {
//       question: 'What happens if my complaint is not resolved?',
//       answer: 'Unresolved complaints are automatically escalated to senior officers for prompt action.',
//     },
//   ];

//   return (
//     <ThemeProvider theme={theme}>
//       {/* Introduction Section */}
//       <Fade in timeout={1000}>
//         <Box sx={{ bgcolor: 'grey.100', py: 8, borderBottom: '1px solid', borderColor: 'grey.300' }}>
//           <Container maxWidth="lg">
//             <Typography
//               variant="h4"
//               align="center"
//               color="primary"
//               gutterBottom
//               sx={{ fontWeight: 'bold', mb: 3 }}
//               aria-label="Welcome to CCRS"
//             >
//               Welcome to CCRS
//             </Typography>
//             <Typography
//               variant="body1"
//               align="center"
//               color="text.secondary"
//               sx={{ maxWidth: 700, mx: 'auto', lineHeight: 1.6 }}
//             >
//               The Comprehensive Complaint Redressal System (CCRS) is your trusted platform for addressing public grievances. From water supply issues to road maintenance, we ensure your concerns are resolved transparently and efficiently.
//             </Typography>
//           </Container>
//         </Box>
//       </Fade>

//       {/* Hero Section */}
//       <Box
//         sx={{
//           py: 14,
//           bgcolor: 'linear-gradient(135deg, #1e3a8a 20%, #06b6d4 80%)',
//           color: '#f5f5f5',
//           position: 'relative',
//           overflow: 'hidden',
//         }}
//       >
//         {/* Overlay for depth */}
//         <Box
//           sx={{
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             width: '100%',
//             height: '100%',
//             bgcolor: 'rgba(0,0,0,0.2)',
//             zIndex: 1,
//           }}
//         />
//         {/* Decorative Shape */}
//         <Box
//           sx={{
//             position: 'absolute',
//             bottom: 0,
//             left: 0,
//             width: '100%',
//             height: '100px',
//             bgcolor: 'background.paper',
//             clipPath: 'polygon(0 100%, 100% 0, 100% 100%)',
//             zIndex: 2,
//           }}
//         />
//         <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 3 }}>
//           <Grid container spacing={6} alignItems="center">
//             <Grid item xs={12} md={6}>
//               <Zoom in timeout={1500}>
//                 <Box>
//                   <Typography
//                     variant="h2"
//                     gutterBottom
//                     sx={{
//                       fontWeight: 'bold',
//                       fontSize: { xs: '2.8rem', md: '4rem' },
//                       textShadow: '0 2px 4px rgba(0,0,0,0.3)',
//                     }}
//                     aria-label="Comprehensive Complaint Redressal System"
//                   >
//                     Comprehensive Complaint Redressal System
//                   </Typography>
//                   <Typography
//                     variant="h5"
//                     gutterBottom
//                     sx={{ mb: 5, lineHeight: 1.6, fontWeight: 'medium', opacity: 0.9 }}
//                   >
//                     Submit your grievance via website, WhatsApp, or Helpdesk.{' '}
//                     <Box component="span" sx={{ color: 'secondary.main' }}>
//                       Transparent. Fast. Accountable.
//                     </Box>
//                   </Typography>
//                   <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
//                     <Button
//                       variant="contained"
//                       color="secondary"
//                       size="large"
//                       onClick={() => navigate('/complaint')}
//                       sx={{
//                         px: 5,
//                         py: 1.8,
//                         boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
//                         '&:hover': {
//                           boxShadow: '0 6px 16px rgba(220,0,78,0.5)',
//                           transform: 'scale(1.08)',
//                           transition: 'all 0.3s ease',
//                         },
//                       }}
//                       aria-label="Submit a new complaint"
//                     >
//                       Submit Complaint
//                     </Button>
//                     <Button
//                       variant="outlined"
//                       sx={{
//                         px: 5,
//                         py: 1.8,
//                         borderWidth: 2,
//                         color: '#f5f5f5',
//                         borderColor: '#f5f5f5',
//                         '&:hover': {
//                           bgcolor: 'rgba(255,255,255,0.1)',
//                           transform: 'scale(1.08)',
//                           borderWidth: 2,
//                           boxShadow: '0 4px 12px rgba(255,255,255,0.3)',
//                           transition: 'all 0.3s ease',
//                         },
//                       }}
//                       size="large"
//                       onClick={() => navigate('/login')}
//                       aria-label="Track your complaint"
//                     >
//                       Track Complaint
//                     </Button>
//                   </Box>
//                 </Box>
//               </Zoom>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <Zoom in timeout={2000}>
//                 <Grid container spacing={4}>
//                   <Grid item xs={6}>
//                     <Box
//                       component="img"
//                       src="https://images.unsplash.com/photo-1491438590914-543f90f0e683?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
//                       alt="Citizen illustration"
//                       sx={{
//                         width: '100%',
//                         borderRadius: 4,
//                         boxShadow: '0 6px 20px rgba(0,0,0,0.4)',
//                         transition: 'transform 0.3s ease',
//                         '&:hover': { transform: 'translateY(-8px) rotate(2deg)' },
//                       }}
//                     />
//                   </Grid>
//                   <Grid item xs={6}>
//                     <Box
//                       component="img"
//                       src="https://images.unsplash.com/photo-1516321318423-531e726761f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
//                       alt="Support system illustration"
//                       sx={{
//                         width: '100%',
//                         borderRadius: 4,
//                         boxShadow: '0 6px 20px rgba(0,0,0,0.4)',
//                         transition: 'transform 0.3s ease',
//                         '&:hover': { transform: 'translateY(-8px) rotate(-2deg)' },
//                       }}
//                     />
//                   </Grid>
//                 </Grid>
//               </Zoom>
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>

//       {/* About CCRS Section */}
//       <Fade in timeout={1000}>
//         <Box
//           sx={{
//             py: 12,
//             bgcolor: 'linear-gradient(to bottom, #ffffff, #e3f2fd)',
//             position: 'relative',
//           }}
//         >
//           <Container maxWidth="lg">
//             <Grid container spacing={6} alignItems="center">
//               <Grid item xs={12} md={5}>
//                 <Typography
//                   variant="h4"
//                   gutterBottom
//                   sx={{ fontWeight: 'bold', color: 'primary.main', mb: 3 }}
//                   aria-label="About CCRS"
//                 >
//                   About CCRS
//                 </Typography>
//                 <Typography
//                   variant="h6"
//                   sx={{ color: 'text.secondary', mb: 4, fontStyle: 'italic', lineHeight: 1.6 }}
//                 >
//                   CCRS is a citizen-centric platform designed to streamline public grievance redressal with transparency and efficiency.
//                 </Typography>
//                 <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
//                   Our mission is to empower citizens by providing multiple channels to voice their concerns and ensuring timely resolution through automated escalation and officer accountability.
//                 </Typography>
//               </Grid>
//               <Grid item xs={12} md={7}>
//                 <Typography
//                   variant="h5"
//                   gutterBottom
//                   sx={{ fontWeight: 'bold', color: 'primary.main', mb: 4, textAlign: 'center' }}
//                 >
//                   Key Features
//                 </Typography>
//                 <Grid container spacing={4}>
//                   {features.map((feature, index) => (
//                     <Grid item xs={12} sm={6} key={index}>
//                       <Zoom in timeout={1000 + index * 300}>
//                         <Card
//                           sx={{
//                             p: 3,
//                             borderRadius: 4,
//                             boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
//                             border: '2px solid',
//                             borderColor: 'primary.main',
//                             transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//                             '&:hover': {
//                               transform: 'scale(1.05)',
//                               boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
//                             },
//                           }}
//                         >
//                           <CardContent sx={{ textAlign: 'center' }}>
//                             <Box sx={{ mb: 3, fontSize: '3rem', color: 'primary.main' }}>
//                               {feature.icon}
//                             </Box>
//                             <Typography
//                               variant="h6"
//                               sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}
//                             >
//                               {feature.title}
//                             </Typography>
//                             <Typography variant="body2" color="text.secondary">
//                               {feature.description}
//                             </Typography>
//                           </CardContent>
//                         </Card>
//                       </Zoom>
//                     </Grid>
//                   ))}
//                 </Grid>
//               </Grid>
//             </Grid>
//           </Container>
//         </Box>
//       </Fade>

//       {/* How It Works Section */}
//       <Fade in timeout={1000}>
//         <Box
//           sx={{
//             py: 12,
//             bgcolor: 'linear-gradient(to top, #e3f2fd, #ffffff)',
//             position: 'relative',
//           }}
//         >
//           <Container maxWidth="lg">
//             <Typography
//               variant="h4"
//               align="center"
//               color="primary.main"
//               gutterBottom
//               sx={{ fontWeight: 'bold', mb: 6 }}
//               aria-label="How It Works"
//             >
//               How It Works
//             </Typography>
//             <Grid container spacing={4} sx={{ position: 'relative' }}>
//               {steps.map((step, index) => (
//                 <Grid item xs={12} sm={6} md={3} key={index}>
//                   <Zoom in timeout={1000 + index * 300}>
//                     <Box sx={{ textAlign: 'center', position: 'relative' }}>
//                       {/* Step Indicator */}
//                       <Box
//                         sx={{
//                           width: 50,
//                           height: 50,
//                           borderRadius: '50%',
//                           bgcolor: 'primary.main',
//                           color: 'white',
//                           display: 'flex',
//                           alignItems: 'center',
//                           justifyContent: 'center',
//                           fontSize: '1.5rem',
//                           fontWeight: 'bold',
//                           mb: 3,
//                           mx: 'auto',
//                           boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
//                         }}
//                       >
//                         {index + 1}
//                       </Box>
//                       {/* Connecting Line */}
//                       {index < steps.length - 1 && (
//                         <Box
//                           sx={{
//                             position: 'absolute',
//                             top: 25,
//                             left: '50%',
//                             width: '100%',
//                             height: 2,
//                             bgcolor: 'primary.main',
//                             zIndex: -1,
//                             display: { xs: 'none', md: 'block' },
//                           }}
//                         />
//                       )}
//                       <Card
//                         sx={{
//                           p: 3,
//                           borderRadius: 4,
//                           boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
//                           transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//                           '&:hover': {
//                             transform: 'translateY(-8px)',
//                             boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
//                           },
//                         }}
//                       >
//                         <CardContent>
//                           <Box sx={{ mb: 3, fontSize: '2.5rem', color: 'primary.main' }}>
//                             {step.icon}
//                           </Box>
//                           <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
//                             {step.title}
//                           </Typography>
//                           <Typography variant="body2" color="text.secondary">
//                             {step.description}
//                           </Typography>
//                         </CardContent>
//                       </Card>
//                     </Box>
//                   </Zoom>
//                 </Grid>
//               ))}
//             </Grid>
//           </Container>
//         </Box>
//       </Fade>

//       {/* Access Points Section */}
//       <Fade in timeout={1000}>
//         <Box
//           sx={{
//             py: 12,
//             bgcolor: 'linear-gradient(to bottom, #ffffff, #e3f2fd)',
//             position: 'relative',
//             overflow: 'hidden',
//           }}
//         >
//           {/* Subtle Wave Background */}
//           <Box
//             sx={{
//               position: 'absolute',
//               top: 0,
//               left: 0,
//               width: '100%',
//               height: '100%',
//               opacity: 0.1,
//               background: 'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 1440 320%27%3E%3Cpath fill=%27%231976d2%27 d=%27M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,133.3C672,117,768,139,864,165.3C960,192,1056,224,1152,208C1248,192,1344,128,1392,96L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z%27%3E%3C/path%3E%3C/svg%3E")',
//               backgroundSize: 'cover',
//             }}
//           />
//           <Container maxWidth="lg" sx={{ position: 'relative' }}>
//             <Typography
//               variant="h4"
//               align="center"
//               color="primary.main"
//               gutterBottom
//               sx={{ fontWeight: 'bold', mb: 6 }}
//               aria-label="Access Points"
//             >
//               Access Points
//             </Typography>
//             <Grid container spacing={4}>
//               {accessPoints.map((point, index) => (
//                 <Grid item xs={12} sm={6} md={3} key={index}>
//                   <Zoom in timeout={1000 + index * 300}>
//                     <Card
//                       sx={{
//                         p: 3,
//                         borderRadius: 4,
//                         boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
//                         position: 'relative',
//                         overflow: 'hidden',
//                         transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//                         '&:hover': {
//                           transform: 'perspective(1000px) rotateX(5deg) rotateY(5deg)',
//                           boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
//                         },
//                       }}
//                     >
//                       <Box
//                         sx={{
//                           position: 'absolute',
//                           top: 0,
//                           left: 0,
//                           width: '100%',
//                           height: '100%',
//                           bgcolor: 'primary.main',
//                           opacity: 0.1,
//                           zIndex: 0,
//                         }}
//                       />
//                       <CardContent sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
//                         <Box sx={{ mb: 3, fontSize: '3rem', color: 'primary.main' }}>
//                           {point.icon}
//                         </Box>
//                         <Typography
//                           variant="h6"
//                           sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}
//                         >
//                           {point.title}
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary">
//                           {point.description}
//                         </Typography>
//                       </CardContent>
//                     </Card>
//                   </Zoom>
//                 </Grid>
//               ))}
//             </Grid>
//           </Container>
//         </Box>
//       </Fade>

//       {/* FAQ Section */}
//       <Fade in timeout={1000}>
//         <Box sx={{ py: 10, bgcolor: 'grey.100', borderTop: '1px solid', borderColor: 'grey.300' }}>
//           <Container maxWidth="lg">
//             <Typography
//               variant="h4"
//               align="center"
//               color="primary.main"
//               gutterBottom
//               sx={{ fontWeight: 'bold', mb: 4 }}
//               aria-label="Frequently Asked Questions"
//             >
//               Frequently Asked Questions
//             </Typography>
//             <Box sx={{ maxWidth: 800, mx: 'auto' }}>
//               {faqs.map((faq, index) => (
//                 <Accordion
//                   key={index}
//                   sx={{ mb: 2, boxShadow: 3, borderRadius: 2, '&:before': { display: 'none' } }}
//                 >
//                   <AccordionSummary
//                     expandIcon={<ExpandMoreIcon />}
//                     aria-controls={`faq-content-${index}`}
//                     id={`faq-header-${index}`}
//                   >
//                     <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
//                       {faq.question}
//                     </Typography>
//                   </AccordionSummary>
//                   <AccordionDetails>
//                     <Typography variant="body2" color="text.secondary">
//                       {faq.answer}
//                     </Typography>
//                   </AccordionDetails>
//                 </Accordion>
//               ))}
//             </Box>
//           </Container>
//         </Box>
//       </Fade>

//       {/* Footer Section */}
//       <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 6, mt: 4 }}>
//         <Container maxWidth="lg">
//           <Grid container spacing={4}>
//             <Grid item xs={12} sm={4}>
//               <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
//                 Contact Info
//               </Typography>
//               <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
//                 Email: support@ccrs.gov
//                 <br />
//                 Phone: +1-800-CCRS-HELP
//                 <br />
//                 Address: 123 Civic Center, City, Country
//               </Typography>
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
//                 Follow Us
//               </Typography>
//               <Box sx={{ display: 'flex', gap: 2 }}>
//                 <IconButton
//                   color="inherit"
//                   href="https://facebook.com"
//                   target="_blank"
//                   aria-label="Facebook"
//                   sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
//                 >
//                   <FacebookIcon />
//                 </IconButton>
//                 <IconButton
//                   color="inherit"
//                   href="https://twitter.com"
//                   target="_blank"
//                   aria-label="Twitter"
//                   sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
//                 >
//                   <TwitterIcon />
//                 </IconButton>
//                 <IconButton
//                   color="inherit"
//                   href="https://linkedin.com"
//                   target="_blank"
//                   aria-label="LinkedIn"
//                   sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
//                 >
//                   <LinkedInIcon />
//                 </IconButton>
//               </Box>
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
//                 Links
//               </Typography>
//               <List>
//                 <ListItem sx={{ p: 0, mb: 1 }}>
//                   <ListItemText
//                     primary={
//                       <Typography variant="body2">
//                         <Box
//                           component="a"
//                           href="/privacy-policy"
//                           sx={{ color: 'white', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
//                         >
//                           Privacy Policy
//                         </Box>
//                       </Typography>
//                     }
//                   />
//                 </ListItem>
//                 <ListItem sx={{ p: 0 }}>
//                   <ListItemText
//                     primary={
//                       <Typography variant="body2">
//                         <Box
//                           component="a"
//                           href="/terms"
//                           sx={{ color: 'white', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
//                         >
//                           Terms of Service
//                         </Box>
//                       </Typography>
//                     }
//                   />
//                 </ListItem>
//               </List>
//             </Grid>
//           </Grid>
//           <Typography variant="body2" align="center" sx={{ mt: 6, opacity: 0.8 }}>
//             © {new Date().getFullYear()} CCRS. All rights reserved.
//           </Typography>
//         </Container>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default Home;
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Fade,
  Zoom,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WebIcon from '@mui/icons-material/Web';
import QrCodeIcon from '@mui/icons-material/QrCode';
import ChatIcon from '@mui/icons-material/Chat';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import LoginIcon from '@mui/icons-material/Login';
import ReportIcon from '@mui/icons-material/Report';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import FeedbackIcon from '@mui/icons-material/Feedback';
import LanguageIcon from '@mui/icons-material/Language';
import EscalatorWarningIcon from '@mui/icons-material/EscalatorWarning';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import theme from '../theme';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <LanguageIcon color="primary" fontSize="medium" />,
      title: 'Multi-channel Support',
      description: 'Submit complaints via QR, WhatsApp, or Website.',
    },
    {
      icon: <EscalatorWarningIcon color="primary" fontSize="medium" />,
      title: 'Auto-escalation',
      description: 'Unresolved complaints are escalated automatically.',
    },
    {
      icon: <VisibilityIcon color="primary" fontSize="medium" />,
      title: 'Transparent Tracking',
      description: 'Track your complaint status in real-time.',
    },
    {
      icon: <AccountCircleIcon color="primary" fontSize="medium" />,
      title: 'Officer Accountability',
      description: 'Officers are accountable for timely resolution.',
    },
  ];

  const steps = [
    {
      icon: <LoginIcon color="primary" fontSize="medium" />,
      title: 'Register / Login',
      description: 'Create an account or log in to start filing complaints.',
    },
    {
      icon: <ReportIcon color="primary" fontSize="medium" />,
      title: 'Submit Complaint',
      description: 'File your grievance through our easy-to-use platform.',
    },
    {
      icon: <TrackChangesIcon color="primary" fontSize="medium" />,
      title: 'Track Status via Email/WhatsApp',
      description: 'Receive updates on your complaint status.',
    },
    {
      icon: <FeedbackIcon color="primary" fontSize="medium" />,
      title: 'Resolution + Feedback',
      description: 'Get your issue resolved and provide feedback.',
    },
  ];

  const accessPoints = [
    {
      icon: <WebIcon fontSize="medium" color="primary" />,
      title: 'Website',
      description: 'Access CCRS through our user-friendly website.',
    },
    {
      icon: <QrCodeIcon fontSize="medium" color="primary" />,
      title: 'QR Code at Office',
      description: 'Scan QR codes at government offices to file complaints.',
    },
    {
      icon: <ChatIcon fontSize="medium" color="primary" />,
      title: 'WhatsApp Bot',
      description: 'Use our WhatsApp bot for quick complaint submission.',
    },
    {
      icon: <SupportAgentIcon fontSize="medium" color="primary" />,
      title: 'Helpdesk Operator',
      description: 'Contact our helpdesk for assisted complaint filing.',
    },
  ];

  const faqs = [
    {
      question: 'What is CCRS?',
      answer: 'CCRS is a Comprehensive Complaint Redressal System that allows citizens to submit and track grievances across multiple channels.',
    },
    {
      question: 'How do I submit a complaint?',
      answer: 'You can submit a complaint via our website, WhatsApp bot, QR code at offices, or through a helpdesk operator after registering or logging in.',
    },
    {
      question: 'How can I track my complaint?',
      answer: 'After submitting a complaint, you’ll receive status updates via email or WhatsApp, and you can track it on the website.',
    },
    {
      question: 'What happens if my complaint is not resolved?',
      answer: 'Unresolved complaints are automatically escalated to senior officers for prompt action.',
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      {/* Introduction Section */}
      <Fade in timeout={1000}>
        <Box sx={{ bgcolor: 'grey.100', py: 8, borderBottom: '1px solid', borderColor: 'grey.300' }}>
          <Container maxWidth="lg">
            <Typography
              variant="h4"
              align="center"
              color="primary"
              gutterBottom
              sx={{ fontWeight: 'bold', mb: 3 }}
              aria-label="Welcome to CCRS"
            >
              Welcome to CCRS
            </Typography>
            <Typography
              variant="body1"
              align="center"
              color="text.secondary"
              sx={{ maxWidth: 700, mx: 'auto', lineHeight: 1.6 }}
            >
              The Comprehensive Complaint Redressal System (CCRS) is your trusted platform for addressing public grievances. From water supply issues to road maintenance, we ensure your concerns are resolved transparently and efficiently.
            </Typography>
          </Container>
        </Box>
      </Fade>

      {/* Hero Section */}
      <Box
        sx={{
          py: 14,
          bgcolor: 'linear-gradient(135deg, #1e3a8a 20%, #06b6d4 80%)',
          color: 'black',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            bgcolor: '#1976D2',
            zIndex: 1,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '100px',
            bgcolor: 'background.paper',
            clipPath: 'polygon(0 100%, 100% 0, 100% 100%)',
            zIndex: 2,
          }}
        />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 3 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Zoom in timeout={1500}>
                <Box>
                  <Typography
                    variant="h2"
                    gutterBottom
                    sx={{
                      fontWeight: 'bold',
                      fontSize: { xs: '2.8rem', md: '4rem' },
                      textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                    }}
                    aria-label="Comprehensive Complaint Redressal System"
                  >
                    Comprehensive Complaint Redressal System
                  </Typography>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ mb: 5, lineHeight: 1.6, fontWeight: 'medium', opacity: 0.9 }}
                  >
                    Submit your grievance via website, WhatsApp, or Helpdesk.{' '}
                    <Box component="span" sx={{ color: 'secondary.main' }}>
                      Transparent. Fast. Accountable.
                    </Box>
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      onClick={() => navigate('/complaint')}
                      sx={{
                        px: 5,
                        py: 1.8,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                        '&:hover': {
                          boxShadow: '0 6px 16px rgba(220,0,78,0.5)',
                          transform: 'scale(1.08)',
                          transition: 'all 0.3s ease',
                        },
                      }}
                      aria-label="Submit a new complaint"
                    >
                      Submit Complaint
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{
                        px: 5,
                        py: 1.8,
                        borderWidth: 2,
                        color: '#f5f5f5',
                        borderColor: '#f5f5f5',
                        '&:hover': {
                          bgcolor: 'rgba(255,255,255,0.1)',
                          transform: 'scale(1.08)',
                          borderWidth: 2,
                          boxShadow: '0 4px 12px rgba(255,255,255,0.3)',
                          transition: 'all 0.3s ease',
                        },
                      }}
                      size="large"
                      onClick={() => navigate('/login')}
                      aria-label="Track your complaint"
                    >
                      Track Complaint
                    </Button>
                  </Box>
                </Box>
              </Zoom>
            </Grid>
            <Grid item xs={12} md={6}>
              <Zoom in timeout={2000}>
                <Grid container spacing={4}>
                  <Grid item xs={6}>
                    <Box
                      component="img"
                      src="D:\Hackathon\ccrs\frontend\src\assets\images\Citizen-complaint.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
                      alt="Citizen illustration"
                      sx={{
                        width: '100%',
                        borderRadius: 4,
                        boxShadow: '0 6px 20px rgba(0,0,0,0.4)',
                        transition: 'transform 0.3s ease',
                        '&:hover': { transform: 'translateY(-8px) rotate(2deg)' },
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Box
                      component="img"
                      src="D:\Hackathon\ccrs\frontend\src\assets\images\Support-system.jpg"
                      alt="Support system illustration"
                      sx={{
                        width: '100%',
                        borderRadius: 4,
                        boxShadow: '0 6px 20px rgba(0,0,0,0.4)',
                        transition: 'transform 0.3s ease',
                        '&:hover': { transform: 'translateY(-8px) rotate(-2deg)' },
                      }}
                    />
                  </Grid>
                </Grid>
              </Zoom>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* About CCRS Section */}
      <Fade in timeout={1000}>
        <Box
          sx={{
            py: 12,
            bgcolor: 'linear-gradient(to bottom, #ffffff, #e3f2fd)',
            position: 'relative',
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={6} alignItems="center">
              <Grid item xs={12} md={5}>
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{ fontWeight: 'bold', color: 'primary.main', mb: 3 }}
                  aria-label="About CCRS"
                >
                  About CCRS
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: 'text.secondary', mb: 4, fontStyle: 'italic', lineHeight: 1.6 }}
                >
                  CCRS is a citizen-centric platform designed to streamline public grievance redressal with transparency and efficiency.
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                  Our mission is to empower citizens by providing multiple channels to voice their concerns and ensuring timely resolution through automated escalation and officer accountability.
                </Typography>
              </Grid>
              <Grid item xs={12} md={7}>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ fontWeight: 'bold', color: 'primary.main', mb: 4, textAlign: 'center' }}
                >
                  Key Features
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 3,
                    overflowX: 'auto',
                    pb: 2,
                    '&::-webkit-scrollbar': { height: '8px' },
                    '&::-webkit-scrollbar-thumb': { bgcolor: 'primary.main', borderRadius: '4px' },
                  }}
                >
                  {features.map((feature, index) => (
                    <Zoom in timeout={1000 + index * 300} key={index}>
                      <Card
                        sx={{
                          minWidth: 180,
                          maxWidth: 200,
                          p: 2,
                          borderRadius: 3,
                          boxShadow: '0 3px 10px rgba(0,0,0,0.2)',
                          border: '2px solid',
                          borderColor: 'primary.main',
                          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                          '&:hover': {
                            transform: 'scale(1.05)',
                            boxShadow: '0 6px 18px rgba(0,0,0,0.3)',
                          },
                        }}
                      >
                        <CardContent sx={{ textAlign: 'center', p: 2 }}>
                          <Box sx={{ mb: 2, fontSize: '2rem', color: 'primary.main' }}>
                            {feature.icon}
                          </Box>
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: 'bold', mb: 1, color: 'primary.main' }}
                          >
                            {feature.title}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {feature.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Zoom>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Fade>

      {/* How It Works Section */}
      <Fade in timeout={1000}>
        <Box
          sx={{
            py: 12,
            bgcolor: 'linear-gradient(to top, #e3f2fd, #ffffff)',
            position: 'relative',
          }}
        >
          <Container maxWidth="md">
            <Typography
              variant="h4"
              align="center"
              color="primary.main"
              gutterBottom
              sx={{ fontWeight: 'bold', mb: 6 }}
              aria-label="How It Works"
            >
              How It Works
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              {steps.map((step, index) => (
                <Zoom in timeout={1000 + index * 300} key={index}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column', sm: 'row' },
                      alignItems: 'center',
                      justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end',
                      width: '100%',
                      maxWidth: 600,
                      gap: 3,
                      alignSelf: index % 2 === 0 ? 'flex-start' : 'flex-end',
                      ml: index % 2 === 0 ? { xs: 0, sm: 4 } : 0,
                      mr: index % 2 === 1 ? { xs: 0, sm: 4 } : 0,
                    }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        boxShadow: '0 3px 10px rgba(0,0,0,0.2)',
                      }}
                    >
                      {index + 1}
                    </Box>
                    <Card
                      sx={{
                        flex: 1,
                        p: 2,
                        borderRadius: 3,
                        boxShadow: '0 3px 10px rgba(0,0,0,0.2)',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-6px)',
                          boxShadow: '0 6px 18px rgba(0,0,0,0.3)',
                        },
                      }}
                    >
                      <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ fontSize: '2rem', color: 'primary.main' }}>{step.icon}</Box>
                        <Box>
                          <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                            {step.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {step.description}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Box>
                </Zoom>
              ))}
            </Box>
          </Container>
        </Box>
      </Fade>

      {/* Access Points Section */}
      <Fade in timeout={1000}>
        <Box
          sx={{
            py: 12,
            bgcolor: 'linear-gradient(to bottom, #ffffff, #e3f2fd)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: 0.1,
              background:
                'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 1440 320%27%3E%3Cpath fill=%27%231976d2%27 d=%27M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,133.3C672,117,768,139,864,165.3C960,192,1056,224,1152,208C1248,192,1344,128,1392,96L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z%27%3E%3C/path%3E%3C/svg%3E")',
              backgroundSize: 'cover',
            }}
          />
          <Container maxWidth="lg" sx={{ position: 'relative' }}>
            <Typography
              variant="h4"
              align="center"
              color="primary.main"
              gutterBottom
              sx={{ fontWeight: 'bold', mb: 6 }}
              aria-label="Access Points"
            >
              Access Points
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 3,
                overflowX: 'auto',
                pb: 2,
                '&::-webkit-scrollbar': { height: '8px' },
                '&::-webkit-scrollbar-thumb': { bgcolor: 'primary.main', borderRadius: '4px' },
              }}
            >
              {accessPoints.map((point, index) => (
                <Zoom in timeout={1000 + index * 300} key={index}>
                  <Card
                    sx={{
                      minWidth: 200,
                      maxWidth: 220,
                      p: 2,
                      borderRadius: 3,
                      boxShadow: '0 3px 10px rgba(0,0,0,0.2)',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'perspective(1000px) rotateX(5deg) rotateY(5deg)',
                        boxShadow: '0 6px 18px rgba(0,0,0,0.3)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        bgcolor: 'primary.main',
                        opacity: 0.1,
                        zIndex: 0,
                      }}
                    />
                    <CardContent sx={{ textAlign: 'center', position: 'relative', zIndex: 1, p: 2 }}>
                      <Box sx={{ mb: 2, fontSize: '2.5rem', color: 'primary.main' }}>
                        {point.icon}
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 'bold', mb: 1, color: 'primary.main' }}
                      >
                        {point.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {point.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Zoom>
              ))}
            </Box>
          </Container>
        </Box>
      </Fade>

      {/* FAQ Section */}
      <Fade in timeout={1000}>
        <Box sx={{ py: 10, bgcolor: 'grey.100', borderTop: '1px solid', borderColor: 'grey.300' }}>
          <Container maxWidth="lg">
            <Typography
              variant="h4"
              align="center"
              color="primary.main"
              gutterBottom
              sx={{ fontWeight: 'bold', mb: 4 }}
              aria-label="Frequently Asked Questions"
            >
              Frequently Asked Questions
            </Typography>
            <Box sx={{ maxWidth: 800, mx: 'auto' }}>
              {faqs.map((faq, index) => (
                <Accordion
                  key={index}
                  sx={{ mb: 2, boxShadow: 3, borderRadius: 2, '&:before': { display: 'none' } }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`faq-content-${index}`}
                    id={`faq-header-${index}`}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
                      {faq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2" color="text.secondary">
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </Container>
        </Box>
      </Fade>

      {/* Footer Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 6, mt: 4 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={4}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                Contact Info
              </Typography>
              <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
                Email: support@ccrs.gov
                <br />
                Phone: +1-800-CCRS-HELP
                <br />
                Address: 123 Civic Center, City, Country
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                Follow Us
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <IconButton
                  color="inherit"
                  href="https://facebook.com"
                  target="_blank"
                  aria-label="Facebook"
                  sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
                >
                  <FacebookIcon />
                </IconButton>
                <IconButton
                  color="inherit"
                  href="https://twitter.com"
                  target="_blank"
                  aria-label="Twitter"
                  sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
                >
                  <TwitterIcon />
                </IconButton>
                <IconButton
                  color="inherit"
                  href="https://linkedin.com"
                  target="_blank"
                  aria-label="LinkedIn"
                  sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
                >
                  <LinkedInIcon />
                </IconButton>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                Links
              </Typography>
              <List>
                <ListItem sx={{ p: 0, mb: 1 }}>
                  <ListItemText
                    primary={
                      <Typography variant="body2">
                        <Box
                          component="a"
                          href="/privacy-policy"
                          sx={{ color: 'white', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                        >
                          Privacy Policy
                        </Box>
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem sx={{ p: 0 }}>
                  <ListItemText
                    primary={
                      <Typography variant="body2">
                        <Box
                          component="a"
                          href="/terms"
                          sx={{ color: 'white', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                        >
                          Terms of Service
                        </Box>
                      </Typography>
                    }
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
          <Typography variant="body2" align="center" sx={{ mt: 6, opacity: 0.8 }}>
            © {new Date().getFullYear()} CCRS. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Home;