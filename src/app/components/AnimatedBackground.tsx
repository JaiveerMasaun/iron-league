import { motion } from "motion/react";
import { Dumbbell } from "lucide-react";

export function AnimatedBackground() {
  // Create floating gym equipment elements
  const equipment = [
    { icon: "🏋️", delay: 0, duration: 20, x: "10%", y: "20%" },
    { icon: "💪", delay: 2, duration: 25, x: "80%", y: "15%" },
    { icon: "🔥", delay: 4, duration: 18, x: "15%", y: "70%" },
    { icon: "⚡", delay: 1, duration: 22, x: "85%", y: "65%" },
    { icon: "🎯", delay: 3, duration: 24, x: "50%", y: "80%" },
    { icon: "💯", delay: 5, duration: 19, x: "70%", y: "40%" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#B11226]/10 via-[#141414] to-[#0B0B0F]"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#B11226]/10 via-transparent to-transparent"></div>
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `linear-gradient(rgba(177, 18, 38, 0.15) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(177, 18, 38, 0.15) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        ></div>
      </div>

      {/* Floating emoji icons */}
      {equipment.map((item, index) => (
        <motion.div
          key={index}
          className="absolute text-4xl opacity-20"
          style={{
            left: item.x,
            top: item.y,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            rotate: [0, 10, -10, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {item.icon}
        </motion.div>
      ))}

      {/* Dumbbell SVG icons */}
      <motion.div
        className="absolute top-1/4 left-1/4 text-[#B11226]/10"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <Dumbbell className="w-32 h-32" />
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 right-1/4 text-[#B11226]/10"
        animate={{
          rotate: [360, 0],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <Dumbbell className="w-24 h-24" />
      </motion.div>

      {/* Glowing orbs */}
      <motion.div
        className="absolute top-1/3 right-1/3 w-96 h-96 bg-[#B11226]/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      ></motion.div>

      <motion.div
        className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-[#FF1E3C]/5 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      ></motion.div>
    </div>
  );
}