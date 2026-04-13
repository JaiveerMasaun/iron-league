export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  restSeconds: number;
  notes?: string;
  percentage?: number; // Percentage of 1RM for strength training
  liftType?: "squat" | "bench" | "deadlift"; // Type of lift for 1RM calculation
}

export interface WorkoutDay {
  id: string;
  name: string;
  focus: string;
  exercises: Exercise[];
}

export interface WorkoutPlan {
  goal: string;
  daysPerWeek: number;
  description: string;
  workouts: WorkoutDay[];
}

export const workoutPlans: Record<string, WorkoutPlan> = {
  "fat-loss": {
    goal: "FAT LOSS",
    daysPerWeek: 5,
    description: "High-intensity circuit training with minimal rest to maximize calorie burn and preserve muscle mass.",
    workouts: [
      {
        id: "fat-loss-day1",
        name: "UPPER BODY CIRCUIT",
        focus: "Chest, Back, Shoulders",
        exercises: [
          { id: "fl-ex1", name: "Barbell Bench Press", sets: 4, reps: "12-15", restSeconds: 45, notes: "Explosive push" },
          { id: "fl-ex2", name: "Pull-Ups (Assisted if needed)", sets: 4, reps: "10-12", restSeconds: 45 },
          { id: "fl-ex3", name: "Dumbbell Shoulder Press", sets: 3, reps: "12-15", restSeconds: 45 },
          { id: "fl-ex4", name: "Cable Rows", sets: 4, reps: "12-15", restSeconds: 45 },
          { id: "fl-ex5", name: "Dumbbell Flyes", sets: 3, reps: "15", restSeconds: 30 },
          { id: "fl-ex6", name: "Face Pulls", sets: 3, reps: "15-20", restSeconds: 30 },
          { id: "fl-ex7", name: "Burpees", sets: 3, reps: "15", restSeconds: 60, notes: "Finisher" },
        ],
      },
      {
        id: "fat-loss-day2",
        name: "LOWER BODY + CARDIO",
        focus: "Legs, Glutes, Conditioning",
        exercises: [
          { id: "fl-ex8", name: "Barbell Squats", sets: 4, reps: "15-20", restSeconds: 60 },
          { id: "fl-ex9", name: "Romanian Deadlifts", sets: 4, reps: "12-15", restSeconds: 45 },
          { id: "fl-ex10", name: "Walking Lunges", sets: 3, reps: "20 per leg", restSeconds: 45 },
          { id: "fl-ex11", name: "Leg Press", sets: 4, reps: "15-20", restSeconds: 45 },
          { id: "fl-ex12", name: "Leg Curls", sets: 3, reps: "15", restSeconds: 30 },
          { id: "fl-ex13", name: "Calf Raises", sets: 4, reps: "20", restSeconds: 30 },
          { id: "fl-ex14", name: "Jump Squats", sets: 3, reps: "15", restSeconds: 60, notes: "Explosive" },
        ],
      },
      {
        id: "fat-loss-day3",
        name: "FULL BODY HIIT",
        focus: "Total Body Conditioning",
        exercises: [
          { id: "fl-ex15", name: "Kettlebell Swings", sets: 4, reps: "20", restSeconds: 45 },
          { id: "fl-ex16", name: "Mountain Climbers", sets: 4, reps: "30", restSeconds: 30 },
          { id: "fl-ex17", name: "Battle Ropes", sets: 3, reps: "30 sec", restSeconds: 30 },
          { id: "fl-ex18", name: "Box Jumps", sets: 4, reps: "12", restSeconds: 45 },
          { id: "fl-ex19", name: "Medicine Ball Slams", sets: 4, reps: "15", restSeconds: 30 },
          { id: "fl-ex20", name: "Rowing Machine", sets: 3, reps: "500m", restSeconds: 90, notes: "Max effort" },
        ],
      },
    ],
  },
  "muscle-gain": {
    goal: "MUSCLE GAIN",
    daysPerWeek: 4,
    description: "Progressive overload hypertrophy training focused on compound movements with optimal volume for muscle growth.",
    workouts: [
      {
        id: "muscle-day1",
        name: "CHEST & TRICEPS",
        focus: "Pushing Muscles",
        exercises: [
          { id: "mg-ex1", name: "Barbell Bench Press", sets: 4, reps: "8-10", restSeconds: 90, notes: "Heavy compound" },
          { id: "mg-ex2", name: "Incline Dumbbell Press", sets: 4, reps: "8-12", restSeconds: 90 },
          { id: "mg-ex3", name: "Cable Flyes", sets: 3, reps: "12-15", restSeconds: 60 },
          { id: "mg-ex4", name: "Dips", sets: 3, reps: "8-12", restSeconds: 75, notes: "Weighted if possible" },
          { id: "mg-ex5", name: "Tricep Rope Pushdowns", sets: 3, reps: "12-15", restSeconds: 60 },
          { id: "mg-ex6", name: "Overhead Tricep Extension", sets: 3, reps: "10-12", restSeconds: 60 },
        ],
      },
      {
        id: "muscle-day2",
        name: "BACK & BICEPS",
        focus: "Pulling Muscles",
        exercises: [
          { id: "mg-ex7", name: "Deadlifts", sets: 4, reps: "6-8", restSeconds: 120, notes: "Heavy compound" },
          { id: "mg-ex8", name: "Pull-Ups", sets: 4, reps: "8-10", restSeconds: 90, notes: "Add weight if needed" },
          { id: "mg-ex9", name: "Barbell Rows", sets: 4, reps: "8-10", restSeconds: 90 },
          { id: "mg-ex10", name: "Lat Pulldowns", sets: 3, reps: "10-12", restSeconds: 60 },
          { id: "mg-ex11", name: "Barbell Curls", sets: 4, reps: "8-12", restSeconds: 60 },
          { id: "mg-ex12", name: "Hammer Curls", sets: 3, reps: "10-12", restSeconds: 60 },
        ],
      },
      {
        id: "muscle-day3",
        name: "LEGS",
        focus: "Lower Body Mass",
        exercises: [
          { id: "mg-ex13", name: "Barbell Back Squats", sets: 5, reps: "6-8", restSeconds: 120, notes: "Heavy compound" },
          { id: "mg-ex14", name: "Romanian Deadlifts", sets: 4, reps: "8-10", restSeconds: 90 },
          { id: "mg-ex15", name: "Leg Press", sets: 4, reps: "10-12", restSeconds: 90 },
          { id: "mg-ex16", name: "Bulgarian Split Squats", sets: 3, reps: "10 per leg", restSeconds: 75 },
          { id: "mg-ex17", name: "Leg Curls", sets: 4, reps: "10-12", restSeconds: 60 },
          { id: "mg-ex18", name: "Standing Calf Raises", sets: 4, reps: "15-20", restSeconds: 60 },
        ],
      },
      {
        id: "muscle-day4",
        name: "SHOULDERS & ABS",
        focus: "Delts and Core",
        exercises: [
          { id: "mg-ex19", name: "Military Press", sets: 4, reps: "8-10", restSeconds: 90 },
          { id: "mg-ex20", name: "Lateral Raises", sets: 4, reps: "12-15", restSeconds: 60 },
          { id: "mg-ex21", name: "Face Pulls", sets: 4, reps: "15-20", restSeconds: 45 },
          { id: "mg-ex22", name: "Front Raises", sets: 3, reps: "12-15", restSeconds: 60 },
          { id: "mg-ex23", name: "Hanging Leg Raises", sets: 3, reps: "12-15", restSeconds: 60 },
          { id: "mg-ex24", name: "Cable Crunches", sets: 3, reps: "15-20", restSeconds: 45 },
        ],
      },
    ],
  },
  "strength-building": {
    goal: "STRENGTH BUILDING",
    daysPerWeek: 4,
    description: "Powerlifting-focused program emphasizing the big three lifts with heavy loads and lower rep ranges for maximum strength.",
    workouts: [
      {
        id: "strength-day1",
        name: "SQUAT DAY",
        focus: "Lower Body Power",
        exercises: [
          { id: "sb-ex1", name: "Barbell Back Squat", sets: 5, reps: "3-5", restSeconds: 180, percentage: 87.5, liftType: "squat", notes: "85-90% 1RM" },
          { id: "sb-ex2", name: "Front Squat", sets: 4, reps: "5-6", restSeconds: 150, percentage: 70, liftType: "squat", notes: "70% of back squat" },
          { id: "sb-ex3", name: "Leg Press", sets: 3, reps: "8-10", restSeconds: 90, notes: "Heavy" },
          { id: "sb-ex4", name: "Bulgarian Split Squats", sets: 3, reps: "6 per leg", restSeconds: 90 },
          { id: "sb-ex5", name: "Leg Curls", sets: 3, reps: "8-10", restSeconds: 60 },
          { id: "sb-ex6", name: "Ab Wheel Rollouts", sets: 3, reps: "10-12", restSeconds: 60 },
        ],
      },
      {
        id: "strength-day2",
        name: "BENCH PRESS DAY",
        focus: "Upper Body Power",
        exercises: [
          { id: "sb-ex7", name: "Barbell Bench Press", sets: 5, reps: "3-5", restSeconds: 180, percentage: 87.5, liftType: "bench", notes: "85-90% 1RM" },
          { id: "sb-ex8", name: "Incline Barbell Press", sets: 4, reps: "5-6", restSeconds: 150, percentage: 75, liftType: "bench", notes: "75% of bench" },
          { id: "sb-ex9", name: "Close-Grip Bench Press", sets: 4, reps: "6-8", restSeconds: 120, percentage: 70, liftType: "bench", notes: "70% of bench" },
          { id: "sb-ex10", name: "Weighted Dips", sets: 3, reps: "6-8", restSeconds: 90 },
          { id: "sb-ex11", name: "Overhead Press", sets: 3, reps: "6-8", restSeconds: 120, percentage: 60, liftType: "bench", notes: "60% of bench" },
          { id: "sb-ex12", name: "Lateral Raises", sets: 3, reps: "12-15", restSeconds: 60 },
        ],
      },
      {
        id: "strength-day3",
        name: "DEADLIFT DAY",
        focus: "Posterior Chain Power",
        exercises: [
          { id: "sb-ex13", name: "Conventional Deadlift", sets: 5, reps: "3-5", restSeconds: 180, percentage: 87.5, liftType: "deadlift", notes: "85-90% 1RM" },
          { id: "sb-ex14", name: "Deficit Deadlifts", sets: 3, reps: "5-6", restSeconds: 150, percentage: 70, liftType: "deadlift", notes: "70% of deadlift" },
          { id: "sb-ex15", name: "Romanian Deadlifts", sets: 4, reps: "6-8", restSeconds: 120, percentage: 65, liftType: "deadlift", notes: "65% of deadlift" },
          { id: "sb-ex16", name: "Barbell Rows", sets: 4, reps: "6-8", restSeconds: 90, percentage: 50, liftType: "deadlift", notes: "50% of deadlift" },
          { id: "sb-ex17", name: "Pull-Ups", sets: 4, reps: "8-10", restSeconds: 90, notes: "Weighted" },
          { id: "sb-ex18", name: "Farmer's Walks", sets: 3, reps: "50m", restSeconds: 90, notes: "Heavy grip" },
        ],
      },
      {
        id: "strength-day4",
        name: "ACCESSORY DAY",
        focus: "Weak Point Training",
        exercises: [
          { id: "sb-ex19", name: "Pause Squats", sets: 4, reps: "5-6", restSeconds: 120, percentage: 70, liftType: "squat", notes: "70% 1RM, 3 sec pause" },
          { id: "sb-ex20", name: "Paused Bench Press", sets: 4, reps: "5-6", restSeconds: 120, percentage: 70, liftType: "bench", notes: "70% 1RM, 2 sec pause" },
          { id: "sb-ex21", name: "Speed Deadlifts", sets: 5, reps: "3", restSeconds: 90, percentage: 60, liftType: "deadlift", notes: "60% 1RM explosive" },
          { id: "sb-ex22", name: "Barbell Curls", sets: 3, reps: "8-10", restSeconds: 60 },
          { id: "sb-ex23", name: "Tricep Dips", sets: 3, reps: "8-10", restSeconds: 60 },
          { id: "sb-ex24", name: "Plank Holds", sets: 3, reps: "60 sec", restSeconds: 60 },
        ],
      },
    ],
  },
  "body-recomp": {
    goal: "BODY RECOMPOSITION",
    daysPerWeek: 5,
    description: "Balanced approach combining strength training and metabolic conditioning to simultaneously build muscle and burn fat.",
    workouts: [
      {
        id: "recomp-day1",
        name: "PUSH DAY",
        focus: "Chest, Shoulders, Triceps",
        exercises: [
          { id: "br-ex1", name: "Barbell Bench Press", sets: 4, reps: "8-10", restSeconds: 90 },
          { id: "br-ex2", name: "Overhead Press", sets: 4, reps: "8-10", restSeconds: 90 },
          { id: "br-ex3", name: "Incline Dumbbell Press", sets: 3, reps: "10-12", restSeconds: 75 },
          { id: "br-ex4", name: "Lateral Raises", sets: 3, reps: "12-15", restSeconds: 60 },
          { id: "br-ex5", name: "Tricep Dips", sets: 3, reps: "10-12", restSeconds: 60 },
          { id: "br-ex6", name: "Cable Tricep Extensions", sets: 3, reps: "12-15", restSeconds: 45 },
        ],
      },
      {
        id: "recomp-day2",
        name: "PULL DAY",
        focus: "Back, Biceps, Rear Delts",
        exercises: [
          { id: "br-ex7", name: "Deadlifts", sets: 4, reps: "6-8", restSeconds: 120 },
          { id: "br-ex8", name: "Pull-Ups", sets: 4, reps: "8-10", restSeconds: 90 },
          { id: "br-ex9", name: "Barbell Rows", sets: 4, reps: "8-10", restSeconds: 75 },
          { id: "br-ex10", name: "Face Pulls", sets: 3, reps: "15-20", restSeconds: 60 },
          { id: "br-ex11", name: "Dumbbell Curls", sets: 3, reps: "10-12", restSeconds: 60 },
          { id: "br-ex12", name: "Hammer Curls", sets: 3, reps: "10-12", restSeconds: 60 },
        ],
      },
      {
        id: "recomp-day3",
        name: "LEG DAY",
        focus: "Quads, Hamstrings, Glutes",
        exercises: [
          { id: "br-ex13", name: "Barbell Squats", sets: 4, reps: "8-10", restSeconds: 120 },
          { id: "br-ex14", name: "Romanian Deadlifts", sets: 4, reps: "8-10", restSeconds: 90 },
          { id: "br-ex15", name: "Leg Press", sets: 3, reps: "12-15", restSeconds: 75 },
          { id: "br-ex16", name: "Walking Lunges", sets: 3, reps: "12 per leg", restSeconds: 60 },
          { id: "br-ex17", name: "Leg Curls", sets: 3, reps: "12-15", restSeconds: 60 },
          { id: "br-ex18", name: "Calf Raises", sets: 4, reps: "15-20", restSeconds: 45 },
        ],
      },
      {
        id: "recomp-day4",
        name: "UPPER BODY + CORE",
        focus: "Compound Upper + Abs",
        exercises: [
          { id: "br-ex19", name: "Weighted Pull-Ups", sets: 4, reps: "6-8", restSeconds: 90 },
          { id: "br-ex20", name: "Dumbbell Bench Press", sets: 4, reps: "10-12", restSeconds: 75 },
          { id: "br-ex21", name: "Cable Rows", sets: 4, reps: "10-12", restSeconds: 60 },
          { id: "br-ex22", name: "Arnold Press", sets: 3, reps: "10-12", restSeconds: 60 },
          { id: "br-ex23", name: "Hanging Leg Raises", sets: 3, reps: "12-15", restSeconds: 60 },
          { id: "br-ex24", name: "Russian Twists", sets: 3, reps: "20 per side", restSeconds: 45 },
        ],
      },
      {
        id: "recomp-day5",
        name: "CONDITIONING",
        focus: "Metabolic & Cardio",
        exercises: [
          { id: "br-ex25", name: "Kettlebell Swings", sets: 5, reps: "20", restSeconds: 60 },
          { id: "br-ex26", name: "Box Jumps", sets: 4, reps: "12", restSeconds: 60 },
          { id: "br-ex27", name: "Battle Ropes", sets: 4, reps: "30 sec", restSeconds: 45 },
          { id: "br-ex28", name: "Assault Bike", sets: 4, reps: "1 min", restSeconds: 60, notes: "High intensity" },
          { id: "br-ex29", name: "Burpees", sets: 3, reps: "15", restSeconds: 60 },
          { id: "br-ex30", name: "Mountain Climbers", sets: 3, reps: "30", restSeconds: 45 },
        ],
      },
    ],
  },
};