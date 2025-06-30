import './SessionModal.css';

const SessionModal = ({ setShowRecommend }) => {

    return (
        <div className="modal-overlay">
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Recommend a Session</h2>

                <input
                    type="text"
                    placeholder="Suggest date/time"
                />

                <input
                    type="text"
                    placeholder="Location (Remote/City)"
                />

                <input
                    type="text"
                    placeholder="Search for a session" //searches for a session by name render like gifs in a grid //gets added and clik to go to card?
                />

                <button>Submit</button>
                <button onClick={() => setShowRecommend(false)}>Cancel</button>
            </div>
        </div>
    )
}

export default SessionModal
