import React, { useState, useCallback } from 'react';
import { analyzeMeal } from './services/geminiService';
import type { CalorieAnalysisResult } from './types';
import Sidebar from './components/Sidebar';
import Loader from './components/Loader';
import ErrorDisplay from './components/ErrorDisplay';
import CalorieResult from './components/CalorieResult';

const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [mealDescription, setMealDescription] = useState<string>('');
  const [mealType, setMealType] = useState<string>('Breakfast');
  const [analysisResult, setAnalysisResult] = useState<CalorieAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleMealAnalysis = useCallback(async () => {
    if (!mealDescription.trim()) {
      setError('Please describe your meal before analyzing.');
      setAnalysisResult(null);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const fullDescription = `For ${mealType}: ${mealDescription}`;
      const result = await analyzeMeal(fullDescription);
      setAnalysisResult(result);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [mealDescription, mealType]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
        handleMealAnalysis();
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800 lg:hidden">
            <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-black">
                lunch_dining
                </span>
            </div>
            <h1 className="text-xl font-bold">Calorie Tracker </h1> 
            {/* whatever the name */}
            </div>
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label="Open menu"
            >
            <span className="material-symbols-outlined">
                menu
            </span>
            </button>
        </header>
        <main className="flex-grow flex items-center justify-center p-4 sm:p-6">
          <div className="w-full max-w-2xl mx-auto">
            <div className="bg-white dark:bg-gray-900/50 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
              <div className="p-6 sm:p-8 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2 text-gray-800 dark:text-gray-100">What did you eat today?</h2>
                <p className="text-gray-500 dark:text-gray-400">Describe your meal below and we'll estimate the calories for you.</p>
              </div>
              
              <div className="px-6 pb-6">
                <div role="radiogroup" aria-label="Select meal type" className="flex items-center justify-center flex-wrap gap-2 mb-4">
                    {mealTypes.map((type) => (
                        <button
                            key={type}
                            role="radio"
                            aria-checked={mealType === type}
                            onClick={() => setMealType(type)}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 focus:ring-primary ${
                                mealType === type
                                ? 'bg-primary text-black shadow-md'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
                <div className="relative">
                  <textarea
                    value={mealDescription}
                    onChange={(e) => setMealDescription(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="e.g., A large bowl of oatmeal with fresh berries, nuts, and a drizzle of honey."
                    className="w-full h-36 p-4 pr-32 rounded-lg bg-background-light dark:bg-gray-800 border-2 border-transparent focus:border-primary focus:ring-0 transition-colors duration-300 resize-none placeholder-gray-400 dark:placeholder-gray-500"
                    disabled={isLoading}
                    aria-label="Meal Description"
                  />
                  <button
                    onClick={handleMealAnalysis}
                    disabled={isLoading}
                    className="absolute bottom-4 right-4 bg-primary text-black font-bold py-2 px-4 rounded-lg hover:bg-primary/90 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-base">auto_awesome</span>
                    {isLoading ? 'Analyzing...' : 'Analyze'}
                  </button>
                </div>
              </div>

              {(isLoading || error || analysisResult) && (
                <div className="border-t border-gray-200 dark:border-gray-800 p-6 sm:p-8">
                  {isLoading && <Loader />}
                  {error && <ErrorDisplay message={error} />}
                  {analysisResult && <CalorieResult result={analysisResult} />}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;