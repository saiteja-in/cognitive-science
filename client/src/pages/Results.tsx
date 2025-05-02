import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  getUserData, 
  getResults, 
  getAnswers 
} from '@/utils/localStorage';
import ResultsAnalysis from '@/components/ResultsAnalysis';
import { getSectionRecommendations, getOverallRecommendations } from '@/utils/assessmentData';

const Results = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const storedUserData = getUserData();
    const storedResults = getResults();
    const storedAnswers = getAnswers();
    
    if (!storedUserData || !storedResults || !storedAnswers) {
      navigate('/');
      return;
    }

    setUserData(storedUserData);
    setResults(storedResults);
  }, [navigate]);

  if (!userData || !results) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg">Loading results...</p>
        </div>
      </div>
    );
  }

  const overallFeedback = getOverallRecommendations(results.percentage);

  return (
    <div className="min-h-screen bg-assessment-background flex flex-col items-center p-4 sm:p-6">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-assessment-text mb-2">
            Assessment Completed
          </h1>
          <p className="text-xl text-assessment-text/80">
            Thank you, {userData.name}! Here's how you performed.
          </p>
        </div>

        {/* Overall Score */}
        <div className="w-full flex justify-center mb-6">
          <ResultsAnalysis 
            score={results.score}
            totalQuestions={results.totalQuestions}
            percentage={results.percentage}
          />
        </div>

        {/* Overall Feedback */}
        <div className="bg-white shadow rounded-lg p-4 mb-8">
          <h2 className="text-xl font-semibold text-green-700 mb-2">Overall Feedback</h2>
          <p className="text-gray-700 mb-2">{overallFeedback.message}</p>
          <ul className="list-disc pl-5 text-gray-700">
            {overallFeedback.suggestions.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>

        {/* Section-wise Results */}
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">Section-wise Performance</h2>
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="text-left bg-gray-100">
                <th className="p-2 border">Section</th>
                <th className="p-2 border">Score</th>
                <th className="p-2 border">Feedback</th>
              </tr>
            </thead>
            <tbody>
            {results.sectionResults.map((section: any) => {
  const recommendations = getSectionRecommendations(section.sectionId, section.percentage);
  return (
    <tr key={section.sectionId}>
      <td className="p-2 border font-medium">{section.sectionTitle}</td>
      <td className="p-2 border">{section.score} / {section.total} ({section.percentage}%)</td>
      <td className="p-2 border">
        {recommendations.length > 0 ? (
          <ul className="list-disc pl-5">
            {recommendations.map((rec, idx) => (
              <li key={idx} dangerouslySetInnerHTML={{ __html: rec }} />
            ))}
          </ul>
        ) : (
          <span className="text-green-600"></span>
        )}
      </td>
    </tr>
  );
})}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-assessment-text/60">
          <p>
            Your results have been saved. You can take the assessment again anytime.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Results;
