import Notecard from '../../components/Cards/Notecard';
import Navbar from '../../components/Navbar/Navbar';
import { MdAdd } from 'react-icons/md';
import AddEditNotes from './AddEditNotes';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
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

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: 'edit' });
  };

  const getUserInfo = async () => {
    try {
      const response = await axiosinstance.get('/get-user');
      if (response.data && response.data.user) {
        setUserinfo(response.data.user);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    getAllNotes();
    getUserInfo();
  }, []);

  const getAllNotes = async () => {
    try {
      const response = await axiosinstance.get('/get-all-notes');
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log('An expected error occurred',error);
    }
  };

  const deleteNote = async (data) => {
    const noteId = data._id;
    try {
      const response = await axiosinstance.delete('/delete-note/' + noteId);
      if (response.data && !response.data.error) {
        getAllNotes();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log('An unexpected error occurred');
      }
    }
  };

  return (
    <div className='relative min-h-screen'>
      <Navbar
        userinfo={userinfo}
        showAdminButton={false}
        className='fixed top-0 left-0 right-0 z-10'
      />

      <div className='pt-16'>
        <div className='container mx-auto px-2 md:px-8'>
          <div className='grid grid-cols-1 gap-4 mt-8 md:grid-cols-2 lg:grid-cols-3'>
            {allNotes.map((item) => (
              <Notecard
                key={item._id}
                title={item.title}
                date={item.createdOn}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={() => handleEdit(item)}
                onDelete={() => deleteNote(item)}
                onpinNote={() => {}}
              />
            ))}
          </div>
        </div>
      </div>

      <button
        className='w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 text-white text-xl font-bold fixed right-4 bottom-4 md:right-8 md:bottom-8 lg:right-10 lg:bottom-10 z-20'
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
          overlay: {
            backgroundColor: 'rgba(0,0,0,0.2)', // Ensure valid property
          },
          content: {
            borderRadius: '8px',
            width: '600', // Responsive width
            maxWidth: '500px', // Maximum width
            margin: '0 auto',
            padding: '20px',
            position: 'relative',
            top: '10%',
            overflow: 'auto', // Allow scrolling if needed
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
          getAllNotes={getAllNotes}
        />
      </Modal>
    </div>
  );
};

export default Home;
