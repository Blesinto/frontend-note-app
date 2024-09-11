import { getInitials } from '../../utils/helper';
import { useNavigate } from 'react-router-dom';

const ProfileInfo = ({ userinfo }) => {
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  if (!userinfo) {
    return null; // or return a fallback UI if necessary
  }
  return (
    <div className='flex items-center gap-3'>
      <div className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100'>
        {getInitials(userinfo.fullName)}
      </div>
      <p className='text-sm font-medium '>{userinfo.fullName}</p>
      <button
        className='text-sm  text-slate-700 underline cursor-pointer'
        onClick={onLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileInfo;
