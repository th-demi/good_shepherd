"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Script from "next/script"
import Head from "next/head"
import BackButton from "@/components/ui/back-button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import DoodleBackground from "@/components/ui/doodle-background"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table"
import {
  ChevronLeft,
  Plus,
  Minus,
  Check,
  ArrowRight,
  CreditCard,
  Music,
  Mic,
  Piano,
  Guitar,
  Headphones,
} from "lucide-react"
import { cn } from "@/lib/utils"
import "../app/globals.css"

export default function PaymentPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [studentNames, setStudentNames] = useState([""])
  const [registrationId, setRegistrationId] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [selectedCourses, setSelectedCourses] = useState([])
  const [baseAmount, setBaseAmount] = useState(0)
  const [gatewayCharges, setGatewayCharges] = useState(0)
  const [taxOnGateway, setTaxOnGateway] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false)
  const [errors, setErrors] = useState({})
  const [direction, setDirection] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [isBackButtonVisible, setIsBackButtonVisible] = useState(false)
  const [isHeadingVisible, setIsHeadingVisible] = useState(false)
  const [isLineVisible, setIsLineVisible] = useState(false)
  const containerRef = useRef(null);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [discount, setDiscount] = useState(0)

  const COURSE_PRICING = {
    1: Number.parseInt(process.env.NEXT_PUBLIC_COURSE_PRICE_1DAY) || 1500,
    2: Number.parseInt(process.env.NEXT_PUBLIC_COURSE_PRICE_2DAYS) || 2500,
    3: Number.parseInt(process.env.NEXT_PUBLIC_COURSE_PRICE_3DAYS) || 3500,
  }

  const SPECIAL_COURSES = {
    "Bharatanatyam": {
      fixedDays: Number.parseInt(process.env.NEXT_PUBLIC_BHARATANATYAM_DAYS) || 2,
      price: Number.parseInt(process.env.NEXT_PUBLIC_BHARATANATYAM_PRICE) || 1500
    },
    "Western Dance": {
      fixedDays: Number.parseInt(process.env.NEXT_PUBLIC_WESTERN_DANCE_DAYS) || 2,
      price: Number.parseInt(process.env.NEXT_PUBLIC_WESTERN_DANCE_PRICE) || 1700
    }
  }

  const courses = [
    "Piano",
    "Keyboard",
    "Guitar",
    "Violin",
    "Drums",
    "Recorder",
    "Ukulele",
    "Classical Vocals",
    "Western Vocals",
    "Bharatanatyam",
    "Western Dance",
  ]

  const validateCustomerDetails = () => {
    const newErrors = {}
  
    // Validate each student name
    studentNames.forEach((name, index) => {
      if (!name.trim()) {
        newErrors[`studentName-${index}`] = "Student name is required"
      }
    })
  
    // Updated regex to match 3-4 digits only
    const idRegex = /^[0-9]{3,4}$/
    if (!registrationId.trim()) {
      newErrors.registrationId = "Registration ID is required"
    } else if (!idRegex.test(registrationId)) {
      newErrors.registrationId = "Registration ID must be 3 or 4 digits"
    }
  
    const phoneRegex = /^[0-9]{10}$/
    if (!customerPhone.trim()) {
      newErrors.customerPhone = "Phone number is required"
    } else if (!phoneRegex.test(customerPhone)) {
      newErrors.customerPhone = "Phone number must be 10 digits"
    }
  
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateCourseSelection = () => {
    if (selectedCourses.length === 0) {
      setErrors((prev) => ({ ...prev, courses: "Please select at least one course" }))
      return false
    }
    return true
  }

  const calculateAmounts = useCallback(() => {
    let calculatedBase = 0;
    let calculatedDiscount = 0;
    
    // Calculate base amount for all courses
    calculatedBase = selectedCourses.reduce((total, course) => {
      if (SPECIAL_COURSES[course.name]) {
        return total + SPECIAL_COURSES[course.name].price;
      } else {
        return total + (COURSE_PRICING[course.daysPerWeek] || 0);
      }
    }, 0);

    // Check if any non-special course has more than 1 day per week
    const hasNonSpecialCoursesWithMultipleDays = selectedCourses.some(course => 
      !SPECIAL_COURSES[course.name] && course.daysPerWeek > 1
    );

    // Apply discount only if there are non-special courses with multiple days
    if (hasNonSpecialCoursesWithMultipleDays) {
      calculatedDiscount = 500;
    }

    const calculatedGateway = (calculatedBase - calculatedDiscount) * 0.02;
    const calculatedTax = calculatedGateway * 0.18;
    const calculatedTotal = (calculatedBase - calculatedDiscount) + calculatedGateway + calculatedTax;

    setBaseAmount(calculatedBase);
    setGatewayCharges(calculatedGateway);
    setTaxOnGateway(calculatedTax);
    setTotalAmount(calculatedTotal);
    setDiscount(calculatedDiscount);
  }, [selectedCourses]);

  useEffect(() => {
    calculateAmounts()
  }, [selectedCourses, calculateAmounts])

  useEffect(() => {
    const timers = [
      setTimeout(() => setIsHeadingVisible(true), 100),
      setTimeout(() => setIsLineVisible(true), 200),
      setTimeout(() => setIsBackButtonVisible(true), 300),
    ]
    return () => timers.forEach((timer) => clearTimeout(timer))
  }, [])

  useEffect(() => {
    if (hasInitialized && containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      setHasInitialized(true);
    }
  }, [currentStep]);

  const handleNextStep = () => {
    if (currentStep === 0 && validateCustomerDetails()) {
      setDirection(1)
      setCurrentStep(1)
    } else if (currentStep === 1 && validateCourseSelection()) {
      setDirection(1)
      setCurrentStep(2)
    }
  }

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setDirection(-1)
      setCurrentStep(currentStep - 1)
    }
  }

  const handleCourseSelection = (courseName) => {
    setSelectedCourses((prev) => {
      const existingCourse = prev.find((c) => c.name === courseName)
      if (existingCourse) {
        return prev.filter((c) => c.name !== courseName)
      } else {
        // For special courses, set fixed days
        if (SPECIAL_COURSES[courseName]) {
          return [...prev, { 
            name: courseName, 
            daysPerWeek: SPECIAL_COURSES[courseName].fixedDays 
          }]
        } else {
          return [...prev, { 
            name: courseName, 
            daysPerWeek: 1 
          }]
        }
      }
    })
  }

  const updateCourseDays = (courseName, days) => {
    // Don't allow changing days for special courses
    if (SPECIAL_COURSES[courseName]) return;
    
    setSelectedCourses((prev) =>
      prev.map((course) => (course.name === courseName ? { ...course, daysPerWeek: days } : course)),
    )
  }

  const addStudentField = () => {
    setStudentNames((prev) => [...prev, ""])
  }

  const updateStudentName = (index, value) => {
    setStudentNames((prev) => {
      const newNames = [...prev]
      newNames[index] = value
      return newNames
    })
  }

  const removeStudentField = (index) => {
    if (studentNames.length > 1) {
      setStudentNames((prev) => prev.filter((_, i) => i !== index))
    }
  }

  const handlePayment = async () => {
    if (studentNames.some((name) => !name.trim())) {
      alert("Please fill in all student names")
      return
    }
    if (!registrationId) {
      alert("Please fill in registration ID")
      return
    }
    if (!customerPhone) {
      alert("Please fill in phone number")
      return
    }
    if (selectedCourses.length === 0) {
      alert("Please select at least one course")
      return
    }

    setIsLoading(true)

    const orderData = {
      amount: Math.round(totalAmount * 100),
      currency: "INR",
      receipt: `order_${Date.now()}`,
    }

    try {
      const response = await fetch("/api/createOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })

      const order = await response.json()

      if (!order.id) {
        alert("Failed to create order. Please try again.")
        setIsLoading(false)
        return
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Good Shepherd Institute of Music",
        description: "Monthly Tuition Payment",
        order_id: order.id,
        handler: async (response) => {
          const paymentData = {
            customer_name: studentNames.join(", "),
            registration_id: registrationId,
            customer_phone: customerPhone,
            order_id: order.id,
            payment_id: response.razorpay_payment_id,
            payment_method: "Razorpay",
            base_amount: baseAmount,
            gateway_charges: gatewayCharges,
            tax_on_gateway: taxOnGateway,
            amount_paid: totalAmount,
            courses: selectedCourses.map((c) => {
              if (SPECIAL_COURSES[c.name]) {
                return `${c.name} (fixed ${c.daysPerWeek} days/week)`;
              }
              return `${c.name} (${c.daysPerWeek} days/week)`;
            }).join(", "),
            student_count: studentNames.length,
            discount: discount
          }

          const storeResponse = await fetch("/api/storePayment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(paymentData),
          })

          setIsLoading(false)

          if (storeResponse.ok) {
            setIsPaymentDialogOpen(true)
          } else {
            alert("Payment successful, but failed to store details. Please contact support.")
          }
        },
        prefill: {
          name: studentNames[0], // Use first student name as primary contact
          contact: customerPhone,
        },
        theme: {
          color: "#000000",
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (error) {
      console.error("Payment error:", error)
      alert("An error occurred during payment processing. Please try again.")
      setIsLoading(false)
    }
  }

  const pageVariants = {
    initial: (direction) => ({
      opacity: 0,
      x: direction > 0 ? "5%" : "-5%",
      scale: 0.98,
    }),
    in: {
      opacity: 1,
      x: 0,
      scale: 1,
    },
    out: (direction) => ({
      opacity: 0,
      x: direction > 0 ? "-5%" : "5%",
      scale: 0.98,
    }),
  }

  const pageTransition = {
    type: "spring",
    stiffness: 300,
    damping: 30,
  }

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

  const progressBarWidth = () => {
    if (currentStep === 0) return "33.3%"
    if (currentStep === 1) return "66.6%"
    return "100%"
  }

  return (
    <>
      <Head>
        <title>Payments - GSIM</title>
        <meta name="description" content="Enroll in music courses and make payments" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col min-h-screen">
        <div className="bg-black w-full overflow-x-hidden relative">
          <div className="container mx-auto px-4 py-8 flex flex-col relative z-10">
            <div className="relative -ml-2 sm:ml-0"> {/* Adjust container positioning */}
              {/* Back Button - precisely positioned */}
              <div className={`absolute left-0 top-1 transition-opacity duration-500 ${
                isBackButtonVisible ? "opacity-100" : "opacity-0"
              }`}>
                <BackButton className="h-8 w-8 sm:h-10 sm:w-10" /> {/* Fixed button size */}
              </div>
              
              {/* Heading - perfectly left-aligned as original */}
              <h2
                className={`text-4xl md:text-5xl xl:text-7xl font-thin text-white transition-opacity duration-500 ${
                  isHeadingVisible ? "opacity-100" : "opacity-0"
                } pl-12 sm:pl-14`}
              >
                PAYMENT
              </h2>
            </div>
          </div>
        </div>
        <div className="bg-[#f5f5f7]  w-full overflow-x-hidden relative flex-grow" ref={containerRef}>
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
                <button
                    onClick={handlePreviousStep}
                    className={`text-[#0066cc] font-medium flex items-center ${currentStep === 0 ? "invisible" : "visible"}`}
                >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Back
                </button>

                <div className="text-sm text-gray-500">Step {currentStep + 1} of 3</div>
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
                    animate={{ width: progressBarWidth() }}
                    transition={{ duration: 0.5 }}
                />
                </motion.div>

                <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-3xl md:text-4xl font-medium mb-6 text-[#1d1d1f] text-center font-thin"
                >
                {currentStep === 0 ? "STUDENT INFORMATION" : currentStep === 1 ? "COURSES SELECTION" : "PAYMENT SUMMARY"}
                </motion.h2>
            </div>

            <div className="flex-grow relative z-20">
                <AnimatePresence mode="wait" custom={direction}>
                {currentStep === 0 && (
                    <motion.div
                    key="step-0"
                    custom={direction}
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                    className="max-w-xl mx-auto"
                    >
                    <Card className="border-none shadow-lg rounded-2xl overflow-hidden backdrop-blur-sm bg-white/90">
                        <CardContent className="p-8 space-y-6">
                        <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-6">
                            {studentNames.map((name, index) => (
                            <motion.div key={index} variants={fadeInUp} className="space-y-2 relative">
                                <Label className="text-[#1d1d1f] font-medium">
                                {index === 0 ? "Student Name" : `Student ${index + 1} Name`}
                                </Label>
                                <div className="flex items-center gap-3">
                                <Input
                                    placeholder="Enter student full name"
                                    value={name}
                                    onChange={(e) => updateStudentName(index, e.target.value)}
                                    className={cn(
                                    "flex-1 h-12 rounded-xl border-gray-300 focus:border-[#0066cc] focus:ring-[#0066cc] transition-all duration-200",
                                    errors[`studentName-${index}`]
                                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                        : "",
                                    )}
                                />
                                {index === studentNames.length - 1 && (
                                    <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={addStudentField}
                                    className="h-12 w-12 rounded-full border-gray-300 hover:bg-[#0066cc] hover:text-white hover:border-[#0066cc] transition-all duration-200"
                                    >
                                    <Plus className="h-5 w-5" />
                                    </Button>
                                )}
                                {index > 0 && (
                                    <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => removeStudentField(index)}
                                    className="h-12 w-12 rounded-full border-gray-300 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-200"
                                    >
                                    <Minus className="h-5 w-5" />
                                    </Button>
                                )}
                                </div>
                                {errors[`studentName-${index}`] && (
                                <motion.p
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="text-red-500 text-sm mt-1"
                                >
                                    {errors[`studentName-${index}`]}
                                </motion.p>
                                )}
                            </motion.div>
                            ))}

                            <motion.div variants={fadeInUp} className="space-y-2">
                            <Label className="text-[#1d1d1f] font-medium">Registration ID</Label>
                            <Input
                                placeholder="Enter your registration ID"
                                value={registrationId}
                                onChange={(e) => setRegistrationId(e.target.value)}
                                className={cn(
                                "h-12 rounded-xl border-gray-300 focus:border-[#0066cc] focus:ring-[#0066cc] transition-all duration-200",
                                errors.registrationId ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "",
                                )}
                            />
                            {errors.registrationId && (
                                <motion.p
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="text-red-500 text-sm mt-1"
                                >
                                {errors.registrationId}
                                </motion.p>
                            )}
                            </motion.div>

                            <motion.div variants={fadeInUp} className="space-y-2">
                            <Label className="text-[#1d1d1f] font-medium">Phone Number</Label>
                            <Input
                                type="tel"
                                placeholder="Enter phone number"
                                value={customerPhone}
                                onChange={(e) => setCustomerPhone(e.target.value)}
                                className={cn(
                                "h-12 rounded-xl border-gray-300 focus:border-[#0066cc] focus:ring-[#0066cc] transition-all duration-200",
                                errors.customerPhone ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "",
                                )}
                            />
                            {errors.customerPhone && (
                                <motion.p
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="text-red-500 text-sm mt-1"
                                >
                                {errors.customerPhone}
                                </motion.p>
                            )}
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                        >
                            <Button
                            className="w-full mt-6 h-12 bg-[#0066cc] hover:bg-[#004499] text-white rounded-xl font-medium text-base transition-all duration-200 flex items-center justify-center gap-2"
                            onClick={handleNextStep}
                            >
                            Continue
                            <ArrowRight className="h-4 w-4 ml-1" />
                            </Button>
                        </motion.div>
                        </CardContent>
                    </Card>
                    </motion.div>
                )}

                {currentStep === 1 && (
                    <motion.div
                    key="step-1"
                    custom={direction}
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                    className="max-w-2xl mx-auto"
                    >
                    <Card className="border-none shadow-lg rounded-2xl overflow-hidden backdrop-blur-sm bg-white/90">
                        <CardContent className="p-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="mb-6"
                        >
                            <p className="text-sm text-gray-500">
                            Selected for {studentNames.length} student{studentNames.length > 1 ? "s" : ""}:
                            <span className="font-medium text-[#1d1d1f]"> {studentNames.join(", ")}</span>
                            </p>
                        </motion.div>

                        <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-6">
                            <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-4 mb-6">
                            {courses.map((course, index) => (
                                <motion.div
                                key={course}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05, duration: 0.3 }}
                                className={cn(
                                    "relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200",
                                    selectedCourses.some((c) => c.name === course)
                                    ? "border-[#0066cc] bg-[#f0f7ff]"
                                    : "border-gray-200 hover:border-gray-300",
                                )}
                                onClick={() => handleCourseSelection(course)}
                                >
                                <div
                                    className={cn(
                                    "w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-all duration-200",
                                    selectedCourses.some((c) => c.name === course)
                                        ? "border-[#0066cc] bg-[#0066cc]"
                                        : "border-gray-300",
                                    )}
                                >
                                    {selectedCourses.some((c) => c.name === course) && (
                                    <Check className="h-3 w-3 text-white" />
                                    )}
                                </div>
                                <span className="font-medium text-[#1d1d1f]">{course}</span>
                                </motion.div>
                            ))}
                            </motion.div>

                            {errors.courses && (
                            <motion.p
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="text-red-500 text-sm mb-4"
                            >
                                {errors.courses}
                            </motion.p>
                            )}

                            <AnimatePresence>
                            {selectedCourses.length > 0 && (
                                <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-4"
                                >
                                <h3 className="font-medium text-lg text-[#1d1d1f]">Selected Courses</h3>
                                {selectedCourses.map((course, index) => (
                                    <motion.div
                                    key={course.name}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.3 }}
                                    className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm"
                                    >
                                    <div className="flex items-center justify-between">
                                        <div>
                                        <div className="font-medium text-[#1d1d1f]">{course.name}</div>
                                        <div className="text-sm text-gray-500">Days per week (per student)</div>
                                        </div>
                                        {SPECIAL_COURSES[course.name] ? (
                                          <div className="w-[120px] h-10 flex items-center justify-center rounded-lg border-gray-300 border">
                                            {SPECIAL_COURSES[course.name].fixedDays} days (fixed)
                                          </div>
                                        ) : (
                                          <Select
                                            value={course.daysPerWeek.toString()}
                                            onValueChange={(value) => updateCourseDays(course.name, Number.parseInt(value))}
                                          >
                                            <SelectTrigger className="w-[120px] h-10 rounded-lg border-gray-300">
                                              <SelectValue placeholder="Select days" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              {[1, 2, 3].map((days) => (
                                                <SelectItem key={days} value={days.toString()}>
                                                  {days} day{days > 1 ? "s" : ""}
                                                </SelectItem>
                                              ))}
                                            </SelectContent>
                                          </Select>
                                        )}
                                    </div>
                                    </motion.div>
                                ))}
                                </motion.div>
                            )}
                            </AnimatePresence>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                        >
                            <Button
                            className="w-full mt-8 h-12 bg-[#0066cc] hover:bg-[#004499] text-white rounded-xl font-medium text-base transition-all duration-200 flex items-center justify-center gap-2"
                            onClick={handleNextStep}
                            disabled={selectedCourses.length === 0}
                            >
                            Continue to Payment
                            <ArrowRight className="h-4 w-4 ml-1" />
                            </Button>
                        </motion.div>
                        </CardContent>
                    </Card>
                    </motion.div>
                )}

                {currentStep === 2 && (
                    <motion.div
                    key="step-2"
                    custom={direction}
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                    className="max-w-2xl mx-auto"
                    >
                    <Card className="border-none shadow-lg rounded-2xl overflow-hidden backdrop-blur-sm bg-white/90">
                        <CardContent className="p-8">
                        <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-8">
                            <motion.div variants={fadeInUp} className="mb-6">
                            <h3 className="font-medium text-lg text-[#1d1d1f] mb-3">Student Details</h3>
                            <div className="bg-[#f5f5f7] rounded-xl p-4 space-y-2">
                                <p className="flex justify-between">
                                <span className="text-gray-500">Students:</span>
                                <span className="font-medium text-[#1d1d1f]">{studentNames.join(", ")}</span>
                                </p>
                                <p className="flex justify-between">
                                <span className="text-gray-500">Registration ID:</span>
                                <span className="font-medium text-[#1d1d1f]">{registrationId}</span>
                                </p>
                                <p className="flex justify-between">
                                <span className="text-gray-500">Parent Phone:</span>
                                <span className="font-medium text-[#1d1d1f]">{customerPhone}</span>
                                </p>
                            </div>
                            </motion.div>

                            <motion.div variants={fadeInUp}>
                            <h3 className="font-medium text-lg text-[#1d1d1f] mb-3">Selected Courses</h3>
                            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                                <Table>
                                <TableHeader>
                                    <TableRow>
                                    <TableCell className="font-medium text-[#1d1d1f]">Course</TableCell>
                                    <TableCell className="text-right font-medium text-[#1d1d1f]">Classes/Week</TableCell>
                                    <TableCell className="text-right font-medium text-[#1d1d1f]">
                                        Price (per student)
                                    </TableCell>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {selectedCourses.map((course, index) => (
                                    <TableRow key={course.name} className={index % 2 === 0 ? "bg-[#f9f9fb]" : ""}>
                                        <TableCell>{course.name}</TableCell>
                                        <TableCell className="text-right">{course.daysPerWeek} days</TableCell>
                                        <TableCell className="text-right">
                                          {SPECIAL_COURSES[course.name] ? (
                                            `₹${SPECIAL_COURSES[course.name].price}`
                                          ) : (
                                            `₹${COURSE_PRICING[course.daysPerWeek]}`
                                          )}
                                        </TableCell>
                                    </TableRow>
                                    ))}
                                </TableBody>
                                </Table>
                            </div>
                            </motion.div>

                            <motion.div variants={fadeInUp}>
                            <h3 className="font-medium text-lg text-[#1d1d1f] mb-3">Payment Method</h3>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div
                                className={cn(
                                    "relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200",
                                    paymentMethod === "card"
                                    ? "border-[#0066cc] bg-[#f0f7ff]"
                                    : "border-gray-200 hover:border-gray-300",
                                )}
                                onClick={() => setPaymentMethod("card")}
                                >
                                <div
                                    className={cn(
                                    "w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-all duration-200",
                                    paymentMethod === "card" ? "border-[#0066cc] bg-[#0066cc]" : "border-gray-300",
                                    )}
                                >
                                    {paymentMethod === "card" && <Check className="h-3 w-3 text-white" />}
                                </div>
                                <div className="flex items-center">
                                    <CreditCard className="h-5 w-5 mr-2 text-[#1d1d1f]" />
                                    <span className="font-medium text-[#1d1d1f]">Card</span>
                                </div>
                                </div>

                                <div
                                className={cn(
                                    "relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200",
                                    paymentMethod === "upi"
                                    ? "border-[#0066cc] bg-[#f0f7ff]"
                                    : "border-gray-200 hover:border-gray-300",
                                )}
                                onClick={() => setPaymentMethod("upi")}
                                >
                                <div
                                    className={cn(
                                    "w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-all duration-200",
                                    paymentMethod === "upi" ? "border-[#0066cc] bg-[#0066cc]" : "border-gray-300",
                                    )}
                                >
                                    {paymentMethod === "upi" && <Check className="h-3 w-3 text-white" />}
                                </div>
                                <div className="flex items-center">
                                    <svg
                                    className="h-5 w-5 mr-2"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    >
                                    <path
                                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                        stroke="#1d1d1f"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M7.5 12H16.5"
                                        stroke="#1d1d1f"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M12 7.5V16.5"
                                        stroke="#1d1d1f"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    </svg>
                                    <span className="font-medium text-[#1d1d1f]">UPI</span>
                                </div>
                                </div>
                            </div>
                            </motion.div>

                            <motion.div variants={fadeInUp}>
                              <h3 className="font-medium text-lg text-[#1d1d1f] mb-3">Order Summary</h3>
                              <div className="bg-[#f5f5f7] rounded-xl p-6 space-y-3">
                                <div className="flex justify-between">
                                  <span className="text-gray-500">Number of Students:</span>
                                  <span className="font-medium text-[#1d1d1f]">{studentNames.length}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">Base Amount:</span>
                                  <span className="font-medium text-[#1d1d1f]">₹{baseAmount.toFixed(2)}</span>
                                </div>
                                {discount > 0 && (
                                  <>
                                    <div className="flex justify-between">
                                      <span className="text-gray-500">Discount:</span>
                                      <span className="font-medium text-green-600">-₹{discount.toFixed(2)}</span>
                                    </div>
                                    <div className="text-xs text-gray-500 mb-2">
                                      ₹500 discount applied for selecting multiple days per week courses
                                    </div>
                                  </>
                                )}
                                <div className="flex justify-between">
                                  <span className="text-gray-500">Gateway Charges (2%):</span>
                                  <span className="font-medium text-[#1d1d1f]">₹{gatewayCharges.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">Tax on Gateway (18%):</span>
                                  <span className="font-medium text-[#1d1d1f]">₹{taxOnGateway.toFixed(2)}</span>
                                </div>
                                <Separator className="my-3 bg-gray-300" />
                                <div className="flex justify-between text-lg">
                                  <span className="font-medium text-[#1d1d1f]">Total Amount</span>
                                  <span className="font-bold text-[#0066cc]">₹{totalAmount.toFixed(2)}</span>
                                </div>
                              </div>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                        >
                            <Button
                            className="w-full mt-8 h-12 bg-[#0066cc] hover:bg-[#004499] text-white rounded-xl font-medium text-base transition-all duration-200 flex items-center justify-center gap-2"
                            onClick={handlePayment}
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
                                Processing...
                                </>
                            ) : (
                                <>
                                Pay ₹{totalAmount.toFixed(2)}
                                <ArrowRight className="h-4 w-4 ml-1" />
                                </>
                            )}
                            </Button>
                        </motion.div>
                        </CardContent>
                    </Card>
                    </motion.div>
                )}
                </AnimatePresence>
            </div>
            </div>
        </div>
      </div>

      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl p-0 overflow-hidden">
          <div className="bg-[#0066cc] p-6 flex justify-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <Check className="h-8 w-8 text-[#0066cc]" />
            </div>
          </div>
          <DialogHeader className="px-6 pt-6">
            <DialogTitle className="text-2xl font-medium text-center">Payment Successful</DialogTitle>
            <DialogDescription className="text-center mt-2">
              Your tuition payment for {studentNames.length} student{studentNames.length > 1 ? "s" : ""} has been
              confirmed.
            </DialogDescription>
          </DialogHeader>
          <div className="p-6">
            <div className="bg-[#f5f5f7] rounded-xl p-4 mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-500">Amount Paid:</span>
                <span className="font-bold text-[#1d1d1f]">₹{totalAmount.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between mb-2">
                  <span className="text-gray-500">Discount Applied:</span>
                  <span className="font-medium text-green-600">₹{discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-500">Payment ID:</span>
                <span className="font-medium text-[#1d1d1f]">RZPY12345678</span>
              </div>
            </div>
            <Button
              className="w-full h-12 bg-[#0066cc] hover:bg-[#004499] text-white rounded-xl font-medium text-base transition-all duration-200"
              onClick={() => setIsPaymentDialogOpen(false)}
            >
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
    </>
  )
}