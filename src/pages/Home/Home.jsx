import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import Modal from 'react-modal';
import Notecard from '../../components/Cards/Notecard';
import Navbar from '../../components/Navbar/Navbar';
import AddEditNotes from './AddEditNotes';
import axiosinstance from '../../utils/axiosinstance';

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: 'add',
    data: null,
  });
  const [userinfo, setUserinfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);

  const navigate = useNavigate();

  const handleEdit = noteDetails => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: 'edit' });
  };

  const handleLogout = () => {
    localStorage.clear(); // Clear user session data
    navigate('/'); // Redirect to landing page
  };

  const onSearchNote = async query => {
    if (!query) {
      getAllNotes();
      return;
    }

    try {
      const response = await axiosinstance.get('/search-note', {
        params: { query },
      });
      if (response.data?.data) {
        setAllNotes(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllNotes();
  }, []);

  const getAllNotes = async () => {
    try {
      const response = await axiosinstance.get('/get-all-notes');
      if (response.data?.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.error('An unexpected error occurred', error);
    }
  };

  const deleteNote = async note => {
    try {
      const response = await axiosinstance.delete(`/delete-note/${note._id}`);
      if (response.data && !response.data.error) {
        getAllNotes();
      }
    } catch (error) {
      console.error('An unexpected error occurred', error);
    }
  };

  return (
    <div className="relative min-h-screen">
      <Navbar
        userinfo={userinfo}
        onSearchNote={onSearchNote}
        showAdminButton={false}
        className="fixed top-0 left-0 right-0 z-10"
      />

      <div className="pt-16 pb-20"> {/* Adjust for logout button space */}
        <div className="container mx-auto px-2 md:px-8">
          <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-2 lg:grid-cols-3">
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

      <button
        className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 text-white text-xl font-bold fixed right-4 bottom-4 md:right-8 md:bottom-8 lg:right-10 lg:bottom-10 z-20"
        onClick={() =>
          setOpenAddEditModal({ isShown: true, type: 'add', data: null })
        }
      >
        <MdAdd />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() =>
          setOpenAddEditModal({ isShown: false, type: 'add', data: null })
        }
        style={{
          overlay: { backgroundColor: 'rgba(0,0,0,0.2)' },
          content: {
            borderRadius: '8px',
            maxWidth: '500px',
            margin: '0 auto',
            padding: '20px',
            position: 'relative',
            top: '10%',
            overflow: 'auto',
            boxSizing: 'border-box',
          },
        }}
        contentLabel="Add/Edit Note"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() =>
            setOpenAddEditModal({ isShown: false, type: 'add', data: null })
          }
          getAllNotes={getAllNotes}
        />
      </Modal>

      {/* Footer section with logout link */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white py-4 text-center">
        <button
          onClick={handleLogout}
          className="text-sm font-medium bg-transparent border-none cursor-pointer hover:underline"
        >
          LOGOUT
        </button>
      </div>
    </div>
  );
};

export default Home;
