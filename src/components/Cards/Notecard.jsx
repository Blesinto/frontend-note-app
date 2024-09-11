import { MdCreate, MdDelete, } from 'react-icons/md';
import moment from 'moment';

const Notecard = ({
  title,
  date,
  content,
  tags,

  onEdit,
  onDelete,
  onpinNote,
}) => {
  return (
    <>
      {' '}
      <div className='border rounded p-4 bg-white hover:shadow-xl transition-all '>
        <div className='flex items-center justify-between'>
          <div>
            <h6 className='text-sm font-medium'>{title}</h6>
            <span className='text-xs text-slate-500 '>
              {moment(date).format('Do MM YYYY')}
            </span>
          </div>

      
        </div>
        <p>{content.slice(0, 60)}</p>

        <div className='flex items-center justify-between mt-2 '>
          <div className='text-xs text-slate-500'>
            {tags.map(item => `#${item}`)}
          </div>
          <div className='gap-2 flex items-center'>
            <MdCreate
              className='icon-btn hover:text-green-600'
              onClick={onEdit}
            />
            <MdDelete
              className='icon-btn hover:text-red-600'
              onClick={onDelete}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Notecard;
