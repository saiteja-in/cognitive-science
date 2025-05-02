import { Button } from "@/components/ui/button";
import { getSectionRecommendations } from "@/utils/assessmentData";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const History = () => {
  const [history, setHistory] = useState([]);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [recommendations, setRecommendations] = useState({});

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/assessment/history`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userId: localStorage.getItem("userId")
          })
        });
        const data = await response.json();
        setHistory(data);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    fetchHistory();
  }, []);

  const handleGetRecommendations = (sectionId, percentage) => {
    const sectionRecommendations = getSectionRecommendations(sectionId, percentage);
    setRecommendations(prev => ({
      ...prev,
      [sectionId]: sectionRecommendations
    }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <div className="flex min-h-screen bg-gray-100 justify-center">
      <div className="flex flex-col items-center w-full max-w-5xl mx-auto p-6">
        <div className="w-full bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Assessment History</h1>
          
          {history.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {history.map((item) => (
                <Card key={item._id} className="shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader className="bg-gray-50 border-b">
                    <CardTitle className="text-xl">Assessment Result</CardTitle>
                    <CardDescription>
                      {item.createdAt ? formatDate(item.createdAt) : "No date available"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="mb-2 text-lg">
                      <span className="font-semibold">Score:</span> {item.results.score}/{item.results.total}
                    </div>
                    <div className="mb-4 text-lg">
                      <span className="font-semibold">Percentage:</span> {item.results.percentage}%
                    </div>
                  </CardContent>
                  <CardFooter className="bg-gray-50 border-t pt-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          className="w-full" 
                          onClick={() => setSelectedAssessment(item)}
                        >
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-screen overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-bold">Assessment Details</DialogTitle>
                        </DialogHeader>
                        
                        {selectedAssessment && (
                          <div className="mt-4">
                            <div className="bg-gray-100 p-4 rounded-md mb-4">
                              <div className="text-xl font-bold">
                                Score: {selectedAssessment.results.score}/{selectedAssessment.results.total}
                                <span className="ml-4">
                                  ({selectedAssessment.results.percentage}%)
                                </span>
                              </div>
                            </div>
                            
                            <Accordion type="single" collapsible className="w-full">
                              {selectedAssessment.results.sectionResults.map((section) => (
                                <AccordionItem key={section.sectionId} value={section.sectionId}>
                                  <AccordionTrigger className="px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-t-md">
                                    <div className="flex justify-between w-full">
                                      <span>{section.sectionTitle}</span>
                                      <span>
                                        {section.score}/{section.total} ({section.percentage}%)
                                      </span>
                                    </div>
                                  </AccordionTrigger>
                                  <AccordionContent className="p-4 bg-white border border-t-0 border-gray-200 rounded-b-md">
                                    <Button 
                                      variant="outline" 
                                      className="mb-4"
                                      onClick={() => handleGetRecommendations(section.sectionId, section.percentage)}
                                    >
                                      Get Recommendations
                                    </Button>
                                    
                                    {recommendations[section.sectionId]?.length > 0 && (
  <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
    <h4 className="font-semibold mb-2">Recommendations:</h4>
    <ul className="list-disc list-inside space-y-2">
      {recommendations[section.sectionId].map((rec, idx) => (
        <li
          key={idx}
          className="ml-4"
          // if your rec strings contain HTML links, this will render them correctly
          dangerouslySetInnerHTML={{ __html: rec }}
        />
      ))}
    </ul>
  </div>
)}

                                    
                                    <div className="space-y-6">
                                      {section.questions.map((question, qIndex) => (
                                        <div 
                                          key={question.id} 
                                          className={`p-4 rounded-md ${
                                            question.correctAnswer === question.userAnswer 
                                              ? "bg-green-50 border border-green-200" 
                                              : "bg-red-50 border border-red-200"
                                          }`}
                                        >
                                          <h4 className="font-semibold mb-2">Question {qIndex + 1}: {question.text}</h4>
                                          
                                          <div className="ml-4 mb-2">
                                            <p className="font-medium mb-1">Options:</p>
                                            <ul className="list-disc list-inside space-y-1">
                                              {question.options.map((option, index) => (
                                                <li key={index} className="ml-2">{option}</li>
                                              ))}
                                            </ul>
                                          </div>
                                          
                                          <div className="ml-4 grid grid-cols-2 gap-4 mt-4">
                                            <div>
                                              <p className="font-medium">Correct Answer:</p>
                                              <p>{question.correctAnswer}</p>
                                            </div>
                                            <div>
                                              <p className="font-medium">Your Answer:</p>
                                              <p>{question.userAnswer}</p>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </AccordionContent>
                                </AccordionItem>
                              ))}
                            </Accordion>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center p-12 bg-gray-50 rounded-lg">
              <p className="text-xl text-gray-500">No assessment history available</p>
              <p className="mt-2 text-gray-400">Complete an assessment to see your results here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;