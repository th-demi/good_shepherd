'use client';
import React, { useEffect, useState, createContext, useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// Create auth context
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

const Navigation = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [showElements, setShowElements] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setShowElements(true);
    }, 200);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    if (loginData.email === 'gsim@gmail.com' && loginData.password === '5550') {
      setIsLoggedIn(true);
      setShowLoginForm(false);
      setLoginData({ email: '', password: '' });
    } else {
      setError('Invalid credentials');
    }
    setIsLoading(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginData({ email: '', password: '' });
  };

  return (
    <div className="absolute z-5 w-full gradient">
      <div className="relative container mx-auto px-4 md:px-[4.375rem] max-w-[1300px]">
        <nav className="relative z-10 flex items-start justify-between pt-[2.625rem] pb-[2.375rem]">
          <h2 className="sr-only">Website Navigation</h2>

          {/* Logo */}
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

          <div className={`flex mt-[-.5625rem] space-x-[0.8125rem]`}>
            {/* Login/Logout Button with Enhanced Tooltip */}
            <div className={`nav-login relative transition-all duration-500 ${showElements ? 'opacity-100 translate-x-0 delay-300' : 'opacity-0 translate-x-[20px]'}`}>
              <button
                onClick={() => isLoggedIn ? handleLogout() : setShowLoginForm(!showLoginForm)}
                className="p-2 text-white bg-transparent hover:text-gray-200 transition-colors duration-200 group relative"
              >
                <svg 
                  width="16" 
                  height="17" 
                  viewBox="0 0 16 17" 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`transition-all duration-400 ${
                    isLoggedIn ? 'text-custom-red' : 'group-hover:text-custom-red'
                  } translate-y-1`}
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
                <span className="sr-only">{isLoggedIn ? 'Log out' : 'Log in'}</span>
              </button>

              {/* Enhanced Login Form Tooltip */}
              <AnimatePresence>
                {showLoginForm && !isLoggedIn && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-4 w-80 bg-white rounded-xl shadow-2xl p-6 border border-gray-100"
                  >
                    <div className="absolute -top-2 right-6 w-4 h-4 bg-white transform rotate-45 border-l border-t border-gray-100"></div>
                    <div className="space-y-4">
                      <div className="text-center mb-6">
                        <h3 className="text-lg font-semibold text-gray-800">Admin Login</h3>
                        <p className="text-sm text-gray-500">Please sign in to continue</p>
                      </div>

                      <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                          <div className="relative">
                            <input
                              type="email"
                              value={loginData.email}
                              onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                              placeholder="Email"
                              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm transition-all duration-200 focus:outline-none focus:border-custom-red focus:ring-2 focus:ring-custom-red focus:ring-opacity-20 placeholder-gray-400"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="relative">
                            <input
                              type="password"
                              value={loginData.password}
                              onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                              placeholder="Password"
                              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm transition-all duration-200 focus:outline-none focus:border-custom-red focus:ring-2 focus:ring-custom-red focus:ring-opacity-20 placeholder-gray-400"
                            />
                          </div>
                        </div>

                        {error && (
                          <p className="text-custom-red text-sm text-center">{error}</p>
                        )}

                        <button
                          type="submit"
                          disabled={isLoading}
                          className="w-full bg-custom-red text-white rounded-lg py-2.5 text-sm font-medium hover:bg-opacity-90 transition-all duration-200 relative overflow-hidden"
                        >
                          {isLoading ? (
                            <span className="inline-flex items-center">
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Processing...
                            </span>
                          ) : (
                            'Sign In'
                          )}
                        </button>
                      </form>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Payment Button */}
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

            {/* Menu Button */}
            <div className={`nav-button transition-all duration-500 ${showElements ? 'opacity-100 translate-x-0 delay-500' : 'opacity-0 translate-x-[20px]'}`}>
              <button 
                id="globalNavToggle"
                className="p-2 text-white hover:text-gray-200 transition-colors duration-200 group"
              >
                <div className="flex flex-col space-y-1">
                  <div className="w-6 h-0.5 bg-current group-hover:bg-custom-red"></div>
                  <div className="w-6 h-0.5 bg-current group-hover:bg-custom-red"></div>
                </div>
                <span className="sr-only">Toggle menu</span>
              </button>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navigation;
