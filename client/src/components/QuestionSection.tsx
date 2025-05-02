
import React, { useState, useEffect } from 'react';
import { Question } from '@/utils/assessmentData';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface QuestionSectionProps {
  section: {
    id: string;
    title: string;
    description: string;
    questions: Question[];
  };
  currentQuestionIndex: number;
  answers: { [key: string]: string | string[] };
  onAnswerChange: (questionId: string, answer: string | string[]) => void;
  onNext: () => void;
  onPrevious: () => void;
  onComplete: () => void;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
}

const QuestionSection: React.FC<QuestionSectionProps> = ({
  section,
  currentQuestionIndex,
  answers,
  onAnswerChange,
  onNext,
  onPrevious,
  onComplete,
  isFirstQuestion,
  isLastQuestion
}) => {
  const question = section.questions[currentQuestionIndex];
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [textAnswer, setTextAnswer] = useState<string>("");
  const [singleChoice, setSingleChoice] = useState<string>("");
  const [isAnswered, setIsAnswered] = useState<boolean>(false);

  // Initialize component state based on existing answers
  useEffect(() => {
    if (question) {
      const currentAnswer = answers[question.id];
      
      if (currentAnswer) {
        if (Array.isArray(currentAnswer)) {
          setSelectedOptions(currentAnswer);
        } else if (question.type === "text") {
          setTextAnswer(currentAnswer);
        } else if (question.type === "single-choice") {
          setSingleChoice(currentAnswer);
        }
        setIsAnswered(true);
      } else {
        // Reset if no answer
        setSelectedOptions([]);
        setTextAnswer("");
        setSingleChoice("");
        setIsAnswered(false);
      }
    }
  }, [question, answers]);

  if (!question) {
    return <div>Loading question...</div>;
  }

  const handleMultipleChoice = (option: string) => {
    const updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter(item => item !== option)
      : [...selectedOptions, option];
    
    setSelectedOptions(updatedOptions);
    onAnswerChange(question.id, updatedOptions);
    setIsAnswered(updatedOptions.length > 0);
  };

  const handleSingleChoice = (value: string) => {
    setSingleChoice(value);
    onAnswerChange(question.id, value);
    setIsAnswered(!!value);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAnswer(e.target.value);
    onAnswerChange(question.id, e.target.value);
    setIsAnswered(!!e.target.value.trim());
  };

  const renderQuestionContent = () => {
    switch (question.type) {
      case "multiple-choice":
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox 
                  id={`option-${index}`} 
                  checked={selectedOptions.includes(option)}
                  onCheckedChange={() => handleMultipleChoice(option)}
                />
                <Label htmlFor={`option-${index}`} className="text-base cursor-pointer">{option}</Label>
              </div>
            ))}
          </div>
        );

      case "single-choice":
        return (
          <RadioGroup value={singleChoice} onValueChange={handleSingleChoice} className="space-y-3">
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="text-base cursor-pointer">{option}</Label>
              </div>
            ))}
          </RadioGroup>
        );

      case "text":
        return (
          <Textarea
            value={textAnswer}
            onChange={handleTextChange}
            placeholder="Type your answer here..."
            className="min-h-[150px]"
          />
        );

      default:
        return <div>Question type not supported</div>;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">{question.text}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
  {question.image && (
    <div className="mb-4 text-center">
      <img
        src={question.image}
        alt="Visual Prompt"
        className="max-w-full max-h-[300px] mx-auto rounded-md shadow"
      />
    </div>
  )}
  {renderQuestionContent()}
</CardContent>

      <CardFooter className="flex justify-between pt-6">
        <Button 
          onClick={onPrevious} 
          disabled={isFirstQuestion}
          variant="outline"
        >
          Previous
        </Button>
        
        {isLastQuestion ? (
          <Button 
            onClick={onComplete} 
            disabled={!isAnswered}
            className="bg-assessment-secondary hover:bg-assessment-secondary/90"
          >
            Complete Assessment
          </Button>
        ) : (
          <Button 
            onClick={onNext} 
            disabled={!isAnswered}
            className="bg-assessment-primary hover:bg-assessment-primary/90"
          >
            Next Question
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default QuestionSection;
