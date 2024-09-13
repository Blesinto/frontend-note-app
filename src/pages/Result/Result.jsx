import { useLocation, useNavigate } from 'react-router-dom';

const Result = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Destructure values from state
  const { score, totalQuestions } = state || { score: 0, totalQuestions: 0 };

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
      <div className='w-full max-w-4xl p-6 bg-white shadow-md rounded-lg text-center'>
        <h1 className='text-3xl font-bold mb-6'>Quiz Results</h1>
        <p className='text-lg mb-4'>
          You answered {score} out of {totalQuestions} questions correctly.
        </p>
        <button
          onClick={() => navigate('/student-dashboard')}
          className='bg-blue-500 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-600 transition-all'
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Result;
