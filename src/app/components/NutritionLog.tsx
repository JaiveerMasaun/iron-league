import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, X, ChevronDown, ChevronUp, Flame, Beef, Wheat, Droplet, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface NutrientTargets {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
  potassium: number;
  calcium: number;
  iron: number;
  magnesium: number;
  vitaminA: number;
  vitaminC: number;
  vitaminD: number;
  vitaminE: number;
  vitaminB6: number;
  vitaminB12: number;
  zinc: number;
  omega3: number;
}

interface FoodEntry {
  id: string;
  name: string;
  servingSize: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
  potassium: number;
  calcium: number;
  iron: number;
  magnesium: number;
  vitaminA: number;
  vitaminC: number;
  vitaminD: number;
  vitaminE: number;
  vitaminB6: number;
  vitaminB12: number;
  zinc: number;
  omega3: number;
  timestamp: number;
}

interface NutritionLogProps {
  targets: NutrientTargets;
}

export function NutritionLog({ targets }: NutritionLogProps) {
  const [foodEntries, setFoodEntries] = useState<FoodEntry[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [expandedMacros, setExpandedMacros] = useState(true);
  const [expandedMicros, setExpandedMicros] = useState(false);
  const [newFood, setNewFood] = useState({
    name: "",
    servingSize: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
    fiber: "",
    sugar: "",
    sodium: "",
    potassium: "",
    calcium: "",
    iron: "",
    magnesium: "",
    vitaminA: "",
    vitaminC: "",
    vitaminD: "",
    vitaminE: "",
    vitaminB6: "",
    vitaminB12: "",
    zinc: "",
    omega3: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem("nutritionLog");
    if (stored) {
      setFoodEntries(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("nutritionLog", JSON.stringify(foodEntries));
  }, [foodEntries]);

  const calculateTotals = () => {
    return foodEntries.reduce(
      (acc, entry) => ({
        calories: acc.calories + entry.calories,
        protein: acc.protein + entry.protein,
        carbs: acc.carbs + entry.carbs,
        fat: acc.fat + entry.fat,
        fiber: acc.fiber + entry.fiber,
        sugar: acc.sugar + entry.sugar,
        sodium: acc.sodium + entry.sodium,
        potassium: acc.potassium + entry.potassium,
        calcium: acc.calcium + entry.calcium,
        iron: acc.iron + entry.iron,
        magnesium: acc.magnesium + entry.magnesium,
        vitaminA: acc.vitaminA + entry.vitaminA,
        vitaminC: acc.vitaminC + entry.vitaminC,
        vitaminD: acc.vitaminD + entry.vitaminD,
        vitaminE: acc.vitaminE + entry.vitaminE,
        vitaminB6: acc.vitaminB6 + entry.vitaminB6,
        vitaminB12: acc.vitaminB12 + entry.vitaminB12,
        zinc: acc.zinc + entry.zinc,
        omega3: acc.omega3 + entry.omega3,
      }),
      {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        fiber: 0,
        sugar: 0,
        sodium: 0,
        potassium: 0,
        calcium: 0,
        iron: 0,
        magnesium: 0,
        vitaminA: 0,
        vitaminC: 0,
        vitaminD: 0,
        vitaminE: 0,
        vitaminB6: 0,
        vitaminB12: 0,
        zinc: 0,
        omega3: 0,
      }
    );
  };

  const addFoodEntry = (e: React.FormEvent) => {
    e.preventDefault();
    const entry: FoodEntry = {
      id: Date.now().toString(),
      name: newFood.name,
      servingSize: parseFloat(newFood.servingSize),
      calories: parseFloat(newFood.calories),
      protein: parseFloat(newFood.protein),
      carbs: parseFloat(newFood.carbs),
      fat: parseFloat(newFood.fat),
      fiber: parseFloat(newFood.fiber || "0"),
      sugar: parseFloat(newFood.sugar || "0"),
      sodium: parseFloat(newFood.sodium || "0"),
      potassium: parseFloat(newFood.potassium || "0"),
      calcium: parseFloat(newFood.calcium || "0"),
      iron: parseFloat(newFood.iron || "0"),
      magnesium: parseFloat(newFood.magnesium || "0"),
      vitaminA: parseFloat(newFood.vitaminA || "0"),
      vitaminC: parseFloat(newFood.vitaminC || "0"),
      vitaminD: parseFloat(newFood.vitaminD || "0"),
      vitaminE: parseFloat(newFood.vitaminE || "0"),
      vitaminB6: parseFloat(newFood.vitaminB6 || "0"),
      vitaminB12: parseFloat(newFood.vitaminB12 || "0"),
      zinc: parseFloat(newFood.zinc || "0"),
      omega3: parseFloat(newFood.omega3 || "0"),
      timestamp: Date.now(),
    };

    setFoodEntries([...foodEntries, entry]);
    setNewFood({
      name: "",
      servingSize: "",
      calories: "",
      protein: "",
      carbs: "",
      fat: "",
      fiber: "",
      sugar: "",
      sodium: "",
      potassium: "",
      calcium: "",
      iron: "",
      magnesium: "",
      vitaminA: "",
      vitaminC: "",
      vitaminD: "",
      vitaminE: "",
      vitaminB6: "",
      vitaminB12: "",
      zinc: "",
      omega3: "",
    });
    setShowAddForm(false);
  };

  const removeEntry = (id: string) => {
    setFoodEntries(foodEntries.filter((entry) => entry.id !== id));
  };

  const totals = calculateTotals();

  const NutrientBar = ({ label, current, target, unit, color }: any) => {
    const percentage = Math.min((current / target) * 100, 100);
    const isComplete = current >= target;

    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-white uppercase tracking-wide flex items-center gap-2">
            {isComplete && <CheckCircle2 className="w-4 h-4 text-[#CBEF43]" />}
            {label}
          </span>
          <span className="text-sm font-black text-white">
            {Math.round(current)}/{target} {unit}
          </span>
        </div>
        <div className="w-full bg-[#2A2A2A] rounded-full h-2 overflow-hidden">
          <motion.div
            className={`h-full ${color}`}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Daily Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-[#68020F] to-[#A00C30] rounded-lg p-6 border border-[#F21137]/30">
          <Flame className="w-8 h-8 text-[#CBEF43] mb-3" />
          <p className="text-white/70 text-xs uppercase tracking-wide mb-1">Calories</p>
          <p className="text-3xl font-black text-white">{Math.round(totals.calories)}</p>
          <p className="text-white/50 text-xs mt-1">of {targets.calories} kcal</p>
        </div>

        <div className="bg-gradient-to-br from-[#68020F] to-[#A00C30] rounded-lg p-6 border border-[#F21137]/30">
          <Beef className="w-8 h-8 text-[#CBEF43] mb-3" />
          <p className="text-white/70 text-xs uppercase tracking-wide mb-1">Protein</p>
          <p className="text-3xl font-black text-white">{Math.round(totals.protein)}</p>
          <p className="text-white/50 text-xs mt-1">of {targets.protein}g</p>
        </div>

        <div className="bg-gradient-to-br from-[#68020F] to-[#A00C30] rounded-lg p-6 border border-[#F21137]/30">
          <Wheat className="w-8 h-8 text-[#CBEF43] mb-3" />
          <p className="text-white/70 text-xs uppercase tracking-wide mb-1">Carbs</p>
          <p className="text-3xl font-black text-white">{Math.round(totals.carbs)}</p>
          <p className="text-white/50 text-xs mt-1">of {targets.carbs}g</p>
        </div>

        <div className="bg-gradient-to-br from-[#68020F] to-[#A00C30] rounded-lg p-6 border border-[#F21137]/30">
          <Droplet className="w-8 h-8 text-[#CBEF43] mb-3" />
          <p className="text-white/70 text-xs uppercase tracking-wide mb-1">Fat</p>
          <p className="text-3xl font-black text-white">{Math.round(totals.fat)}</p>
          <p className="text-white/50 text-xs mt-1">of {targets.fat}g</p>
        </div>
      </div>

      {/* Detailed Nutrient Tracking */}
      <div className="bg-[#000000] border border-[#2A2A2A] rounded-lg overflow-hidden">
        {/* Macronutrients Section */}
        <button
          onClick={() => setExpandedMacros(!expandedMacros)}
          className="w-full p-6 flex items-center justify-between hover:bg-[#2A2A2A]/50 transition-all"
        >
          <h3 className="text-xl font-black uppercase text-white tracking-wider">
            Macronutrients
          </h3>
          {expandedMacros ? (
            <ChevronUp className="w-6 h-6 text-[#F21137]" />
          ) : (
            <ChevronDown className="w-6 h-6 text-[#F21137]" />
          )}
        </button>

        <AnimatePresence>
          {expandedMacros && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="px-6 pb-6 space-y-4"
            >
              <NutrientBar
                label="Protein"
                current={totals.protein}
                target={targets.protein}
                unit="g"
                color="bg-gradient-to-r from-[#F21137] to-[#A00C30]"
              />
              <NutrientBar
                label="Carbohydrates"
                current={totals.carbs}
                target={targets.carbs}
                unit="g"
                color="bg-gradient-to-r from-[#F21137] to-[#A00C30]"
              />
              <NutrientBar
                label="Fat"
                current={totals.fat}
                target={targets.fat}
                unit="g"
                color="bg-gradient-to-r from-[#F21137] to-[#A00C30]"
              />
              <NutrientBar
                label="Fiber"
                current={totals.fiber}
                target={targets.fiber}
                unit="g"
                color="bg-gradient-to-r from-[#68020F] to-[#A00C30]"
              />
              <NutrientBar
                label="Sugar"
                current={totals.sugar}
                target={targets.sugar}
                unit="g"
                color="bg-gradient-to-r from-[#68020F] to-[#A00C30]"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Micronutrients Section */}
      <div className="bg-[#000000] border border-[#2A2A2A] rounded-lg overflow-hidden">
        <button
          onClick={() => setExpandedMicros(!expandedMicros)}
          className="w-full p-6 flex items-center justify-between hover:bg-[#2A2A2A]/50 transition-all"
        >
          <h3 className="text-xl font-black uppercase text-white tracking-wider">
            Micronutrients & Minerals
          </h3>
          {expandedMicros ? (
            <ChevronUp className="w-6 h-6 text-[#F21137]" />
          ) : (
            <ChevronDown className="w-6 h-6 text-[#F21137]" />
          )}
        </button>

        <AnimatePresence>
          {expandedMicros && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="px-6 pb-6 space-y-4"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <p className="text-[#CBEF43] text-xs uppercase tracking-wide font-bold">Vitamins</p>
                  <NutrientBar
                    label="Vitamin A"
                    current={totals.vitaminA}
                    target={targets.vitaminA}
                    unit="μg"
                    color="bg-gradient-to-r from-[#CBEF43] to-[#F21137]"
                  />
                  <NutrientBar
                    label="Vitamin C"
                    current={totals.vitaminC}
                    target={targets.vitaminC}
                    unit="mg"
                    color="bg-gradient-to-r from-[#CBEF43] to-[#F21137]"
                  />
                  <NutrientBar
                    label="Vitamin D"
                    current={totals.vitaminD}
                    target={targets.vitaminD}
                    unit="μg"
                    color="bg-gradient-to-r from-[#CBEF43] to-[#F21137]"
                  />
                  <NutrientBar
                    label="Vitamin E"
                    current={totals.vitaminE}
                    target={targets.vitaminE}
                    unit="mg"
                    color="bg-gradient-to-r from-[#CBEF43] to-[#F21137]"
                  />
                  <NutrientBar
                    label="Vitamin B6"
                    current={totals.vitaminB6}
                    target={targets.vitaminB6}
                    unit="mg"
                    color="bg-gradient-to-r from-[#CBEF43] to-[#F21137]"
                  />
                  <NutrientBar
                    label="Vitamin B12"
                    current={totals.vitaminB12}
                    target={targets.vitaminB12}
                    unit="μg"
                    color="bg-gradient-to-r from-[#CBEF43] to-[#F21137]"
                  />
                </div>

                <div className="space-y-4">
                  <p className="text-[#CBEF43] text-xs uppercase tracking-wide font-bold">Minerals</p>
                  <NutrientBar
                    label="Sodium"
                    current={totals.sodium}
                    target={targets.sodium}
                    unit="mg"
                    color="bg-gradient-to-r from-[#F21137] to-[#CBEF43]"
                  />
                  <NutrientBar
                    label="Potassium"
                    current={totals.potassium}
                    target={targets.potassium}
                    unit="mg"
                    color="bg-gradient-to-r from-[#F21137] to-[#CBEF43]"
                  />
                  <NutrientBar
                    label="Calcium"
                    current={totals.calcium}
                    target={targets.calcium}
                    unit="mg"
                    color="bg-gradient-to-r from-[#F21137] to-[#CBEF43]"
                  />
                  <NutrientBar
                    label="Iron"
                    current={totals.iron}
                    target={targets.iron}
                    unit="mg"
                    color="bg-gradient-to-r from-[#F21137] to-[#CBEF43]"
                  />
                  <NutrientBar
                    label="Magnesium"
                    current={totals.magnesium}
                    target={targets.magnesium}
                    unit="mg"
                    color="bg-gradient-to-r from-[#F21137] to-[#CBEF43]"
                  />
                  <NutrientBar
                    label="Zinc"
                    current={totals.zinc}
                    target={targets.zinc}
                    unit="mg"
                    color="bg-gradient-to-r from-[#F21137] to-[#CBEF43]"
                  />
                  <NutrientBar
                    label="Omega-3"
                    current={totals.omega3}
                    target={targets.omega3}
                    unit="g"
                    color="bg-gradient-to-r from-[#F21137] to-[#CBEF43]"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Food Entries List */}
      <div className="bg-[#000000] border border-[#2A2A2A] rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-black uppercase text-white tracking-wider">
            Today's Food Log
          </h3>
          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-[#CBEF43] hover:bg-[#CBEF43]/90 text-black font-bold uppercase"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Food
          </Button>
        </div>

        {foodEntries.length === 0 ? (
          <p className="text-white/50 text-center py-12">
            No food entries yet. Start tracking your nutrition!
          </p>
        ) : (
          <div className="space-y-3">
            {foodEntries.map((entry) => (
              <div
                key={entry.id}
                className="bg-[#2A2A2A] rounded-lg p-4 flex items-center justify-between hover:bg-[#2A2A2A]/70 transition-all"
              >
                <div>
                  <h4 className="font-bold text-white mb-1">{entry.name}</h4>
                  <p className="text-sm text-white/70">
                    {entry.servingSize}g • {entry.calories} kcal • P: {entry.protein}g • C:{" "}
                    {entry.carbs}g • F: {entry.fat}g
                  </p>
                </div>
                <button
                  onClick={() => removeEntry(entry.id)}
                  className="text-[#F21137] hover:text-[#F21137]/70 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Food Form Modal */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-[#68020F] to-[#A00C30] border-2 border-[#F21137] rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-[#F21137]/30">
                <h3 className="text-2xl font-black uppercase text-white">Add Food Entry</h3>
              </div>

              <form onSubmit={addFoodEntry} className="overflow-y-auto flex-1 p-6">
                <div className="space-y-6">
                  {/* Basic Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <Label className="text-[#CBEF43] text-xs uppercase tracking-wide font-bold">
                        Food Name *
                      </Label>
                      <Input
                        value={newFood.name}
                        onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
                        className="bg-[#2A2A2A] border-[#F21137]/30 text-white"
                        placeholder="e.g. Chicken Breast"
                        required
                      />
                    </div>

                    <div>
                      <Label className="text-[#CBEF43] text-xs uppercase tracking-wide font-bold">
                        Serving Size (g) *
                      </Label>
                      <Input
                        type="number"
                        step="0.1"
                        value={newFood.servingSize}
                        onChange={(e) => setNewFood({ ...newFood, servingSize: e.target.value })}
                        className="bg-[#2A2A2A] border-[#F21137]/30 text-white"
                        placeholder="100"
                        required
                      />
                    </div>

                    <div>
                      <Label className="text-[#CBEF43] text-xs uppercase tracking-wide font-bold">
                        Calories *
                      </Label>
                      <Input
                        type="number"
                        step="0.1"
                        value={newFood.calories}
                        onChange={(e) => setNewFood({ ...newFood, calories: e.target.value })}
                        className="bg-[#2A2A2A] border-[#F21137]/30 text-white"
                        placeholder="165"
                        required
                      />
                    </div>
                  </div>

                  {/* Macronutrients */}
                  <div>
                    <h4 className="text-white font-bold mb-3 uppercase tracking-wide">
                      Macronutrients *
                    </h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label className="text-white/70 text-xs">Protein (g)</Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={newFood.protein}
                          onChange={(e) => setNewFood({ ...newFood, protein: e.target.value })}
                          className="bg-[#2A2A2A] border-[#F21137]/30 text-white"
                          required
                        />
                      </div>
                      <div>
                        <Label className="text-white/70 text-xs">Carbs (g)</Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={newFood.carbs}
                          onChange={(e) => setNewFood({ ...newFood, carbs: e.target.value })}
                          className="bg-[#2A2A2A] border-[#F21137]/30 text-white"
                          required
                        />
                      </div>
                      <div>
                        <Label className="text-white/70 text-xs">Fat (g)</Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={newFood.fat}
                          onChange={(e) => setNewFood({ ...newFood, fat: e.target.value })}
                          className="bg-[#2A2A2A] border-[#F21137]/30 text-white"
                          required
                        />
                      </div>
                      <div>
                        <Label className="text-white/70 text-xs">Fiber (g)</Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={newFood.fiber}
                          onChange={(e) => setNewFood({ ...newFood, fiber: e.target.value })}
                          className="bg-[#2A2A2A] border-[#F21137]/30 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-white/70 text-xs">Sugar (g)</Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={newFood.sugar}
                          onChange={(e) => setNewFood({ ...newFood, sugar: e.target.value })}
                          className="bg-[#2A2A2A] border-[#F21137]/30 text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Micronutrients */}
                  <div>
                    <h4 className="text-white font-bold mb-3 uppercase tracking-wide">
                      Micronutrients (Optional)
                    </h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label className="text-white/70 text-xs">Sodium (mg)</Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={newFood.sodium}
                          onChange={(e) => setNewFood({ ...newFood, sodium: e.target.value })}
                          className="bg-[#2A2A2A] border-[#F21137]/30 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-white/70 text-xs">Potassium (mg)</Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={newFood.potassium}
                          onChange={(e) => setNewFood({ ...newFood, potassium: e.target.value })}
                          className="bg-[#2A2A2A] border-[#F21137]/30 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-white/70 text-xs">Calcium (mg)</Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={newFood.calcium}
                          onChange={(e) => setNewFood({ ...newFood, calcium: e.target.value })}
                          className="bg-[#2A2A2A] border-[#F21137]/30 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-white/70 text-xs">Iron (mg)</Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={newFood.iron}
                          onChange={(e) => setNewFood({ ...newFood, iron: e.target.value })}
                          className="bg-[#2A2A2A] border-[#F21137]/30 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-white/70 text-xs">Magnesium (mg)</Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={newFood.magnesium}
                          onChange={(e) => setNewFood({ ...newFood, magnesium: e.target.value })}
                          className="bg-[#2A2A2A] border-[#F21137]/30 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-white/70 text-xs">Vitamin A (μg)</Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={newFood.vitaminA}
                          onChange={(e) => setNewFood({ ...newFood, vitaminA: e.target.value })}
                          className="bg-[#2A2A2A] border-[#F21137]/30 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-white/70 text-xs">Vitamin C (mg)</Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={newFood.vitaminC}
                          onChange={(e) => setNewFood({ ...newFood, vitaminC: e.target.value })}
                          className="bg-[#2A2A2A] border-[#F21137]/30 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-white/70 text-xs">Vitamin D (μg)</Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={newFood.vitaminD}
                          onChange={(e) => setNewFood({ ...newFood, vitaminD: e.target.value })}
                          className="bg-[#2A2A2A] border-[#F21137]/30 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-white/70 text-xs">Vitamin E (mg)</Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={newFood.vitaminE}
                          onChange={(e) => setNewFood({ ...newFood, vitaminE: e.target.value })}
                          className="bg-[#2A2A2A] border-[#F21137]/30 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-white/70 text-xs">Vitamin B6 (mg)</Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={newFood.vitaminB6}
                          onChange={(e) => setNewFood({ ...newFood, vitaminB6: e.target.value })}
                          className="bg-[#2A2A2A] border-[#F21137]/30 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-white/70 text-xs">Vitamin B12 (μg)</Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={newFood.vitaminB12}
                          onChange={(e) => setNewFood({ ...newFood, vitaminB12: e.target.value })}
                          className="bg-[#2A2A2A] border-[#F21137]/30 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-white/70 text-xs">Zinc (mg)</Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={newFood.zinc}
                          onChange={(e) => setNewFood({ ...newFood, zinc: e.target.value })}
                          className="bg-[#2A2A2A] border-[#F21137]/30 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-white/70 text-xs">Omega-3 (g)</Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={newFood.omega3}
                          onChange={(e) => setNewFood({ ...newFood, omega3: e.target.value })}
                          className="bg-[#2A2A2A] border-[#F21137]/30 text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <Button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 bg-[#2A2A2A] hover:bg-[#2A2A2A]/70 text-white font-bold uppercase"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-[#CBEF43] hover:bg-[#CBEF43]/90 text-black font-bold uppercase"
                  >
                    Add Entry
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
