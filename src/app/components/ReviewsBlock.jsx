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
    username: "Swarna Nirmal",
    stars: 5,
    review: "GSIM center has a very good ambience to learn and teachers have vast experience...Friendly with kids and allow them to explore more in music... Rediscover MUSIC in GSIM"
  },
  {
    username: "Anita Agnes Lucia P",
    stars: 5,
    review: "Master Mcenrow is very humble, kind, friendly, and patient with my son. He has vast musical experience and is an excellent teacher. The highlight for me was hearing my son have a jam session with the teacher.",
    image: "/reviews/anita_agnes_lucia_p.png"
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
  },
  {
    username: "John Prabhu",
    stars: 5,
    review: "My son is learning music in this school. I am completely satisfied with the way how the classes are taken.",
    image: "/reviews/john_prabhu.png"
  },
  {
    username: "Nihal Hari",
    stars: 5,
    review: "Good, my kids are enjoying their music learning because of the way they are teaching.",
    image: "/reviews/nihal_hari.png"
  },
  {
    username: "Mono",
    stars: 5,
    review: "I am really happy to be a part of student in good shepherd🤩the teachers are very friendly,kind and there teaching is very professional !!! If you want to grow in music, then it is a right place to grow 👍👍",
    image: "/reviews/mono.png"
  }
];

const ReviewCard = ({ review, index, activeIndex, totalCards }) => {
  const [isMobile, setIsMobile] = useState(false);

  // Check if on mobile or larger screen
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => setIsMobile(window.innerWidth < 768);
      handleResize(); // Call it immediately to set the initial value
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const position = (index - activeIndex + totalCards) % totalCards;

  const getCardStyle = () => {
    const positionOffset = isMobile ? 4 : 8; // Smaller offset for mobile
    const baseTransform = `translateY(${position * positionOffset}px)`;
    const baseScale = 1 - (position * (isMobile ? 0.01 : 0.02));
    const baseZIndex = totalCards - position;

    // Hide content of inactive cards completely
    const isActive = index === activeIndex;

    if (isActive) {
      return {
        transform: 'translateY(0) scale(1)',
        opacity: 1,
        zIndex: totalCards
      };
    }

    return {
      transform: `${baseTransform} scale(${baseScale})`,
      opacity: 0.7 - (position * 0.15),
      zIndex: baseZIndex
    };
  };

  // Determine if this card is active
  const isActive = index === activeIndex;

  // Calculate card visibility class
  const contentVisibilityClass = isActive ? 'opacity-100' : 'opacity-0';

  return (
    <div
      className="absolute w-full bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow-lg transition-all duration-700"
      style={{
        ...getCardStyle(),
        top: 0,
        left: 0,
        right: 0,
        overflow: 'hidden' // Prevent content from overflowing the card
      }}
    >
      {/* Card inner content with conditional visibility */}
      <div className={`transition-opacity duration-300 ${contentVisibilityClass}`}>
        <div className="flex items-center mb-2 md:mb-4">
          <div className="w-8 h-8 md:w-12 md:h-12 bg-gray-300 rounded-full flex items-center justify-center">
            {review.image ? (
              <img
                src={review.image}
                alt={review.username}
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <span className="text-sm md:text-lg">{review.username[0]}</span>
            )}
          </div>
          <div className="ml-2 md:ml-4">
            <h4 className="text-sm md:text-base font-medium">{review.username}</h4>
            <div className="flex">
              {[...Array(review.stars)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-xs md:text-base">★</span>
              ))}
            </div>
          </div>
        </div>
        <p className="text-black text-sm md:text-base leading-relaxed line-clamp-4 md:line-clamp-none">
          {review.review}
        </p>
      </div>
    </div>
  );
};

const ReviewsBlock = () => {
  const [currentReview, setCurrentReview] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0); // Initialize with a default value

  // Handle window resize for responsive behavior
  useEffect(() => {
    // Check if the window is available (client-side only)
    if (typeof window !== 'undefined') {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      handleResize(); // Call it immediately to set the initial width
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []); // Empty dependency ensures this runs once on mount

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

  // Dynamically adjust height based on screen size
  const getStackHeight = () => {
    if (windowWidth < 640) return 'h-60'; // Mobile height
    if (windowWidth < 768) return 'h-64'; // Mobile height
    if (windowWidth < 1024) return 'h-72'; // Tablet height
    return 'h-80'; // Desktop height
  };

  return (
    <div className="bg-custom-red text-black py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Title - Appears first on mobile */}
        <div className="mb-6 md:hidden">
          <h2 className="text-5xl sm:text-4xl font-thin text-left">
            WHAT OUR COMMUNITY SAYS
          </h2>
        </div>

        <div className="flex flex-wrap items-center">
          {/* Image Section */}
          <div className="w-full md:w-[41.66%] md:ml-[8.33%] lg:ml-0 mb-6 sm:mb-8 md:order-1">
            <div
              data-intersect="once"
              className={`transform transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            >
              <img
                src="/music_student.jpg"
                alt="Student playing music"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Reviews Section */}
          <div className="w-full md:w-[41.66%] md:ml-[8.33%] lg:ml-[16.66%] md:order-2">
            <div
              data-intersect="once"
              className={`transform transition-transform duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
            >
              <h2 className="hidden md:block text-5xl lg:text-7xl font-thin mb-12 text-left">
                WHAT OUR COMMUNITY SAYS
              </h2>
              
              {/* Reviews Stack */}
              <div className={`relative ${getStackHeight()}`}>
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
              <div className="flex justify-center space-x-2">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentReview(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${currentReview === index ? 'bg-white w-4 sm:w-6' : 'bg-white/40'}`}
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
