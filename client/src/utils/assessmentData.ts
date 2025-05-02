export interface Question {
  id: string;
  type: "multiple-choice" | "single-choice" | "text";
  text: string;
  options?: string[];
  correctAnswer: string | string[];
  image?:string;
}

export interface Section {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export const assessmentSections: Section[] = [
  // SECTION 1: STORY WRITING
 

  // SECTION 2: GESTALT's SECTION
  {
    id: "section2",
    title: "Gestalt's Section",
    description: "Perceptual organization questions",
    questions: [
      {
        id: "q2",
        type: "single-choice",
        text: "When you see a traffic signal board, what do you feel like is happening?",
        options: [
          "The light is moving from one circle to another",
          "Disappearing at one and appearing at the other?"
        ],
        image:"./image2.png",
        correctAnswer: "The light is moving from one circle to another"
      },
      {
        id: "q3",
        type: "single-choice",
        text: "What do you think happens next from the image?",
        options: [
          "The tree gets hit by the lightning",
          "It is going to rain heavily"
        ],
        image:"./image3.png",
        correctAnswer: "The tree gets hit by the lightning"
      }
    ]
  },

  // SECTION 3: META-COGNITIVE
  {
    id: "section3",
    title: "Meta-Cognitive Section",
    description: "Self-regulated learning strategies",
    questions: [
      {
        id: "q4",
        type: "single-choice",
        text: "You have been reading the textbook multiple times to understand a concept, but you still find it difficult to grasp. What would you do next? ",
        options: [
          "Switch to a different topic skipping the concept",
          "Keep reading the textbook and trying to understand",
          "Try a different method, such as watching explanatory videos or discussing with peers",
          "Memorize the definitions without understanding the concept for the exam."
        ],
        correctAnswer: "Try a different method, such as watching explanatory videos or discussing with peers"
      },
      {
        id: "q5",
        type: "single-choice",
        text: "During an exam, if you realize that you are spending too much time on one question. What would you do ?",
        options: [
          "Skip the question and come back later if time allows",
          "Continue working on it until you solve it",
          "Guess the answer and move on without reviewing",
          "Leave the question unanswered and focus on easy ones"
        ],
        correctAnswer: "Skip the question and come back later if time allows"
      },
      {
        id: "q6",
        type: "single-choice",
        text: "After reading a detailed research article, you realizes that you remember specific facts but struggle to explain the overall concept. What would you do to improve your understanding ?",
        options: [
          "Re-read the article while summarizing key points and main ideas.",
          "Ignore comprehension gaps and move to a new topic.",
          "Memorize a few sentences though you don't clearly understand them.",
          "Assume you understand it and avoid reviewing."
        ],
        correctAnswer: "Re-read the article while summarizing key points and main ideas."
      }
    ]
  },

  // SECTION 4: PROCEDURAL
  {
    id: "section4",
    title: "Procedural Knowledge",
    description: "Practical application skills",
    questions: [
      {
        id: "q7",
        type: "single-choice",
        text: "You are assembling a piece of furniture using an instruction manual. How confident are you in completing the task?",
        options: [
          "I would struggle to understand the instructions and might not finish.",
          "I would try but might assemble it incorrectly.",
          "I would assemble it but might need help with some parts.",
          "I would assemble it correctly with minimal issues.",
          "I would assemble it quickly and efficiently without referring to the manual often."
        ],
        correctAnswer: "I would assemble it quickly and efficiently without referring to the manual often."
      },
      {
        id: "q8",
        type: "single-choice",
        text: "You are asked to give an impromptu speech in front of a group. How do you handle it?",
        options: [
          "Get nervous and fail to express yourself clearly.",
          "Struggle but manage to say a few sentences.",
          "Speak with some confidence but with minor mistakes.",
          "Deliver a structured speech with good flow.",
          "Speak confidently with a well-organized message and engage the audience."
        ],
        correctAnswer: "Speak confidently with a well-organized message and engage the audience."
      }
    ]
  },

  // SECTION 5: DECLARATIVE
  {
    id: "section5",
    title: "Declarative Knowledge",
    description: "Factual knowledge assessment",
    questions: [
      {
        id: "q9",
        type: "single-choice",
        text: "How do you think social media can influence your mental health?",
        options: [
          "It can affect emotions.",
          "It sometimes causes anxiety and self-esteem issues.",
          "It affects mental health by influencing self-image, stress, and social behavior.",
          "Excessive social media use impacts mental health by increasing anxiety, depression, and altering self-perception through unrealistic comparisons."
        ],
        correctAnswer: "Excessive social media use impacts mental health by increasing anxiety, depression, and altering self-perception through unrealistic comparisons."
      },
      {
        id: "q10",
        type: "single-choice",
        text: "Why is time management important for students?",
        options: [
          "The concept of time management is unclear to me",
          "It helps in completing tasks",
          "It allows better control over studies and deadlines.",
          "It improves productivity, efficiency, and reduces stress.",
          "Time management enhances academic performance, prevents burnout, and ensures balanced personal and professional growth."
        ],
        correctAnswer: "Time management enhances academic performance, prevents burnout, and ensures balanced personal and professional growth."
      },
      {
        id: "q11",
        type: "single-choice",
        text: "You are reading a research paper on renewable energy. To explain the topic accurately, what should you focus on first?",
        options: [
          "Understanding key definitions, principles, and terminology in renewable energy.",
          "Guessing the meaning of technical terms based on intuition.",
          "Skipping the definitions and focusing only on practical applications.",
          "Memorizing the names of scientists in the field without understanding their contributions."
        ],
        correctAnswer: "Understanding key definitions, principles, and terminology in renewable energy."
      }
    ]
  },

  // SECTION 6: IQ-BASED
  {
    id: "section6",
    title: "IQ-Based Questions",
    description: "Logical and numerical reasoning",
    questions: [
      {
        id: "q13",
        type: "single-choice",
        text: "What's next in sequence: 1, 3, 7, 15, 31, 63, ?",
        options: [
          "95",
          "127",
          "125",
          "121"
        ],
        correctAnswer: "127"
      },
      {
        id: "q14",
        type: "single-choice",
        text: "A scientist invents a time machine. She travels 30 years into the past and accidentally prevents her parents from ever meeting. If this happened, which of the following must logically be true?",
        options: [
          "The scientist will still exist but in a parallel timeline.",
          "The scientist cannot exist, yet she does.",
          "The time machine will no longer function.",
          "The event is impossible and contradicts itself."
        ],
        correctAnswer: "The event is impossible and contradicts itself."
      },
      {
        id: "q15",
        type: "single-choice",
        text: "A room has three identical doors. Behind one is a deadly trap, and behind the other is a treasure. A robot randomly picks one before you enter. However, after you choose a door, the robot opens the other door and shows its empty. What is the probability that the remaining door contains the treasure?",
        options: [
          "1/2",
          "2/3",
          "1/3",
          "3/4"
        ],
        correctAnswer: "2/3"
      },
      
      {
        id: "q17",
        type: "single-choice",
        text: "Word pattern: MELT → MEET → MENT → MINT → ?",
        options: [
          "MIND",
          "MONT",
          "MOST",
          "MINX"
        ],
        correctAnswer: "MIND"
      }
    ]
  },

  // SECTION 7: IMPLICIT KNOWLEDGE
  {
    id: "section7",
    title: "Implicit Knowledge",
    description: "Unconscious competence assessment",
    questions: [
      {
        id: "q18",
        type: "single-choice",
        text: "You are playing a new strategy game for the first time. After a few rounds, you start making better moves without consciously analyzing each step. What does this suggest?",
        options: [
          "You have developed an intuitive understanding of the games patterns.",
          "You are following a strict rulebook without deviation.",
          "Your decisions are random and unrelated to past experiences",
          "You must explicitly study every rule before making any moves"
        ],
        correctAnswer: "You have developed an intuitive understanding of the games patterns."
      },
      {
        id: "q19",
        type: "single-choice",
        text: "An experienced firefighter enters a burning building and instantly senses that the floor is unstable, signaling everyone to evacuate. What is the most likely reason for this quick decision?",
        options: [
          "Unconscious pattern recognition from past experiences in similar situations.",
          "Following a step-by-step evacuation guide at that moment.",
          "Guessing randomly without any reasoning.",
          "Asking for instructions before making any decision."
        ],
        correctAnswer: "Unconscious pattern recognition from past experiences in similar situations."
      }
    ]
  },

  // SECTION 8: EMOTIONAL QUESTIONS
  {
    "id": "section8",
    "title": "Emotional Intelligence",
    "description": "Social and emotional reasoning",
    "questions": [
      
      {
        "id": "q21",
        "type": "single-choice",
        "text": "What kind of person do you want to be, someone who is kind and puts their loved ones before themselves, or a person who is authentic and sticks to his/her principles either good or bad?",
        "options": [
          "Kind to loved ones",
          "Authentic with principles"
        ],
        "correctAnswer": "Authentic with principles"
      },
      {
        "id": "q22",
        "type": "single-choice",
        "text": "Would you rather take the blame for a fault you're innocent of or would you let your best friend take the blame for a fault that you're guilty of?",
        "options": [
          "Take blame",
          "Let friend take blame"
        ],
        "correctAnswer": "Take blame"
      },
      {
        "id": "q23",
        "type": "single-choice",
        "text": "Do you often double-check things and worry if you did not check again whether you locked your car or closed the gas knob?",
        "options": [
          "Yes",
          "No"
        ],
        "correctAnswer": "Yes"
      },
      {
        "id": "q24",
        "type": "single-choice",
        "text": "You and your best friend have been inseparable for years. However, recently, you overheard them saying something negative about you to another friend. You feel deeply hurt and betrayed, but they seem unaware that you know about it. The situation has been bothering you, and your interactions have become awkward. What would you do in this scenario?",
        "options": [
          "Ignore the situation completely and hope the problem resolves on its own",
          "Cut off all communication with your friend , assuming they intentionally betrayed you",
          "Ask mutual friends about what happened instaed of confronting your friend directly",
          "Calmly talk to your friend and express your feelings, seeking clarification",
          "Listen to their perspective first,then share your feelings and find a resolution together"
        ],
        "correctAnswer": "Listen to their perspective first,then share your feelings and find a resolution together"
      }
    
    ]
  },
  


  // SECTION 9: CREATIVE QUESTIONS
  {
    id: "section9",
    title: "Creative Thinking",
    description: "Innovative problem solving",
    questions: [
      {
        id: "q26",
        type: "single-choice",
        text: "You are cooking a recipe, but you realize you are missing a key ingredient. What would you do?",
        options: [
          "Find a substitute ingredient that serves the same function.",
          "Throw away the dish and start over.",
          "Refuse to continue cooking and order food instead.",
          "Ignore the missing ingredient and risk ruining the dish."
        ],
        correctAnswer: "Find a substitute ingredient that serves the same function."
      }
    ]
  },

  // SECTION 10: SOCIAL KNOWLEDGE
  {
    id: "section10",
    title: "Social Knowledge",
    description: "Teamwork and collaboration",
    questions: [
      {
        id: "q27",
        type: "single-choice",
        text: "During a group project, two members strongly disagree on how to complete a task. What is the best way to resolve this?",
        options: [
          "Encourage discussion to find a compromise that benefits the project.",
          "Ignore the conflict and continue working separately.",
          "Let one person make the decision without input from others.",
          "Avoid discussing the issue and hope it resolves itself."
        ],
        correctAnswer: "Encourage discussion to find a compromise that benefits the project."
      },
      {
        id: "q28",
        type: "single-choice",
        text: "Your team is assigned a complex task with multiple steps. What is the best way to improve efficiency?",
        options: [
          "Divide tasks based on each member's strengths and skills.",
          "Let one person do all the work while others watch.",
          "Have everyone work on the same part of the task at the same time.",
          "Ignore task planning and complete the work randomly."
        ],
        correctAnswer: "Divide tasks based on each member's strengths and skills."
      },
      {
        id: "q29",
        type: "single-choice",
        text: "During a group assignment, a key member suddenly becomes unavailable. What is the best approach?",
        options: [
          "Reassign their responsibilities among the remaining team members.",
          "Pause the entire project until they return.",
          "Leave their tasks unfinished and ignore the missing work.",
          "Continue working without adjusting the plan."
        ],
        correctAnswer: "Reassign their responsibilities among the remaining team members."
      }
    ]
  },

  // SECTION 11: CONDITIONAL & ADAPTIVE
  {
    id: "section11",
    title: "Conditional and Adaptive Knowledge",
    description: "Problem-solving under constraints",
    questions: [
      {
        id: "q30",
        type: "single-choice",
        text: "You are working on a team project when a sudden technical issue delays progress. What is the best approach?",
        options: [
          "Quickly identify an alternative method or tool to complete the task.",
          "Wait for someone else to fix the issue instead of adjusting.",
          "Continue using the same method, even if its not working.",
          "Abandon the project and start a completely unrelated task."
        ],
        correctAnswer: "Quickly identify an alternative method or tool to complete the task."
      },
      {
        id: "q31",
        type: "single-choice",
        text: "You have prepared a presentation with slides, but just before the meeting, the projector stops working. What is the best response?",
        options: [
          "Adjust by explaining key points verbally without relying on slides.",
          "Cancel the presentation and reschedule for another day.",
          "Panic and refuse to present without slides.",
          "Show the slides on your laptop, but do not explain them."
        ],
        correctAnswer: "Adjust by explaining key points verbally without relying on slides."
      }
    ]
  },
  {
    id: "section1",
    title: "Story Writing",
    description: "Creative writing based on visual prompts",
    questions: [
      {
        id: "q1",
        image:"./image1.png",
        type: "text",
        text: "Prepare a story based on the below images, and keywords. Write the moral of the story in a few sentences and title the scenario? [Keywords: Ambition, doctor, financial problems, humility, professor, Old woman, Brother and three sisters, Agriculture.]",
        correctAnswer: "story writing"
      }
    ]
  },
];

// Calculate score based on answers
// export const calculateScore = (answers: { [key: string]: string | string[] }) => {
//   let score = 0;
//   let totalQuestions = 0;

//   // Flatten all questions
//   const allQuestions = assessmentSections.flatMap(section => section.questions);
//   totalQuestions = allQuestions.length;

//   // Compare answers with correct ones
//   allQuestions.forEach(question => {
//     const userAnswer = answers[question.id];
    
//     if (userAnswer) {
//       if (Array.isArray(question.correctAnswer) && Array.isArray(userAnswer)) {
//         // For multiple choice, check if arrays have the same elements
//         const correctSet = new Set(question.correctAnswer);
//         const userSet = new Set(userAnswer);
        
//         if (correctSet.size === userSet.size && 
//             [...correctSet].every(value => userSet.has(value))) {
//           score++;
//         }
//       } else if (!Array.isArray(question.correctAnswer) && !Array.isArray(userAnswer)) {
//         // For text or single choice
//         if (question.type === "text") {
//           // For text answers, check if the answer contains keywords
//           if (userAnswer.toLowerCase().includes(question.correctAnswer.toLowerCase())) {
//             score++;
//           }
//         } else if (userAnswer === question.correctAnswer) {
//           score++;
//         }
//       }
//     }
//   });

//   const percentage = Math.round((score / totalQuestions) * 100);
  
//   return { score, totalQuestions, percentage };
// };

// // Get recommendations based on score percentage
// export const getRecommendations = (percentage: number) => {
//   if (percentage >= 80) {
//     return {
//       message: "Excellent work! You have a strong understanding of the subject.",
//       suggestions: [
//         "Consider exploring more advanced topics",
//         "Try building complex projects to deepen your knowledge",
//         "Share your knowledge by teaching others"
//       ]
//     };
//   } else if (percentage >= 60) {
//     return {
//       message: "Good job! You have a solid grasp of most concepts.",
//       suggestions: [
//         "Review the areas where you made mistakes",
//         "Practice with hands-on projects to strengthen your understanding",
//         "Join communities to discuss and learn from others"
//       ]
//     };
//   } else if (percentage >= 40) {
//     return {
//       message: "You're on the right track, but there's room for improvement.",
//       suggestions: [
//         "Focus on strengthening fundamentals",
//         "Take your time with practical exercises",
//         "Consider revisiting learning materials"
//       ]
//     };
//   } else {
//     return {
//       message: "You should revisit the fundamentals of this subject.",
//       suggestions: [
//         "Start with basic concepts and build up gradually",
//         "Use interactive tutorials for better understanding",
//         "Practice regularly with simple projects",
//         "Consider finding a mentor for guidance"
//       ]
//     };
//   }
// };

// import { assessmentSections } from './assessmentSections';

export const calculateDetailedScores = (answers: { [key: string]: string | string[] }) => {
  const sectionResults = assessmentSections.map(section => {
    let sectionScore = 0;
    const questions = section.questions;

    questions.forEach(question => {
      const userAnswer = answers[question.id];

      if (userAnswer) {
        if (Array.isArray(question.correctAnswer) && Array.isArray(userAnswer)) {
          const correctSet = new Set(question.correctAnswer);
          const userSet = new Set(userAnswer);
          if (
            correctSet.size === userSet.size &&
            [...correctSet].every(value => userSet.has(value))
          ) {
            sectionScore++;
          }
        } else if (!Array.isArray(question.correctAnswer) && !Array.isArray(userAnswer)) {
          if (question.type === "text") {
            if ((userAnswer as string).toLowerCase().includes((question.correctAnswer as string).toLowerCase())) {
              sectionScore++;
            }
          } else if (userAnswer === question.correctAnswer) {
            sectionScore++;
          }
        }
      }
    });

    return {
      sectionId: section.id,
      sectionTitle: section.title,
      total: questions.length,
      score: sectionScore,
      percentage: Math.round((sectionScore / questions.length) * 100)
    };
  });

  const totalScore = sectionResults.reduce((acc, val) => acc + val.score, 0);
  const totalQuestions = sectionResults.reduce((acc, val) => acc + val.total, 0);
  const percentage = Math.round((totalScore / totalQuestions) * 100);

  return {
    score: totalScore,
    totalQuestions,
    percentage,
    sectionResults
  };
};

export const getSectionRecommendations = (
  sectionId: string,
  percentage: number
): string[] => {
  // only skip recommendations on a perfect score
  if (percentage === 60) return [];
  
  const map: { [key: string]: string[] } = {
    section1: [
      "Add more emotional depth or moral reflection to your story. Consider introducing realistic challenges or deeper emotional layers to balance your storytelling (<a href='https://greek.mythologyworldwide.com/the-role-of-myth-in-shaping-literary-themes-of-hope-and-despair/' target='_blank' style='color: #3b82f6; text-decoration: underline;'>Greek Mythology Worldwide</a>).",
      "Balance optimism or sadness with growth or perspective. For positive stories, reflect on moments of growth and resilience. For negative stories, focus on stories of resilience where challenges lead to personal growth.",
      "Read <a href='https://www.amazon.com/Talent-Code-Greatness-Born-Grown/dp/055380684X' target='_blank' style='color: #10b981; text-decoration: underline;'>The Talent Code by Daniel Coyle</a> to understand how great storytelling combines emotion and skill development.",
      "If your story is value-based, connect your values to real-world actions and engage in open discussions with different perspectives."
    ],
    section2: [
      "Practice visual puzzles and optical illusions to train pattern recognition. Try <a href='https://www.lumosity.com/' target='_blank' style='color: #8b5cf6; text-decoration: underline;'>Lumosity's visual training games</a>.",
      "Study Gestalt principles like figure-ground, proximity, closure, and continuity. Explore optical illusions at <a href='https://www.exploratorium.edu/explore/illusions' target='_blank' style='color: #ec4899; text-decoration: underline;'>Exploratorium</a>.",
      "Engage in spot-the-difference games and attention-based exercises to refine your perception and attention to detail.",
      "Reference: Wertheimer, M. (1923). Gestalt Theory of Perception explains how humans perceive patterns holistically."
    ],
    section3: [
      "Use concept maps, summarization, and self-explanation to reinforce learning (Dunlosky et al., 2013).",
      "Apply Pomodoro technique for better time management during study. Use <a href='https://www.forestapp.cc/' target='_blank' style='color: #059669; text-decoration: underline;'>Forest app</a> to stay focused.",
      "Improve study habits by watching video tutorials, discussing with peers, and practicing retrieval-based learning.",
      "Read <a href='https://www.amazon.com/Make-Stick-Science-Successful-Learning/dp/0674729013' target='_blank' style='color: #2563eb; text-decoration: underline;'>Make It Stick: The Science of Successful Learning</a>"
    ],
    section4: [
      "Engage in hands-on tasks like DIY projects to improve procedural understanding. Try <a href='https://www.diy.org/' target='_blank' style='color: #d946ef; text-decoration: underline;'>DIY.org challenges</a>.",
      "Practice impromptu speaking or storytelling for skill refinement. Take practical courses on <a href='https://www.skillshare.com/' target='_blank' style='color: #f59e0b; text-decoration: underline;'>Skillshare</a>.",
      "Learn by doing - actively perform tasks instead of just memorizing steps (Anderson, 1982).",
      "Develop public speaking skills through debates and experiential learning activities."
    ],
    section5: [
      "Use flashcards and mnemonics to improve factual recall. Try <a href='https://quizlet.com/' target='_blank' style='color: #6366f1; text-decoration: underline;'>Quizlet</a>.",
      "Explore academic topics deeply on <a href='https://www.coursera.org/' target='_blank' style='color: #14b8a6; text-decoration: underline;'>Coursera</a> and break concepts into parts (Ausubel, 1968).",
      "Strengthen conceptual understanding by analyzing how components relate to each other.",
      "Focus on meaningful learning over rote memorization for better retention."
    ],
    section6: [
      "Solve logical puzzles and practice sequences and numerical reasoning. Try <a href='https://www.mensa.org/public/mensa-iq-challenge' target='_blank' style='color: #7c3aed; text-decoration: underline;'>Mensa's free puzzles</a>.",
      "Explore probability with real-world scenarios like Monty Hall problem (Tversky & Kahneman, 1974).",
      "Play <a href='https://play.google.com/store/apps/details?id=jp.co.translimit.brainwars' target='_blank' style='color: #f97316; text-decoration: underline;'>Brain Wars</a> for real-time IQ challenges.",
      "Master basic probability, numerical series, and deductive reasoning to boost analytical thinking."
    ],
    section7: [
      "Play strategy games and simulate quick decision-making tasks. Try <a href='https://www.thinkfastapp.com/' target='_blank' style='color: #06b6d4; text-decoration: underline;'>Think Fast! app</a>.",
      "Observe and imitate expert strategies to develop intuition (Dreyfus & Dreyfus, 1986).",
      "Read <a href='https://www.amazon.com/Blink-Power-Thinking-Without/dp/0316010669' target='_blank' style='color: #8b5cf6; text-decoration: underline;'>Blink: The Power of Thinking Without Thinking by Malcolm Gladwell</a>.",
      "Engage in real-world scenario-based learning and reflect on outcomes to fine-tune intuition."
    ],
    section8: [
      "Practice empathy, journaling, and mindfulness to improve emotional awareness. Use <a href='https://www.getmoodfit.com/' target='_blank' style='color: #3b82f6; text-decoration: underline;'>Moodfit app</a>.",
      "Learn and apply conflict resolution strategies (Goleman, 1995).",
      "Read <a href='https://www.amazon.com/Emotional-Intelligence-Matter-More-Than/dp/055338371X' target='_blank' style='color: #10b981; text-decoration: underline;'>Emotional Intelligence by Daniel Goleman</a>.",
      "Develop emotional regulation through meditation and self-reflection exercises."
    ],
    section9: [
      "Use the SCAMPER method and brainstorming techniques for creative solutions. Try <a href='https://brainstormer.com/' target='_blank' style='color: #ec4899; text-decoration: underline;'>Brainstormer</a>.",
      "Engage in creative arts like storytelling or painting. Watch <a href='https://ed.ted.com/' target='_blank' style='color: #f59e0b; text-decoration: underline;'>TED-Ed creativity lessons</a>.",
      "Reference: Amabile, T. M. (1996) shows structured creativity exercises enhance problem-solving.",
      "Participate in artistic activities to enhance imagination and express ideas uniquely."
    ],
    section10: [
      "Work in teams and learn to manage group dynamics. Play <a href='https://keeptalkinggame.com/' target='_blank' style='color: #6366f1; text-decoration: underline;'>Keep Talking and Nobody Explodes</a>.",
      "Study leadership styles and conflict resolution methods. Take <a href='https://www.edx.org/course/harvardx-communicating-effectively' target='_blank' style='color: #14b8a6; text-decoration: underline;'>HarvardX communication course</a>.",
      "Understand team formation stages (Tuckman, 1965) - Forming, Storming, Norming, Performing.",
      "Practice active communication to navigate disagreements smoothly."
    ],
    section11: [
      "Use scenario simulations to improve decision-making flexibility. Try <a href='https://store.steampowered.com/app/221910/The_Stanley_Parable/' target='_blank' style='color: #7c3aed; text-decoration: underline;'>The Stanley Parable game</a>.",
      "Train yourself to adapt under pressure using <a href='https://mitsloan.mit.edu/LearningEdge/CaseDocs/Online' target='_blank' style='color: #f97316; text-decoration: underline;'>MIT Sloan's decision-making simulations</a>.",
      "Reference: Klein, G. (1998) shows adaptive expertise is built through real-world challenges.",
      "Develop self-regulation techniques to stay focused in unpredictable situations."
    ]
  };

  return map[sectionId] || [];
};

export const getOverallRecommendations = (percentage: number) => {
  if (percentage >= 80) {
    return {
      message: "Fantastic work! You have a strong understanding across multiple areas.",
      suggestions: [
        "Challenge yourself with research projects or leadership activities.",
        "Mentor peers or juniors to deepen your knowledge.",
        "Apply your knowledge in real-world contexts." 
      ]
    };
  } else if (percentage >= 50) {
    return {
      message: "Good effort! You have a solid base, but there's room for improvement.",
      suggestions: [
        "Focus on your lowest scoring sections for improvement.",
        "Practice through discussion, flashcards, and problem-solving.",
        "Reinforce concepts using real-world examples."
      ]
    };
  } else {
    return {
      message: "Reinforce the fundamentals to build your confidence.",
      suggestions: [
        "Start with core topics using interactive tutorials and learning apps.",
        "Engage in group learning or seek a mentor.",
        "Apply learning actively through small projects or journaling."
      ]
    };
  }
};



export const getSectionEndRecommendations = (percentage: number, sectionId: string) => {
  if (percentage === 60) {
    return "Well Done!!";
  }

  const recs = {
    "section1": "To improve visual thinking, practice pattern-based puzzles and learn Gestalt principles like closure and proximity.",
    "section2": "Enhance your learning by using strategies like summarizing and concept mapping, and manage time better with techniques like Pomodoro.",
    "section3": "Practice hands-on tasks and impromptu speaking to build confidence in applying what you know.",
    "section4": "Practice hands-on tasks and impromptu speaking to build confidence in applying what you know.",
    "section5": "Use flashcards and break down complex topics to strengthen your understanding of facts and concepts.",
    "section6": "Solve logic puzzles and number games regularly to sharpen your reasoning and decision-making skills.",
    "section7": "Trust your instincts more by playing strategic games and reflecting on decisions made through experience.",
    "section8": "Build emotional awareness through journaling and mindfulness, and improve conflict resolution with empathy and active listening.",
    "section9": "Boost your creativity by finding alternative solutions and trying artistic or imaginative activities.",
    "section10": "Improve teamwork by communicating openly and adapting your role in group settings when challenges arise.",
    "section11": "Practice flexible thinking by adapting to sudden changes and staying calm in unpredictable situations."
  };

  return recs[sectionId] || "No specific recommendations available for this section.";
}