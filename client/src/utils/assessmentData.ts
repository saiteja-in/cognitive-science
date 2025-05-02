// assessment.ts

// 1. Updated Question interface to drop `correctAnswer` and add `marks` and optional `markingType`
export interface Question {
  id: string;
  type: "single-choice" | "multiple-choice" | "text";
  text: string;
  options?: string[];
  /** per‐option marks for choice questions */
  marks?: { [option: string]: number };
  image?: string;
  /** for open‐ended text questions, triggers emotion‐based scoring */
  markingType?: "emotionBased";
}

export interface Section {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

// 2. Emotion categorizer ported from the Python snippet
function categorizeResponse(response: string): Record<string, number> {
  const categories: Record<string, number> = {
    Positive: 0,
    Negative: 0,
    Happy: 0,
    Sad: 0,
    Emotional: 0,
    Romantic: 0,
    "Value-based": 0,
  };

  const positiveWords = ["success", "achieve", "dream", "hope", "determined", "overcome"];
  const negativeWords = ["failure", "struggle", "hardship", "problem", "robbery"];
  const happyWords = ["joy", "happiness", "celebrate", "reunion", "excited"];
  const sadWords = ["death", "loss", "tragedy", "cry", "sorrow"];
  const emotionalWords = ["tears", "heartfelt", "moving", "inspired", "pain"];
  const romanticWords = ["love", "affection", "relationship", "marriage"];
  const valueBasedWords = ["humility", "kindness", "hard work", "perseverance", "morals"];

  response
    .toLowerCase()
    .split(/\W+/)
    .forEach((word) => {
      if (positiveWords.includes(word)) categories.Positive++;
      if (negativeWords.includes(word)) categories.Negative++;
      if (happyWords.includes(word)) categories.Happy++;
      if (sadWords.includes(word)) categories.Sad++;
      if (emotionalWords.includes(word)) categories.Emotional++;
      if (romanticWords.includes(word)) categories.Romantic++;
      if (valueBasedWords.includes(word)) categories["Value-based"]++;
    });

  const total = Object.values(categories).reduce((a, b) => a + b, 0);
  if (total > 0) {
    for (const key in categories) {
      categories[key] = parseFloat(((categories[key] / total) * 100).toFixed(2));
    }
  }

  return categories;
}

// 3. The new assessment data with per‐option marks
export const assessmentSections: Section[] = [
  // SECTION 1: STORY WRITING (emotion‐based)
  {
    id: "section1",
    title: "Story Writing",
    description: "Creative writing based on visual prompts",
    questions: [
      {
        id: "q1",
        type: "text",
        text: `Prepare a story based on the below images and keywords. Write the moral of the story in a few sentences and title the scenario.
[Keywords: Ambition, doctor, financial problems, humility, professor, old woman, brother and three sisters, agriculture.]`,
        image: "./image1.png",
        markingType: "emotionBased",
      },
    ],
  },

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
          "Disappearing at one and appearing at the other?",
        ],
        image: "./image2.png",
        marks: {
          "The light is moving from one circle to another": 1,
          "Disappearing at one and appearing at the other?": 0.5,
        },
      },
      {
        id: "q3",
        type: "single-choice",
        text: "What do you think happens next from the image?",
        options: ["The tree gets hit by the lightning", "It is going to rain heavily"],
        image: "./image3.png",
        marks: {
          "The tree gets hit by the lightning": 1,
          "It is going to rain heavily": 0.5,
        },
      },
    ],
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
        text: "You have been reading the textbook multiple times to understand a concept, but you still find it difficult to grasp. What would you do next?",
        options: [
          "Switch to a different topic skipping the concept",
          "Keep reading the textbook and trying to understand",
          "Try a different method, such as watching explanatory videos or discussing with peers",
          "Memorize the definitions without understanding the concept for the exam.",
        ],
        marks: {
          "Switch to a different topic skipping the concept": 0.25,
          "Keep reading the textbook and trying to understand": 0.75,
          "Try a different method, such as watching explanatory videos or discussing with peers": 1,
          "Memorize the definitions without understanding the concept for the exam.": 0.5,
        },
      },
      {
        id: "q5",
        type: "single-choice",
        text: "During an exam, if you realize that you are spending too much time on one question. What would you do?",
        options: [
          "Skip the question and come back later if time allows",
          "Continue working on it until you solve it",
          "Guess the answer and move on without reviewing",
          "Leave the question unanswered and focus on easy ones",
        ],
        marks: {
          "Skip the question and come back later if time allows": 1,
          "Continue working on it until you solve it": 0.5,
          "Guess the answer and move on without reviewing": 0.5,
          "Leave the question unanswered and focus on easy ones": 0.25,
        },
      },
      {
        id: "q6",
        type: "single-choice",
        text: "After reading a detailed research article, you realize that you remember specific facts but struggle to explain the overall concept. What would you do to improve your understanding?",
        options: [
          "Re-read the article while summarizing key points and main ideas.",
          "Ignore comprehension gaps and move to a new topic.",
          "Memorize a few sentences though you don't clearly understand them.",
          "Assume you understand it and avoid reviewing.",
        ],
        marks: {
          "Re-read the article while summarizing key points and main ideas.": 1,
          "Ignore comprehension gaps and move to a new topic.": 0.25,
          "Memorize a few sentences though you don't clearly understand them.": 0.5,
          "Assume you understand it and avoid reviewing.": 0.25,
        },
      },
    ],
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
          "I would assemble it quickly and efficiently without referring to the manual often.",
        ],
        marks: {
          "I would struggle to understand the instructions and might not finish.": 0.25,
          "I would try but might assemble it incorrectly.": 0.5,
          "I would assemble it but might need help with some parts.": 0.75,
          "I would assemble it correctly with minimal issues.": 0.75,
          "I would assemble it quickly and efficiently without referring to the manual often.": 1,
        },
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
          "Speak confidently with a well-organized message and engage the audience.",
        ],
        marks: {
          "Get nervous and fail to express yourself clearly.": 0.25,
          "Struggle but manage to say a few sentences.": 0.5,
          "Speak with some confidence but with minor mistakes.": 0.75,
          "Deliver a structured speech with good flow.": 0.75,
          "Speak confidently with a well-organized message and engage the audience.": 1,
        },
      },
    ],
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
          "Excessive social media use impacts mental health by increasing anxiety, depression, and altering self-perception through unrealistic comparisons.",
        ],
        marks: {
          "It can affect emotions.": 0.25,
          "It sometimes causes anxiety and self-esteem issues.": 0.5,
          "It affects mental health by influencing self-image, stress, and social behavior.": 0.75,
          "Excessive social media use impacts mental health by increasing anxiety, depression, and altering self-perception through unrealistic comparisons.": 1,
        },
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
          "Time management enhances academic performance, prevents burnout, and ensures balanced personal and professional growth.",
        ],
        marks: {
          "The concept of time management is unclear to me": 0.1,
          "It helps in completing tasks": 0.25,
          "It allows better control over studies and deadlines.": 0.5,
          "It improves productivity, efficiency, and reduces stress.": 0.75,
          "Time management enhances academic performance, prevents burnout, and ensures balanced personal and professional growth.": 1,
        },
      },
      {
        id: "q11",
        type: "single-choice",
        text: "You are reading a research paper on renewable energy. To explain the topic accurately, what should you focus on first?",
        options: [
          "Understanding key definitions, principles, and terminology in renewable energy.",
          "Guessing the meaning of technical terms based on intuition.",
          "Skipping the definitions and focusing only on practical applications.",
          "Memorizing the names of scientists in the field without understanding their contributions.",
        ],
        marks: {
          "Understanding key definitions, principles, and terminology in renewable energy.": 1,
          "Guessing the meaning of technical terms based on intuition.": 0.75,
          "Skipping the definitions and focusing only on practical applications.": 0.5,
          "Memorizing the names of scientists in the field without understanding their contributions.": 0.25,
        },
      },
    ],
  },

  // SECTION 6: IQ-BASED QUESTIONS
  {
    id: "section6",
    title: "IQ-Based Questions",
    description: "Logical and numerical reasoning",
    questions: [
      {
        id: "q13",
        type: "single-choice",
        text: "What's next in sequence: 1, 3, 7, 15, 31, 63, ?",
        options: ["95", "127", "125", "121"],
        marks: {
          "95": 0,
          "127": 1,
          "125": 0,
          "121": 0,
        },
      },
      {
        id: "q14",
        type: "single-choice",
        text: "A scientist invents a time machine ... which must logically be true?",
        options: [
          "The scientist will still exist but in a parallel timeline.",
          "The scientist cannot exist, yet she does.",
          "The time machine will no longer function.",
          "The event is impossible and contradicts itself.",
        ],
        marks: {
          "The event is impossible and contradicts itself.": 1,
          "The scientist will still exist but in a parallel timeline.": 0,
          "The scientist cannot exist, yet she does.": 0,
          "The time machine will no longer function.": 0,
        },
      },
      {
        id: "q15",
        type: "single-choice",
        text: "What's the probability in the Monty Hall scenario?",
        options: ["1/2", "2/3", "1/3", "3/4"],
        marks: {
          "1/2": 0,
          "2/3": 1,
          "1/3": 0,
          "3/4": 0,
        },
      },
      {
        id: "q17",
        type: "single-choice",
        text: "Word pattern: MELT → MEET → MENT → MINT → ?",
        options: ["MIND", "MONT", "MOST", "MINX"],
        marks: {
          MIND: 1,
          MONT: 0,
          MOST: 0,
          MINX: 0,
        },
      },
    ],
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
        text: "You are playing a new strategy game ... What does this suggest?",
        options: [
          "You have developed an intuitive understanding of the game's patterns.",
          "You are following a strict rulebook without deviation.",
          "Your decisions are random and unrelated to past experiences",
          "You must explicitly study every rule before making any moves",
        ],
        marks: {
          "You have developed an intuitive understanding of the game's patterns.": 1,
          "You are following a strict rulebook without deviation.": 0.5,
          "Your decisions are random and unrelated to past experiences": 0.25,
          "You must explicitly study every rule before making any moves": 0.25,
        },
      },
      {
        id: "q19",
        type: "single-choice",
        text: "An experienced firefighter enters a burning building ... Why?",
        options: [
          "Unconscious pattern recognition from past experiences in similar situations.",
          "Following a step-by-step evacuation guide at that moment.",
          "Guessing randomly without any reasoning.",
          "Asking for instructions before making any decision.",
        ],
        marks: {
          "Unconscious pattern recognition from past experiences in similar situations.": 1,
          "Following a step-by-step evacuation guide at that moment.": 0.5,
          "Guessing randomly without any reasoning.": 0.25,
          "Asking for instructions before making any decision.": 0.25,
        },
      },
    ],
  },

  // SECTION 8: EMOTIONAL INTELLIGENCE
  {
    id: "section8",
    title: "Emotional Intelligence",
    description: "Social and emotional reasoning",
    questions: [
      {
        id: "q21",
        type: "single-choice",
        text: "What kind of person do you want to be?",
        options: ["Kind to loved ones", "Authentic with principles"],
        marks: {
          "Kind to loved ones": 0.5,
          "Authentic with principles": 1,
        },
      },
      {
        id: "q22",
        type: "single-choice",
        text: "Would you rather take the blame ... ?",
        options: ["Take blame", "Let friend take blame"],
        marks: {
          "Take blame": 1,
          "Let friend take blame": 0.25,
        },
      },
      {
        id: "q23",
        type: "single-choice",
        text: "Do you often double-check things ... ?",
        options: ["Yes", "No"],
        marks: {
          Yes: 1,
          No: 0.5,
        },
      },
      {
        id: "q24",
        type: "single-choice",
        text: "You overhear your best friend saying something negative ... What do you do?",
        options: [
          "Ignore the situation completely and hope the problem resolves on its own",
          "Cut off all communication with your friend, assuming they intentionally betrayed you",
          "Ask mutual friends about what happened instead of confronting your friend directly",
          "Calmly talk to your friend and express your feelings, seeking clarification",
          "Listen to their perspective first, then share your feelings and find a resolution together",
        ],
        marks: {
          "Ignore the situation completely and hope the problem resolves on its own": 1,
          "Cut off all communication with your friend, assuming they intentionally betrayed you": 0.75,
          "Ask mutual friends about what happened instead of confronting your friend directly": 0.5,
          "Calmly talk to your friend and express your feelings, seeking clarification": 0.25,
          "Listen to their perspective first, then share your feelings and find a resolution together": 0.25,
        },
      },
    ],
  },

  // SECTION 9: CREATIVE THINKING
  {
    id: "section9",
    title: "Creative Thinking",
    description: "Innovative problem solving",
    questions: [
      {
        id: "q26",
        type: "single-choice",
        text: "You are cooking a recipe but missing a key ingredient. What do you do?",
        options: [
          "Find a substitute ingredient that serves the same function.",
          "Throw away the dish and start over.",
          "Refuse to continue cooking and order food instead.",
          "Ignore the missing ingredient and risk ruining the dish.",
        ],
        marks: {
          "Find a substitute ingredient that serves the same function.": 1,
          "Throw away the dish and start over.": 0.5,
          "Refuse to continue cooking and order food instead.": 0.25,
          "Ignore the missing ingredient and risk ruining the dish.": 0.75,
        },
      },
    ],
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
        text: "During a group project, two members strongly disagree. What is best?",
        options: [
          "Encourage discussion to find a compromise that benefits the project.",
          "Ignore the conflict and continue working separately.",
          "Let one person make the decision without input from others.",
          "Avoid discussing the issue and hope it resolves itself.",
        ],
        marks: {
          "Encourage discussion to find a compromise that benefits the project.": 1,
          "Ignore the conflict and continue working separately.": 0.5,
          "Let one person make the decision without input from others.": 0.5,
          "Avoid discussing the issue and hope it resolves itself.": 0.25,
        },
      },
      {
        id: "q28",
        type: "single-choice",
        text: "Your team is assigned a complex task. Best way to improve efficiency?",
        options: [
          "Divide tasks based on each member’s strengths and skills.",
          "Let one person do all the work while others watch.",
          "Have everyone work on the same part of the task at the same time.",
          "Ignore task planning and complete the work randomly.",
        ],
        marks: {
          "Divide tasks based on each member’s strengths and skills.": 1,
          "Let one person do all the work while others watch.": 0.25,
          "Have everyone work on the same part of the task at the same time.": 0.5,
          "Ignore task planning and complete the work randomly.": 0.25,
        },
      },
      {
        id: "q29",
        type: "single-choice",
        text: "A key member becomes unavailable. Best approach?",
        options: [
          "Reassign their responsibilities among the remaining team members.",
          "Pause the entire project until they return.",
          "Leave their tasks unfinished and ignore the missing work.",
          "Continue working without adjusting the plan.",
        ],
        marks: {
          "Reassign their responsibilities among the remaining team members.": 1,
          "Pause the entire project until they return.": 0.25,
          "Leave their tasks unfinished and ignore the missing work.": 0.25,
          "Continue working without adjusting the plan.": 0.5,
        },
      },
    ],
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
        text: "A technical issue delays your team project. Best approach?",
        options: [
          "Quickly identify an alternative method or tool to complete the task.",
          "Wait for someone else to fix the issue instead of adjusting.",
          "Continue using the same method, even if it's not working.",
          "Abandon the project and start a completely unrelated task.",
        ],
        marks: {
          "Quickly identify an alternative method or tool to complete the task.": 1,
          "Wait for someone else to fix the issue instead of adjusting.": 0.25,
          "Continue using the same method, even if it's not working.": 0.5,
          "Abandon the project and start a completely unrelated task.": 0.25,
        },
      },
      {
        id: "q31",
        type: "single-choice",
        text: "The projector stops working just before your presentation. Best response?",
        options: [
          "Adjust by explaining key points verbally without relying on slides.",
          "Cancel the presentation and reschedule for another day.",
          "Panic and refuse to present without slides.",
          "Show the slides on your laptop, but do not explain them.",
        ],
        marks: {
          "Adjust by explaining key points verbally without relying on slides.": 1,
          "Cancel the presentation and reschedule for another day.": 0.25,
          "Panic and refuse to present without slides.": 0.25,
          "Show the slides on your laptop, but do not explain them.": 0.5,
        },
      },
    ],
  },
];

// 4. New scoring function
export const calculateDetailedScores = (
  answers: Record<string, string | string[]>
) => {
  const sectionResults = assessmentSections.map((section) => {
    let sectionScore = 0;
    let sectionMax = 0;

    section.questions.forEach((q) => {
      // For choice questions, max = highest marks in mapping
      if (q.marks) {
        const maxMark = Math.max(...Object.values(q.marks));
        sectionMax += maxMark;
        const ans = answers[q.id];
        if (typeof ans === "string") {
          sectionScore += q.marks[ans] ?? 0;
        }
      }
      // For text (emotionBased), we simply normalize to 1 mark
      else if (q.type === "text" && q.markingType === "emotionBased") {
        sectionMax += 1;
        // (you could choose to award a partial score here;
        //  for now we just run the categorizer)
        const resp = typeof answers[q.id] === "string" ? (answers[q.id] as string) : "";
        const emotions = categorizeResponse(resp);
        // attach to results if you want per‐question detail...
        // but award 0 for now (or 1 for any response)
      }
    });

    const pct = sectionMax > 0 ? Math.round((sectionScore / sectionMax) * 100) : 0;
    return {
      sectionId: section.id,
      sectionTitle: section.title,
      total: sectionMax,
      score: sectionScore,
      percentage: pct,
    };
  });

  const totalScore = sectionResults.reduce((sum, s) => sum + s.score, 0);
  const totalMax = sectionResults.reduce((sum, s) => sum + s.total, 0);
  const overallPct = totalMax > 0 ? Math.round((totalScore / totalMax) * 100) : 0;

  return {
    score: totalScore,
    totalQuestions: totalMax,
    percentage: overallPct,
    sectionResults,
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