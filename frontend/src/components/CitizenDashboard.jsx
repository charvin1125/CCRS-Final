import { useState, useEffect } from 'react';
import axios from 'axios';

const CitizenDashboard = ({ user, onLogout }) => {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/complaints/my-complaints', {
          withCredentials: true,
        });
        setComplaints(response.data);
        setError('');
      } catch (error) {
        setError(error.response?.data?.error || 'An error occurred');
      }
    };
    fetchComplaints();
  }, []);

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Your Complaints, {user.name}</h2>
      {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
      {complaints.length === 0 ? (
        <p className="text-gray-600 text-center">You have not submitted any complaints yet.</p>
      ) : (
        <div className="space-y-4">
          {complaints.map((complaint) => (
            <div key={complaint._id} className="border border-gray-200 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800">{complaint.title}</h3>
              <p className="text-gray-600 mt-1">{complaint.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                Status: <span className="font-medium">{complaint.status}</span>
              </p>
              <p className="text-sm text-gray-500">
                Submitted: {new Date(complaint.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
      <button
        onClick={onLogout}
        className="w-full mt-6 bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition duration-300"
      >
        Logout
      </button>
    </div>
  );
};

export default CitizenDashboard;