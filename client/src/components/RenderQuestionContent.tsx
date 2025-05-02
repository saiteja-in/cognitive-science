
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";



const renderQuestionContent = (question: any) => {
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