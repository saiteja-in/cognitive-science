
import React from 'react';
import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  currentSection: number;
  totalSections: number;
  currentQuestion: number;
  totalQuestionsInSection: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentSection,
  totalSections,
  currentQuestion,
  totalQuestionsInSection
}) => {
  // Calculate overall progress percentage
  const sectionWeight = 100 / totalSections;
  const questionWeight = sectionWeight / totalQuestionsInSection;
  
  const completedSectionsProgress = (currentSection - 1) * sectionWeight;
  const currentSectionProgress = currentQuestion * questionWeight;
  
  const totalProgress = completedSectionsProgress + currentSectionProgress;

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between text-sm text-assessment-text">
        <div>
          Section {currentSection} of {totalSections}
        </div>
        <div>
          Question {currentQuestion} of {totalQuestionsInSection}
        </div>
      </div>
      <Progress 
        value={totalProgress} 
        className="h-2 bg-gray-200" 
      />
      <div className="text-right text-sm text-assessment-text">
        {Math.round(totalProgress)}% Complete
      </div>
    </div>
  );
};

export default ProgressBar;
