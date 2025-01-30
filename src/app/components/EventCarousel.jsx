import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const EventCarousel = ({ isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Example events data - replace with your actual events data
  const events = [
    {
      type: 'image',
      src: '/events/recital_gathering.HEIC',
      title: 'Symphony Orchestra Concert',
      description: 'A magnificent performance of Beethoven\'s 9th Symphony'
    },
    {
      type: 'image',
      src: '/events/recital_orchestration.heic',
      title: 'Chamber Music Series',
      description: 'Intimate performances by our talented chamber groups'
    },
    {
        type: 'image',
        src: '/events/recital_picture.HEIC',
        title: 'Chamber Music Series',
        description: 'Intimate performances by our talented chamber groups'
    },
    {
        type: 'image',
        src: '/events/recital_practice.HEIC',
        title: 'Chamber Music Series',
        description: 'Intimate performances by our talented chamber groups'
    },
    {
        type: 'image',
        src: '/events/recital_violins.heic',
        title: 'Chamber Music Series',
        description: 'Intimate performances by our talented chamber groups'
    },
    // {
    //   type: 'video',
    //   src: '/events/jazz-ensemble.mp4',
    //   title: 'Jazz Ensemble Night',
    //   description: 'An evening of classic and contemporary jazz'
    // }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % events.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full bg-black text-white border border-white/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-thin">Spring Season Highlights</DialogTitle>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </DialogHeader>
        
        <div className="relative aspect-video mt-4">
          {/* Main content */}
          <div className="relative w-full h-full overflow-hidden">
            {events.map((event, index) => (
              <div
                key={index}
                className={`absolute w-full h-full transition-all duration-500 ease-out transform ${
                  index === currentIndex 
                    ? 'translate-x-0 opacity-100' 
                    : index < currentIndex 
                    ? '-translate-x-full opacity-0' 
                    : 'translate-x-full opacity-0'
                }`}
              >
                {event.type === 'image' ? (
                  <img
                    src={event.src}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    src={event.src}
                    className="w-full h-full object-cover"
                    controls
                  />
                )}
              </div>
            ))}
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Caption */}
          <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4">
            <h3 className="text-xl font-thin mb-2">{events[currentIndex].title}</h3>
            <p className="text-white/80">{events[currentIndex].description}</p>
          </div>

          {/* Dots indicator */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2">
            {events.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventCarousel;