import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import axiosinstance from '../../utils/axiosinstance';
import { MdMenu, MdClose, MdArrowForward } from 'react-icons/md';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'; // Import loading spinner

const Layout = () => {
  const [notes, setNotes] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State for handling loading animation
  const sidebarRef = useRef(null);
  const navigate = useNavigate(); // Use navigate for programmatically navigating

  const fetchNotes = async () => {
    try {
      const { data } = await axiosinstance.get('/get-all-notes');
      if (data?.notes) {
        setNotes(data.notes);
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen]);

  // Handle note click
  const handleNoteClick = (noteId) => {
    setIsLoading(true); // Start loading animation
    setTimeout(() => {
      navigate(`/note/${noteId}`);
    }, 1000); // Delay navigation for animation effect
  };

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
        {/*  sidebar */}
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className='flex-1 p-6 bg-gray-100 overflow-y-auto ml-0'>
        <div className='md:hidden flex items-center mb-4'>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className='text-gray-800 focus:outline-none'
          >
            <MdMenu className='text-3xl' />
          </button>
        </div>
        <h1 className='text-2xl font-bold mb-6'>Hello, welcome</h1>
        <div className='notes-list grid sm:grid-cols-2 md:grid-cols-3 gap-4'>
          {notes.map((note) => (
            <div
              key={note._id}
              className='relative bg-white px-6 py-4 shadow rounded-md hover:bg-gray-800 hover:text-white cursor-pointer transition-all'
              onClick={() => handleNoteClick(note._id)} // Handle click
            >
              <h2 className='text-lg font-semibold'>{note.title}</h2>
              <p className='mt-2 text-gray-600 hover:text-white'>
                {note.content.slice(0, 60)}
                {note.content[61] && '...'}
              </p>
              <div className='mt-4 flex flex-wrap gap-2'>
                {note.tags.map((tag) => (
                  <span
                    key={tag}
                    className='bg-gray-200 text-gray-800 text-xs font-medium px-2 py-1 rounded'
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {/* Direction arrow at the bottom-right corner */}
              <Link
                to={`/note/${note._id}`}
                className='absolute bottom-4 right-4 w-[2rem] h-[2rem] flex items-center justify-center rounded-full bg-white shadow-md  text-gray-600'
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
