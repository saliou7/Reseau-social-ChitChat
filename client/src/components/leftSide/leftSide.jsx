import { MarkEmailUnreadOutlined, MarkEmailUnreadRounded, MessageRounded } from '@mui/icons-material';
import { PersonOutline, PersonRounded } from '@mui/icons-material';
import { HomeRounded, HomeOutlined } from '@mui/icons-material';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { NotificationsNoneOutlined, Notifications } from '@mui/icons-material';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "./leftSide.scss";
import cookie from 'js-cookie';
import axios from 'axios';

const LeftSide = () => {
    const [activeTab, setActiveTab] = useState("home");
    const [home, setHome] = useState(true);
    const [profile, setProfile] = useState(false);
    const [message, setMessage] = useState(false);
    const [notif, setNotif] = useState(false);


    const handleTabClick = (tab) => {
        setActiveTab(tab);

        setActiveTab(tab);
        if (tab === "home") {
            setHome(true);
            setProfile(false);
            setMessage(false);
            setNotif(false);
        } else if (tab === "profile") {
            setHome(false);
            setProfile(true);
            setMessage(false);
            setNotif(false);
        } else if (tab === "message") {
            setHome(false);
            setProfile(false);
            setMessage(true);
            setNotif(false);
        } else if (tab === "notif") {
            setHome(false);
            setProfile(false);
            setMessage(false);
            setNotif(true);
        }

    };

    const removeCookie = (key) => {
        if (window !== "undefined") {
            cookie.remove(key, {
                expires: 1
            });
        }
    };

    const logout = async () => {
        try {
            await axios({
                method: 'get',
                url: `${process.env.REACT_APP_API_URL}api/user/logout`,
                withCredentials: true
            });
            cookie.remove('jwt');
            window.location = '/login';
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="leftBar">
            <div className="top">
                <div className="icons">
                    <Link to="/" onClick={() => handleTabClick("home")} className="Link">
                        {home ? <HomeRounded fontSize="large" /> : <HomeOutlined fontSize="large" />}
                        <span className={activeTab === "home" ? "active" : ""}>Home</span>
                    </Link>
                </div>
                <div className="icons">
                    <Link to="/profile" onClick={() => handleTabClick("profile")} className="Link">
                        {profile ? <PersonRounded fontSize="large" /> : <PersonOutline fontSize="large" />}
                        <span className={activeTab === "profile" ? "active" : ""}>Profile</span>
                    </Link>
                </div>
                <div className="icons">
                    <Link to="/dev" onClick={() => handleTabClick("message")} className="Link">
                        {message ? <MessageRounded fontSize="large" /> : <MarkEmailUnreadOutlined fontSize="large" />}
                        <span className={activeTab === "message" ? "active" : ""}>Messages</span>
                    </Link>
                </div>
                <div className="icons">
                    <Link to="/dev" onClick={() => handleTabClick("notif")} className="Link">
                        {notif ? <Notifications fontSize="large" /> : <NotificationsNoneOutlined fontSize="large" />}
                        <span className={activeTab === "notif" ? "active" : ""}>Notifications</span>
                    </Link>
                </div>
                <div className="icons" onClick={logout}>
                    <Link to="/login" onClick={() => handleTabClick("logout")} className="Link">
                        <LogoutOutlinedIcon fontSize="large" />
                        <span>Logout</span>
                    </Link>
                </div>
            </div>
        </div>
    );

};

export default LeftSide;