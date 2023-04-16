import "./profile.scss";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts"
import Share from '../../components/share/share';
import { Link } from "react-router-dom";
const Profile = () => {
    return (
        <div className="profile">
            <div className="images">
                <img
                    src="https://bestprofilepictures.com/wp-content/uploads/2021/04/Cute-Anime-Image.jpg"
                    alt=""
                    className="cover"
                />
                <img
                    src="https://bestprofilepictures.com/wp-content/uploads/2021/08/Amazing-Profile-Picture.jpg"
                    alt=""
                    className="profilePic"
                />
            </div>
            <div className="profileContainer">
                <div className="uInfo">

                    <div className="left">
                        <span>Joker Joker</span>
                        <div className="info">
                            <Link to="/following" style={{ textDecoration: "none", color: "inherit" }}>
                                <p>following : 0</p>
                            </Link>
                            <Link to="/followers" style={{ textDecoration: "none", color: "inherit" }}>
                                <p>followers : 5</p>
                            </Link>


                        </div>

                    </div>
                    <div className="right">

                        <ChatIcon htmlColor="red" className="message" />
                        <button>update</button>
                    </div>

                </div>
                <Share />
                <Posts />
            </div>
        </div>
    );
};

export default Profile;
