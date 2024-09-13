import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  // Java
  {
    question: 'What is the default value of a boolean variable in Java?',
    options: {
      A: 'true',
      B: 'false',
      C: 'null',
      D: '0',
    },
    answer: 'B',
  },
  {
    question: 'Which keyword is used to create a new object in Java?',
    options: {
      A: 'create',
      B: 'new',
      C: 'instantiate',
      D: 'object',
    },
    answer: 'B',
  },
  {
    question: 'What is the access level of a private member in a Java class?',
    options: {
      A: 'Accessible within the same class only',
      B: 'Accessible within the same package',
      C: 'Accessible in subclasses only',
      D: 'Accessible anywhere in the application',
    },
    answer: 'A',
  },

  // QBasic
  {
    question: 'Which QBasic statement is used to display output on the screen?',
    options: {
      A: 'PRINT',
      B: 'DISPLAY',
      C: 'SHOW',
      D: 'OUTPUT',
    },
    answer: 'A',
  },
  {
    question: 'How do you define a variable in QBasic?',
    options: {
      A: 'VAR variableName',
      B: 'variableName = value',
      C: 'DIM variableName AS dataType',
      D: 'LET variableName = value',
    },
    answer: 'D',
  },
  {
    question: 'Which QBasic keyword is used to terminate a loop?',
    options: {
      A: 'END',
      B: 'EXIT',
      C: 'STOP',
      D: 'BREAK',
    },
    answer: 'B',
  },

  // Visual Basic
  {
    question:
      'In Visual Basic, which control is used to create a button on a form?',
    options: {
      A: 'Button',
      B: 'Click',
      C: 'CommandButton',
      D: 'ActionButton',
    },
    answer: 'C',
  },
  {
    question: 'What is the purpose of the `Dim` keyword in Visual Basic?',
    options: {
      A: 'Define a procedure',
      B: 'Declare a variable',
      C: 'Create a form',
      D: 'Specify a data type',
    },
    answer: 'B',
  },
  {
    question:
      'Which event is triggered when a button is clicked in Visual Basic?',
    options: {
      A: 'Click',
      B: 'Change',
      C: 'Load',
      D: 'Submit',
    },
    answer: 'A',
  },
  {
    question: 'How do you create a new instance of a class in Visual Basic?',
    options: {
      A: 'Create New Class()',
      B: 'New Class()',
      C: 'Dim obj As New Class',
      D: 'Instantiate Class()',
    },
    answer: 'C',
  },
  {
    question: 'What does the `End` statement do in Visual Basic?',
    options: {
      A: 'Ends the program execution',
      B: 'Ends a loop',
      C: 'Ends a procedure',
      D: 'Ends a variable declaration',
    },
    answer: 'A',
  },
  {
    question: 'Which keyword is used to handle errors in Visual Basic?',
    options: {
      A: 'ERROR',
      B: 'TRY',
      C: 'CATCH',
      D: 'ON ERROR',
    },
    answer: 'D',
  },
  {
    question: 'In Java, which of the following is not a valid data type?',
    options: {
      A: 'int',
      B: 'char',
      C: 'boolean',
      D: 'text',
    },
    answer: 'D',
  },
];

const Quiz = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(60);
  const [showSubmit, setShowSubmit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (quizStarted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }

    if (timeLeft === 0) {
      if (currentQuestionIndex === questions.length - 1) {
        handleSubmit();
      } else {
        handleNextQuestion();
      }
    }
  }, [timeLeft, quizStarted, currentQuestionIndex]);

  const handleStartQuiz = () => {
    if (questions.length > 0) {
      // Ensure there are questions to display
      setQuizStarted(true);
      setTimeLeft(60);
      setShowSubmit(questions.length === 1); // Show submit button if there's only one question
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setTimeLeft(60);
      setShowSubmit(currentQuestionIndex === questions.length - 2);
    }
  };

  const handleSubmit = () => {
    const correctAnswers = questions.reduce((total, question) => {
      return (
        total + (selectedAnswers[question.question] === question.answer ? 1 : 0)
      );
    }, 0);
    navigate('/result', {
      state: {
        score: correctAnswers,
        totalQuestions: questions.length,
        answers: selectedAnswers,
      },
    });
  };

  const handleOptionChange = key => {
    if (questions[currentQuestionIndex]) {
      setSelectedAnswers(prev => ({
        ...prev,
        [questions[currentQuestionIndex].question]: key,
      }));
    }
  };

  const question = questions[currentQuestionIndex];
  const correctAnswer = question ? question.answer : null;
  const selectedAnswer = selectedAnswers[question?.question];

  if (!quizStarted) {
    return (
      <div className='flex justify-center items-center min-h-screen bg-gray-100'>
        <div className='w-full max-w-4xl p-6 bg-white shadow-md rounded-lg text-center'>
          <h1 className='text-3xl font-bold mb-6'>Welcome to the Quiz</h1>
          <p className='text-lg mb-4'>
            This quiz contains {questions.length} questions. Each question is
            timed with a 1-minute limit. Make sure to select your answer before
            the timer runs out!
          </p>
          <p className='text-lg mb-4'>
            Once you answer all the questions, you can submit the quiz. If you
            don’t submit, the quiz will automatically be submitted after the
            final question.
          </p>
          <button
            onClick={handleStartQuiz}
            className='bg-green-500 text-white py-3 px-8 rounded-lg font-semibold hover:bg-green-600 transition-all'
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  if (!question) {
    return <div>Loading...</div>; // or any loading state you prefer
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-4xl p-6 bg-white shadow-md rounded-lg'>
        <h1 className='text-2xl font-bold mb-4'>{question.question}</h1>
        <div className='mb-4'>
          {Object.entries(question.options).map(([key, value]) => {
            const isDisabled =
              selectedAnswer !== undefined && selectedAnswer !== key;
            let borderColor = '';
            if (selectedAnswer) {
              if (key === correctAnswer) {
                borderColor = 'border-green-500';
              } else if (key === selectedAnswer) {
                borderColor = 'border-red-500';
              }
            }

            return (
              <div
                key={key}
                className={`flex items-center mb-2 border-2 ${borderColor}`}
              >
                <button
                  onClick={() => handleOptionChange(key)}
                  disabled={isDisabled}
                  className='flex-1 text-lg py-2 px-4 text-left'
                >
                  {`${key}: ${value}`}
                </button>
              </div>
            );
          })}
        </div>
        <div className='flex justify-between items-center mb-4'>
          <span className='text-lg'>Time Left: {timeLeft}s</span>
          <span className='text-lg'>
            Questions Left: {questions.length - currentQuestionIndex - 1}
          </span>
        </div>
        <div className='flex justify-end'>
          {showSubmit ? (
            <button
              onClick={handleSubmit}
              className='bg-blue-500 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-600 transition-all'
            >
              Submit
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className='bg-blue-500 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-600 transition-all'
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
