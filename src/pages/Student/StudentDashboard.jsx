import Layout from '../../components/Layout/Layout';
import Navbar from '../../components/Navbar/Navbar';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in and has the student role
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token && role === 'student') {
      setIsLoggedIn(true);
    } else {
      // Redirect to login if not logged in or role is not 'student'
      navigate('/student-dashboard');
    }
  }, [navigate]);

  return (
    <div className='h-screen flex flex-col'>
      {/* Navbar */}
      <div className='fixed top-0 left-0 right-0 z-50'>
        <Navbar />
      </div>

      {/* Main Content */}
      <div className='flex flex-1 pt-[4rem] overflow-auto'>
        <div className='flex-1 overflow-y-auto'>
          <Layout isLoggedIn={isLoggedIn} />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
