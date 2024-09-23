import { useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import axiosinstance from '../../utils/axiosinstance';

const AddEditNotes = ({
  onClose,
  noteData,
  type,
  allNotes,
  setAllNotes,
  getAllNotes,
}) => {
  const [title, setTitle] = useState(noteData?.title || '');
  const [content, setContent] = useState(noteData?.content || '');
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(noteData?.fileUrl || '');

  useEffect(() => {
    if (noteData?.fileUrl) {
      setFileUrl(noteData.fileUrl);
    }
  }, [noteData]);

  const handleFileChange = e => {
    setFile(e.target.files[0]);
  };

  const addNewNote = async () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('content', content);

    try {
      const token = localStorage.getItem('accessToken');
      const response = await axiosinstance.post('/add-notes', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data && !response.data.error) {
        setAllNotes([...allNotes, response.data.note]);
        getAllNotes();
        onClose();
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error(
        'Error adding note:',
        error.response ? error.response.data : error.message
      );
      setError('Failed to add note');
    }
  };

  const editNote = async () => {
    const noteId = noteData?._id;

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.error('No access token found');
        return;
      }

      const response = await axiosinstance.put(
        `/edit-note/${noteId}`,
        {
          title,
          content,
          fileUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedNotes = allNotes.map(note =>
        note._id === noteId ? response.data.note : note
      );
      setAllNotes(updatedNotes);

      if (response.data.success) {
        onClose();
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      }
    }
  };

  const handleAddNote = () => {
    if (!title) {
      setError('Please enter a title');
      return;
    }
    if (!content) {
      setError('Please enter the content');
      return;
    }

    setError('');
    if (type === 'edit') {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div className='relative p-4 md:p-6 lg:p-8 max-w-lg mx-auto bg-white shadow-md rounded-lg'>
      <button
        className='w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 absolute -top-4 -right-4 hover:bg-gray-300'
        onClick={onClose}
      >
        <MdClose className='text-xl text-gray-600' />
      </button>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col'>
          <label className='text-sm font-semibold mb-1'>TITLE</label>
          <input
            type='text'
            className='text-lg p-2 border border-gray-300 rounded-md outline-none focus:border-blue-500'
            placeholder='Enter the title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>

        <div className='flex flex-col mt-4'>
          <label className='text-sm font-semibold mb-1'>CONTENT</label>
          <textarea
            className='text-sm p-2 border border-gray-300 rounded-md bg-gray-50 outline-none focus:border-blue-500'
            placeholder='Enter the content'
            rows={6}
            value={content}
            onChange={({ target }) => setContent(target.value)}
          />
        </div>

        <div className='flex flex-col mt-4'>
          <label className='text-sm font-semibold mb-1'>UPLOAD FILE</label>
          <input
            type='file'
            className='text-sm p-2 border border-gray-300 rounded-md bg-gray-50 outline-none focus:border-blue-500'
            onChange={handleFileChange}
          />
        </div>

        {fileUrl && (
          <div className='flex flex-col mt-4'>
            <label className='text-sm font-semibold mb-1'>DOWNLOAD FILE</label>
            <a
              href={fileUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-500 underline text-sm'
              download
            >
              Download Uploaded File
            </a>
          </div>
        )}

        {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
        <button
          className='bg-gray-800 text-white font-medium mt-4 py-2 px-4 rounded-md hover:bg-gray-700'
          onClick={() => {
            handleAddNote();
            onClose();
          }}
        >
          {type === 'edit' ? 'UPDATE' : 'ADD'}
        </button>
      </div>
    </div>
  );
};

export default AddEditNotes;
