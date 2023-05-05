import React from 'react';
import "./allFriends.scss"
import { useSelector } from "react-redux";

import FollowHandler from '../add';

const AllFriends = ({ page }) => {
    const userData = useSelector((state) => state.userReducer);
    const usersData = useSelector((state) => state.usersReducer);

    return (
        <div className="item_a">
            {Array.isArray(usersData) && page === "Following" &&
                usersData.map((user) => {
                    for (let i = 0; i < userData?.following?.length; i++) {
                        if (user._id === userData.following[i]) {
                            return (
                                <div key={user._id} className="user">
                                    <div className="userInfo">
                                        <img
                                            src={user.profile_picture}
                                            alt=""
                                        />
                                        <span>{user.pseudo}</span>
                                    </div>
                                    <div className="delete">
                                        <FollowHandler idToFollow={user._id} />
                                    </div>
                                </div>
                            );
                        }
                    }
                    return null;
                })
            }
            {Array.isArray(usersData) && page === "Followers" &&
                usersData.map((user) => {
                    for (let i = 0; i < userData?.followers?.length; i++) {
                        if (user._id === userData.followers[i]) {
                            return (
                                <div key={user._id} className="user">
                                    <div className="userInfo">
                                        <img
                                            src={user.profile_picture}
                                            alt=""
                                        />
                                        <span>{user.pseudo}</span>
                                    </div>
                                    <div className="delete">
                                        <FollowHandler idToFollow={user._id} />
                                    </div>
                                </div>
                            );
                        }
                    }
                    return null;
                })
            }
        </div>
    );
};

export default AllFriends;
