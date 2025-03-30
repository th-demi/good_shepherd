"use client"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

const ReviewCard = ({ review, index, activeIndex }) => {
  const isActive = index === activeIndex
  const cardRef = useRef(null)
  const [cardHeight, setCardHeight] = useState(0)

  useEffect(() => {
    if (cardRef.current) {
      setCardHeight(cardRef.current.offsetHeight)
    }

    // Update height on window resize
    const handleResize = () => {
      if (cardRef.current) {
        setCardHeight(cardRef.current.offsetHeight)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [review])

  const variants = {
    initial: (direction) => {
      return {
        x: direction > 0 ? 50 : -50,
        opacity: 0,
        scale: 0.95,
      }
    },
    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 20 },
        opacity: { duration: 0.2 },
      },
    },
    exit: (direction) => {
      return {
        x: direction > 0 ? -50 : 50,
        opacity: 0,
        scale: 0.95,
        transition: {
          x: { type: "spring", stiffness: 300, damping: 20 },
          opacity: { duration: 0.2 },
        },
      }
    },
  }

  return (
    <AnimatePresence custom={index - activeIndex} initial={false}>
      {isActive && (
        <motion.div
          key={index}
          ref={cardRef}
          custom={index - activeIndex}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute w-full bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow-lg"
          style={{
            top: 0,
            left: 0,
            right: 0,
            overflow: "hidden",
          }}
        >
          <div className="transition-opacity duration-300 opacity-100">
            <div className="flex items-center mb-3 md:mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                {review.image ? (
                  <img
                    src={review.image || "/placeholder.svg"}
                    alt={review.username}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <span className="text-sm md:text-lg">{review.username[0]}</span>
                )}
              </div>
              <div className="ml-3 md:ml-4">
                <h4 className="text-sm md:text-base font-medium">{review.username}</h4>
                <div className="flex">
                  {[...Array(review.stars)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xs md:text-base">
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-black text-sm md:text-base leading-relaxed">{review.review}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ReviewCard