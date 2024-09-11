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

    if (!validateEmail(email)) {
      setError('Please enter a valid email address...');
      return;
    }
    if (!password) {
      setError('Please enter your password');
      return;
    }
    setError('');
    // login api call
    try {
      const response = await axiosinstance.post('/login', {
        email: email,
        password: password,
      });
      if (response.data && response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken);
        navigate('/dashboard');
      }
    } catch (error) {
      // handdle error
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError('An unexpected error occured please try again');
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center mt-28'>
        <div className='w-96 border  rounded bg-white px-7 py-10'>
          <form onSubmit={handleLogin}>
            <h4 className='text-2xl mb-7 text-center '>ADMIN LOGIN</h4>
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

            {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
            <button type='submit' className='btn-primary'>
              Login
            </button>
            <p className='text-sm text-center mt-4'>
              <Link
                to='/signup'
                className='font-medium
              text-gray-800  '
              >
                ADD ADMIN
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
