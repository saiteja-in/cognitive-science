
export interface UserData {
  name: string;
  email: string;
  fieldOfStudy: string;
}

export interface AnswerData {
  [key: string]: string | string[];
}

export interface AssessmentProgress {
  currentSection: number;
  currentQuestion: number;
  completed: boolean;
}

// Save user data to localStorage
export const saveUserData = (data: UserData): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("assessment_user", JSON.stringify(data));
  }
};

// Get user data from localStorage
export const getUserData = (): UserData | null => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem("assessment_user");
    return data ? JSON.parse(data) : null;
  }
  return null;
};

// Save answers to localStorage
export const saveAnswers = (answers: AnswerData): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("assessment_answers", JSON.stringify(answers));
  }
};

// Get answers from localStorage
export const getAnswers = (): AnswerData | null => {
  if (typeof window !== "undefined") {
    const answers = localStorage.getItem("assessment_answers");
    return answers ? JSON.parse(answers) : null;
  }
  return null;
};

// Save progress to localStorage
export const saveProgress = (progress: AssessmentProgress): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("assessment_progress", JSON.stringify(progress));
  }
};

// Get progress from localStorage
export const getProgress = (): AssessmentProgress | null => {
  if (typeof window !== "undefined") {
    const progress = localStorage.getItem("assessment_progress");
    return progress ? JSON.parse(progress) : null;
  }
  return null;
};

// Save results to localStorage
export const saveResults = (results: {
  score: number;
  totalQuestions: number;
  percentage: number;
}): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("assessment_results", JSON.stringify(results));
  }
};

// Get results from localStorage
export const getResults = () => {
  if (typeof window !== "undefined") {
    const results = localStorage.getItem("assessment_results");
    return results ? JSON.parse(results) : null;
  }
  return null;
};

// Clear all assessment data
export const clearAssessmentData = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("assessment_user");
    localStorage.removeItem("assessment_answers");
    localStorage.removeItem("assessment_progress");
    localStorage.removeItem("assessment_results");
  }
};
