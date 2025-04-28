// import { useState } from 'react';
// import axios from 'axios';

// const RegisteredComplaint = ({ token, user, onLogout }) => {
//   const [complaint, setComplaint] = useState({ title: '', description: '' });
//   const [error, setError] = useState('');

//   const handleComplaintSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/api/complaints', complaint, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setComplaint({ title: '', description: '' });
//       setError('');
//       alert('Complaint submitted successfully');
//     } catch (error) {
//       setError(error.response?.data?.error || 'An error occurred');
//     }
//   };

//   return (
//     <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Submit Complaint, {user.name}</h2>
//       {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
//       <form onSubmit={handleComplaintSubmit} className="space-y-4">
//         <div>
//           <label htmlFor="title" className="block text-sm font-medium text-gray-700">
//             Complaint Title
//           </label>
//           <input
//             type="text"
//             id="title"
//             placeholder="Enter complaint title"
//             value={complaint.title}
//             onChange={(e) => setComplaint({ ...complaint, title: e.target.value })}
//             className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="description" className="block text-sm font-medium text-gray-700">
//             Complaint Description
//           </label>
//           <textarea
//             id="description"
//             placeholder="Enter complaint description"
//             value={complaint.description}
//             onChange={(e) => setComplaint({ ...complaint, description: e.target.value })}
//             className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//             rows="5"
//             required
//           ></textarea>
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition duration-300"
//         >
//           Submit Complaint
//         </button>
//       </form>
//       <button
//         onClick={onLogout}
//         className="w-full mt-4 bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition duration-300"
//       >
//         Logout
//       </button>
//     </div>
//   );
// };

// export default RegisteredComplaint;
import { useState } from 'react';
import axios from 'axios';

const RegisteredComplaint = ({ user, onLogout }) => {
  const [complaint, setComplaint] = useState({ title: '', description: '' });
  const [error, setError] = useState('');

  const handleComplaintSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/complaints', complaint, {
        withCredentials: true,
      });
      setComplaint({ title: '', description: '' });
      setError('');
      alert('Complaint submitted successfully');
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Submit Complaint, {user.name}</h2>
      {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
      <form onSubmit={handleComplaintSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Complaint Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter complaint title"
            value={complaint.title}
            onChange={(e) => setComplaint({ ...complaint, title: e.target.value })}
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Complaint Description
          </label>
          <textarea
            id="description"
            placeholder="Enter complaint description"
            value={complaint.description}
            onChange={(e) => setComplaint({ ...complaint, description: e.target.value })}
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            rows="5"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition duration-300"
        >
          Submit Complaint
        </button>
      </form>
      <button
        onClick={onLogout}
        className="w-full mt-4 bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition duration-300"
      >
        Logout
      </button>
    </div>
  );
};

export default RegisteredComplaint;