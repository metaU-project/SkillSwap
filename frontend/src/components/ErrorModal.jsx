import './ErrorModal.css';

const ErrorModal = ({ errorMessage, setErrorMessage }) => {
    return (
        <div className='modal-backdrop'>
            <div className="error-modal">
                <p>{errorMessage}</p>
                <button onClick={() => setErrorMessage('')}>Close</button>
            </div>
        </div>
    )
};

export default ErrorModal;
