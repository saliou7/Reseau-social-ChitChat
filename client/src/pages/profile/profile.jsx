import "./profile.scss";

import Posts from "../../components/posts/Posts"
import Share from '../../components/share/share';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { uploadPicture, uploadCover } from "../../actions/user.actions";

const Profile = () => {
    const userData = useSelector((state) => state.userReducer);
    const [file, setFile] = useState();
    const [isCover, setIsCover] = useState(false);
    const dispatch = useDispatch();
    const [notUpdate, setNotUpdate] = useState(true);


    const handlePicture = () => {
        const data = new FormData();
        data.append("name", userData.pseudo);
        data.append("userId", userData._id);
        data.append("file", file);
        if (isCover) {
            dispatch(uploadCover(data, userData._id));
        } else {
            dispatch(uploadPicture(data, userData._id));
        }
        setNotUpdate(true);
    };

    return (
        <div className="profile">
            <div className="images">
                <input
                    type="file" id="cover" name="file"
                    accept=".jpg, .jpeg, .png"
                    onChange={(e) => { setFile(e.target.files[0]); setNotUpdate(false); setIsCover(true) }}
                    style={{ display: "none" }} />
                <label htmlFor="cover">
                    <img
                        src={userData.cover_picture}
                        alt=""
                        className="cover"
                    />

                </label>
                <input
                    type="file" id="pp" name="file2"
                    accept=".jpg, .jpeg, .png"
                    onChange={(e) => { setFile(e.target.files[0]); setNotUpdate(false); setIsCover(false) }}
                    style={{ display: "none" }} />
                <label htmlFor="pp">
                    <img
                        src={userData.profile_picture}
                        alt=""
                        className="profilePic"
                    />
                </label>

            </div>
            <div className="profileContainer">
                <div className="uInfo">

                    <div className="left">
                        <span>{userData.pseudo}</span>
                        <div className="info">
                            <Link to="/following" style={{ textDecoration: "none", color: "inherit" }}>
                                <p>following : {userData.following?.length}</p>
                            </Link>
                            <Link to="/followers" style={{ textDecoration: "none", color: "inherit" }}>
                                <p>followers : {userData.followers?.length} </p>
                            </Link>

                        </div>

                    </div>
                    <div className="right">
                        <button disabled={notUpdate} onClick={handlePicture}>update</button>
                    </div>

                </div>
                <Share />
                <Posts page={"profile"} id={userData._id} />
            </div>
        </div >
    );
};

export default Profile;
