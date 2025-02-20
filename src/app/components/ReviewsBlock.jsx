"use client";
import React, { useState, useEffect } from 'react';

const reviews = [
  {
    username: "Adesh Priya",
    stars: 5,
    review: "It's a place where you will not just learn practical experience of each and every instrument, but also the theory behind it and the musicality origin and theme of your selected instrument. As a Piano and Western vocal student at GSIM institute, I really love and enjoy each of my classes."
  },
  {
    username: "Arun Menon",
    stars: 5,
    review: "Highly recommended. Tutors are very kind and passionate. Unlike other institutes, here the teaching methodology is liberal, providing more space for students to explore and be creative."
  },
  {
    username: "Anita Agnes Lucia P",
    stars: 5,
    review: "Master Mcenrow is very humble, kind, friendly, and patient with my son. He has vast musical experience and is an excellent teacher. The highlight for me was hearing my son have a jam session with the teacher."
  },
  {
    username: "Adarsh Sasidharan",
    stars: 5,
    review: "I have been taking Violin classes at Good Shepherd Institute of Music for the past 8 months, and I am incredibly impressed with the quality of education that I have received. The teachers are incredibly knowledgeable and experienced."
  },
  {
    username: "Bowla Tk",
    stars: 5,
    review: "GSIM is the best music institute, and I'm very glad I found GSIM. MD Deva McEnrow John's hard work and dedication toward the institute is an inspiration to all. Everyone who works at GSIM is kind and caring toward kids."
  }
];

const ReviewCard = ({ review, index, activeIndex, totalCards }) => {
  // Calculate the position in the stack (0 is top, higher numbers are deeper in stack)
  const position = (index - activeIndex + totalCards) % totalCards;
  
  const getCardStyle = () => {
    // Base transform for inactive cards
    const baseTransform = `translateY(${position * 8}px)`;
    const baseScale = 1 - (position * 0.02);
    const baseZIndex = totalCards - position;
    
    if (index === activeIndex) {
      return {
        transform: 'translateY(0) scale(1)',
        opacity: 1,
        zIndex: totalCards
      };
    }
    
    return {
      transform: `${baseTransform} scale(${baseScale})`,
      opacity: 1 - (position * 0.15),
      zIndex: baseZIndex
    };
  };

  return (
    <div
      className="absolute w-full bg-white p-6 rounded-lg transition-all duration-700"
      style={{
        ...getCardStyle(),
        top: 0,
        left: 0,
        right: 0
      }}
    >
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
          <span className="text-lg">{review.username[0]}</span>
        </div>
        <div className="ml-4">
          <h4 className="font-medium">{review.username}</h4>
          <div className="flex">
            {[...Array(review.stars)].map((_, i) => (
              <span key={i} className="text-yellow-400">★</span>
            ))}
          </div>
        </div>
      </div>
      <p className="text-black leading-relaxed">{review.review}</p>
    </div>
  );
};

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
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-custom-red text-black py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center">
          {/* Image Section */}
          <div className="md:w-[41.66%] md:ml-[8.33%] lg:ml-0 mb-6 sm:mb-8">
            <div
              data-intersect="once"
              className={`transform transition-opacity duration-500 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src="/music_student.jpg"
                alt="Student playing music"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Reviews Section */}
          <div className="md:w-[41.66%] md:ml-[8.33%] lg:ml-[16.66%]">
            <div
              data-intersect="once"
              className={`transform transition-transform duration-500 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              <h2 className="text-7xl font-thin mb-12">WHAT OUR COMMUNITY SAYS</h2>
              
              {/* Reviews Stack */}
              <div className="relative h-80">
                {reviews.map((review, index) => (
                  <ReviewCard
                    key={index}
                    review={review}
                    index={index}
                    activeIndex={currentReview}
                    totalCards={reviews.length}
                  />
                ))}
              </div>

              {/* Review Navigation Dots */}
              <div className="flex justify-center mt-8 space-x-2">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentReview(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 
                      ${currentReview === index ? 'bg-white w-6' : 'bg-white/40'}`}
                    aria-label={`Go to review ${index + 1}`}
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
