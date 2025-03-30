'use client';
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

const Navigation = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [showElements, setShowElements] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );

  useEffect(() => {
    setTimeout(() => {
      setShowElements(true);
    }, 200);

    const handleClickOutside = (event) => {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target) && 
        menuButtonRef.current && 
        !menuButtonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsMenuOpen(prev => !prev);
  };

  const scrollToAdmissions = (e) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    setTimeout(() => {
      const admissionsSection = document.getElementById('admissions');
      if (admissionsSection) {
        // Get the exact position accounting for all layout factors
        const header = document.querySelector('.gradient');
        const headerHeight = header ? header.offsetHeight : 0;
        
        // Calculate the exact scroll position needed
        const elementRect = admissionsSection.getBoundingClientRect();
        const targetPosition = window.pageYOffset + elementRect.top - headerHeight;
        
        // Adjust the scroll position to scroll a little farther
        const offset = 200;
        const finalTargetPosition = targetPosition + offset;
        
        // Use CSSOM smooth scroll for perfect alignment
        window.scrollTo({
          top: finalTargetPosition,
          behavior: 'smooth'
        });

        // Remove the timeout check and directly set the scroll position after animation.
        setTimeout(() => {
          // Ensure the scroll position stays at the final target
          window.scrollTo(0, finalTargetPosition);
        }, 850); // Wait for the scroll animation to finish
      }
    }, 300);
  };

  // Enhanced animations
  const menuVariants = {
    hidden: { 
      opacity: 0,
      y: -20,
      scale: 0.95,
      transformOrigin: 'top right',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        duration: 0.3
      }
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transformOrigin: 'top right',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        duration: 0.3,
        staggerChildren: 0.07,
        delayChildren: 0.1
      }
    }
  };

  const menuItemVariants = {
    hidden: { 
      opacity: 0, 
      y: -15,
      transition: {
        duration: 0.2
      }
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 25
      }
    }
  };

  // Calculate dropdown position based on screen size
  const getDropdownStyles = () => {
    // For mobile screens
    if (windowWidth < 640) {
      return {
        width: '200px',
        maxWidth: '80%',
        right: '1rem',
        top: '4.5rem'
      };
    }
    // For tablets
    else if (windowWidth < 1024) {
      return {
        width: '250px',
        maxWidth: '80%',
        right: '1rem',
        top: '5rem'
      };
    }
    // For desktops
    else {
      return {
        width: '280px',
        maxWidth: '25%',
        right: '2rem',
        top: '5rem'
      };
    }
  };

  const dropdownStyles = getDropdownStyles();

  return (
    <div className="absolute z-50 w-full gradient">
      <div className="relative container mx-auto px-4 md:px-[4.375rem] max-w-[1300px]">
        <nav className="relative z-10 flex items-start justify-between pt-[2.625rem] pb-[2.375rem]">
          <h2 className="sr-only">Website Navigation</h2>

          <div className={`nav-logo w-[150px] md:w-[10.4375rem] flex-shrink-0 flex items-center transition-all duration-500 ${showElements ? 'opacity-100 translate-x-0 delay-200' : 'opacity-0 translate-x-[-20px]'}`}>
            <Link href="https://goodshepherdim.com/" className="block">
              <div className="relative">
                <Image
                  src="/GSIM_logo.png"
                  alt="Royal Academy of Music"
                  width={120}
                  height={30}
                  className="transform transition-transform duration-300 opacity-100 sm:w-[100px] md:w-[120px]"
                />
              </div>
              <span className="sr-only">Good Shepherd Institute Of Music</span>
            </Link>
          </div>

          <div className={`flex mt-[-.5625rem] space-x-[0.8125rem] relative`}>
            <div className={`nav-login relative transition-all duration-500 ${showElements ? 'opacity-100 translate-x-0 delay-300' : 'opacity-0 translate-x-[20px]'}`}>
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="p-2 text-white bg-transparent hover:text-gray-200 transition-colors duration-200 group relative"
                >
                  <svg 
                    width="16" 
                    height="17" 
                    viewBox="0 0 16 17" 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="text-custom-red translate-y-1"
                  >
                    <path 
                      d="M8.29183 7.66667C10.1328 7.66667 11.6252 6.17428 11.6252 4.33333C11.6252 2.49238 10.1328 1 8.29183 1C6.45088 1 4.9585 2.49238 4.9585 4.33333C4.9585 6.17428 6.45088 7.66667 8.29183 7.66667Z" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                    <path 
                      d="M14.9583 16V14.3333C14.9583 13.4493 14.6071 12.6014 13.982 11.9763C13.3569 11.3512 12.5091 11 11.625 11H4.95833C4.07428 11 3.22643 11.3512 2.60131 11.9763C1.97619 12.6014 1.625 13.4493 1.625 14.3333V16" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="sr-only">Log out</span>
                </button>
              ) : (
                <Link href="/login">
                  <button
                    className="p-2 text-white bg-transparent hover:text-gray-200 transition-colors duration-200 group relative"
                  >
                    <svg 
                      width="16" 
                      height="17" 
                      viewBox="0 0 16 17" 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="group-hover:text-custom-red translate-y-1"
                    >
                      <path 
                        d="M8.29183 7.66667C10.1328 7.66667 11.6252 6.17428 11.6252 4.33333C11.6252 2.49238 10.1328 1 8.29183 1C6.45088 1 4.9585 2.49238 4.9585 4.33333C4.9585 6.17428 6.45088 7.66667 8.29183 7.66667Z" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                      <path 
                        d="M14.9583 16V14.3333C14.9583 13.4493 14.6071 12.6014 13.982 11.9763C13.3569 11.3512 12.5091 11 11.625 11H4.95833C4.07428 11 3.22643 11.3512 2.60131 11.9763C1.97619 12.6014 1.625 13.4493 1.625 14.3333V16" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="sr-only">Log in</span>
                  </button>
                </Link>
              )}
            </div>

            <div className={`nav-payment transition-all duration-500 ${showElements ? 'opacity-100 translate-x-0 delay-400' : 'opacity-0 translate-x-[20px]'}`}>
              <Link href="/payment">
                <button
                  className="p-2 text-white hover:text-gray-200 transition-colors duration-200 group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    className="w-6 h-6 transition-all duration-400 fill-current group-hover:text-custom-red"
                  >
                    <path d="M27,7H5A2,2,0,0,0,3,9V23a2,2,0,0,0,2,2H27a2,2,0,0,0,2-2V9A2,2,0,0,0,27,7ZM11,22H7a1,1,0,0,1,0-2h4a1,1,0,0,1,0,2Zm1-7a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V11a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1Zm13,7H17a1,1,0,0,1,0-2h8a1,1,0,0,1,0,2Z"></path>
                  </svg>
                  <span className="sr-only">Go to payment</span>
                </button>
              </Link>
            </div>

            <div className={`nav-button transition-all duration-500 ${showElements ? 'opacity-100 translate-x-0 delay-500' : 'opacity-0 translate-x-[20px]'}`}>
              <button 
                ref={menuButtonRef}
                id="globalNavToggle"
                onClick={toggleMenu}
                className="p-2 text-white hover:text-gray-200 transition-colors duration-200 group relative w-6 h-6"
                aria-expanded={isMenuOpen}
                aria-controls="navigation-menu"
              >
                <div className="absolute inset-0 flex flex-col justify-center items-center">
                {!isMenuOpen ? (
                  <>
                    <motion.div 
                      className="absolute w-6 h-0.5 bg-current group-hover:bg-custom-red"
                      initial={{ width: '66%', y: -4 }}
                      animate={{ width: isMenuOpen ? '100%' : '66%', y: -3 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div 
                      className="absolute w-6 h-0.5 bg-current group-hover:bg-custom-red"
                      initial={{ width: '100%', y: 4 }}
                      animate={{ width: '100%', y: 3 }}
                      transition={{ duration: 0.3 }}
                    />
                  </>
                ) : (
                  <>
                    <motion.div 
                      className="absolute w-6 h-0.5 bg-current group-hover:bg-custom-red"
                      initial={{ rotate: 0, y: -3 }}
                      animate={{ 
                        rotate: 45, 
                        y: 0,
                        width: '100%'
                      }}
                      transition={{ duration: 0.3 }}
                      style={{ transformOrigin: 'center' }}
                    />
                    <motion.div 
                      className="absolute w-6 h-0.5 bg-current group-hover:bg-custom-red"
                      initial={{ rotate: 0, y: 3 }}
                      animate={{ 
                        rotate: -45, 
                        y: 0,
                        width: '100%'
                      }}
                      transition={{ duration: 0.3 }}
                      style={{ transformOrigin: 'center' }}
                    />
                  </>
                )}
                </div>
                <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
              </button>
            </div>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            ref={menuRef}
            id="navigation-menu"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
            className="fixed z-[9999] pointer-events-none"
            style={{
              top: dropdownStyles.top,
              right: dropdownStyles.right,
              width: dropdownStyles.width,
              maxWidth: dropdownStyles.maxWidth
            }}
          >
            <div 
              className="w-full origin-top-right shadow-xl pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-black bg-opacity-85 rounded-lg overflow-hidden border border-gray-800">
                <motion.div 
                  initial="hidden"
                  animate="visible"
                  variants={menuItemVariants}
                  className="flex flex-col p-4"
                >
                  <motion.div 
                    variants={menuItemVariants}
                    className="overflow-hidden"
                  >
                    <Link 
                      href="/about-us" 
                      className="block text-white text-base font-medium text-center py-3 px-4 hover:text-custom-red transition-colors duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      About Us
                    </Link>
                  </motion.div>

                  <motion.div 
                    variants={menuItemVariants}
                    className="overflow-hidden mt-1"
                  >
                    <Link 
                      href="/exams" 
                      className="block text-white text-base font-medium text-center py-3 px-4 hover:text-custom-red transition-colors duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Exams
                    </Link>
                  </motion.div>

                  <motion.div 
                    variants={menuItemVariants}
                    className="overflow-hidden mt-1"
                  >
                    <a 
                      href="#admissions" 
                      className="block text-white text-base font-medium text-center py-3 px-4 hover:text-custom-red transition-colors duration-300"
                      onClick={scrollToAdmissions}
                    >
                      Admissions
                    </a>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navigation;
