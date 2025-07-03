import "./Profile.css"
import { useState } from "react";
import PostContainer from "./containers/PostContainer";
import ReviewContainer from "./containers/ReviewContainer";
import InterestContainer from "./containers/InterestContainer";
import CalendarContainer from "./containers/CalendarContainer";
import { FaHome } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import NewProfilePic from "./modals/NewProfilePic";

const Profile = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedBtn, setSelectedBtn] = useState(1);
    return (
        <div className="main-section">
            <button className="home-btn"><FaHome /> </button>
            <div className="profile-header">
                <div className="profile-pic-container">
                    <button className="edit-btn" onClick={() => setShowModal(true)}><MdOutlineEdit /></button>
                    <img src="https://avatar.iran.liara.run/public" alt="profile-pic" className="profile-pic" />
                </div>
                <div className="user-details">
                    <h3>Shreyas Sane</h3>
                    <p>example@gmail.com</p>
                    <p><strong>Joined: </strong> 2016</p>
                    <p><strong>location: </strong>India</p>
                    <p><strong>Bio: </strong>I am a software engineer at Meta</p>
                </div>
            </div>
            <div className="profile-bottom">
                <div className="profile-bottom-left">
                    <div className="profile-menu">
                        <button className={selectedBtn === 1 ? "selected-btn" : "default-btn"} onClick={() => setSelectedBtn(1)}>My Posts</button>
                        <button className={selectedBtn === 2 ? "selected-btn" : "default-btn"} onClick={() => setSelectedBtn(2)}>My Reviews</button>
                        <button className={selectedBtn === 3 ? "selected-btn" : "default-btn"} onClick={() => setSelectedBtn(3)}>My Interests</button>
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
}
export default Profile;
