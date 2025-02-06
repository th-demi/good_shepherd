"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import { X } from "lucide-react";

export default function ExamSldier({ onClose }) {
  const images = [
    "/exams/exam_1.JPG",
    "/exams/exam_2.JPG",
    "/exams/exam_3.jpg",
    "/exams/exam_4.jpg",
  ];

  return (
    <div className="h-full flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-4 w-full">
        <div className="flex justify-end mb-8">
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-300 transition-colors"
            aria-label="Close slider"
          >
            <X size={24} />
          </button>
        </div>
        
        <Swiper
          modules={[EffectCoverflow, Pagination, Navigation]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={"auto"} // Automatically adjust slides per view
          spaceBetween={20} // Space between the slides
          breakpoints={{
            // For smaller screens, show fewer slides
            640: {
              slidesPerView: 1,
              centeredSlides: true,
            },
            768: {
              slidesPerView: 2,
              centeredSlides: true,
            },
            1024: {
              slidesPerView: 3,
              centeredSlides: true,
            },
          }}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{
            type: "bullets",
            clickable: true,
          }}
          navigation={true}
          className="mySwiper"
        >
          {images.map((src, index) => (
            <SwiperSlide key={index} className="swiper-slide">
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="w-full h-auto max-h-[400px] md:max-h-[500px] rounded-xl object-cover mx-auto"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
