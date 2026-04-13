import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Flame, Dumbbell, TrendingUp, Target } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { SquatRackLogo } from "./SquatRackLogo";

type FitnessGoal = "fat-loss" | "muscle-gain" | "strength-building" | "body-recomp";

interface FormData {
  name: string;
  age: string;
  height: string;
  weight: string;
  gender: "male" | "female" | "prefer-not-to-say";
  goal: FitnessGoal;
  oneRepMaxes?: {
    squat: string;
    bench: string;
    deadlift: string;
  };
}

export function AthleteProfileInput() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    age: "",
    height: "",
    weight: "",
    gender: "male",
    goal: "fat-loss",
    oneRepMaxes: {
      squat: "",
      bench: "",
      deadlift: "",
    },
  });

  const goals = [
    { id: "fat-loss", label: "FAT LOSS", icon: Flame },
    { id: "muscle-gain", label: "MUSCLE GAIN", icon: Dumbbell },
    { id: "strength-building", label: "STRENGTH BUILDING", icon: TrendingUp },
    { id: "body-recomp", label: "BODY RECOMPOSITION", icon: Target },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const age = parseInt(formData.age);
    const height = parseInt(formData.height);
    const weight = parseInt(formData.weight);

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr: number;
    if (formData.gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // Calculate daily calorie needs based on goal
    let dailyCalories: number;
    let proteinPerKg: number;

    switch (formData.goal) {
      case "fat-loss":
        dailyCalories = Math.round(bmr * 1.375);
        proteinPerKg = 2.2;
        break;
      case "muscle-gain":
        dailyCalories = Math.round(bmr * 1.725);
        proteinPerKg = 2.0;
        break;
      case "strength-building":
        dailyCalories = Math.round(bmr * 1.55);
        proteinPerKg = 1.8;
        break;
      case "body-recomp":
        dailyCalories = Math.round(bmr * 1.55);
        proteinPerKg = 2.2;
        break;
      default:
        dailyCalories = Math.round(bmr * 1.55);
        proteinPerKg = 2.0;
    }

    const dailyProtein = Math.round(weight * proteinPerKg);

    // Store data in localStorage
    const userData = {
      name: formData.name || "Athlete",
      age,
      height,
      weight,
      gender: formData.gender,
      goal: formData.goal,
      bmr: Math.round(bmr),
      dailyCalories,
      dailyProtein,
      oneRepMaxes: formData.goal === "strength-building" ? {
        squat: parseFloat(formData.oneRepMaxes?.squat || "0"),
        bench: parseFloat(formData.oneRepMaxes?.bench || "0"),
        deadlift: parseFloat(formData.oneRepMaxes?.deadlift || "0"),
      } : undefined,
    };

    localStorage.setItem("ironLeagueUserData", JSON.stringify(userData));

    // Navigate to results page
    navigate("/results");
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white relative overflow-hidden">
      {/* Background Gym Images Collage */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-black/90 z-10" />
        <div
          className="absolute top-0 left-0 w-1/3 h-1/2 bg-cover bg-center opacity-[0.12] blur-sm grayscale"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1770493895453-4f758c40d11d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxneW0lMjBzdHJlbmd0aCUyMHRyYWluaW5nJTIwZXF1aXBtZW50fGVufDF8fHx8MTc3MTY5NjQyMHww&ixlib=rb-4.1.0&q=80&w=1080')`,
          }}
        />
        <div
          className="absolute top-1/2 right-0 w-1/3 h-1/2 bg-cover bg-center opacity-[0.12] blur-sm grayscale"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1685633225183-441289454a8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZWxsJTIwd2VpZ2h0bGlmdGluZyUyMHBvd2VybGlmdGluZ3xlbnwxfHx8fDE3NzE2OTY0MjB8MA&ixlib=rb-4.1.0&q=80&w=1080')`,
          }}
        />
        <div
          className="absolute bottom-0 left-1/3 w-1/3 h-1/2 bg-cover bg-center opacity-[0.12] blur-sm grayscale"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1758875569612-94d5e0f1a35f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxneW0lMjBhdGhsZXRlJTIwdHJhaW5pbmclMjBpbnRlbnNlfGVufDF8fHx8MTc3MTY5NjQyMXww&ixlib=rb-4.1.0&q=80&w=1080')`,
          }}
        />
        {/* Vignette */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/40 to-black z-10" />
      </div>

      {/* Red Ambient Glow */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div className="w-[800px] h-[800px] bg-[#F21137] opacity-[0.08] blur-[150px] rounded-full" />
      </div>

      {/* Header */}
      <nav className="relative z-20 flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-3">
          <SquatRackLogo className="w-10 h-10 text-white" />
          <h1 className="text-3xl font-black tracking-wider">
            <span className="text-white">IRON</span>
            <span className="text-[#F21137]">LEAGUE</span>
          </h1>
        </div>
        <div className="text-[#CBEF43] text-sm font-bold uppercase tracking-wider">
          Elite Training Analyzer
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-20 min-h-[calc(100vh-100px)] flex flex-col items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-3xl"
        >
          {/* Center Card with Luxury Gradient */}
          <div className="relative">
            {/* Card Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-br from-[#F21137] via-[#A00C30] to-[#68020F] opacity-20 blur-2xl rounded-3xl" />
            
            <div className="relative bg-gradient-to-br from-[#000000] via-[#68020F] to-[#A00C30] backdrop-blur-xl border border-white/10 rounded-3xl p-12 shadow-2xl">
              {/* Glass Morphism Overlay */}
              <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-sm rounded-3xl" />
              
              <div className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-center mb-10"
                >
                  <h2 className="text-4xl font-black uppercase tracking-wider text-white mb-3">
                    ATHLETE PROFILE
                  </h2>
                  <p className="text-white/50 text-sm uppercase tracking-wide">
                    Enter your stats to unlock your personalized plan
                  </p>
                </motion.div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Name Field */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="name" className="text-[#CBEF43] uppercase tracking-wider text-xs font-bold">
                      Your Name (For Story)
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-[#2A2A2A] border-[#2A2A2A] focus:border-[#CBEF43] focus:ring-2 focus:ring-[#CBEF43]/50 text-white h-14 text-lg rounded-xl shadow-inner"
                      placeholder="Enter your name"
                    />
                  </motion.div>

                  {/* Basic Stats Grid */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="age" className="text-[#F21137] uppercase tracking-wider text-xs font-bold">
                        Age (in Years)
                      </Label>
                      <Input
                        id="age"
                        type="number"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        className="bg-[#2A2A2A] border-[#2A2A2A] focus:border-[#F21137] focus:ring-2 focus:ring-[#F21137]/50 text-white h-14 text-lg rounded-xl shadow-inner"
                        placeholder="25"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gender" className="text-[#F21137] uppercase tracking-wider text-xs font-bold">
                        Gender
                      </Label>
                      <select
                        id="gender"
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                        className="w-full bg-[#2A2A2A] border border-[#2A2A2A] focus:border-[#F21137] focus:ring-2 focus:ring-[#F21137]/50 text-white h-14 text-lg rounded-xl px-4 focus:outline-none shadow-inner"
                        required
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="prefer-not-to-say">Prefer not to say</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="height" className="text-[#F21137] uppercase tracking-wider text-xs font-bold">
                        Height (in Centimeters)
                      </Label>
                      <Input
                        id="height"
                        type="number"
                        value={formData.height}
                        onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                        className="bg-[#2A2A2A] border-[#2A2A2A] focus:border-[#F21137] focus:ring-2 focus:ring-[#F21137]/50 text-white h-14 text-lg rounded-xl shadow-inner"
                        placeholder="180"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="weight" className="text-[#F21137] uppercase tracking-wider text-xs font-bold">
                        Weight (in Kg)
                      </Label>
                      <Input
                        id="weight"
                        type="number"
                        value={formData.weight}
                        onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                        className="bg-[#2A2A2A] border-[#2A2A2A] focus:border-[#F21137] focus:ring-2 focus:ring-[#F21137]/50 text-white h-14 text-lg rounded-xl shadow-inner"
                        placeholder="80"
                        required
                      />
                    </div>
                  </motion.div>

                  {/* Fitness Goal Selection */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="space-y-4"
                  >
                    <Label className="text-[#F21137] uppercase tracking-wider text-xs font-bold">
                      Primary Fitness Goal
                    </Label>
                    <div className="grid grid-cols-2 gap-4">
                      {goals.map((goal) => {
                        const Icon = goal.icon;
                        const isSelected = formData.goal === goal.id;
                        return (
                          <button
                            key={goal.id}
                            type="button"
                            onClick={() => setFormData({ ...formData, goal: goal.id as FitnessGoal })}
                            className={`relative p-5 rounded-xl border-2 transition-all duration-300 flex items-center justify-center gap-3 group ${
                              isSelected
                                ? "bg-[#F21137] border-[#F21137] text-white shadow-lg shadow-[#F21137]/30"
                                : "bg-[#2A2A2A] border-[#2A2A2A] text-white/70 hover:border-[#F21137]/50 hover:text-white"
                            }`}
                          >
                            <Icon className={`w-5 h-5 ${isSelected ? "text-white" : "text-[#F21137]"}`} />
                            <span className="font-bold tracking-wide text-sm uppercase">
                              {goal.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>

                  {/* One Rep Max Section - Only for Strength Building */}
                  {formData.goal === "strength-building" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4 border-2 border-[#F21137]/30 rounded-xl p-6 bg-black/30"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <TrendingUp className="w-5 h-5 text-[#CBEF43]" />
                        <h3 className="text-lg font-black uppercase tracking-wider text-white">
                          One Rep Max (1RM)
                        </h3>
                      </div>
                      <p className="text-white/50 text-xs mb-4">
                        Enter your current one rep maxes for precise weight recommendations
                      </p>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="squat1rm" className="text-[#F21137] uppercase tracking-wider text-xs font-bold flex items-center gap-2">
                            Squat
                          </Label>
                          <div className="relative">
                            <Input
                              id="squat1rm"
                              type="number"
                              step="0.5"
                              value={formData.oneRepMaxes?.squat}
                              onChange={(e) => setFormData({ 
                                ...formData, 
                                oneRepMaxes: { 
                                  ...formData.oneRepMaxes!, 
                                  squat: e.target.value 
                                } 
                              })}
                              className="bg-[#2A2A2A] border-[#2A2A2A] focus:border-[#F21137] focus:ring-2 focus:ring-[#F21137]/50 text-white h-12 text-base pr-12 rounded-xl"
                              placeholder="150"
                              required={formData.goal === "strength-building"}
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 text-xs font-bold">
                              KG
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="bench1rm" className="text-[#F21137] uppercase tracking-wider text-xs font-bold flex items-center gap-2">
                            Bench
                          </Label>
                          <div className="relative">
                            <Input
                              id="bench1rm"
                              type="number"
                              step="0.5"
                              value={formData.oneRepMaxes?.bench}
                              onChange={(e) => setFormData({ 
                                ...formData, 
                                oneRepMaxes: { 
                                  ...formData.oneRepMaxes!, 
                                  bench: e.target.value 
                                } 
                              })}
                              className="bg-[#2A2A2A] border-[#2A2A2A] focus:border-[#F21137] focus:ring-2 focus:ring-[#F21137]/50 text-white h-12 text-base pr-12 rounded-xl"
                              placeholder="100"
                              required={formData.goal === "strength-building"}
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 text-xs font-bold">
                              KG
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="deadlift1rm" className="text-[#F21137] uppercase tracking-wider text-xs font-bold flex items-center gap-2">
                            Deadlift
                          </Label>
                          <div className="relative">
                            <Input
                              id="deadlift1rm"
                              type="number"
                              step="0.5"
                              value={formData.oneRepMaxes?.deadlift}
                              onChange={(e) => setFormData({ 
                                ...formData, 
                                oneRepMaxes: { 
                                  ...formData.oneRepMaxes!, 
                                  deadlift: e.target.value 
                                } 
                              })}
                              className="bg-[#2A2A2A] border-[#2A2A2A] focus:border-[#F21137] focus:ring-2 focus:ring-[#F21137]/50 text-white h-12 text-base pr-12 rounded-xl"
                              placeholder="180"
                              required={formData.goal === "strength-building"}
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 text-xs font-bold">
                              KG
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* CTA Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <Button
                      type="submit"
                      className="w-full bg-[#CBEF43] hover:bg-[#CBEF43]/90 text-black h-16 text-lg font-black uppercase tracking-wider shadow-2xl shadow-[#CBEF43]/20 transition-all hover:shadow-[#CBEF43]/40 hover:scale-[1.02] rounded-xl"
                    >
                      ANALYZE & GENERATE PLAN
                    </Button>
                  </motion.div>
                </form>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-white/30 text-xs mt-12 uppercase tracking-wider text-center"
        >
          Ultra-Premium Elite Performance Technology
        </motion.p>
      </div>
    </div>
  );
}
