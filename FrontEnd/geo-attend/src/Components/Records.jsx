import React, { useState } from 'react';
import './Records.css'; // Optional if you're using custom CSS

export default function AttendanceSummary() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);

  const fetchRecords = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://127.0.0.1:8000/attendance-records/', {
        method: 'POST', // Correct HTTP method
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error fetching records');
      }

      setRecords(data.records || []);
    } catch (err) {
      setError(err.message);
      setRecords([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
           Attendance Records
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Username"
            className="w-full sm:w-80 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            onClick={fetchRecords}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-md shadow"
          >
            Fetch Records
          </button>
        </div>

        {loading && (
          <p className="text-center text-gray-600 font-medium">Loading records...</p>
        )}

        {error && (
          <p className="text-center text-red-500 font-semibold">{error}</p>
        )}

        {!loading && !error && records.length === 0 && (
          <p className="text-center text-gray-500">No records found.</p>
        )}

        {!loading && !error && records.length > 0 && (
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full text-left border border-gray-300 rounded-md">
              <thead className="bg-purple-600 text-white">
                <tr>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Time In</th>
                  <th className="px-6 py-3">Time Out</th>
                  <th className="px-6 py-3">Location</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {records.map((record, index) => (
                  <tr key={index} className="hover:bg-purple-50 transition">
                    <td className="px-6 py-3">{record.date}</td>
                    <td className="px-6 py-3">{record.time_in || '—'}</td>
                    <td className="px-6 py-3">{record.time_out || '—'}</td>
                    <td className="px-6 py-3">{record.location || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
