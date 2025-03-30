import "../app/globals.css";
import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Loader2, Award, Music, CheckCircle2 } from "lucide-react";
import BackButton from "@/components/ui/back-button";
import { schools } from '@/data/schools';
import Head from "next/head";
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
  const [isLineVisible, setIsLineVisible] = useState(false);
  const [areLogosVisible, setAreLogosVisible] = useState(Array(5).fill(false));
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isBackButtonVisible, setIsBackButtonVisible] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isResultExpanded, setIsResultExpanded] = useState(false);

  const getResultStatus = useCallback((score) => {
    if (score < 60) return {
      text: "Under Pass",
      color: "bg-red-500 text-white",
      gradient: "from-red-500 to-red-600",
      icon: "🔴",
      message: "Don't worry, keep practicing! You'll improve.",
      svgColor: "#ef4444"
    };
    if (score < 75) return {
      text: "Pass",
      color: "bg-green-500 text-white",
      gradient: "from-green-500 to-green-600",
      icon: "✅",
      message: "Congratulations on passing your exam!",
      svgColor: "#22c55e"
    };
    if (score < 87) return {
      text: "Merit",
      color: "bg-yellow-500 text-white",
      gradient: "from-yellow-500 to-yellow-600",
      icon: "⭐",
      message: "Well done! You achieved merit status.",
      svgColor: "#eab308"
    };
    return {
      text: "Distinction",
      color: "bg-purple-500 text-white",
      gradient: "from-purple-500 to-purple-600",
      icon: "🏆",
      message: "Outstanding! You achieved distinction!",
      svgColor: "#a855f7"
    };
  }, []);

  useEffect(() => {
    const timers = [
      setTimeout(() => setIsHeadingVisible(true), 100),
      setTimeout(() => setIsLineVisible(true), 200),
      ...Object.keys(schools).map((_, i) => 
        setTimeout(() => {
          setAreLogosVisible(prev => {
            const newState = [...prev];
            newState[i] = true;
            return newState;
          });
        }, 300 + (i * 100))
      ),
      setTimeout(() => setIsSearchVisible(true), 800),
      setTimeout(() => setIsBackButtonVisible(true), 900)
    ];

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/results?school=${activeSchool.toLowerCase()}`, {
          signal: abortController.signal
        });
        if (!response.ok) throw new Error("Failed to fetch data");
        const jsonData = await response.json();
        setAllData(jsonData);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error("Error fetching data:", err);
          setError("Error loading exam data.");
        }
      }
    };

    fetchData();
    return () => abortController.abort();
  }, [activeSchool]);

  const handleSuccessfulResult = useCallback(() => {
    setShowCelebration(false);
    setShowConfetti(false);
    setIsResultExpanded(false);
    setTimeout(() => setShowCelebration(true), 300);
    setTimeout(() => setShowConfetti(true), 600);
    setTimeout(() => setIsResultExpanded(true), 900);
  }, []);

  const handleSearch = useCallback(() => {
    if (!studentId.trim()) return;
  
    setIsLoading(true);
    setError("");
    setStudentData(null);

    const searchTimer = setTimeout(() => {
      const normalizedStudentId = studentId.trim().toLowerCase();
      const result = allData.find(
        (item) => item.ID.toLowerCase().trim() === normalizedStudentId
      );
  
      if (result) {
        setStudentData(result);
        handleSuccessfulResult();
      } else {
        setError("No results found for this ID");
      }
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(searchTimer);
  }, [studentId, allData, handleSuccessfulResult]);

  const generateConfettiParticles = () => {
    const particles = [];
    const colors = ['#FFC700', '#FF0055', '#2BD1FC', '#F19CBB', '#a855f7'];
    
    for (let i = 0; i < 50; i++) {
      const size = Math.random() * 8 + 4;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const left = Math.random() * 100;
      const animationDuration = Math.random() * 3 + 2;
      const delay = Math.random() * 0.5;
      
      particles.push(
        <div 
          key={i}
          className="absolute opacity-0 rounded-sm" 
          style={{
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: color,
            left: `${left}%`,
            top: '-20px',
            animation: `fallDown ${animationDuration}s ease-out ${delay}s forwards`,
          }}
        />
      );
    }
    
    return particles;
  };

  const CelebrationSVG = ({ color }) => (
    <svg 
      className="absolute animate-spin-slow z-0 opacity-20" 
      viewBox="0 0 100 100" 
      width="400" 
      height="400" 
      style={{
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <g>
        {[...Array(12)].map((_, i) => (
          <path 
            key={i} 
            d="M50 5 L55 20 L50 15 Z" 
            fill="url(#grad)" 
            transform={`rotate(${i * 30} 50 50)`} 
            opacity="0.9"
            className="animate-pulse"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </g>
    </svg>
  );

  const MusicNotes = () => (
    <>
      {[...Array(8)].map((_, i) => {
        const isEighthNote = i % 2 === 0;
        const left = 10 + (i * 10);
        const delay = i * 0.2;
        const size = 16 + Math.random() * 8;
        
        return (
          <div 
            key={i}
            className="absolute z-20 text-white opacity-0"
            style={{
              left: `${left}%`,
              top: '100%',
              fontSize: `${size}px`,
              animation: `floatUp 4s ease-out ${delay}s infinite`,
            }}
          >
            {isEighthNote ? '♪' : '♫'}
          </div>
        );
      })}
    </>
  );

  return (
    <>
      <Head>
        <title>Exam Results - GSIM</title>
        <meta name="description" content="Check your music exam results from international boards like ABRSM, Trinity, LCM, MTB, and RSL." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
  
      <div className="bg-black text-white min-h-screen py-12">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="mb-12">
            <div className="relative -ml-2 sm:ml-0 px-4 sm:px-0">
              <div className={`absolute left-0 -top-3 sm:top-1 transition-opacity duration-500 ${
                isBackButtonVisible ? "opacity-100" : "opacity-0"
              }`}>
                <BackButton className="h-8 w-8 sm:h-10 sm:w-10" />
              </div>
              
              <h2 className={`text-4xl md:text-5xl xl:text-7xl font-thin text-white transition-opacity duration-500 ${
                isHeadingVisible ? "opacity-100" : "opacity-0"
              } pl-12 sm:pl-14`}>
                EXAM RESULTS
              </h2>
              
              <hr className={`border-t border-white/20 mb-8 transition-opacity duration-500 ${
                isLineVisible ? "opacity-100" : "opacity-0"
              }`} />
            </div>
          </div>
    
          {/* Main Content */}
          <div className="max-w-7xl mx-auto relative">
            {/* School Logos */}
            <div className="flex flex-col items-center justify-center mb-10 relative z-10">
              {/* Desktop and Tablet Layout */}
              <div className="hidden sm:flex items-center justify-center gap-4 lg:gap-8 flex-wrap">
                {Object.entries(schools).map(([key, school], index) => (
                  <button
                    key={key}
                    onClick={() => setActiveSchool(key)}
                    aria-label={`View ${key} exam results`}
                    className={`group relative p-4 rounded-xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl ${
                      areLogosVisible[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    } ${
                      activeSchool === key 
                        ? 'bg-gradient-to-br from-white/15 to-white/5 shadow-xl scale-105' 
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="relative h-16 w-32 lg:h-24 lg:w-48 transition-transform duration-300 group-hover:-translate-y-1">
                      <Image
                        src={school.logo}
                        alt={school.alt}
                        fill
                        sizes="(max-width: 768px) 100px, (max-width: 1200px) 150px, 200px"
                        className="object-contain filter transition-all duration-300 group-hover:brightness-125"
                        priority={false}
                        loading="lazy"
                      />
                    </div>
                    <div className={`h-0.5 bg-white/30 transform scale-x-0 transition-transform duration-500 mt-2 ${
                      activeSchool === key ? 'scale-x-100' : 'group-hover:scale-x-75'
                    }`} />
                  </button>
                ))}
              </div>

              {/* Mobile Layout */}
              <div className="sm:hidden flex overflow-x-auto w-full justify-start px-4 space-x-4 pb-4">
                {Object.entries(schools).map(([key, school], index) => (
                  <button
                    key={key}
                    onClick={() => setActiveSchool(key)}
                    aria-label={`View ${key} exam results`}
                    className={`flex-shrink-0 group relative p-3 rounded-xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl ${
                      areLogosVisible[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    } ${
                      activeSchool === key 
                        ? 'bg-gradient-to-br from-white/15 to-white/5 shadow-xl scale-105' 
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="relative h-12 w-24 transition-transform duration-300 group-hover:-translate-y-1">
                      <Image
                        src={school.logo}
                        alt={school.alt}
                        fill
                        sizes="(max-width: 768px) 100px"
                        className="object-contain filter transition-all duration-300 group-hover:brightness-125"
                        priority={false}
                        loading="lazy"
                      />
                    </div>
                    <div className={`h-0.5 bg-white/30 transform scale-x-0 transition-transform duration-500 mt-2 ${
                      activeSchool === key ? 'scale-x-100' : 'group-hover:scale-x-75'
                    }`} />
                  </button>
                ))}
              </div>
            </div>
    
            {/* Search and Results Section */}
            <div className="max-w-2xl mx-auto relative z-10">
              {/* Search Section */}
              <div className={`mb-8 transition-opacity duration-500 ${
                isSearchVisible ? "opacity-100" : "opacity-0"
              }`}>
                <div className={`relative transition-all duration-300 ${isFocused ? "scale-105" : "scale-100"}`}>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Enter your Student ID"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      aria-label="Student ID search input"
                      className={`w-full bg-gray-50 border-2 transition-all duration-300 text-gray-900 px-4 py-3 pr-12 rounded-xl ${
                        isFocused ? "border-blue-500 shadow-md" : "border-gray-200"
                      } placeholder:text-gray-400 focus:outline-none`}
                    />
                    <button
                      onClick={handleSearch}
                      disabled={isLoading}
                      aria-label="Search student results"
                      className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full transition-all duration-300 hover:bg-gray-100 ${
                        isLoading ? "cursor-not-allowed" : "cursor-pointer"
                      }`}
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
              <div className={`transition-all duration-500 ${
                studentData || error ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}>
                {error && (
                  <div className="text-center text-red-600 bg-red-50 p-4 rounded-xl animate-fade-in">
                    {error}
                  </div>
                )}
    
                {studentData && (
                  <div className="relative">
                    {showCelebration && studentData.Score >= 60 && (
                      <>
                        <CelebrationSVG color={getResultStatus(studentData.Score).svgColor} />
                        <MusicNotes />
                        <div 
                          className="absolute inset-0 rounded-xl bg-transparent border-2 animate-pulse-ring z-0"
                          style={{ borderColor: getResultStatus(studentData.Score).svgColor }}
                        />
                        <div 
                          className="absolute inset-0 rounded-xl opacity-30 z-0"
                          style={{ 
                            background: `radial-gradient(circle, ${getResultStatus(studentData.Score).svgColor} 0%, rgba(0,0,0,0) 70%)`,
                          }}
                        />
                      </>
                    )}
                    
                    {showConfetti && studentData.Score >= 75 && (
                      <div className="absolute inset-0 overflow-hidden z-10 pointer-events-none">
                        {generateConfettiParticles()}
                      </div>
                    )}
                    
                    <div className={`result-card ${
                      isResultExpanded ? "transform-none" : "transform scale-95"
                    }`}>
                      <div className="space-y-6 animate-fade-in">
                        <div
                          className={`result-status-card ${getResultStatus(studentData.Score).gradient} ${
                            showCelebration ? "animate-shimmer" : ""
                          }`}
                          aria-live="polite"
                        >
                          {showCelebration && studentData.Score >= 75 && (
                            <div className="absolute -right-4 -top-4 opacity-20">
                              {studentData.Score >= 87 ? (
                                <Award size={80} className="animate-spin-slow text-white" />
                              ) : (
                                <Music size={80} className="animate-spin-slow text-white" />
                              )}
                            </div>
                          )}
                          
                          <div className="flex flex-col md:flex-row items-center justify-between text-white">
                            <div className="text-center md:text-left mb-4 md:mb-0">
                              <p className="text-lg opacity-90">Final Result</p>
                              <div className="flex items-center space-x-2">
                                <span className={`text-2xl font-bold transition-all duration-700 ${
                                  showCelebration ? "text-3xl" : "text-2xl"
                                }`}>
                                  {studentData.Score}%
                                </span>
                                <span className={`text-xl transition-all duration-700 ${
                                  showCelebration && studentData.Score >= 75 ? "animate-spin-slow" : ""
                                }`} aria-hidden="true">
                                  {getResultStatus(studentData.Score).icon}
                                </span>
                              </div>
                            </div>
                            <div className="text-center md:text-right">
                              <p className="text-sm opacity-90">Status</p>
                              <p className={`text-2xl font-bold transition-all duration-700 ${
                                showCelebration ? "text-3xl" : "text-2xl"
                              }`}>
                                {getResultStatus(studentData.Score).text}
                              </p>
                            </div>
                          </div>
                          
                          {showCelebration && (
                            <div className={`mt-2 text-center text-white opacity-0 transition-opacity duration-700 ${
                              isResultExpanded ? "opacity-90" : "opacity-0"
                            }`}>
                              <p>{getResultStatus(studentData.Score).message}</p>
                            </div>
                          )}
                        </div>
    
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className={`student-detail-card ${
                              isResultExpanded ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
                            }`} style={{ transitionDelay: "0.1s" }}>
                              <p className="text-gray-500 font-medium text-sm">Name</p>
                              <p>{studentData.Name}</p>
                            </div>
                            <div className={`student-detail-card ${
                              isResultExpanded ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
                            }`} style={{ transitionDelay: "0.2s" }}>
                              <p className="text-gray-500 font-medium text-sm">Type</p>
                              <p>{studentData.Type}</p>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div className={`student-detail-card ${
                              isResultExpanded ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                            }`} style={{ transitionDelay: "0.3s" }}>
                              <p className="text-gray-500 font-medium text-sm">Grade</p>
                              <p>{studentData.Grade}</p>
                            </div>
                            <div className={`student-detail-card ${
                              isResultExpanded ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                            }`} style={{ transitionDelay: "0.4s" }}>
                              <p className="text-gray-500 font-medium text-sm">Examination Board</p>
                              <p>{activeSchool}</p>
                            </div>
                          </div>
                        </div>
                        
                        {studentData.Score >= 60 && showCelebration && (
                          <div className={`flex justify-center mt-6 transition-all duration-700 ${
                            isResultExpanded ? "opacity-100 scale-100" : "opacity-0 scale-90"
                          }`} style={{ transitionDelay: "0.5s" }}>
                            <div className="achievement-badge">
                              <div className="relative z-10 flex items-center justify-center">
                                <CheckCircle2 size={40} className="text-white" />
                              </div>
                              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 animate-pulse-ring" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExamResults;