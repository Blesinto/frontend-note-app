import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import PasswordInput from '../../components/input/PasswordInput';
import { useState } from 'react';
import { validateEmail } from '../../utils/helper';
import axiosinstance from '../../utils/axiosinstance';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async e => {
    e.preventDefault();

    // Input validation
    if (!validateEmail(email)) {
      setError('Please enter a valid email address...');
      return;
    }
    if (!password) {
      setError('Please enter your password');
      return;
    }
    setError('');

    try {
      // Make a login request to the backend
      const response = await axiosinstance.post('/login', {
        email,
        password,
      });

      // If login is successful, store the token and role in localStorage
      if (response.data && response.data.role) {
        // Store role in localStorage
        localStorage.setItem('role', response.data.role);

        // Check role and navigate accordingly
        if (response.data.role === 'admin') {
          console.log(response.data.role);
          // window.location.pathname = '/admin-dashboard';
          navigate('/admin-dashboard');
        } else if (response.data.role === 'student') {
          console.log(response.data.role);
          navigate('/student-dashboard');
          // window.location.pathname = '/student-dashboard';
        } else {
          console.error('Invalid role. Navigation not allowed.');
        }
      } else {
        console.error('Role not provided. Navigation failed.');
      }
    } catch (error) {
      // Handle login errors
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center mt-28'>
        <div className='w-96 border rounded bg-white px-7 py-10'>
          <form onSubmit={handleLogin}>
            <h4 className='text-2xl mb-7 text-center'>LOGIN</h4>
            <input
              type='text'
              placeholder='Email'
              className='input-box'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <PasswordInput
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            {/* Display error messages if any */}
            {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

            {/* Submit Button */}
            <button type='submit' className='btn-primary'>
              Login
            </button>

            {/* Redirect to signup page */}
            <p className='text-sm text-center mt-4'>
              Don't have an account?
              <Link
                to='/signup'
                className='font-medium text-gray-800 cursor-pointer'
              >
                Create one
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
