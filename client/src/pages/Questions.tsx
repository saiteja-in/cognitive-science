// src/pages/Questions.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import {
  assessmentSections,
  calculateDetailedScores
} from '@/utils/assessmentData';
import {
  getUserData,
  getAnswers,
  getProgress,
  saveAnswers,
  saveProgress,
  saveResults
} from '@/utils/localStorage';
import ProgressBar from '@/components/ProgressBar';
import QuestionSection from '@/components/QuestionSection';
import SectionFeedback from '@/components/section-feedback';

const Questions: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [answers, setAnswers] = useState<{ [key: string]: string | string[] }>({});
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userData, setUserData] = useState<any>(null);

  const [showSectionFeedback, setShowSectionFeedback] = useState(false);
  const [thisSectionResult, setThisSectionResult] = useState<{
    score: number;
    total: number;
    percentage: number;
  } | null>(null);

  const [assessment, setAssessment] = useState<any>({
    results: {
      sectionResults: [],
      score: 0,
      total: 0,
      percentage: 0
    }
  });

  // Load user data and any saved progress
  useEffect(() => {
    const storedUserData = getUserData();
    const storedAnswers = getAnswers();
    const storedProgress = getProgress();

    if (!storedUserData) {
      toast({
        title: 'No user data found',
        description: 'Please fill in your information to start the assessment.',
        variant: 'destructive'
      });
      navigate('/');
      return;
    }

    setUserData(storedUserData);

    if (storedAnswers) setAnswers(storedAnswers);

    if (storedProgress && !storedProgress.completed) {
      setCurrentSectionIndex(storedProgress.currentSection);
      setCurrentQuestionIndex(storedProgress.currentQuestion);
    }
  }, [navigate, toast]);

  // Persist progress on section/question change
  useEffect(() => {
    if (userData) {
      saveProgress({
        currentSection: currentSectionIndex,
        currentQuestion: currentQuestionIndex,
        completed: false
      });
    }
  }, [currentSectionIndex, currentQuestionIndex, userData]);

  const handleAnswerChange = (questionId: string, answer: string | string[]) => {
    const updated = { ...answers, [questionId]: answer };
    setAnswers(updated);
    saveAnswers(updated);
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(ci => ci - 1);
    } else if (currentSectionIndex > 0) {
      const prevSect = assessmentSections[currentSectionIndex - 1];
      setCurrentSectionIndex(si => si - 1);
      setCurrentQuestionIndex(prevSect.questions.length - 1);
    }
  };

  const handleNext = () => {
    const currentSection = assessmentSections[currentSectionIndex];
    const lastQIndex = currentSection.questions.length - 1;

    // If ending a section (and it's not the final one), show feedback
    if (
      currentQuestionIndex === lastQIndex &&
      currentSectionIndex < assessmentSections.length - 1
    ) {
      const fullResults = calculateDetailedScores(answers);
      const sect = fullResults.sectionResults[currentSectionIndex];
      setThisSectionResult({
        score: sect.score,
        total: sect.total,
        percentage: sect.percentage
      });
      setShowSectionFeedback(true);
      return;
    }

    // Normal next logic
    if (currentQuestionIndex < lastQIndex) {
      setCurrentQuestionIndex(ci => ci + 1);
    } else if (currentSectionIndex < assessmentSections.length - 1) {
      setCurrentSectionIndex(si => si + 1);
      setCurrentQuestionIndex(0);
    }
  };

  const handleContinueSection = () => {
    setShowSectionFeedback(false);
    setCurrentSectionIndex(si => si + 1);
    setCurrentQuestionIndex(0);
  };

  const handleComplete = async () => {
    const results = calculateDetailedScores(answers);
    saveResults(results);

    console.log({
      results: {
        sectionResults: results.sectionResults,
        score: results.score,
        total: results.totalQuestions,
        percentage: results.percentage,
      },
      userId: localStorage.getItem('userId')
    });

    // save nikki
    const response = await fetch('http://localhost:5000/api/assessment/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        results: {
          sectionResults: results.sectionResults,
          score: results.score,
          total: results.totalQuestions,
          percentage: results.percentage,
        },
        userId: localStorage.getItem('userId')
      })
    });

    if (response.ok) {
      toast({
        title: 'Assessment saved successfully',
        description: 'Your assessment results have been saved.',
        variant: 'default'
      });
    }

    saveProgress({
      currentSection: currentSectionIndex,
      currentQuestion: currentQuestionIndex,
      completed: true
    });
    navigate('/results');
  };

  const currentSection = assessmentSections[currentSectionIndex];
  const isFirstQuestion = currentSectionIndex === 0 && currentQuestionIndex === 0;
  const isLastQuestion =
    currentSectionIndex === assessmentSections.length - 1 &&
    currentQuestionIndex ===
      assessmentSections[assessmentSections.length - 1].questions.length - 1;

      if(localStorage.getItem("userId") === null){
        navigate("/signin");
      }

  // Render feedback screen if needed
  if (showSectionFeedback && thisSectionResult) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-assessment-background p-4">
        <SectionFeedback
          sectionId={currentSection.id}
          title={currentSection.title}
          score={thisSectionResult.score}
          total={thisSectionResult.total}
          percentage={thisSectionResult.percentage}
          onContinue={handleContinueSection}
        />
      </div>
    );
  }

  // Main assessment UI
  if (!userData || !currentSection) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading assessment...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-assessment-background flex flex-col items-center p-4 sm:p-6">
      <div className="w-full max-w-3xl space-y-6">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-assessment-text">
            {currentSection.title}
          </h1>
          <p className="text-assessment-text/80">
            {currentSection.description}
          </p>
        </div>

        <ProgressBar
          currentSection={currentSectionIndex + 1}
          totalSections={assessmentSections.length}
          currentQuestion={currentQuestionIndex + 1}
          totalQuestionsInSection={currentSection.questions.length}
        />

        <QuestionSection
          section={currentSection}
          currentQuestionIndex={currentQuestionIndex}
          answers={answers}
          onAnswerChange={handleAnswerChange}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onComplete={handleComplete}
          isFirstQuestion={isFirstQuestion}
          isLastQuestion={isLastQuestion}
        />
      </div>
    </div>
  );
};

export default Questions;
