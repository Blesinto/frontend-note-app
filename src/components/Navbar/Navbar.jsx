import ProfileInfo from '../Cards/ProfileInfo';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import { useState } from 'react';

const Navbar = ({ userinfo, onsearchNote }) => {
  const [searchquery, setSearchquery] = useState('');

  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleSearch = () => {
    if (searchquery) {
      onsearchNote (searchquery);
    }
  };
  const onclearSearch = () => {
    setSearchquery('');
  };

  return (
    <div className='fixed top-0 left-0 right-0 bg-white flex items-center justify-between px-6 py-2 drop-shadow z-50'>
      <h2 className='text-xl font-medium text-black'>NOTES-APP</h2>
      <SearchBar
        value={searchquery}
        onchange={event => {
          setSearchquery(event.target.value);
        }}
        handleSearch={handleSearch}
        onclearSearch={onclearSearch}
      />
      <ProfileInfo userinfo={userinfo} onlogout={onLogout} />
    </div>
  );
};

export default Navbar;
