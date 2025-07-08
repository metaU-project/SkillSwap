import './Profile.css';
import { useEffect, useState } from 'react';
import PostContainer from './containers/PostContainer';
import ReviewContainer from './containers/ReviewContainer';
import InterestContainer from './containers/InterestContainer';
import CalendarContainer from './containers/CalendarContainer';
import { FaHome } from 'react-icons/fa';
import { MdOutlineEdit } from 'react-icons/md';
import NewProfilePic from './modals/NewProfilePic';
import { TabButton } from './components/TabButton';
import { fetchProfile } from '../../utils/profileFetch';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedBtn, setSelectedBtn] = useState(1);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState(null);

  const handleImageUpdate = (imageUrl) => {
    setProfilePic(imageUrl);
  }

  useEffect(() => {
    const fetchData = async () => {
      const profileData = await fetchProfile();
      setProfile(profileData);
    };
    fetchData();
  }, []);

  const handleClickHome = () => {
    navigate('/landing');
  };

  return (
    <div className="main-section">
      <button className="home-btn" onClick={handleClickHome}>
        <FaHome />{' '}
      </button>
      <div className="profile-header">
        <div className="profile-pic-container">
          <button className="edit-btn" onClick={() => setShowModal(true)}>
            <MdOutlineEdit />
          </button>
          <img
            src={profilePic || profile?.user.profileImage || 'https://avatar.iran.liara.run/public'}
            alt="profile-pic"
            className="profile-pic"
          />
        </div>
        <div className="user-details">
          <h3>
            {profile?.user.first_name} {profile?.user.last_name}
          </h3>
          <p>{profile?.user.email}</p>
          <p>
            <strong>Member Since: </strong>{' '}
            {profile?.user.createdAt?.slice(0, 4)}
          </p>
          <p>
            <strong>location: </strong> {profile?.user.location}
          </p>
          <p>
            <strong>Bio: </strong> {profile?.user.bio}
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
            {selectedBtn === 1 && <PostContainer posts={profile?.user.posts} />}
            {selectedBtn === 2 && (
              <ReviewContainer reviews={profile.user.receivedReviews} />
            )}
            {selectedBtn === 3 && (
              <InterestContainer interests={profile.user.interests} />
            )}
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
      {showModal && <NewProfilePic setShowModal={setShowModal} onImageUpdate={handleImageUpdate } />}
    </div>
  );
};
export default Profile;
