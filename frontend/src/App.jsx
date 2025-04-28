// import { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
// import axios from 'axios';
// import Register from './components/Register';
// import Login from './components/Login';
// import RegisteredComplaint from './components/RegisteredComplaint';
// import CitizenDashboard from './components/CitizenDashboard';
// import './index.css';

// const App = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/user', {
//           withCredentials: true,
//         });
//         setUser(response.data);
//       } catch (error) {
//         setUser(null);
//       }
//     };
//     fetchUser();
//   }, []);

//   const handleLoginSuccess = (userData) => {
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
//     return user ? children : <Navigate to="/login" />;
//   };

//   return (
//     <Router>
//       <div className="min-h-screen bg-gray-100 flex flex-col">
//         <nav className="bg-blue-600 p-4 shadow-md">
//           <div className="container mx-auto flex justify-between items-center">
//             <h1 className="text-white text-2xl font-bold">CCRS</h1>
//             <div className="space-x-4">
//               {!user ? (
//                 <>
//                   <Link to="/register" className="text-white hover:text-gray-200">
//                     Register
//                   </Link>
//                   <Link to="/login" className="text-white hover:text-gray-200">
//                     Login
//                   </Link>
//                 </>
//               ) : (
//                 <>
//                   <Link to="/dashboard" className="text-white hover:text-gray-200">
//                     Dashboard
//                   </Link>
//                   <Link to="/complaint" className="text-white hover:text-gray-200">
//                     Submit Complaint
//                   </Link>
//                   <button
//                     onClick={handleLogout}
//                     className="text-white hover:text-gray-200"
//                   >
//                     Logout
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         </nav>
//         <div className="flex-1 flex items-center justify-center p-4">
//           <Routes>
//             <Route
//               path="/register"
//               element={<Register onRegisterSuccess={handleRegisterSuccess} />}
//             />
//             <Route
//               path="/login"
//               element={<Login onLoginSuccess={handleLoginSuccess} />}
//             />
//             <Route
//               path="/complaint"
//               element={
//                 <ProtectedRoute>
//                   <RegisteredComplaint user={user} onLogout={handleLogout} />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/dashboard"
//               element={
//                 <ProtectedRoute>
//                   <CitizenDashboard user={user} onLogout={handleLogout} />
//                 </ProtectedRoute>
//               }
//             />
//             <Route path="/" element={<Navigate to="/login" />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// };

// export default App;
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import Register from './components/Register';
import Login from './components/Login';
import RegisteredComplaint from './components/RegisteredComplaint';
import CitizenDashboard from './components/CitizenDashboard';
import './index.css';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user', {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleRegisterSuccess = () => {
    alert('Registration successful! Please login.');
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/logout', {}, { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const ProtectedRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <nav className="bg-blue-600 p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-white text-2xl font-bold">CCRS</h1>
            <div className="space-x-4">
              {!user ? (
                <>
                  <Link to="/register" className="text-white hover:text-gray-200">
                    Register
                  </Link>
                  <Link to="/login" className="text-white hover:text-gray-200">
                    Login
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/dashboard" className="text-white hover:text-gray-200">
                    Dashboard
                  </Link>
                  <Link to="/complaint" className="text-white hover:text-gray-200">
                    Submit Complaint
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-white hover:text-gray-200"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </nav>
        <div className="flex-1 flex items-center justify-center p-4">
          <Routes>
            <Route
              path="/register"
              element={<Register onRegisterSuccess={handleRegisterSuccess} />}
            />
            <Route
              path="/login"
              element={<Login onLoginSuccess={handleLoginSuccess} />}
            />
            <Route
              path="/complaint"
              element={
                <ProtectedRoute>
                  <RegisteredComplaint user={user} onLogout={handleLogout} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <CitizenDashboard user={user} onLogout={handleLogout} />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;