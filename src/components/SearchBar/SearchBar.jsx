import { useNavigate } from 'react-router-dom';
import { MdLogout } from 'react-icons/md'; // Import a logout icon

const SearchBar = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogout = () => {
    localStorage.clear(); // Clear all stored data
    navigate('/'); // Redirect to the landing page after logout
  };

  return (
    <div className='flex items-center justify-end w-full'>
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className='flex items-center px-3 py-2 bg-gray-700 text-white rounded transition-colors duration-200 hover:bg-gray-600 text-sm md:text-base lg:text-lg'
      >
        <MdLogout className='mr-2 text-lg' /> {/* Add the icon here */}
        Logout
      </button>
    </div>
  );
};

export default SearchBar;
