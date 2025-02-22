'use client';
import React from 'react';
import { format } from 'date-fns';
import { Loader2 } from 'lucide-react';

const AdmissionsDetails = () => {
  const [admissionsData, setAdmissionsData] = React.useState([]);
  const [selectedStudent, setSelectedStudent] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [showDetails, setShowDetails] = React.useState(false);

  React.useEffect(() => {
    const fetchAdmissions = async () => {
      try {
        const response = await fetch('/api/getAdmissions');
        const data = await response.json();
        
        if (response.ok) {
          setAdmissionsData(data.data);
        } else {
          throw new Error(data.error || 'Failed to fetch data.');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmissions();
  }, []);

  const handleStudentSelect = (student) => {
    setShowDetails(false);
    setSelectedStudent(student);
    setTimeout(() => setShowDetails(true), 300);
  };

  const formatDate = React.useCallback((dateString) => {
    const date = new Date(dateString);
    return format(date, 'MMM dd, yyyy');
  }, []);

  if (error) {
    return (
      <div className="flex h-[calc(100vh-12rem)] items-center justify-center">
        <div className="text-red-500 bg-red-50 px-4 py-3 rounded-lg shadow animate-bounce">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-12rem)] bg-gradient-to-br from-gray-50 to-white rounded-xl overflow-hidden shadow-2xl transition-all duration-500">
      {/* Left Column - Names List */}
      <div className="w-full lg:w-96 border-b lg:border-b-0 lg:border-r border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="sticky top-0 bg-white/90 backdrop-blur-md z-10 p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold">
            Admissions
          </h2>
        </div>        
        <div className="divide-y divide-gray-100 max-h-[calc(100vh-16rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
          ) : admissionsData.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No admissions found</div>
          ) : (
            admissionsData.map((student, index) => (
              <div
                key={student._id}
                className="transform transition-all duration-300"
                style={{ 
                  animationDelay: `${index * 50}ms`,
                  opacity: 0,
                  animation: 'fadeSlideIn 0.5s ease forwards'
                }}
              >
                <button
                  onClick={() => handleStudentSelect(student)}
                  className={`w-full text-left px-6 py-4 transition-all duration-300 
                    ${selectedStudent?._id === student._id 
                      ? 'bg-gray-100 border-l-4 border-blue-500 shadow-inner' 
                      : 'hover:bg-gray-50'}`}
                >
                  <p className={`text-sm font-semibold transition-colors duration-300`}>
                    {student.Name}
                  </p>
                  <p className={`text-xs mt-1 transition-colors duration-300`}>
                    {student['Type of Musical Instrument']}
                  </p>
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right Column - Details View */}
      <div className="flex-1 overflow-y-auto bg-white/80 backdrop-blur-sm">
        {selectedStudent ? (
          <div 
            className={`p-6 max-h-[calc(100vh-16rem)] overflow-y-auto transition-all duration-500 transform
              ${showDetails ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <div className="mb-8 space-y-2">
              <h1 className="text-3xl font-bold text-gray-900">{selectedStudent.Name}</h1>
              <p className="text-sm text-gray-500">
                Admitted on {formatDate(selectedStudent.createdAt)}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[
                { label: "Activity Status", value: selectedStudent['Activity Status'] },
                { label: "Gender", value: selectedStudent.Gender },
                { label: "School/College/Occupation", value: selectedStudent['School / College / Occupation'] },
                { label: "Musical Instrument", value: selectedStudent['Type of Musical Instrument'] },
                { label: "Email", value: selectedStudent['E - mail'], type: "email" },
                { label: "Phone", value: selectedStudent['Phone number'], type: "phone" },
                { label: "Address", value: selectedStudent['Residence Address'] },
                { label: "Date of Birth", value: formatDate(selectedStudent['Date of Birth']) }
              ].map((detail, index) => (
                <div
                  key={detail.label}
                  className="transform transition-all duration-500"
                  style={{ 
                    animationDelay: `${showDetails ? (index * 100) + 200 : 0}ms`,
                    opacity: 0,
                    animation: showDetails ? 'fadeSlideUp 0.5s ease forwards' : 'none'
                  }}
                >
                  <DetailCard {...detail} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            <p className="text-lg animate-pulse">Select a student to view details</p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

const DetailCard = ({ label, value, type }) => {
  const renderValue = () => {
    if (type === 'email') {
      return (
        <a href={`mailto:${value}`} className="text-blue-600 hover:text-blue-700 hover:underline">
          {value}
        </a>
      );
    }
    if (type === 'phone') {
      return (
        <a href={`tel:${value}`} className="text-blue-600 hover:text-blue-700 hover:underline">
          {value}
        </a>
      );
    }
    return value;
  };

  return (
    <div className="group bg-white p-4 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 border border-gray-100 hover:border-blue-100">
      <dt className="text-sm font-medium text-gray-500 group-hover:text-blue-600 transition-colors duration-300">
        {label}
      </dt>
      <dd className="mt-2 text-sm text-gray-900 break-words">{renderValue()}</dd>
    </div>
  );
};

export default AdmissionsDetails;