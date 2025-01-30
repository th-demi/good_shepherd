"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import ActiveSlider from './ActiveSlider';

export default function RecitalBlock() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSliderOpen, setIsSliderOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true); // Start the animation when the element is visible
          observer.unobserve(entry.target); // Stop observing once it is in view
        }
      },
      {
        threshold: 0.2, // The threshold defines how much of the element should be in view before the observer is triggered (e.g., 0.1 = 10%)
      }
    );

    // Select all elements that should trigger the animation when in view
    const elements = document.querySelectorAll('[data-intersect="once"]');
    elements.forEach((element) => observer.observe(element));

    // Cleanup observer when the component is unmounted or the effect is rerun
    return () => {
      elements.forEach((element) => observer.unobserve(element));
    };
  }, []);

  const handleOpenSlider = (e) => {
    e.preventDefault();
    setIsSliderOpen(true);
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };

  // Handle closing the slider
  const handleCloseSlider = () => {
    setIsSliderOpen(false);
    // Restore body scrolling
    document.body.style.overflow = 'unset';
  };

  return (
    <div className="bg-white text-black py-16">
      <div className="container mx-auto px-4">
        
        {/* Section with Heading and Divider (visible on small screens only) */}
        <div className="lg:hidden">
          <div className="md:ml-[8.33%]">
            <h2
              className={`text-5xl font-thin mb-6 transform transition-transform duration-1000 ease-out text-custom-red ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              data-intersect="once"
            >
              RECITALS
            </h2>
          </div>
          <div className="hidden md:block md:ml-[8.33%] md:w-[83.33%]">
            <hr className="border-t border-white/20" />
          </div>
        </div>

        {/* Main Content Section */}
        <div className="flex flex-wrap">
          {/* Text Content for Small Screens */}
          <div className="md:ml-[8.33%] md:w-[41.66%] flex flex-col lg:justify-center">
            <div
              className={`transform transition-transform duration-1000 ease-out  ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              data-intersect="once"
            >
              {/* Hidden Heading for Larger Screens */}
              <h2
                className={`hidden lg:block text-8xl font-thin mb-12 text-custom-red ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                }`}
              >
                RECITALS
              </h2>
              <div className="hidden md:block">
                <div className="pr-2 lg:pr-24">
                  <p className="mb-4">
                    <span>
                    Each month, Academy students perform, showcasing a range of musical styles with instruments like String Orchestra, Violin, Drums, Piano, Keyboard, and Guitar—spanning Orchestral, Chamber Music, and Contemporary Performances.
                    </span>
                  </p>
                  <p className="mb-6">Explore our gallery for a glimpse into past recitals</p>
                </div>
                <div>
                  <ul>
                    <li>
                      <button
                        onClick={handleOpenSlider}
                        className="group inline-flex items-center text-black hover:text-black transition-colors relative"
                      >
                        <div className="relative inline-block">
                          <span className="mr-2">SEE OUR RECITAL EVENTS</span>
                          {/* Underline effect */}
                          <span className="absolute bottom-0 left-0 w-0 h-0.25 bg-custom-red transition-all duration-300 group-hover:w-full inline-block"></span>
                        </div>
                        <div className="transform transition-transform group-hover:translate-x-1">
                          <svg viewBox="0 0 18 18" className="w-4 h-4 text-custom-red group-hover:hidden">
                            <polygon
                              fillRule="evenodd"
                              fill="currentColor"
                              stroke="currentColor"
                              strokeWidth=".5"
                              points="0 .682 6.635 3.999 0 7.317 0 8 8 3.999 0 0"
                              transform="translate(5 5)"
                            />
                          </svg>
                        </div>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Image Section for Larger Screens */}
          <div className="md:w-[41.66%] lg:ml-[8.33%]">
            <div
              className={`transform transition-opacity duration-1000 ease-out ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
              data-intersect="once"
            >
              <img
                src="/Recital.png"
                alt="An image of a student playing the cello, with the Royal Academy of Music logo and the title 'Spring 2025' superimposed"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* Section with Divider and Text (visible on mobile screens only) */}
        <div className="sm:block md:hidden">
          <div
            className={`lg:w-1/2 lg:ml-[8.33%] transform transition-transform duration-1000 ease-out ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            data-intersect="once"
          >
            <div className="pr-2 lg:pr-24">
              <p className="mb-4">
                <span>
                  Each month, Academy students perform, showcasing a range of musical styles with instruments like String Orchestra, Violin, Drums, Piano, Keyboard, and Guitar—spanning Orchestral, Chamber Music, and Contemporary Performances.
                </span>
              </p>
              <p className="mb-6">Explore our gallery for a glimpse into past recitals.</p>
            </div>
            <div>
              <ul>
                <li>
                  <button
                    onClick={handleOpenSlider}
                    className="group inline-flex items-center text-black hover:text-black transition-colors relative"
                  >
                    <div className="relative inline-block">
                      <span className="mr-2">SEE OUR RECITAL EVENTS</span>
                      {/* Underline effect */}
                      <span className="absolute bottom-0 left-0 w-0 h-0.25 bg-custom-red transition-all duration-300 group-hover:w-full inline-block"></span>
                    </div>
                    <div className="transform transition-transform group-hover:translate-x-1">
                      <svg viewBox="0 0 18 18" className="w-4 h-4 text-custom-red group-hover:hidden">
                        <polygon
                          fillRule="evenodd"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeWidth=".5"
                          points="0 .682 6.635 3.999 0 7.317 0 8 8 3.999 0 0"
                          transform="translate(5 5)"
                        />
                      </svg>
                    </div>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {isSliderOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleCloseSlider}
          ></div>
          
          {/* Modal Content */}
          <div className="relative z-10 w-full h-full">
            <ActiveSlider onClose={handleCloseSlider} />
          </div>
        </div>
      )}
    </div>
  );
}
