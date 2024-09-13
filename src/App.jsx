import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import axios from 'axios';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import LandingPage from './pages/landing/LandingPage';
import NoteDetail from './components/NoteDetail/NoteDetail';
import Loading from './components/Loading/Loading.jsx';
import StudentDashboard from './pages/Student/StudentDashboard.jsx';
import Home from './pages/Home/Home.jsx';
import Quiz from './pages/Quiz/Quiz.jsx';
import Result from './pages/Result/Result.jsx';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false); // For page transition loading
  const [userRole, setUserRole] = useState(null);

  const location = useLocation(); // Hook to get the current location

  // Fetch user role on component mount
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.get('/api/role', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUserRole(response.data.role);
      } catch (error) {
        console.error('Failed to fetch user role:', error);
        setUserRole(null); // Set role to null if there's an error
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  // Show loading animation when navigating between pages
  useEffect(() => {
    setPageLoading(true); // Start loading animation on route change

    const handleRouteChange = () => {
      setTimeout(() => {
        setPageLoading(false); // Stop loading animation after content loads
      }, 500); // Adjust this delay as necessary
    };

    handleRouteChange(); // Call the handler function when location changes

    return () => clearTimeout(handleRouteChange);
  }, [location]);

  if (loading) {
    return <Loading />; // Initial loading when fetching user role
  }

  return (
    <>
      {pageLoading && <Loading />} {/* Display loading animation on route change */}
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/student-dashboard' element={<StudentDashboard />} />
        <Route path='/admin-dashboard' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/quiz' element={<Quiz />} />
        <Route path='/result' element={<Result />} />
        <Route path='/note/:id' element={<NoteDetail />} />
        {/* Redirect any unknown routes to landing page */}
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </>
  );
};

// Wrap the App in the Router
const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
