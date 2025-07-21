import './EmailToast.css';
import { IoMdClose } from 'react-icons/io';
const EmailToast = ({ post, setShowToast }) => {
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
            setShowToast(false);
            handleSchedule();
          }}
        >
          Schedule Session
        </button>
      </div>
    </div>
  );
};

export default EmailToast;
