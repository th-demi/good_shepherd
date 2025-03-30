"use client";
import React, { useState, useEffect } from "react";
import { reviews } from "@/data/reviews";
import ReviewCard from "@/components/ui/review-card";

const ReviewsBlock = () => {
  const [currentReview, setCurrentReview] = useState(0);
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
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-custom-red text-black py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* Title - Appears first on mobile */}
        <div className="mb-8 md:hidden">
          <h2 className="text-4xl sm:text-5xl font-thin">
            WHAT OUR COMMUNITY SAYS
          </h2>
        </div>

        <div className="flex flex-col md:flex-row md:items-start md:justify-between md:gap-8 lg:gap-16">
          {/* Image Section */}
          <div className="w-full md:w-5/12 mb-8 md:mb-0 order-2 md:order-1">
            <div
              data-intersect="once"
              className={`transform transition-opacity duration-500 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src="/music_student.jpg"
                alt="Student playing music"
                className="w-full h-auto object-cover rounded-lg shadow-md"
              />
            </div>
          </div>

          {/* Reviews Section */}
          <div className="w-full md:w-6/12 order-3 md:order-2">
            <div
              data-intersect="once"
              className={`transform transition-transform duration-500 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              <h2 className="hidden md:block text-4xl lg:text-5xl xl:text-6xl font-thin mb-8 lg:mb-10">
                WHAT OUR COMMUNITY SAYS
              </h2>

              {/* Reviews Stack */}
              <div className="relative h-[350px] sm:h-[320px] md:h-[380px] lg:h-[400px]">
                {reviews.map((review, index) => (
                  <ReviewCard
                    key={index}
                    review={review}
                    index={index}
                    activeIndex={currentReview}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsBlock;
