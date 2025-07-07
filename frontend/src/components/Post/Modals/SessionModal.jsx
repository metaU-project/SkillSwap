import './SessionModal.css';

const SessionModal = ({ setShowRecommend }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Recommend a Session</h2>
        <input
          type="text"
          placeholder="Search for a session" //searches for a session by name render like gifs in a grid //gets added and clik to go to card?
        />

        <div className="action-btns">
          <button className="submit-btn">Submit</button>
          <button
            className="cancel-btn"
            onClick={() => setShowRecommend(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionModal;
