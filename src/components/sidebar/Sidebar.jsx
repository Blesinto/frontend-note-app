import { FaHome, FaUser, FaCog, FaComments } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const menuItems = [
    { name: 'Home', icon: <FaHome /> },
    { name: 'Profile', icon: <FaUser /> },
    { name: 'Chat', icon: <FaComments /> },
    { name: 'Settings', icon: <FaCog /> },
  ];

  return (
    <div className=' flex flex-col justify-between h-full p-6 bg-gray-800 text-white'>
    <div>
    <h2 className='text-xl font-bold mb-6'>Dashboard</h2>
      <ul>
        {menuItems.map((item) => (
          <li key={item.name} className='flex items-center mb-4'>
            <div className='flex items-center text-white hover:text-gray-400 transition-colors cursor-pointer'>
              <span className='mr-3'>{item.icon}</span>
              <span>{item.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
      <div className='mt-6'>
        <button className='px-4 py-2 bg-gray-700 text-white rounded'>
          <Link to='/login' className='text-sm font-medium'>
            ADMIN LOGIN
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
