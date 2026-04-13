import { useState } from "react";
import { motion } from "motion/react";
import { Play, Pause } from "lucide-react";

interface ExerciseAnimationProps {
  exerciseName: string;
}

export function ExerciseAnimation({ exerciseName }: ExerciseAnimationProps) {
  const [isPlaying, setIsPlaying] = useState(true);

  const getAnimationType = (name: string): string => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes("squat")) return "squat";
    if (lowerName.includes("bench")) return "bench";
    if (lowerName.includes("deadlift")) return "deadlift";
    if (lowerName.includes("curl")) return "curl";
    if (lowerName.includes("press")) return "press";
    return "default";
  };

  const animationType = getAnimationType(exerciseName);

  return (
    <div className="relative bg-gradient-to-br from-[#0B0B0F] to-[#000000] border-2 border-[#2A2A2A] rounded-xl overflow-hidden aspect-square">
      <div className="absolute inset-0 bg-[#F21137] opacity-5 blur-2xl" />

      <div className="relative z-10 w-full h-full p-4">
        <svg viewBox="0 0 300 300" className="w-full h-full">
          {/* Background: Gym with people */}
          <defs>
            <linearGradient id="floorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1a1a1a" />
              <stop offset="100%" stopColor="#0a0a0a" />
            </linearGradient>
            <linearGradient id="muscleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F21137" />
              <stop offset="50%" stopColor="#A00C30" />
              <stop offset="100%" stopColor="#68020F" />
            </linearGradient>
            <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4A574" />
              <stop offset="100%" stopColor="#B8956A" />
            </linearGradient>
          </defs>

          {/* Floor */}
          <rect x="0" y="250" width="300" height="50" fill="url(#floorGrad)" />
          <line x1="0" y1="250" x2="300" y2="250" stroke="#F21137" strokeWidth="2" opacity="0.3" />

          {/* Background: Treadmill person (cardio) */}
          <g opacity="0.4">
            <rect x="20" y="220" width="40" height="8" fill="#2A2A2A" rx="2" />
            <motion.g
              animate={isPlaying ? { y: [0, -3, 0] } : {}}
              transition={{ duration: 0.6, repeat: isPlaying ? Infinity : 0 }}
            >
              <circle cx="35" cy="200" r="6" fill="#888" />
              <rect x="32" y="206" width="6" height="12" fill="#888" />
              <motion.line
                x1="35" y1="218" x2="30" y2="228"
                stroke="#888" strokeWidth="3"
                animate={isPlaying ? { x2: [30, 35, 30], y2: [228, 230, 228] } : {}}
                transition={{ duration: 0.6, repeat: isPlaying ? Infinity : 0 }}
              />
              <motion.line
                x1="35" y1="218" x2="40" y2="228"
                stroke="#888" strokeWidth="3"
                animate={isPlaying ? { x2: [40, 35, 40], y2: [228, 230, 228] } : {}}
                transition={{ duration: 0.6, repeat: isPlaying ? Infinity : 0, delay: 0.3 }}
              />
            </motion.g>
          </g>

          {/* Background: Bodybuilder lifting in background */}
          <g opacity="0.3">
            <motion.g
              animate={isPlaying ? { y: [0, -5, 0] } : {}}
              transition={{ duration: 2, repeat: isPlaying ? Infinity : 0 }}
            >
              <circle cx="260" cy="200" r="8" fill="#666" />
              <rect x="255" y="208" width="10" height="18" fill="#666" />
              <line x="245" y="215" x2="275" y2="215" stroke="#444" strokeWidth="4" />
              <circle cx="242" cy="215" r="5" fill="#333" />
              <circle cx="278" cy="215" r="5" fill="#333" />
            </motion.g>
          </g>

          {/* Main Exercise Animation */}
          {animationType === "squat" && (
            <g>
              <motion.g
                animate={isPlaying ? { y: [0, 30, 0] } : {}}
                transition={{ duration: 2.5, repeat: isPlaying ? Infinity : 0, ease: "easeInOut" }}
              >
                {/* Barbell */}
                <line x1="100" y1="60" x2="200" y2="60" stroke="#8B0000" strokeWidth="6" />
                <circle cx="105" cy="60" r="12" fill="url(#muscleGrad)" />
                <circle cx="195" cy="60" r="12" fill="url(#muscleGrad)" />

                {/* Head */}
                <circle cx="150" cy="85" r="16" fill="url(#bodyGrad)" />

                {/* Torso */}
                <ellipse cx="150" cy="125" rx="28" ry="35" fill="#7A6349" />

                {/* Arms holding bar */}
                <ellipse cx="125" cy="75" rx="10" ry="22" fill="url(#bodyGrad)" />
                <ellipse cx="175" cy="75" rx="10" ry="22" fill="url(#bodyGrad)" />
              </motion.g>

              {/* Legs with highlighted quads */}
              <motion.g
                animate={isPlaying ? { scaleY: [1, 0.85, 1] } : {}}
                style={{ originY: "160px" }}
                transition={{ duration: 2.5, repeat: isPlaying ? Infinity : 0, ease: "easeInOut" }}
              >
                <ellipse cx="135" cy="180" rx="16" ry="35" fill="url(#muscleGrad)" opacity="0.9" />
                <ellipse cx="165" cy="180" rx="16" ry="35" fill="url(#muscleGrad)" opacity="0.9" />
                <ellipse cx="135" cy="225" rx="11" ry="20" fill="#8B7355" />
                <ellipse cx="165" cy="225" rx="11" ry="20" fill="#8B7355" />
              </motion.g>

              {/* Muscle highlight pulse */}
              <motion.ellipse
                cx="150" cy="175" rx="35" ry="40"
                fill="#F21137"
                opacity="0.3"
                animate={isPlaying ? { opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 2.5, repeat: isPlaying ? Infinity : 0 }}
              />
            </g>
          )}

          {animationType === "bench" && (
            <g>
              {/* Bench */}
              <rect x="80" y="150" width="140" height="12" fill="#2A2A2A" rx="3" />
              <rect x="85" y="162" width="12" height="40" fill="#1A1A1A" />
              <rect x="203" y="162" width="12" height="40" fill="#1A1A1A" />

              {/* Person lying down */}
              <ellipse cx="150" cy="138" rx="15" ry="12" fill="url(#bodyGrad)" />
              <ellipse cx="165" cy="145" rx="38" ry="18" fill="#7A6349" />

              {/* Chest muscle highlight */}
              <motion.ellipse
                cx="155" cy="142" rx="32" ry="15"
                fill="#F21137"
                opacity="0.5"
                animate={isPlaying ? { opacity: [0.5, 0.8, 0.5] } : {}}
                transition={{ duration: 2.2, repeat: isPlaying ? Infinity : 0 }}
              />

              {/* Barbell */}
              <motion.g
                animate={isPlaying ? { y: [0, -35, 0] } : {}}
                transition={{ duration: 2.2, repeat: isPlaying ? Infinity : 0, ease: "easeInOut" }}
              >
                <line x1="90" y1="115" x2="190" y2="115" stroke="#8B0000" strokeWidth="6" />
                <circle cx="95" cy="115" r="12" fill="url(#muscleGrad)" />
                <circle cx="185" cy="115" r="12" fill="url(#muscleGrad)" />

                {/* Arms pushing */}
                <ellipse cx="130" cy="130" rx="10" ry="24" fill="url(#bodyGrad)" />
                <ellipse cx="180" cy="130" rx="10" ry="24" fill="url(#bodyGrad)" />
              </motion.g>
            </g>
          )}

          {animationType === "deadlift" && (
            <g>
              <motion.g
                animate={isPlaying ? { y: [25, -20, 25] } : {}}
                transition={{ duration: 2.8, repeat: isPlaying ? Infinity : 0, ease: "easeInOut" }}
              >
                {/* Head */}
                <circle cx="150" cy="80" r="16" fill="url(#bodyGrad)" />

                {/* Upper back highlighted */}
                <motion.ellipse
                  cx="150" cy="110" rx="30" ry="22"
                  fill="#F21137"
                  opacity="0.6"
                  animate={isPlaying ? { opacity: [0.6, 0.9, 0.6] } : {}}
                  transition={{ duration: 2.8, repeat: isPlaying ? Infinity : 0 }}
                />

                {/* Torso */}
                <ellipse cx="150" cy="125" rx="28" ry="38" fill="#7A6349" />

                {/* Arms */}
                <ellipse cx="135" cy="135" rx="10" ry="32" fill="url(#bodyGrad)" />
                <ellipse cx="165" cy="135" rx="10" ry="32" fill="url(#bodyGrad)" />
              </motion.g>

              {/* Legs */}
              <ellipse cx="135" cy="190" rx="15" ry="35" fill="url(#muscleGrad)" opacity="0.8" />
              <ellipse cx="165" cy="190" rx="15" ry="35" fill="url(#muscleGrad)" opacity="0.8" />

              {/* Barbell on ground */}
              <motion.g
                animate={isPlaying ? { y: [30, -25, 30] } : {}}
                transition={{ duration: 2.8, repeat: isPlaying ? Infinity : 0, ease: "easeInOut" }}
              >
                <line x1="100" y1="170" x2="200" y2="170" stroke="#8B0000" strokeWidth="6" />
                <circle cx="105" cy="170" r="14" fill="url(#muscleGrad)" />
                <circle cx="195" cy="170" r="14" fill="url(#muscleGrad)" />
              </motion.g>
            </g>
          )}

          {animationType === "curl" && (
            <g>
              {/* Standing figure */}
              <circle cx="150" cy="70" r="15" fill="url(#bodyGrad)" />
              <ellipse cx="150" cy="115" rx="26" ry="35" fill="#7A6349" />
              <ellipse cx="135" cy="180" rx="14" ry="35" fill="#8B7355" />
              <ellipse cx="165" cy="180" rx="14" ry="35" fill="#8B7355" />

              {/* Bicep highlight */}
              <motion.ellipse
                cx="125" cy="115" rx="12" ry="18"
                fill="#F21137"
                opacity="0.7"
                animate={isPlaying ? { opacity: [0.7, 1, 0.7] } : {}}
                transition={{ duration: 1.8, repeat: isPlaying ? Infinity : 0 }}
              />

              {/* Curling arm */}
              <motion.g
                animate={isPlaying ? { rotate: [0, -100, 0] } : {}}
                style={{ originX: "120px", originY: "100px" }}
                transition={{ duration: 1.8, repeat: isPlaying ? Infinity : 0, ease: "easeInOut" }}
              >
                <ellipse cx="115" cy="125" rx="8" ry="20" fill="url(#bodyGrad)" />
                <rect x="107" y="142" width="16" height="8" fill="#8B0000" rx="2" />
                <circle cx="110" cy="146" r="6" fill="#333" />
                <circle cx="118" cy="146" r="6" fill="#333" />
              </motion.g>

              {/* Other arm */}
              <ellipse cx="175" cy="115" rx="8" ry="22" fill="url(#bodyGrad)" />
            </g>
          )}

          {animationType === "default" && (
            <g>
              <motion.g
                animate={isPlaying ? { scale: [1, 1.05, 1] } : {}}
                style={{ originX: "150px", originY: "150px" }}
                transition={{ duration: 2, repeat: isPlaying ? Infinity : 0 }}
              >
                <circle cx="150" cy="80" r="16" fill="url(#bodyGrad)" />
                <ellipse cx="150" cy="125" rx="28" ry="38" fill="#7A6349" />
                <ellipse cx="128" cy="110" rx="10" ry="24" fill="url(#bodyGrad)" />
                <ellipse cx="172" cy="110" rx="10" ry="24" fill="url(#bodyGrad)" />
                <ellipse cx="135" cy="180" rx="15" ry="36" fill="#8B7355" />
                <ellipse cx="165" cy="180" rx="15" ry="36" fill="#8B7355" />

                <motion.ellipse
                  cx="150" cy="125" rx="24" ry="32"
                  fill="#F21137"
                  opacity="0.3"
                  animate={isPlaying ? { opacity: [0.3, 0.5, 0.3] } : {}}
                  transition={{ duration: 2, repeat: isPlaying ? Infinity : 0 }}
                />
              </motion.g>
            </g>
          )}
        </svg>
      </div>

      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute top-3 right-3 bg-[#F21137] hover:bg-[#CBEF43] text-white hover:text-black w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-lg z-20"
      >
        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
      </button>

      <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-lg z-20">
        <p className="text-[#CBEF43] text-xs font-bold uppercase tracking-wide">Live Demo</p>
      </div>
    </div>
  );
}
