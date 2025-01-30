"use client";
import { useState, useEffect } from 'react';

export default function IntroKeylineBlock() {
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

    const element = document.querySelector('[data-intro-keyline]');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <div data-intro-keyline="" className="bg-custom-red text-white overflow-hidden relative">
      <div className="container mx-auto my-0 py-20">
        {/* Heading Row */}
        <div className="flex mb-0 md:mb-[10rem]">
          <div className="md:ml-[50%] lg:ml-[58.33%] md:w-[41.66%]">
            <h2 
              className={`text-4xl md:text-5xl lg:text-6xl font-thin transform transition-all duration-1000 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              WHERE MUSIC EVOLVES
            </h2>
          </div>
        </div>

        {/* Content Row with SVG */}
        <div className="flex relative">
          <div className="md:ml-[8.33%] md:w-[41.66%] lg:w-[33.33%]">
            {/* SVG Path with animation */}
            <svg 
              viewBox="0 0 184 151" 
              preserveAspectRatio="none"
              className="w-80% h-[150px] absolute -top-[11rem] right-[46%] hidden md:block"
            >
              <path 
                fill="none" 
                fillRule="evenodd" 
                stroke="#FFF" 
                strokeWidth="1"
                d="M183.5,0.5 C98.373,0.5 29.489,35.596 0.5,150.5"
                className={`transition-all duration-1000 ${
                  isVisible ? 'stroke-dashoffset-0' : 'stroke-dashoffset-full'
                }`}
                style={{
                  strokeDasharray: '259.3521728515625',
                  strokeDashoffset: isVisible ? '0' : '259.3521728515625'
                }}
              />
            </svg>

            {/* Content with fade-in animation */}
            <div 
              className={`transform transition-all duration-1000 delay-500 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              <div className="prose prose-invert max-w-none mt-8">
                <p className="text-lg">
                  A space for fearless artists to unite, innovate, and push boundaries. We blend tradition with tomorrow, shaping the sound of what’s next.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}