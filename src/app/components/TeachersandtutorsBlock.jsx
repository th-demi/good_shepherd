"use client";
import { useState, useEffect } from 'react';

export default function TeachersandtutorsBlock() {
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
    <div className="bg-black py-16">
      <div className="container mx-auto px-4">
        <div className="lg:hidden">
          <div className="md:ml-[8.33%] md:w-1/2">
            <h2 
              data-intersect="once"
              className={`text-5xl text-white font-thin mb-6 transform transition-transform duration-500 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              TEACHERS & MENTORS
            </h2>
          </div>
          <div className="hidden md:block md:ml-[8.33%] md:w-[83.33%]">
            <hr className="border-t border-white/20" />
          </div>
        </div>

        {/* Tablet Header (hidden on desktop) */}
        <div className="hidden md:block lg:hidden">
          <div className="md:ml-[8.33%] md:w-1/2">
            <h2 
              data-intersect="once"
              className={`text-2xl text-white font-bold mb-1 transform transition-transform duration-500 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              TEACHERS &amp; MENTORS
            </h2>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-wrap">
          {/* Text Content */}
          <div className="md:w-[41.66%] md:ml-[8.33%] flex flex-col justify-center">
            <div 
              data-intersect="once"
              className={`md:pr-4 transform transition-transform duration-500 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              {/* Desktop Header */}
              <h2 className="hidden lg:block text-7xl font-thin text-white mb-6">
                TEACHERS & MENTORS
              </h2>

              {/* Main Content - Desktop/Tablet */}
              <div className="hidden md:block">
                <div className="pr-2 lg:pr-24">
                  <p className="mb-6 text-white">
                    Experienced tutors share their knowledge and insights, creating a space where students can learn, explore, and grow at their own pace, guided by genuine support and understanding.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="md:w-1/2 lg:w-[41.66%] ">
            <div 
              data-intersect="once"
              className={`px-0 lg:px-3 transform transition-opacity duration-500 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src="/Tutors.jpg"
                alt="A violin duo perform alongside each other, reading sheet music"
                className="w-full h-auto grayscale"
              />
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
              <p className="mb-6 text-white">
                Experienced tutors share their knowledge and insights, creating a space where students can learn, explore, and grow at their own pace, guided by genuine support and understanding.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
