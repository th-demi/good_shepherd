"use client";
import React, { useState, useEffect } from 'react';

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    '/schools/abrsm-logo.jpg',
    '/schools/lcm-logo.jpg',
    '/schools/mtb-logo.jpg',
    '/schools/rsl-logo.jpg',
    '/schools/trinity-logo.jpg'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute w-full h-full transform transition-all duration-700 ease-in-out ${
            index === currentIndex
              ? 'translate-x-0 opacity-100'
              : index < currentIndex
              ? '-translate-x-full opacity-0'
              : 'translate-x-full opacity-0'
          }`}
        >
          <img
            src={src}
            alt={`School logo ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default ImageCarousel;