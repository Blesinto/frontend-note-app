import ProfileInfo from '../Cards/ProfileInfo';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import { useState } from 'react';

const Navbar = ({ userinfo, onSearchNote }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();

  // Logout function to clear storage and navigate to the landing page
  const onLogout = () => {
    localStorage.clear();
    navigate('/'); // Redirect to landing page after logout
  };

  // Handle search logic
  const handleSearch = () => {
    if (typeof onSearchNote === 'function') {
      onSearchNote(searchQuery); // Trigger search with the query
      console.log('Search query:', searchQuery);
    } else {
      console.error('onSearchNote is not a function');
    }
  };

  // Clear search input and reset search results
  const onClearSearch = () => {
    setSearchQuery(''); // Clear the search input
    if (typeof onSearchNote === 'function') {
      onSearchNote(''); // Reset the search results
    }
  };

  return (
    <div className='fixed top-0 left-0 right-0 bg-white flex items-center justify-between px-6 py-2 drop-shadow z-50'>
      <h2 className='text-xl font-medium text-black'>NOTES-APP</h2>

      <SearchBar
        value={searchQuery}
        onChange={event => setSearchQuery(event.target.value)}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />

      <ProfileInfo userinfo={userinfo} onLogout={onLogout} /> {/* Pass userinfo here */}
    </div>
  );
};

export default Navbar;
