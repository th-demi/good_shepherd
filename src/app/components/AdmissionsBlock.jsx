"use client";
import { useState, useEffect, useContext } from 'react';
import MusicRegistrationForm from './MusicRegistrationForm';
import AdmissionsDetails from './AdmissionDetails';
import { AuthContext } from './MainNavigation';

export default function AdmissionsBlock() {
  const { isLoggedIn } = useContext(AuthContext);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // Track screen width for mobile

  useEffect(() => {
    // Set up Intersection Observer
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

    // Detect if screen size is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // You can adjust this threshold as needed
    };

    // Initial check
    checkMobile();

    // Update on resize
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkMobile);
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        {/* Heading - Always at the top regardless of screen size */}
        <h2
          data-intersect="once"
          className={`text-5xl md:text-5xl lg:text-7xl text-custom-red font-thin mb-6 transform transition-transform duration-500 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          ADMISSIONS
        </h2>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Image - First on mobile, second on desktop */}
          {!isLoggedIn && ( // Conditionally render the image if not logged in
            <div className="w-full lg:w-1/2 order-1 lg:order-2">
              <div
                data-intersect="once"
                className={`transform transition-opacity duration-500 mb-6 lg:mb-0 ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img
                  src="https://supercool-ram.transforms.svdcdn.com/production/auditions.jpg?w=1024&q=90&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1728916365&s=1291259c3c06b6c46fdcb8b5609ca4ba"
                  alt="Admissions"
                  className="w-full h-auto grayscale"
                />
              </div>
            </div>
          )}

          {/* Form - Second on mobile, first on desktop */}
          <div className={`w-full ${isLoggedIn ? 'lg:w-full' : 'lg:w-1/2'} order-2 lg:order-1`}>
            <div
              data-intersect="once"
              className={`transform transition-transform duration-500 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              {isLoggedIn ? (
                isMobile ? (
                  <div className="text-center text-gray-500">
                    Please log in from a desktop to view the details.
                  </div>
                ) : (
                  <AdmissionsDetails />
                )
              ) : (
                <MusicRegistrationForm />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
