import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import axiosinstance from '../../utils/axiosinstance';
import { MdMenu, MdArrowForward } from 'react-icons/md';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'; // Import loading spinner

const Layout = ({ isLoggedIn }) => {
  const [notes, setNotes] = useState([]); // State to store notes
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar toggle
  const [isLoading, setIsLoading] = useState(false); // State for loading animation
  const [searchQuery, setSearchQuery] = useState(''); // State for search input
  const sidebarRef = useRef(null); // Ref for detecting outside clicks on sidebar
  const navigate = useNavigate(); // Use navigate for programmatic navigation

  // Fetch all notes from the API
  const fetchNotes = async () => {
    try {
      const { data } = await axiosinstance.get('/get-all-notes');
      if (data?.notes) {
        setNotes(data.notes); // Set notes state if data is available
      }
    } catch (error) {
      console.error('Error fetching notes:', error); // Log any fetch errors
    }
  };

  // Fetch notes when component mounts
  useEffect(() => {
    fetchNotes();
  }, []);

  // Handle clicks outside the sidebar to close it
  useEffect(() => {
    const handleClickOutside = event => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // Cleanup event listener
    };
  }, [isSidebarOpen]);

  // Handle note click to navigate with loading animation
  const handleNoteClick = noteId => {
    setIsLoading(true); // Start loading animation
    setTimeout(() => {
      navigate(`/note/${noteId}`); // Navigate after delay for animation effect
    }, 1000);
  };

  // Filter notes based on search query
  const filteredNotes = notes.filter(
    note =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='relative flex h-full'>
      {/* Loading Overlay */}
      {isLoading && (
        <div className='absolute inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center'>
          <AiOutlineLoading3Quarters className='text-white text-6xl animate-spin' />
        </div>
      )}
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-primary text-white transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
      >
        <Sidebar isLoggedIn={isLoggedIn} /> {/* Render Sidebar */}
      </div>

      {/* Main Content */}
      <div className='flex-1 p-6 bg-gray-100 overflow-y-auto ml-0'>
        {/* Toggle Sidebar Button for Mobile */}
        <div className='md:hidden flex items-center mb-4'>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className='text-gray-800 focus:outline-none'
          >
            <MdMenu className='text-3xl' />
          </button>
        </div>
        <h1 className='text-2xl font-bold mb-6'>Hello, welcome</h1>

        {/* Search Input */}
        <input
          type='text'
          placeholder='Search notes...'
          className='mb-6 p-2 border border-gray-300 rounded transition-all duration-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none w-full md:w-80'
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)} // Update search query state
        />

        {/* Notes List */}
        <div className='notes-list grid sm:grid-cols-2 md:grid-cols-3 gap-4'>
          {filteredNotes.map(note => (
            <div
              key={note._id}
              className='relative bg-white px-6 py-4 shadow rounded-md hover:bg-gray-800 hover:text-white cursor-pointer transition-all'
              onClick={() => handleNoteClick(note._id)} // Handle click to navigate
            >
              <h2 className='text-lg font-semibold'>{note.title}</h2>
              <p className='mt-2 text-gray-600 hover:text-white'>
                {note.content.slice(0, 60)}
                {note.content.length > 60 && '...'}{' '}
                {/* Add ellipsis if content is truncated */}
              </p>
              <div className='mt-4 flex flex-wrap gap-2'>
                {note.tags.map(tag => (
                  <span
                    key={tag}
                    className='bg-gray-200 text-gray-800 text-xs font-medium px-2 py-1 rounded'
                  >
                    {tag} {/* Render tags */}
                  </span>
                ))}
              </div>
              {/* Direction arrow for navigation */}
              <Link
                to={`/note/${note._id}`}
                className='absolute bottom-4 right-4 w-[2rem] h-[2rem] flex items-center justify-center rounded-full bg-white shadow-md text-gray-600'
              >
                <MdArrowForward className='text-xl' />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Layout;
