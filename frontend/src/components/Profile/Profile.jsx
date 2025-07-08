import './Profile.css';
import { useState } from 'react';
import PostContainer from './containers/PostContainer';
import ReviewContainer from './containers/ReviewContainer';
import InterestContainer from './containers/InterestContainer';
import CalendarContainer from './containers/CalendarContainer';
import { FaHome } from 'react-icons/fa';
import { MdOutlineEdit } from 'react-icons/md';
import NewProfilePic from './modals/NewProfilePic';
import { TabButton } from './components/TabButton';

const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedBtn, setSelectedBtn] = useState(1);
  return (
    <div className="main-section">
      <button className="home-btn">
        <FaHome />{' '}
      </button>
      <div className="profile-header">
        <div className="profile-pic-container">
          <button className="edit-btn" onClick={() => setShowModal(true)}>
            <MdOutlineEdit />
          </button>
          <img
            src="https://avatar.iran.liara.run/public"
            alt="profile-pic"
            className="profile-pic"
          />
        </div>
        <div className="user-details">
          <h3>Shreyas Sane</h3>
          <p>example@gmail.com</p>
          <p>
            <strong>Joined: </strong> 2016
          </p>
          <p>
            <strong>location: </strong>India
          </p>
          <p>
            <strong>Bio: </strong>I am a software engineer at Meta
          </p>
        </div>
      </div>
      <div className="profile-bottom">
        <div className="profile-bottom-left">
          <div className="profile-menu">
            <TabButton
              isSelected={selectedBtn === 1}
              onClick={setSelectedBtn}
              index={1}
            >
              My Posts
            </TabButton>

            <TabButton
              isSelected={selectedBtn === 2}
              onClick={setSelectedBtn}
              index={2}
            >
              My Reviews
            </TabButton>

            <TabButton
              isSelected={selectedBtn === 3}
              onClick={setSelectedBtn}
              index={3}
            >
              My Interests
            </TabButton>
          </div>
          <div>
            {selectedBtn === 1 && <PostContainer />}
            {selectedBtn === 2 && <ReviewContainer />}
            {selectedBtn === 3 && <InterestContainer />}
          </div>
        </div>
        <div className="profile-bottom-right">
          <CalendarContainer />
          <div className="profile-bottom-right-bottom">
            <h4>Upcoming Events</h4>
            <p>There are no upcoming events</p>
          </div>
        </div>
      </div>
      {showModal && <NewProfilePic setShowModal={setShowModal} />}
    </div>
  );
};
export default Profile;
