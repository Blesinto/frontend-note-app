import Navbar from '../../components/Navbar/Navbar';
import PasswordInput from '../../components/input/PasswordInput';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import axiosinstance from '../../utils/axiosinstance';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [registrationType, setRegistrationType] = useState('student'); // Default role is student
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(''); // Add success message state

  const navigate = useNavigate();

  const handleSignup = async e => {
    e.preventDefault();

    // Validate input fields
    if (!validateEmail(email)) {
      setError('Please enter a valid email address...');
      return;
    }
    if (!password) {
      setError('Please enter your password');
      return;
    }
    if (!name) {
      setError('Please enter your name');
      return;
    }
    setError('');
    setSuccessMessage(''); // Clear previous success messages

    try {
      // Make a request to create a new account
      const response = await axiosinstance.post('/create-account', {
        fullName: name,
        email: email,
        password: password,
        registrationType: registrationType, // Pass registrationType to backend
      });

      // If the account is created successfully
      if (response.data && response.data.accessToken) {
        // Save token and role in localStorage correctly
        localStorage.setItem('token', response.data.accessToken);
        localStorage.setItem('role', response.data.user.role); // Access role from the response

        // Set success message
        setSuccessMessage(
          `Account created successfully! You are registered as a ${response.data.user.role}.`
        );

        // Redirect to login or dashboard based on role after a delay
        setTimeout(() => {
          if (response.data.user.role === 'admin') {
            navigate('/admin-dashboard');
          } else if (response.data.user.role === 'student') {
            navigate('/student-dashboard');
          }
        }, 2000); // Delay for 2 seconds to show success message
      }
    } catch (error) {
      // Handle error from the server
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError('An unexpected error occurred, please try again');
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className='flex items-center justify-center mt-28'>
        <div className='w-96 border rounded bg-white px-7 py-10'>
          <form onSubmit={handleSignup}>
            <h4 className='text-2xl mb-7 text-center'>CREATE ACCOUNT</h4>
            <input
              type='text'
              placeholder='Username'
              className='input-box'
              value={name}
              onChange={e => setName(e.target.value)}
            />
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
            {/* Role Selection */}
            {/* <select
              value={registrationType}
              onChange={e => setRegistrationType(e.target.value)}
              className='input-box'
            >
              <option value='student'>Student</option>
              <option value='admin'>Admin</option>
            </select> */}

            {/* Display success message if any */}
            {successMessage && (
              <p className='text-green-500 text-xs pb-1'>{successMessage}</p>
            )}

            {/* Display error messages if any */}
            {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

            {/* Submit Button */}
            <button type='submit' className='btn-primary'>
              Create Account
            </button>

            {/* Redirect to login page */}
            <p className='text-sm text-center mt-4'>
              Already have an account?
              <Link to='/login' className='font-medium text-primary underline'>
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
