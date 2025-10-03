
export interface MealItem {
  name: string;
  portion: string;
  calories: number;
}

export interface CalorieAnalysisResult {
  totalCalories: number;
  confidenceScore: number;
  items: MealItem[];
  clarification: string | null;
  feedback: string;
}
