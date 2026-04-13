import { useState, useRef } from "react";
import { Download, Share2, X } from "lucide-react";
import html2canvas from "html2canvas";

interface InstagramStoryTemplateProps {
  userName: string;
  workoutType: string;
  exercisesCompleted: number;
  caloriesBurned: number;
  duration: number;
  onClose: () => void;
}

export function InstagramStoryTemplate({
  userName,
  workoutType,
  exercisesCompleted,
  caloriesBurned,
  duration,
  onClose
}: InstagramStoryTemplateProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const storyRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!storyRef.current) return;

    setIsDownloading(true);
    try {
      const canvas = await html2canvas(storyRef.current, {
        backgroundColor: "#000000",
        scale: 2,
        width: 1080,
        height: 1920,
      });

      const link = document.createElement("a");
      link.download = `ironleague-workout-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error("Error generating story:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white hover:text-[#F21137] transition-colors z-10"
      >
        <X className="w-8 h-8" />
      </button>

      <div className="max-w-md w-full">
        {/* Instagram Story Canvas (9:16 aspect ratio) */}
        <div
          ref={storyRef}
          className="w-full aspect-[9/16] bg-gradient-to-br from-[#68020F] via-[#A00C30] to-[#000000] rounded-2xl overflow-hidden relative shadow-2xl"
          style={{ maxHeight: "80vh" }}
        >
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-[#CBEF43] rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#F21137] rounded-full blur-3xl animate-pulse delay-1000" />
          </div>

          {/* Content */}
          <div className="relative h-full flex flex-col justify-between p-8">
            {/* Header */}
            <div className="text-center">
              <div className="inline-block bg-black/40 backdrop-blur-md px-6 py-3 rounded-full mb-4">
                <h1 className="text-white text-2xl font-black tracking-widest">
                  IRONLEAGUE
                </h1>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center space-y-6">
              {/* Achievement Badge */}
              <div className="relative">
                <div className="absolute inset-0 bg-[#CBEF43] blur-2xl opacity-50 animate-pulse" />
                <div className="relative bg-black/60 backdrop-blur-sm border-4 border-[#CBEF43] rounded-3xl p-8 text-center">
                  <div className="text-6xl mb-2">💪</div>
                  <h2 className="text-white text-3xl font-black uppercase mb-2">
                    Workout
                  </h2>
                  <h3 className="text-[#CBEF43] text-4xl font-black uppercase tracking-wider">
                    Complete!
                  </h3>
                </div>
              </div>

              {/* User Name */}
              <div className="bg-gradient-to-r from-[#F21137] to-[#A00C30] px-8 py-3 rounded-full">
                <p className="text-white text-2xl font-bold uppercase tracking-wide">
                  {userName}
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                <div className="bg-black/40 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-center">
                  <p className="text-white/70 text-xs uppercase tracking-wider mb-1">
                    Workout Type
                  </p>
                  <p className="text-white text-lg font-bold">
                    {workoutType}
                  </p>
                </div>

                <div className="bg-black/40 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-center">
                  <p className="text-white/70 text-xs uppercase tracking-wider mb-1">
                    Exercises
                  </p>
                  <p className="text-[#CBEF43] text-lg font-bold">
                    {exercisesCompleted}
                  </p>
                </div>

                <div className="bg-black/40 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-center">
                  <p className="text-white/70 text-xs uppercase tracking-wider mb-1">
                    Duration
                  </p>
                  <p className="text-[#F21137] text-lg font-bold">
                    {duration} min
                  </p>
                </div>

                <div className="bg-black/40 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-center">
                  <p className="text-white/70 text-xs uppercase tracking-wider mb-1">
                    Calories
                  </p>
                  <p className="text-white text-lg font-bold">
                    {caloriesBurned}
                  </p>
                </div>
              </div>

              {/* Motivational Quote */}
              <div className="bg-black/30 backdrop-blur-sm border-l-4 border-[#CBEF43] px-6 py-4 rounded-r-2xl">
                <p className="text-white/90 text-sm italic">
                  "The only bad workout is the one that didn't happen."
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center">
              <div className="inline-block bg-black/40 backdrop-blur-md px-4 py-2 rounded-full">
                <p className="text-white/60 text-xs uppercase tracking-widest">
                  {new Date().toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Download Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex-1 bg-gradient-to-r from-[#68020F] to-[#A00C30] hover:from-[#A00C30] hover:to-[#F21137] text-white py-4 rounded-xl font-bold uppercase tracking-wide transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Download className="w-5 h-5" />
            {isDownloading ? "Generating..." : "Download Story"}
          </button>

          <button
            onClick={handleDownload}
            className="bg-[#CBEF43] hover:bg-[#B8D63C] text-black py-4 px-6 rounded-xl font-bold uppercase transition-all flex items-center justify-center"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        <p className="text-white/40 text-xs text-center mt-4">
          Share your achievement on Instagram Stories • 1080x1920px
        </p>
      </div>
    </div>
  );
}
