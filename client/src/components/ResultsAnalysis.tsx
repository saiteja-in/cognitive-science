import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getOverallRecommendations } from '@/utils/assessmentData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip, Legend } from 'recharts';

interface ResultsAnalysisProps {
  score: number;
  totalQuestions: number;
  percentage: number;
}

const ResultsAnalysis: React.FC<ResultsAnalysisProps> = ({
  score,
  totalQuestions,
  percentage
}) => {
  const navigate = useNavigate();
  const recommendations = getOverallRecommendations(percentage);

  const data = [
    { name: 'Correct', value: score, color: '#0D9488' },
    { name: 'Incorrect', value: totalQuestions - score, color: '#EF4444' }
  ];

  const getScoreMessage = () => {
    if (percentage >= 80) return "Excellent!";
    if (percentage >= 70) return "Good job!";
    if (percentage >= 60) return "Well done!";
    if (percentage >= 50) return "Not bad!";
    return "You can improve!";
  };

  const resetAssessment = () => {
    navigate('/');
  };

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Assessment Results</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Score Overview */}
        <div className="text-center space-y-2 mb-6">
          <h3 className="text-xl font-semibold">{getScoreMessage()}</h3>
          <div className="text-4xl font-bold text-assessment-primary">
            {score} / {totalQuestions}
          </div>
          <div className="text-2xl font-medium">
            {percentage}%
          </div>
        </div>

        {/* Pie Chart Visualization */}
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Overall Recommendations */}
        <div className="space-y-4 mt-6 border-t pt-6">
          <h3 className="text-xl font-semibold">Recommendations</h3>
          <p className="text-assessment-text">{recommendations.message}</p>
          <ul className="list-disc pl-5 space-y-2">
            {recommendations.suggestions.map((suggestion, index) => (
              <li key={index} className="text-assessment-text">{suggestion}</li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button 
          onClick={resetAssessment} 
          className="bg-assessment-primary hover:bg-assessment-primary/90"
        >
          Start New Assessment
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ResultsAnalysis;
