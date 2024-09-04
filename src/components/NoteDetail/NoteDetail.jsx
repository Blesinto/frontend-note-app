import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosinstance from '../../utils/axiosinstance';
import { MdArrowBack } from 'react-icons/md';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'; // Import loading spinner
import { MdFileDownload } from 'react-icons/md'; // Import download icon

const NoteDetail = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const { data } = await axiosinstance.get(`/get-all-notes/${id}`);
        if (data?.note) {
          setNote(data.note);
        }
      } catch (error) {
        console.error('Error fetching note:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  if (loading) {
    return (
      <div className='relative min-h-screen flex items-center justify-center'>
        <AiOutlineLoading3Quarters className='text-gray-600 text-6xl animate-spin' />
      </div>
    ); // Display a spinner while loading
  }

  if (!note) {
    return <div className='min-h-screen flex items-center justify-center text-gray-700'>Note not found</div>;
  }

  return (
    <div className='relative min-h-screen flex items-center justify-center p-6'>
      <button
        onClick={() => navigate(-1)}
        className='absolute top-4 left-4 text-white focus:outline-none w-10 h-10 flex items-center justify-center rounded-full bg-gray-600 shadow-md'
      >
        <MdArrowBack className='text-xl' />
      </button>
      <div className='bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl'>
        <h1 className='text-2xl font-bold mb-4'>{note.title}</h1>
        <p className='text-gray-700 mb-6'>{note.content}</p>
        <div className='flex flex-wrap gap-2 mb-6'>
          {note.tags.map(tag => (
            <span
              key={tag}
              className='bg-gray-200 text-gray-800 text-xs font-medium px-2 py-1 rounded'
            >
              {tag}
            </span>
          ))}
        </div>
        {note.fileUrl && (
          <div className='mt-6 flex justify-center'>
            <a
              href={note.fileUrl}
                  target='_blank'
              className='bg-gray-800 text-white px-4 py-2 rounded-lg shadow transition-colors duration-300 text-sm flex items-center'
              download
            >
              <MdFileDownload className='h-5 w-5 mr-2' />
              Download File
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteDetail;
