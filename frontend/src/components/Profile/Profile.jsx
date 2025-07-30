import './Profile.css';
import { useEffect, useState } from 'react';
import PostContainer from './containers/PostContainer';
import ReviewContainer from './containers/ReviewContainer';
import InterestContainer from './containers/InterestContainer';
import CalendarContainer from './containers/CalendarContainer';
import { FaHome } from 'react-icons/fa';
import { MdOutlineEdit } from 'react-icons/md';
import { MdAccessTime } from 'react-icons/md';
import EditProfile from './modals/EditProfile';
import { TabButton } from './components/TabButton';
import { fetchProfile } from '../../utils/profileFetch';
import { useNavigate } from 'react-router-dom';
import UserSessions from '../schedule/UserSessions';
import { Mail, MapPin, Calendar, Star, Award, Users } from 'lucide-react';

const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedBtn, setSelectedBtn] = useState(1);
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleImageUpdate = (imageUrl) => {
    setProfilePic(imageUrl);
  };

  useEffect(() => {
    const fetchData = async () => {
      const profileData = await fetchProfile();
      setProfile(profileData);
      setPosts(profileData.user.posts);
    };
    fetchData();
  }, []);

  const handleClickHome = () => {
    navigate('/landing');
  };

  return (
    <div className="main-section">
      <button className="home-btn" onClick={handleClickHome}>
        <FaHome className="icon" /> Home
      </button>
      <button className="edit-btn" onClick={() => setShowModal(true)}>
        <MdOutlineEdit className="icon" /> Edit Profile
      </button>
      <div className="profile-header">
        <div className="profile-pic-container">
          <img
            src={
              profilePic ||
              profile?.user.profileImage ||
              'https://avatar.iran.liara.run/public'
            }
            alt="profile-pic"
            className="profile-pic"
          />
        </div>
        <div className="user-details">
          <div className="user-details-sub">
            <h1>
              {profile?.user.first_name} {profile?.user.last_name}
            </h1>
            <div className="details-row">
              <p>
                <Mail className="icon" />
                {profile?.user.email}
              </p>
              <p>
                <MapPin className="icon" /> {profile?.user.location}
              </p>
              <p>
                <Calendar className="icon" />
                Member since: {profile?.user.createdAt?.slice(0, 4)}
              </p>
            </div>
            <p>{profile?.user.bio}</p>
            <div className="badge-container">
              <div className="profile-badges">
                <span>
                  <Star className="icon-bage orange" />
                  5-Star User
                </span>
                <span>
                  <Award className="icon-bage orange" />
                  Top Contributor
                </span>
                <span>
                  <Users className="icon-bage blue" /> Community Leader
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="profile-stats">
        <div className="stat-box reviews">
          <h4>{profile?.user.receivedReviews?.length || 0}</h4>
          <p>Reviews Received</p>
        </div>
        <div className="stat-box post">
          <h4>{posts?.length || 0}</h4>
          <p>Posts Created</p>
        </div>
        <div className="stat-box interests">
          <h4>{profile?.user.interests?.length || 0}</h4>
          <p>Interests</p>
        </div>
        <div className="stat-box sessions">
          <h4>{profile?.user.sessions.length || 0} </h4>
          <p>Sessions Held</p>
        </div>
        <div className="stat-box likes">
          <h4>{profile?.user.likes.length || 0}</h4>
          <p>Likes Received</p>
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
            {selectedBtn === 1 && (
              <PostContainer posts={posts} setPosts={setPosts} />
            )}
            {selectedBtn === 2 && (
              <ReviewContainer reviews={profile?.user?.receivedReviews} />
            )}
            {selectedBtn === 3 && (
              <InterestContainer interests={profile?.user?.interests} />
            )}
          </div>
        </div>
        <div className="profile-bottom-right">
          <CalendarContainer onDateSelect={setSelectedDate} />
          <div className="profile-bottom-right-bottom">
            <h4>
              {' '}
              <MdAccessTime /> Upcoming Sessions
            </h4>
            <UserSessions selectedDate={selectedDate} />
          </div>
        </div>
      </div>
      {showModal && (
        <EditProfile
          profile={profile}
          setShowModal={setShowModal}
          onImageUpdate={handleImageUpdate}
          setProfile={setProfile}
        />
      )}
    </div>
  );
};
export default Profile;
