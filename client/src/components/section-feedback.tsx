// src/components/SectionFeedback.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { getSectionEndRecommendations, getSectionRecommendations } from '@/utils/assessmentData';

interface SectionFeedbackProps {
  sectionId: string;
  title: string;
  score: number;
  total: number;
  percentage: number;
  onContinue: () => void;
}

const SectionFeedback: React.FC<SectionFeedbackProps> = ({
  sectionId,
  title,
  score,
  total,
  percentage,
  onContinue
}) => {
  const recs = getSectionRecommendations(sectionId, percentage);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-2">{title} Feedback</h2>
      <p className="mb-4">
        You scored <strong>{score} / {total}</strong> ({percentage}%)
      </p>
      {/* {recs.length > 0 ? (
        <ul className="list-disc pl-5 mb-4">
          {recs.map((r, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: r }} />
          ))}
        </ul>
      ) : (
        <p className="text-green-600 mb-4"></p>
      )} */}

      {
        <p className='mb-3'>
         {getSectionEndRecommendations(percentage, sectionId)}
        </p>
      }
      <Button onClick={onContinue} className="bg-assessment-primary">
        Continue to Next Section
      </Button>
    </div>
  );
};

export default SectionFeedback;
      