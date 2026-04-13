import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Dumbbell, ArrowLeft, Flame, TrendingUp, Target, Beef, CheckCircle2, Circle, UtensilsCrossed, Instagram } from "lucide-react";
import { AnimatedBackground } from "./AnimatedBackground";
import { Button } from "./ui/button";
import { NutritionLog } from "./NutritionLog";
import { ExerciseAnimation } from "./ExerciseAnimation";
import { InstagramStoryTemplate } from "./InstagramStoryTemplate";
import { workoutPlans } from "../data/workoutPlans";
import type { WorkoutDay, Exercise } from "../data/workoutPlans";

interface UserData {
  name?: string;
  age: number;
  height: number;
  weight: number;
  gender: "male" | "female";
  goal: string;
  bmr: number;
  dailyCalories: number;
  dailyProtein: number;
  oneRepMaxes?: {
    squat: number;
    bench: number;
    deadlift: number;
  };
}

const goalLabels: Record<string, string> = {
  "fat-loss": "FAT LOSS",
  "muscle-gain": "MUSCLE GAIN",
  "strength-building": "STRENGTH BUILDING",
  "body-recomp": "BODY RECOMPOSITION",
};

const goalIcons: Record<string, any> = {
  "fat-loss": Flame,
  "muscle-gain": Dumbbell,
  "strength-building": TrendingUp,
  "body-recomp": Target,
};

export function NutritionResults() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [selectedWorkoutDay, setSelectedWorkoutDay] = useState<WorkoutDay | null>(null);
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<"stats" | "workouts" | "nutrition">("stats");
  const [showStoryModal, setShowStoryModal] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem("ironLeagueUserData");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    } else {
      navigate("/");
    }

    // Load completed exercises from localStorage
    const completed = localStorage.getItem("completedExercises");
    if (completed) {
      setCompletedExercises(new Set(JSON.parse(completed)));
    }
  }, [navigate]);

  useEffect(() => {
    // Save completed exercises to localStorage whenever it changes
    localStorage.setItem("completedExercises", JSON.stringify(Array.from(completedExercises)));
  }, [completedExercises]);

  const toggleExercise = (exerciseId: string) => {
    const newCompleted = new Set(completedExercises);
    if (newCompleted.has(exerciseId)) {
      newCompleted.delete(exerciseId);
    } else {
      newCompleted.add(exerciseId);
    }
    setCompletedExercises(newCompleted);
  };

  const getWorkoutProgress = (workout: WorkoutDay) => {
    const total = workout.exercises.length;
    const completed = workout.exercises.filter(ex => completedExercises.has(ex.id)).length;
    return { completed, total, percentage: Math.round((completed / total) * 100) };
  };

  const calculateWeight = (exercise: Exercise): string | null => {
    if (!exercise.percentage || !exercise.liftType || !userData?.oneRepMaxes) {
      return null;
    }

    const oneRM = userData.oneRepMaxes[exercise.liftType];
    if (!oneRM) return null;

    const weight = (oneRM * exercise.percentage) / 100;
    return weight.toFixed(1);
  };

  if (!userData) {
    return null;
  }

  const GoalIcon = goalIcons[userData.goal] || Dumbbell;
  const workoutPlan = workoutPlans[userData.goal];

  return (
    <div className="min-h-screen bg-[#141414] text-white relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Dumbbell className="w-12 h-12 text-[#B11226]" />
            <h1 className="text-6xl font-black tracking-wider text-white">
              IRON<span className="text-[#B11226]">LEAGUE</span>
            </h1>
          </div>
          <p className="text-[#8A8F98] text-lg tracking-wide uppercase">
            Your Personalized Training Blueprint
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-6xl space-y-6"
        >
          {/* Navigation Tabs */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab("stats")}
              className={`flex-1 py-3 px-6 rounded-lg font-bold uppercase tracking-wider transition-all ${
                activeTab === "stats"
                  ? "bg-[#B11226] text-white"
                  : "bg-[#2C2F33] text-[#8A8F98] hover:bg-[#2C2F33]/80"
              }`}
            >
              Nutrition Stats
            </button>
            <button
              onClick={() => setActiveTab("workouts")}
              className={`flex-1 py-3 px-6 rounded-lg font-bold uppercase tracking-wider transition-all ${
                activeTab === "workouts"
                  ? "bg-[#B11226] text-white"
                  : "bg-[#2C2F33] text-[#8A8F98] hover:bg-[#2C2F33]/80"
              }`}
            >
              Workout Plans
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "stats" ? (
              <motion.div
                key="nutrition"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Athlete Stats Card */}
                <div className="bg-[#0B0B0F] backdrop-blur-sm border border-[#B11226]/30 rounded-lg p-8 shadow-2xl">
                  <h2 className="text-2xl font-black uppercase tracking-wider mb-6 text-center flex items-center justify-center gap-3">
                    <GoalIcon className="w-8 h-8 text-[#B11226]" />
                    <span>ATHLETE STATS</span>
                  </h2>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-[#141414] rounded-lg p-4 border border-[#2C2F33]">
                      <p className="text-[#8A8F98] text-xs uppercase tracking-wide mb-1">Age</p>
                      <p className="text-2xl font-black text-white">{userData.age}</p>
                      <p className="text-[#8A8F98]/60 text-xs uppercase mt-1">YEARS</p>
                    </div>
                    
                    <div className="bg-[#141414] rounded-lg p-4 border border-[#2C2F33]">
                      <p className="text-[#8A8F98] text-xs uppercase tracking-wide mb-1">Height</p>
                      <p className="text-2xl font-black text-white">{userData.height}</p>
                      <p className="text-[#8A8F98]/60 text-xs uppercase mt-1">CM</p>
                    </div>
                    
                    <div className="bg-[#141414] rounded-lg p-4 border border-[#2C2F33]">
                      <p className="text-[#8A8F98] text-xs uppercase tracking-wide mb-1">Weight</p>
                      <p className="text-2xl font-black text-white">{userData.weight}</p>
                      <p className="text-[#8A8F98]/60 text-xs uppercase mt-1">KG</p>
                    </div>
                    
                    <div className="bg-[#141414] rounded-lg p-4 border border-[#2C2F33]">
                      <p className="text-[#8A8F98] text-xs uppercase tracking-wide mb-1">Gender</p>
                      <p className="text-2xl font-black text-white">{userData.gender === "male" ? "M" : "F"}</p>
                      <p className="text-[#8A8F98]/60 text-xs uppercase mt-1">{userData.gender.toUpperCase()}</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-[#B11226]/20 to-[#B11226]/5 border border-[#B11226]/50 rounded-lg p-4">
                    <p className="text-[#FF1E3C] text-xs uppercase tracking-wide mb-1 font-bold">
                      Primary Goal
                    </p>
                    <p className="text-xl font-black text-white tracking-wide">
                      {goalLabels[userData.goal]}
                    </p>
                  </div>
                </div>

                {/* Nutrition Targets */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-[#0B0B0F] backdrop-blur-sm border-2 border-[#B11226]/50 rounded-lg p-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#B11226]/10 rounded-full blur-3xl"></div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <Flame className="w-10 h-10 text-[#FF1E3C]" />
                        <h3 className="text-xl font-black uppercase tracking-wider text-[#FF1E3C]">
                          Daily Calorie Target
                        </h3>
                      </div>
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-6xl font-black text-white">
                          {userData.dailyCalories.toLocaleString()}
                        </span>
                        <span className="text-2xl font-bold text-[#8A8F98]">KCAL</span>
                      </div>
                      <div className="bg-[#141414] rounded-lg p-3 border border-[#2C2F33]">
                        <p className="text-xs text-[#8A8F98] uppercase tracking-wide mb-1">
                          Basal Metabolic Rate (BMR)
                        </p>
                        <p className="text-lg font-bold text-[#8A8F98]">
                          {userData.bmr.toLocaleString()} kcal/day
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#0B0B0F] backdrop-blur-sm border-2 border-[#B11226]/50 rounded-lg p-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#B11226]/10 rounded-full blur-3xl"></div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <Beef className="w-10 h-10 text-[#FF1E3C]" />
                        <h3 className="text-xl font-black uppercase tracking-wider text-[#FF1E3C]">
                          Daily Protein Target
                        </h3>
                      </div>
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-6xl font-black text-white">
                          {userData.dailyProtein}
                        </span>
                        <span className="text-2xl font-bold text-[#8A8F98]">G</span>
                      </div>
                      <div className="bg-[#141414] rounded-lg p-3 border border-[#2C2F33]">
                        <p className="text-xs text-[#8A8F98] uppercase tracking-wide mb-1">
                          Protein Per Kilogram
                        </p>
                        <p className="text-lg font-bold text-[#8A8F98]">
                          {(userData.dailyProtein / userData.weight).toFixed(1)} g/kg body weight
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="workouts"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Workout Plan Header */}
                <div className="bg-[#0B0B0F] border border-[#B11226]/30 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-3xl font-black uppercase tracking-wider text-white mb-2">
                        {workoutPlan.goal} PROGRAM
                      </h2>
                      <p className="text-[#8A8F98] text-sm">
                        {workoutPlan.description}
                      </p>
                    </div>
                    <div className="bg-[#B11226] px-4 py-2 rounded-lg">
                      <p className="text-xs uppercase tracking-wide text-white/80">Training Days</p>
                      <p className="text-2xl font-black text-white">{workoutPlan.daysPerWeek}</p>
                      <p className="text-xs text-white/60">PER WEEK</p>
                    </div>
                  </div>
                </div>

                {/* Workout Days Grid */}
                <div className="grid md:grid-cols-2 gap-4">
                  {workoutPlan.workouts.map((workout, index) => {
                    const progress = getWorkoutProgress(workout);
                    return (
                      <motion.button
                        key={workout.id}
                        onClick={() => setSelectedWorkoutDay(workout)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-[#0B0B0F] border-2 border-[#2C2F33] hover:border-[#B11226] rounded-lg p-6 text-left transition-all group"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="text-xs text-[#8A8F98] uppercase tracking-wide mb-1">
                              Day {index + 1}
                            </p>
                            <h3 className="text-xl font-black uppercase text-white group-hover:text-[#FF1E3C] transition-colors">
                              {workout.name}
                            </h3>
                            <p className="text-sm text-[#8A8F98] mt-1">{workout.focus}</p>
                          </div>
                          <Dumbbell className="w-8 h-8 text-[#B11226] group-hover:text-[#FF1E3C] transition-colors" />
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-[#8A8F98]">{workout.exercises.length} exercises</span>
                            <span className="text-white font-bold">
                              {progress.completed}/{progress.total} complete
                            </span>
                          </div>
                          <div className="w-full bg-[#2C2F33] rounded-full h-2 overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-[#B11226] to-[#FF1E3C]"
                              initial={{ width: 0 }}
                              animate={{ width: `${progress.percentage}%` }}
                              transition={{ duration: 0.5 }}
                            />
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className="flex-1 h-14 text-lg font-bold uppercase tracking-wider border-2 border-[#B11226] text-[#B11226] hover:bg-[#B11226] hover:text-white transition-all bg-transparent"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Modify Profile
            </Button>
            
            <div className="flex-1 bg-[#2C2F33]/50 border-2 border-[#2C2F33] rounded-lg p-4 flex items-center justify-center">
              <p className="text-[#8A8F98] text-sm uppercase tracking-wide text-center">
                <span className="block text-[#FF1E3C] font-bold mb-1">COMING SOON</span>
                Progress Tracking • 3D Body Visualization • Nutrition Log
              </p>
            </div>
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-[#8A8F98]/60 text-sm mt-8 uppercase tracking-wide"
        >
          Train Hard. Eat Smart. Dominate.
        </motion.p>
      </div>

      {/* Workout Detail Modal */}
      <AnimatePresence>
        {selectedWorkoutDay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedWorkoutDay(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0B0B0F] border-2 border-[#B11226] rounded-lg max-w-5xl w-full max-h-[85vh] overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-[#2C2F33]">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-3xl font-black uppercase text-white mb-2">
                      {selectedWorkoutDay.name}
                    </h3>
                    <p className="text-[#8A8F98]">{selectedWorkoutDay.focus}</p>
                  </div>
                  <button
                    onClick={() => setSelectedWorkoutDay(null)}
                    className="text-[#8A8F98] hover:text-white text-3xl font-bold"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="overflow-y-auto flex-1 p-6">
                <div className="space-y-4">
                  {selectedWorkoutDay.exercises.map((exercise: Exercise, index: number) => {
                    const isCompleted = completedExercises.has(exercise.id);
                    const weight = calculateWeight(exercise);
                    return (
                      <motion.div
                        key={exercise.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`bg-[#141414] border-2 rounded-lg p-5 transition-all ${
                          isCompleted
                            ? "border-[#B11226] bg-[#B11226]/10"
                            : "border-[#2C2F33] hover:border-[#2C2F33]/60"
                        }`}
                      >
                        <div className="flex flex-col md:flex-row gap-5">
                          {/* Left Side: Exercise Animation */}
                          <div className="w-full md:w-48 flex-shrink-0">
                            <ExerciseAnimation exerciseName={exercise.name} />
                          </div>

                          {/* Right Side: Exercise Details */}
                          <div className="flex-1 flex gap-4">
                            <button
                              onClick={() => toggleExercise(exercise.id)}
                              className="mt-1 flex-shrink-0"
                            >
                              {isCompleted ? (
                                <CheckCircle2 className="w-6 h-6 text-[#FF1E3C]" />
                              ) : (
                                <Circle className="w-6 h-6 text-[#8A8F98] hover:text-[#B11226] transition-colors" />
                              )}
                            </button>
                            
                            <div className="flex-1">
                              <h4 className={`font-bold text-xl mb-3 ${
                                isCompleted ? "text-white line-through" : "text-white"
                              }`}>
                                {exercise.name}
                              </h4>
                              
                              <div className="grid grid-cols-3 gap-3 mb-3">
                                <div className="bg-[#2C2F33] rounded-lg px-3 py-2.5">
                                  <p className="text-xs text-[#8A8F98] uppercase mb-1">Sets</p>
                                  <p className="text-xl font-black text-white">{exercise.sets}</p>
                                </div>
                                <div className="bg-[#2C2F33] rounded-lg px-3 py-2.5">
                                  <p className="text-xs text-[#8A8F98] uppercase mb-1">Reps</p>
                                  <p className="text-xl font-black text-white">{exercise.reps}</p>
                                </div>
                                <div className="bg-[#2C2F33] rounded-lg px-3 py-2.5">
                                  <p className="text-xs text-[#8A8F98] uppercase mb-1">Rest</p>
                                  <p className="text-xl font-black text-white">{exercise.restSeconds}s</p>
                                </div>
                              </div>
                              
                              {weight && (
                                <div className="bg-[#B11226]/20 border-2 border-[#B11226] rounded-lg px-4 py-3 mb-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs text-[#FF1E3C] uppercase tracking-wide font-bold">🎯 Recommended Weight</span>
                                    <span className="text-2xl font-black text-white">{weight} <span className="text-sm text-[#8A8F98]">KG</span></span>
                                  </div>
                                  <p className="text-xs text-[#8A8F98] mt-1">
                                    {exercise.percentage}% of your {exercise.liftType} 1RM
                                  </p>
                                </div>
                              )}
                              
                              {exercise.notes && (
                                <p className="text-sm text-[#FF1E3C] italic">
                                  💡 {exercise.notes}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <div className="p-6 border-t border-[#2C2F33] bg-[#141414]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#8A8F98] mb-1">Workout Progress</p>
                    <p className="text-xl font-black text-white">
                      {selectedWorkoutDay.exercises.filter(ex => completedExercises.has(ex.id)).length}/
                      {selectedWorkoutDay.exercises.length} Exercises Complete
                    </p>
                    {selectedWorkoutDay.exercises.length === selectedWorkoutDay.exercises.filter(ex => completedExercises.has(ex.id)).length && (
                      <motion.p
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[#CBEF43] text-sm font-bold mt-2 flex items-center gap-2"
                      >
                        🎉 Workout Complete!
                      </motion.p>
                    )}
                  </div>
                  <div className="flex gap-3">
                    {selectedWorkoutDay.exercises.length === selectedWorkoutDay.exercises.filter(ex => completedExercises.has(ex.id)).length && (
                      <Button
                        onClick={() => {
                          setShowStoryModal(true);
                          setSelectedWorkoutDay(null);
                        }}
                        className="bg-gradient-to-r from-[#CBEF43] to-[#B8D63C] hover:from-[#B8D63C] hover:to-[#CBEF43] text-black px-6 py-3 font-bold uppercase transition-all flex items-center gap-2"
                      >
                        <Instagram className="w-5 h-5" />
                        Create Story
                      </Button>
                    )}
                    <Button
                      onClick={() => setSelectedWorkoutDay(null)}
                      className="bg-[#B11226] hover:bg-[#FF1E3C] text-white px-6 py-3 font-bold uppercase"
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instagram Story Template Modal */}
      {showStoryModal && userData && (
        <InstagramStoryTemplate
          userName={userData.name || "Champion"}
          workoutType={goalLabels[userData.goal] || "Training"}
          exercisesCompleted={Array.from(completedExercises).length}
          caloriesBurned={Math.round(userData.dailyCalories * 0.3)}
          duration={45}
          onClose={() => setShowStoryModal(false)}
        />
      )}
    </div>
  );
}