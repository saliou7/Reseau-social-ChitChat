import "./rightSide.scss";
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from '../Utils';
import FollowHandler from "../add";
import { Link } from "react-router-dom";
const RightSide = () => {
    const userData = useSelector((state) => state.userReducer);
    const usersData = useSelector((state) => state.usersReducer);
    const [playOnce, setPlayOnce] = useState(true);
    const [friendsSuggestions, setFriendsSuggestions] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);

    const notFriendList = () => {
        let array = [];
        let array2 = [];
        usersData.map((user) => {
            if (user._id !== userData._id && !user.followers.includes(userData._id))
                return array.push(user._id);
            else if (user._id !== userData._id)
                return array2.push(user._id);
            return null;
        });
        array.sort(() => 0.5 - Math.random());
        if (window.innerHeight > 780) array.length = 5;
        else if (window.innerHeight > 720) array.length = 4;
        else if (window.innerHeight > 615) array.length = 3;
        else if (window.innerHeight > 540) array.length = 2;
        else if (window.innerHeight > 500) array.length = 1;
        setFriendsSuggestions(array);
        array2.sort(() => 0.5 - Math.random());
        if (window.innerHeight > 780) array2.length = 5;
        else if (window.innerHeight > 720) array2.length = 4;
        else if (window.innerHeight > 615) array2.length = 3;
        else if (window.innerHeight > 540) array2.length = 2;
        else if (window.innerHeight > 500) array2.length = 1;
        setOnlineFriends(array2);
    }

    useEffect(() => {
        if (playOnce && !isEmpty(usersData[0]) && !isEmpty(userData._id)) {
            notFriendList();
            setPlayOnce(false);
        }
    }, [usersData, userData, playOnce]);

    return (
        <div className="rightBar">
            <div className="container">
                <div className="item">
                    <span>Suggestions For You</span>
                    {friendsSuggestions && friendsSuggestions.map((user) => {
                        for (let i = 0; i < usersData.length; i++) {
                            if (user === usersData[i]._id) {
                                return (
                                    <div className="user" key={user}>
                                        <div className="userInfo">
                                            <Link to={`/${usersData[i]._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                                                <img
                                                    src={usersData[i].profile_picture}
                                                    alt="user-pic"
                                                    key={user}
                                                />
                                            </Link>
                                            <Link to={`/${usersData[i]._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                                                <span>{usersData[i].pseudo}</span>
                                            </Link>
                                        </div>
                                        <FollowHandler idToFollow={usersData[i]._id} />
                                    </div>
                                );
                            }
                        }
                        return null;
                    }
                    )}

                </div>

                <div className="item">
                    <span>Online Friends</span>
                    {onlineFriends && onlineFriends.map((user) => {
                        for (let i = 0; i < usersData.length; i++) {
                            if (user === usersData[i]._id) {
                                return (
                                    <div className="user" key={user}>
                                        <div className="userInfo">
                                            <Link to={`/${usersData[i]._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                                                <img
                                                    src={usersData[i].profile_picture}
                                                    alt="user-pic"
                                                    key={user}
                                                />
                                            </Link>
                                            <div className="online" />
                                            <Link to={`/${usersData[i]._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                                                <span>{usersData[i].pseudo}</span>
                                            </Link>
                                        </div>
                                    </div>
                                );
                            }
                        }
                        return null;
                    }

                    )}

                </div>
            </div>
        </div>
    );
};

export default RightSide;
