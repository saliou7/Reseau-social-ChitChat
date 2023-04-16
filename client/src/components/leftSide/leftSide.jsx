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

    const [home, setHome] = useState(true)
    const [profile, setProfile] = useState(false)
    const [message, setMessage] = useState(false)
    const [notif, setNotif] = useState(false)

    const handleProfile = () => {
        setHome(false)
        setProfile(true)
        setMessage(false)
        setNotif(false)
    }
    const handleHome = () => {
        setHome(true)
        setProfile(false)
        setMessage(false)
        setNotif(false)
    }
    const handleMessaage = () => {
        setHome(false)
        setProfile(false)
        setMessage(true)
        setNotif(false)
    }
    const handleNotif = () => {
        setHome(false)
        setProfile(false)
        setMessage(false)
        setNotif(true)
    }

    const removeCookie = (key) => {
        if (window !== "undefined") {
            cookie.remove(key, {
                expires: 1
            }) // remove the cookie
        }   // if the window is undefined, then we are on the server side
    }

    const logout = async () => {
        await axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}api/user/logout`,
            withCredentials: true
        }).then(() => {
            cookie.removeCookie('jwt')
        }).catch((err) => console.log(err))
        window.location = '/login'
    }


    return (
        <div className="leftBar">

            <div className="top">


                <div className="icons">
                    {home ? <HomeRounded fontSize='large' /> : <HomeOutlined fontSize='large' />}
                    <Link to="/" style={{ textDecoration: "none", color: "inherit" }} onClick={handleHome}>
                        <span style={{ fontWeight: home ? 'bold' : 'normal' }} >Home</span>
                    </Link>
                </div>
                <div className="icons">
                    {profile ? <PersonRounded fontSize='large' /> : <PersonOutline fontSize='large' />}
                    <Link to="/profile/:user" style={{ textDecoration: "none", color: "inherit" }} onClick={handleProfile}>
                        <span style={{ fontWeight: profile ? 'bold' : 'normal' }}>Profile</span>
                    </Link>
                </div>
                <div className="icons">
                    {message ? <MessageRounded fontSize='large' /> : <MarkEmailUnreadOutlined fontSize='large' />}
                    <Link to="/" style={{ textDecoration: "none", color: "inherit" }} onClick={handleMessaage}>
                        <span style={{ fontWeight: message ? 'bold' : 'normal' }}>Messages</span>
                    </Link>
                </div>
                <div className="icons">
                    {notif ? <Notifications fontSize='large' /> : <NotificationsNoneOutlined fontSize='large' />}
                    <Link to="/" style={{ textDecoration: "none", color: "inherit" }} onClick={handleNotif}>
                        <span style={{ fontWeight: notif ? 'bold' : 'normal' }}>Notifications</span>
                    </Link>
                </div>
                <div className="icons" onClick={logout} >
                    <LogoutOutlinedIcon fontSize='large' />
                    <span>Logout</span>
                </div>
            </div>

        </div>

    );
};

export default LeftSide;