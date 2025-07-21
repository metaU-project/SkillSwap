import './EmailToast.css';
import { IoMdClose } from 'react-icons/io';
import ScheduleSessionModal from './ScheduleSessionModal';
import { useState } from 'react';

const EmailToast = ({ post, setShowToast, setShowModal }) => {
  const [scheduleModal, setScheduleModal] = useState(false);
  return (
    <div className="toast-wrapper">
      <div className="toast pulse">
        <button className="close-toast" onClick={() => setShowToast(false)}>
          <IoMdClose />
        </button>
        <p>
          Your interest has been sent to <strong>{post.user.first_name}</strong>
          . You can expect to hear back from them soon.
        </p>
        <button
          className="schedule-btn"
          onClick={() => {
            setShowModal(false);
            setScheduleModal(true);
          }}
        >
          Schedule Session
        </button>
      </div>
      {scheduleModal && (
        <ScheduleSessionModal post={post} setScheduleModal={setScheduleModal} />
      )}
    </div>
  );
};

export default EmailToast;
