import { useEffect, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import Modal from 'react-modal';
import Notecard from '../../components/Cards/Notecard';
import Navbar from '../../components/Navbar/Navbar';
import AddEditNotes from './AddEditNotes';
import axiosinstance from '../../utils/axiosinstance';

const Home = () => {
  // State for managing the modal visibility and type
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: 'add',
    data: null,
  });
  // State to hold all notes
  const [allNotes, setAllNotes] = useState([]);

  // Function to open the edit modal with note details
  const handleEdit = noteDetails => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: 'edit' });
  };

  // Function to search notes based on a query
  const onSearchNote = async query => {
    if (!query) {
      getAllNotes(); // If no query, fetch all notes
      return;
    }

    try {
      const response = await axiosinstance.get('/search-note', {
        params: { query },
      });
      if (response.data?.data) {
        setAllNotes(response.data.data); // Update notes with search results
      }
    } catch (error) {
      console.error(error); // Log any errors
    }
  };

  // Fetch all notes on component mount
  useEffect(() => {
    getAllNotes();
  }, []);

  // Function to fetch all notes from the API
  const getAllNotes = async () => {
    try {
      const response = await axiosinstance.get('/get-all-notes');
      if (response.data?.notes) {
        setAllNotes(response.data.notes); // Set notes from response
      }
    } catch (error) {
      console.error('An unexpected error occurred', error); // Log errors
    }
  };

  // Function to delete a note
  const deleteNote = async data => {
    const noteId = data._id;

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.error('No access token found');
        return; // Exit if no token is found
      }

      const response = await axiosinstance.delete(`/delete-note/${noteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update notes state to remove the deleted note
      setAllNotes(allNotes.filter(note => note._id !== noteId));

      if (response.data && !response.data.error) {
        console.log('Note deleted successfully');
      } else {
        console.log('Error:', response.data.message);
      }
    } catch (error) {
      console.error(
        'An unexpected error occurred',
        error.response?.data?.message || error // Log specific error messages
      );
    }
  };

  return (
    <div className='relative min-h-screen'>
      {/* Navbar with search functionality */}
      <Navbar
        // onSearchNote={onSearchNote}
        className='fixed top-0 left-0 right-0 z-10'
      />

      <div className='pt-16 pb-20'>
        <div className='container mx-auto px-2 md:px-8'>
          <div className='grid grid-cols-1 gap-4 mt-8 md:grid-cols-2 lg:grid-cols-3'>
            {allNotes.map(item => (
              <Notecard
                key={item._id}
                title={item.title}
                date={item.createdOn}
                content={item.content}
                tags={item.tags}
                onEdit={() => handleEdit(item)}
                onDelete={() => deleteNote(item)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Button to open the add note modal */}
      <button
        className='w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 text-white text-xl font-bold fixed right-4 bottom-4 md:right-8 md:bottom-8 lg:right-10 lg:bottom-10 z-20'
        onClick={() =>
          setOpenAddEditModal({ isShown: true, type: 'add', data: null })
        }
      >
        <MdAdd />
      </button>

      {/* Modal for adding/editing notes */}
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() =>
          setOpenAddEditModal({ isShown: false, type: 'add', data: null })
        }
        style={{
          overlay: { backgroundColor: 'rgba(0,0,0,0.5)' },
          content: {
            borderRadius: '8px',
            maxWidth: '90%', // Adjust for responsiveness
            width: '500px', // Set a max width
            margin: '0 auto',
            padding: '20px',
            top: '10%',
            left: '5%',
            overflow: 'auto',
            boxSizing: 'border-box',
          },
        }}
        contentLabel='Add/Edit Note'
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() =>
            setOpenAddEditModal({ isShown: false, type: 'add', data: null })
          }
          setAllNotes={setAllNotes}
          allNotes={allNotes}
        />
      </Modal>
    </div>
  );
};

export default Home;
