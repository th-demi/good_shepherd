"use client";
import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

const ScrollUpButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.25) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 p-2 rounded-full
        bg-black/10 backdrop-blur-sm border border-white/20
        hover:bg-black/20 transition-all duration-300 group
        ${showButton 
          ? 'translate-y-0 opacity-100 visible'
          : 'translate-y-4 opacity-0 invisible'
        }`}
      aria-label="Scroll to top"
    >
      <ChevronUp 
        className="w-4 h-4 text-white transition-transform duration-300
          group-hover:scale-110 group-hover:-translate-y-0.5
          group-active:scale-95 group-active:translate-y-0" 
      />
    </button>
  );
};

export default ScrollUpButton;