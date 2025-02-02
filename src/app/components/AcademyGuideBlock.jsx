"use client";
import { useState, useEffect } from 'react';

export default function AcademyGuideBlock() {
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <div className="bg-black text-white py-12 min-h-screen">
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
                        href="/gsim-broucher.pdf"
                        className="group inline-flex items-center text-white hover:text-gray-200 transition-colors relative"
                      >
                        <span className="mr-2">DOWNLOAD THE ACADEMY GUIDE</span>
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
                        <span className="absolute bottom-0 left-0 w-0 h-0.25 bg-custom-red transition-all duration-30 group-hover:w-full"></span>
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
                    href="/gsim-broucher.pdf"
                    className="group inline-flex items-center text-white hover:text-gray-200 transition-colors relative"
                  >
                    <span className="mr-2">DOWNLOAD THE ACADEMY GUIDE</span>
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
  );
}
