import "../app/globals.css";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import Image from "next/image";

const ExamResults = () => {
  const [studentId, setStudentId] = useState("");
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState("");
  const [allData, setAllData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [activeSchool, setActiveSchool] = useState('ABRSM');
  const [isHeadingVisible, setIsHeadingVisible] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);

  const schools = {
    ABRSM: {
      logo: '/schools/abrsm-logo.jpg',
      title: 'ABRSM (Associated Board of the Royal Schools of Music) – UK',
    },
    Trinity: {
      logo: '/schools/trinity-logo.jpg',
      title: 'Trinity College London',
    },
    LCM: {
      logo: '/schools/lcm-logo.jpg',
      title: 'London College of Music (LCM) – University of West London',
    },
    RSL: {
      logo: '/schools/rsl-logo.jpg',
      title: 'RSL Awards (Rockschool – RSL)',
    },
    MTB: {
      logo: '/schools/mtb-logo.jpg',
      title: 'MTB Exams (Music Teachers\' Board)',
    }
  };

  // Trigger visibility of the heading and content after a delay
  useEffect(() => {
    const headingTimer = setTimeout(() => {
      setIsHeadingVisible(true);
    }, 600); // 600ms for the heading to appear

    const contentTimer = setTimeout(() => {
      setIsContentVisible(true);
    }, 700); // 700ms for the content to appear

    return () => {
      clearTimeout(headingTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  // Fetch data from the API route
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/results?school=${activeSchool.toLowerCase()}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        setAllData(jsonData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Error loading exam data.");
      }
    };

    fetchData();
  }, [activeSchool]); // Refetch data when activeSchool changes

  const getResultStatus = (score) => {
    if (score < 60)
      return {
        text: "Under Pass",
        color: "bg-red-500 text-white",
        gradient: "from-red-500 to-red-600",
        icon: "🔴",
      };
    if (score < 75)
      return {
        text: "Pass",
        color: "bg-green-500 text-white",
        gradient: "from-green-500 to-green-600",
        icon: "✅",
      };
    if (score < 87)
      return {
        text: "Merit",
        color: "bg-yellow-500 text-white",
        gradient: "from-yellow-500 to-yellow-600",
        icon: "⭐",
      };
    return {
      text: "Distinction",
      color: "bg-purple-500 text-white",
      gradient: "from-purple-500 to-purple-600",
      icon: "🏆",
    };
  };

  const handleSearch = () => {
    if (!studentId.trim()) return;
  
    setIsLoading(true);
    setError("");
  
    setTimeout(() => {
      // Trim and normalize the studentId for comparison
      const normalizedStudentId = studentId.trim().toLowerCase();
  
      // Find the result where the ID matches (case-insensitive and trimmed)
      const result = allData.find(
        (item) => item.ID.toLowerCase().trim() === normalizedStudentId
      );
  
      if (result) {
        setStudentData(result);
      } else {
        setError("No results found for this ID");
        setStudentData(null);
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="bg-black text-white min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="mb-12">
          <h2 className={`text-4xl md:text-5xl xl:text-7xl font-thin mb-6 text-center md:text-left transform transition-all duration-500 hover:scale-105 ${
            isHeadingVisible ? "opacity-100" : "opacity-0"
          }`}>
            EXAM RESULTS
          </h2>
          <hr className="border-t border-white/20 mb-8" />
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
          {/* Logos Column */}
          <div className="w-full lg:w-1/3 sticky top-4 h-fit">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-4">
              {Object.entries(schools).map(([key, school]) => (
                <button
                  key={key}
                  onClick={() => setActiveSchool(key)}
                  className={`group relative p-6 rounded-xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl
                    ${activeSchool === key 
                      ? 'bg-gradient-to-br from-white/15 to-white/5 shadow-xl scale-105' 
                      : 'bg-white/5 hover:bg-white/10'
                    }`}
                >
                  <div className="relative h-20 w-full transition-transform duration-300 group-hover:-translate-y-1">
                    <Image
                      src={school.logo}
                      alt={`${key} logo`}
                      fill
                      className="object-contain filter transition-all duration-300 group-hover:brightness-125"
                    />
                  </div>
                  <div className={`h-0.5 bg-white/30 transform scale-x-0 transition-transform duration-500 mt-4
                    ${activeSchool === key ? 'scale-x-100' : 'group-hover:scale-x-75'}`} 
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Content Column */}
          <div className="w-full lg:w-2/3">
            <div className={`bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-8 shadow-xl lg:bg-white/10 transition-opacity duration-700 ${
              isContentVisible ? "opacity-100" : "opacity-0"
            }`}>
              {/* Search Section */}
              <div className="mb-8">
                <div
                  className={`relative transition-all duration-300 ${isFocused ? "scale-105" : "scale-100"}`}
                >
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Enter your Student ID"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      className={`w-full bg-gray-50 border-2 transition-all duration-300 text-gray-900 px-4 py-3 pr-12 rounded-xl
                        ${isFocused ? "border-blue-500 shadow-md" : "border-gray-200"}
                        placeholder:text-gray-400 focus:outline-none`}
                    />
                    <button
                      onClick={handleSearch}
                      disabled={isLoading}
                      className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full
                        transition-all duration-300 hover:bg-gray-100
                        ${isLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
                    >
                      {isLoading ? (
                        <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
                      ) : (
                        <Search className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Results Display */}
              <div
                className={`transition-all duration-500 ${
                  studentData || error ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                {error && (
                  <div className="text-center text-red-600 bg-red-50 p-4 rounded-xl animate-fade-in">
                    {error}
                  </div>
                )}

                {studentData && (
                  <div className="space-y-6 animate-fade-in">
                    {/* Result Status Card */}
                    <div
                      className={`p-4 rounded-xl bg-gradient-to-r ${getResultStatus(studentData.Score).gradient} 
                      transform transition-all duration-300 hover:scale-105 mb-6`}
                    >
                      <div className="flex flex-col md:flex-row items-center justify-between text-white">
                        <div className="text-center md:text-left mb-4 md:mb-0">
                          <p className="text-lg opacity-90">Final Result</p>
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold">{studentData.Score}%</span>
                            <span className="text-xl">{getResultStatus(studentData.Score).icon}</span>
                          </div>
                        </div>
                        <div className="text-center md:text-right">
                          <p className="text-sm opacity-90">Status</p>
                          <p className="text-2xl font-bold">{getResultStatus(studentData.Score).text}</p>
                        </div>
                      </div>
                    </div>

                    {/* Student Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="group bg-gray-50 p-4 rounded-xl transition-all duration-300 hover:bg-gray-100">
                          <p className="text-gray-500 font-medium text-sm">Name</p>
                          <p className="text-xl text-gray-900 font-semibold">
                            {studentData.Name}
                          </p>
                        </div>
                        <div className="group bg-gray-50 p-4 rounded-xl transition-all duration-300 hover:bg-gray-100">
                          <p className="text-gray-500 font-medium text-sm">Type</p>
                          <p className="text-xl text-gray-900 font-semibold">
                            {studentData.Type}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="group bg-gray-50 p-4 rounded-xl transition-all duration-300 hover:bg-gray-100">
                          <p className="text-gray-500 font-medium text-sm">Grade</p>
                          <p className="text-xl text-gray-900 font-semibold">
                            {studentData.Grade}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamResults;