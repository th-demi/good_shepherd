'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import BackButton from '@/components/ui/back-button';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/context/AuthContext';
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Lock,
  Mail,
} from "lucide-react";
import DoodleBackground from "@/components/ui/doodle-background";

export default function LoginPage() {
  const [isHeadingVisible, setIsHeadingVisible] = useState(false);
  const [isLineVisible, setIsLineVisible] = useState(false);
  const [isBackButtonVisible, setIsBackButtonVisible] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { setIsLoggedIn } = useAuth();
  const containerRef = useRef(null);

  // Trigger visibility animations
  useEffect(() => {
    const timers = [
      setTimeout(() => setIsHeadingVisible(true), 100),
      setTimeout(() => setIsLineVisible(true), 200),
      setTimeout(() => setIsBackButtonVisible(true), 300)
    ];

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    // Get credentials from environment variables
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

    if (loginData.email === adminEmail && loginData.password === adminPassword) {
      setIsLoggedIn(true);
      router.push('/'); // Redirect to homepage
    } else {
      setError('Invalid credentials');
    }
    setIsLoading(false);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <>
      <Head>
        <title>Login - GSIM</title>
        <meta name="description" content="Login to Good Shepherd Institute of Music" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col min-h-screen">
        <div className="bg-black w-full overflow-x-hidden relative">
          <div className="container mx-auto px-4 py-8 flex flex-col relative z-10">
            <div className="relative -ml-2 sm:ml-0">
              {/* Back Button - precisely positioned */}
              <div className={`absolute left-0 top-1 transition-opacity duration-500 ${
                isBackButtonVisible ? "opacity-100" : "opacity-0"
              }`}>
                <BackButton className="h-8 w-8 sm:h-10 sm:w-10" />
              </div>
              
              {/* Heading - perfectly left-aligned as original */}
              <h2
                className={`text-4xl md:text-5xl xl:text-7xl font-thin text-white transition-opacity duration-500 ${
                  isHeadingVisible ? "opacity-100" : "opacity-0"
                } pl-12 sm:pl-14`}
              >
                LOGIN
              </h2>
            </div>
          </div>
        </div>
        
        <div className="bg-[#f5f5f7] w-full overflow-x-hidden relative flex-grow">
          {/* Animated doodle background */}
          <DoodleBackground />

          <div className="container mx-auto px-4 py-8 flex flex-col relative z-10">
            <div className="mb-6 relative px-4 sm:px-0">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex items-center justify-between"
              >
                <div className="w-24"></div> {/* Spacer for balance */}
                <div className="text-sm text-gray-500">Admin Access</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="h-1 bg-gray-200 rounded-full mt-4 mb-8 overflow-hidden"
              >
                <motion.div
                  className="h-full bg-[#0066cc] rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-3xl md:text-4xl font-medium mb-6 text-[#1d1d1f] text-center font-thin"
              >
                ADMIN LOGIN
              </motion.h2>
            </div>

            <div className="flex-grow relative z-20" ref={containerRef}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md mx-auto"
              >
                <Card className="border-none shadow-lg rounded-2xl overflow-hidden backdrop-blur-sm bg-white/90">
                  <CardContent className="p-8 space-y-6">
                    <motion.div 
                      variants={staggerContainer} 
                      initial="initial" 
                      animate="animate" 
                      className="space-y-6"
                    >
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label className="text-[#1d1d1f] font-medium">Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            type="email"
                            placeholder="Enter admin email"
                            value={loginData.email}
                            onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                            className="h-12 rounded-xl border-gray-300 focus:border-[#0066cc] focus:ring-[#0066cc] pl-10 transition-all duration-200"
                            required
                          />
                        </div>
                      </motion.div>

                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label className="text-[#1d1d1f] font-medium">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            type="password"
                            placeholder="Enter admin password"
                            value={loginData.password}
                            onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                            className="h-12 rounded-xl border-gray-300 focus:border-[#0066cc] focus:ring-[#0066cc] pl-10 transition-all duration-200"
                            required
                          />
                        </div>
                      </motion.div>

                      {error && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-red-500 text-sm text-center"
                        >
                          {error}
                        </motion.div>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                    >
                      <Button
                        className="w-full mt-6 h-12 bg-[#0066cc] hover:bg-[#004499] text-white rounded-xl font-medium text-base transition-all duration-200 flex items-center justify-center gap-2"
                        onClick={handleLogin}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Authenticating...
                          </>
                        ) : (
                          <>
                            Sign In
                            <ArrowRight className="h-4 w-4 ml-1" />
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}