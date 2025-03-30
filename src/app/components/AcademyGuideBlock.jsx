"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AcademyGuideBlock() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-intersect="once"]');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  const openPdfModal = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsPdfModalOpen(true);
    // Simulate PDF loading time
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="bg-black text-white py-12 min-h-screen relative">
      <div className="container mx-auto px-4 flex flex-col justify-center">
        {/* Mobile/Tablet Header Section */}
        <div className="lg:hidden">
          <div className="md:ml-[8.33%] md:w-1/2">
            <h2 
              data-intersect="once"
              className={`text-5xl font-thin mb-6 transform transition-transform duration-500 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              ACADEMY GUIDE 2025/26
            </h2>
          </div>
          <div className="hidden md:block md:ml-[8.33%] md:w-[83.33%]">
            <hr className="border-t border-white/20" />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-wrap">
          {/* Image Section */}
          <div className="md:w-[41.66%] md:ml-[8.33%] lg:ml-0 mb-6 sm:mb-8">
            <div 
              data-intersect="once"
              className={`transform transition-opacity duration-500 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src="/kid_piano.JPG"
                alt="A montage of images depicting students playing instruments on the Academy rooftop"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="md:w-[41.66%] md:ml-[8.33%] lg:ml-[16.66%] flex flex-col lg:justify-center">
            <div 
              data-intersect="once"
              className={`md:pr-4 transform transition-transform duration-500 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              {/* Desktop Header */}
              <h2 className="hidden lg:block text-7xl font-thin mb-12">
                ACADEMY GUIDE 2025/26
              </h2>

              {/* Main Content - Desktop/Tablet */}
              <div className="hidden md:block">
                <div className="pr-2 lg:pr-24">
                  <p className="mb-4">
                    Discover all you need to know about our community, including academic programs, admission requirements, and how you can become a part of it.
                  </p>
                </div>
                <div>
                  <ul>
                    <li>
                      <a 
                        href="#view-pdf"
                        onClick={openPdfModal}
                        className="group inline-flex items-center text-white hover:text-gray-200 transition-colors relative"
                      >
                        <span className="mr-2">VIEW THE ACADEMY GUIDE</span>
                        <div className="transform transition-transform group-hover:translate-y-0.5">
                          <svg 
                            viewBox="0 0 18 18" 
                            className="w-4 h-4 text-custom-red group-hover:hidden"
                          >
                            <path 
                              fill="currentcolor" 
                              fillRule="evenodd" 
                              stroke="currentcolor" 
                              strokeWidth=".5" 
                              d="M7.71718345,0 L7.71718345,12.1272101 L5.24727719,8.28258915 L4.57511027,8.28258915 L8.00022475,13.6141744 L11.4248897,8.28258915 L10.7527228,8.28258915 L8.28281655,12.1276596 L8.28281655,0 L7.71718345,0 Z M0,16 L16,16 L16,15.4343722 L0,15.4343722 L0,16 Z" 
                              transform="translate(1 1)"
                            />
                          </svg>
                        </div>
                        {/* Underline effect */}
                        <span className="absolute bottom-0 left-0 w-0 h-0.25 bg-custom-red transition-all duration-300 group-hover:w-full"></span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Content Section */}
        <div className="sm:block md:hidden">
          <div 
            data-intersect="once"
            className={`lg:w-1/2 lg:ml-[8.33%] transform transition-transform duration-500 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            <div className="pr-2 lg:pr-24">
              <p className="mb-4">
                Discover all you need to know about our community, including academic programs, admission requirements, and how you can become a part of it.
              </p>
            </div>
            <div>
              <ul>
                <li>
                  <a 
                    href="#view-pdf"
                    onClick={openPdfModal}
                    className="group inline-flex items-center text-white hover:text-gray-200 transition-colors relative"
                  >
                    <span className="mr-2">VIEW THE ACADEMY GUIDE</span>
                    <div className="transform transition-transform group-hover:translate-y-0.5">
                      <svg 
                        viewBox="0 0 18 18" 
                        className="w-4 h-4 text-custom-red group-hover:hidden"
                      >
                        <path 
                          fill="currentcolor" 
                          fillRule="evenodd" 
                          stroke="currentcolor" 
                          strokeWidth=".5" 
                          d="M7.71718345,0 L7.71718345,12.1272101 L5.24727719,8.28258915 L4.57511027,8.28258915 L8.00022475,13.6141744 L11.4248897,8.28258915 L10.7527228,8.28258915 L8.28281655,12.1276596 L8.28281655,0 L7.71718345,0 Z M0,16 L16,16 L16,15.4343722 L0,15.4343722 L0,16 Z" 
                          transform="translate(1 1)"
                        />
                      </svg>
                    </div>
                    {/* Underline effect */}
                    <span className="absolute bottom-0 left-0 w-0 h-0.25 bg-custom-red transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* PDF Modal */}
      <AnimatePresence>
        {isPdfModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
            onClick={() => setIsPdfModalOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ 
                type: "spring", 
                damping: 25, 
                stiffness: 300 
              }}
              className="w-full max-w-4xl bg-black rounded-lg overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <motion.h3 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl font-thin text-white"
                >
                  ACADEMY GUIDE 2025/26
                </motion.h3>
                <div className="flex space-x-3">
                  <motion.a
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    href="/gsim-broucher.pdf"
                    download
                    className="inline-flex items-center px-3 py-1.5 bg-custom-red hover:bg-opacity-80 text-white text-sm font-medium rounded-sm transition-colors duration-200"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    DOWNLOAD
                  </motion.a>
                  <motion.button
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="inline-flex items-center justify-center p-1.5 bg-transparent hover:bg-white/10 text-white rounded-sm transition-colors duration-200 border border-white/20"
                    onClick={() => setIsPdfModalOpen(false)}
                    aria-label="Close modal"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>
              </div>
              
              {/* PDF Viewer */}
              <div className="relative w-full h-[70vh] bg-black overflow-hidden">
                {isLoading ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <motion.div 
                      animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0.8, 1, 0.8] 
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 1.5 
                      }}
                      className="flex flex-col items-center"
                    >
                      <svg className="w-12 h-12 text-custom-red" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12,20L8,16H11V13H13V16H16M12,4L16,8H13V11H11V8H8M4,12H7L7,12V12H17V12L17,12H20L20,12C20,16.42 16.42,20 12,20C7.58,20 4,16.42 4,12Z" />
                      </svg>
                      <p className="mt-3 text-white font-thin">LOADING DOCUMENT...</p>
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.iframe 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    src="/gsim-broucher.pdf"
                    className="w-full h-full"
                    title="Academy Guide PDF"
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}