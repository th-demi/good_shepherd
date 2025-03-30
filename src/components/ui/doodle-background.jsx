// src/components/ui/DoodleBackground.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music, Piano, Guitar, Mic, Headphones } from 'lucide-react';

const DoodleBackground = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  // Color palette for different elements
  const colors = {
    musicNote: "#0066cc",      // Blue
    piano: "#cc0066",          // Pink
    guitar: "#00cc66",         // Green
    mic: "#cc6600",            // Orange
    headphones: "#6600cc",     // Purple
    circles: "#00cccc",        // Teal
    waves: "#cc0066",          // Pink
    floatingNotes: "#cc6600"   // Orange
  };

  const circles = [...Array(8)].map((_, i) => ({
    key: `circle-${i}`,
    width: 20 + Math.random() * 80,
    height: 20 + Math.random() * 80,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: Math.random() * 5,
    duration: 10 + Math.random() * 10,
    x: Math.random() * 40 - 20,
    y: Math.random() * 40 - 20,
    opacity: 0.6 + Math.random() * 0.3
  }));

  const notes = [...Array(12)].map((_, i) => {
    const noteSymbols = ["♩", "♪", "♫", "♬", "𝄞"];
    return {
      key: `note-${i}`,
      randomNote: noteSymbols[Math.floor(Math.random() * noteSymbols.length)],
      fontSize: 20 + Math.random() * 30,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      rotate: Math.random() * 360,
      x: Math.random() * 50 - 25,
      duration: 15 + Math.random() * 10,
      delay: Math.random() * 10,
      opacity: 0.7 + Math.random() * 0.2
    };
  });

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {/* Music notes - Blue */}
      <motion.div
        className="absolute top-[10%] left-[5%]"
        style={{ color: `${colors.musicNote}/30` }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: [0.8, 1, 0.8],
          opacity: [0, 0.9, 0],
          y: [-10, 10, -10],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 8,
          ease: "easeInOut",
        }}
      >
        <Music size={80} />
      </motion.div>

      {/* Piano keys - Pink */}
      <motion.div
        className="absolute top-[30%] right-[8%]"
        style={{ color: `${colors.piano}/30` }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: [0.8, 1, 0.8],
          opacity: [0, 0.8, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 10,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <Piano size={100} />
      </motion.div>

      {/* Guitar - Green */}
      <motion.div
        className="absolute bottom-[15%] left-[10%]"
        style={{ color: `${colors.guitar}/30` }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: [0.8, 1, 0.8],
          opacity: [0, 0.7, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 12,
          ease: "easeInOut",
          delay: 2,
        }}
      >
        <Guitar size={90} />
      </motion.div>

      {/* Microphone - Orange */}
      <motion.div
        className="absolute top-[60%] right-[12%]"
        style={{ color: `${colors.mic}/30` }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: [0.8, 1, 0.8],
          opacity: [0, 0.8, 0],
          y: [10, -10, 10],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 9,
          ease: "easeInOut",
          delay: 3,
        }}
      >
        <Mic size={70} />
      </motion.div>

      {/* Headphones - Purple */}
      <motion.div
        className="absolute bottom-[30%] left-[20%]"
        style={{ color: `${colors.headphones}/30` }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: [0.8, 1, 0.8],
          opacity: [0, 0.9, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 11,
          ease: "easeInOut",
          delay: 4,
        }}
      >
        <Headphones size={85} />
      </motion.div>

      {/* Abstract circles - Teal */}
      {circles.map((circle) => (
        <motion.div
          key={circle.key}
          className="absolute rounded-full"
          style={{
            width: circle.width,
            height: circle.height,
            left: circle.left,
            top: circle.top,
            background: `linear-gradient(to right, ${colors.circles}/20, ${colors.circles}/30)`
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, circle.opacity, 0],
            x: [0, circle.x, 0],
            y: [0, circle.y, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: circle.duration,
            ease: "easeInOut",
            delay: circle.delay,
          }}
        />
      ))}

      {/* Wavy lines - Pink */}
      <svg className="absolute w-full h-full opacity-30 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          d="M0,100 C150,200 350,0 500,100 C650,200 850,0 1000,100 C1150,200 1350,0 1500,100"
          stroke={colors.waves}
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1, 0],
            opacity: [0, 0.5, 0],
            y: [0, 20, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 15,
            ease: "easeInOut",
          }}
        />
        <motion.path
          d="M0,300 C150,400 350,200 500,300 C650,400 850,200 1000,300 C1150,400 1350,200 1500,300"
          stroke={colors.waves}
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1, 0],
            opacity: [0, 0.4, 0],
            y: [0, -20, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 18,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </svg>

      {/* Floating music notes - Orange */}
      {notes.map((note) => (
        <motion.div
          key={note.key}
          className="absolute font-bold"
          style={{
            fontSize: note.fontSize,
            left: note.left,
            top: note.top,
            color: `${colors.floatingNotes}/40`
          }}
          initial={{ y: 100, opacity: 0 }}
          animate={{
            y: [100, -100],
            opacity: [0, note.opacity, 0],
            x: [0, note.x],
            rotate: [0, note.rotate],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: note.duration,
            ease: "easeInOut",
            delay: note.delay,
          }}
        >
          {note.randomNote}
        </motion.div>
      ))}
    </div>
  );
};

export default DoodleBackground;