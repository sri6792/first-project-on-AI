import React, { useState, useEffect, useRef } from 'react';
import type { CalorieAnalysisResult } from '../types';

interface CalorieResultProps {
  result: CalorieAnalysisResult;
}

// Custom hook for the count-up animation
const useCountUp = (end: number, duration: number = 1000) => {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    startTimeRef.current = performance.now();

    const animate = (currentTime: number) => {
      if (startTimeRef.current === null) return;
      
      const elapsedTime = currentTime - startTimeRef.current;
      const progress = Math.min(elapsedTime / duration, 1);
      
      // Ease-out function for a smoother stop
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      
      const currentCount = Math.floor(easedProgress * end);
      setCount(currentCount);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [end, duration]);

  return count;
};


const CalorieResult: React.FC<CalorieResultProps> = ({ result }) => {
    const animatedCalories = useCountUp(Math.round(result.totalCalories));

    const getConfidenceColor = (score: number) => {
        if (score > 85) return 'text-primary';
        if (score > 60) return 'text-yellow-500';
        return 'text-red-500';
    };

  return (
    <div className="space-y-6">
      <div className="text-center opacity-0 animate-fade-in-up" style={{ animationDelay: '0ms' }}>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Estimated Calories</h3>
        <div className="flex items-baseline justify-center gap-2">
          <span className="text-5xl sm:text-6xl font-bold text-primary tracking-tight">
            {animatedCalories}
          </span>
          <span className="text-gray-500 dark:text-gray-400 font-medium">kcal</span>
        </div>
      </div>
      
      <div className="space-y-4 opacity-0 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
        <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-800 pb-2">
          Meal Breakdown
        </h4>
        <ul className="space-y-3">
          {result.items.map((item, index) => (
            <li 
              key={index} 
              className="flex justify-between items-center bg-background-light dark:bg-gray-800/50 p-3 rounded-lg opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${250 + index * 100}ms` }} 
            >
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-200">{item.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.portion}</p>
              </div>
              <p className="font-semibold text-gray-700 dark:text-gray-300">{Math.round(item.calories)} kcal</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-4 opacity-0 animate-fade-in-up" style={{ animationDelay: `${250 + result.items.length * 100}ms` }}>
         {result.feedback && (
          <div className="bg-primary/10 border border-primary/20 text-primary p-3 rounded-lg text-center text-sm">
            <p>"{result.feedback}"</p>
          </div>
        )}

        {result.clarification && (
          <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 p-4 rounded-lg text-sm">
            <p className="font-semibold mb-1">Need more info!</p>
            <p>{result.clarification}</p>
          </div>
        )}

        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          Confidence: <span className={`font-bold ${getConfidenceColor(result.confidenceScore)}`}>{result.confidenceScore}%</span>
        </div>
      </div>
       <p className="mt-4 text-xs text-center text-gray-500 dark:text-gray-400 opacity-0 animate-fade-in-up" style={{ animationDelay: `${350 + result.items.length * 100}ms` }}>This is an estimate. Actual calories may vary.</p>
    </div>
  );
};

export default CalorieResult;