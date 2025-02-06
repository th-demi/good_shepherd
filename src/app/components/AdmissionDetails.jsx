'use client';
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

const AdmissionsDetails = () => {
  const [admissionsData, setAdmissionsData] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdmissions = async () => {
      try {
        const response = await fetch('/api/getAdmissions');
        const data = await response.json();

        if (response.ok) {
          setAdmissionsData(data.data);
        } else {
          setError(data.error || 'Failed to fetch data.');
        }
      } catch (err) {
        setError('Error fetching admissions data.');
      } finally {
        setLoading(false);
      }
    };

    fetchAdmissions();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'MMM dd, yyyy');
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-12rem)] bg-gray-50 rounded-lg overflow-hidden">
      {/* Left Column - Names List */}
      <div className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-gray-200 bg-white">
        <div className="sticky top-0 bg-white z-10 p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Admissions</h2>
        </div>
        <div className="divide-y divide-gray-100 max-h-[calc(100vh-16rem)] overflow-y-auto">
          {loading && (
            <div className="text-center py-4">Loading admissions...</div>
          )}
          {error && (
            <div className="text-center py-4 text-red-500">{error}</div>
          )}
          {!loading && !error && admissionsData.length === 0 && (
            <div className="text-center py-4">No admissions found</div>
          )}
          {admissionsData.map((student) => (
            <button
              key={student._id}
              onClick={() => setSelectedStudent(student)}
              className={`w-full text-left px-4 py-3 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors duration-150 ${
                selectedStudent?._id === student._id ? 'bg-gray-100' : ''
              }`}
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {student.Name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {student['Type of Musical Instrument']}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right Column - Details View */}
      <div className="flex-1 overflow-y-auto bg-white">
        {selectedStudent ? (
          <div className="p-4 sm:p-6 max-h-[calc(100vh-16rem)] overflow-y-auto">
            <div className="mb-6">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                {selectedStudent.Name}
              </h1>
              <p className="text-sm text-gray-500">
                Admitted on {formatDate(selectedStudent.createdAt)}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-4">
                <DetailItem
                  label="Activity Status"
                  value={selectedStudent['Activity Status']}
                />
                <DetailItem
                  label="Gender"
                  value={selectedStudent.Gender}
                />
                <DetailItem
                  label="School/College/Occupation"
                  value={selectedStudent['School / College / Occupation']}
                />
                <DetailItem
                  label="Musical Instrument"
                  value={selectedStudent['Type of Musical Instrument']}
                />
              </div>

              <div className="space-y-4">
                <DetailItem
                  label="Email"
                  value={selectedStudent['E - mail']}
                  type="email"
                />
                <DetailItem
                  label="Phone"
                  value={selectedStudent['Phone number']}
                  type="phone"
                />
                <DetailItem
                  label="Address"
                  value={selectedStudent['Residence Address']}
                />
                <DetailItem
                  label="Date of Birth"
                  value={formatDate(selectedStudent['Date of Birth'])}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            <p>Select a student to view details</p>
          </div>
        )}
      </div>
    </div>
  );
};

const DetailItem = ({ label, value, type }) => {
  const renderValue = () => {
    if (type === 'email') {
      return (
        <a href={`mailto:${value}`} className="text-blue-600 hover:underline">
          {value}
        </a>
      );
    }
    if (type === 'phone') {
      return (
        <a href={`tel:${value}`} className="text-blue-600 hover:underline">
          {value}
        </a>
      );
    }
    return value;
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900 break-words">{renderValue()}</dd>
    </div>
  );
};

export default AdmissionsDetails;