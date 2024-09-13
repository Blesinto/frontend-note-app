import {
  FaHome,
  FaUser,
  FaChartBar,
  FaQuestionCircle,
  FaSignOutAlt,
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // Clear all other stored data
    navigate('/'); // Redirect to the landing page after logout
  };

  const menuItems = [
    { name: 'Home', icon: <FaHome />, path: '/' },
    { name: 'Profile', icon: <FaUser />, path: '/profile' },
    { name: 'Quiz', icon: <FaQuestionCircle />, path: '/quiz' },
    { name: 'Result', icon: <FaChartBar />, path: '/result' },
  ];

  return (
    <div className='flex flex-col justify-between h-full p-6 bg-gray-800 text-white'>
      <div>
        <h2 className='text-xl font-bold mb-6'>Dashboard</h2>
        <ul>
          {menuItems.map(item => (
            <li key={item.name} className='flex items-center mb-4'>
              <Link
                to={item.path}
                className='flex items-center text-white hover:text-gray-400 transition-colors'
              >
                <span className='mr-3'>{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className='mt-6'>
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className='px-4 py-2 bg-gray-700 text-white rounded flex items-center justify-center'
          >
            <FaSignOutAlt />
          </button>
        ) : (
          <Link
            to='/admin-login'
            className='px-4 py-2 bg-gray-700 text-white rounded flex items-center justify-center'
          >
            <FaSignOutAlt />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
