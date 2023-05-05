import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../actions/user.actions";
import { isEmpty } from "./Utils";
import { PersonAddSharp, PersonRemoveAlt1Sharp } from '@mui/icons-material';
const FollowHandler = ({ idToFollow, page }) => {
    const userData = useSelector((state) => state.userReducer);
    const [isFollowed, setIsFollowed] = useState(false);
    const dispatch = useDispatch();

    const handleFollow = () => {
        dispatch(followUser(userData._id, idToFollow));
        setIsFollowed(true);
    };

    const handleUnfollow = () => {
        dispatch(unfollowUser(userData._id, idToFollow));
        setIsFollowed(false);
    };

    useEffect(() => {
        if (!isEmpty(userData.following)) {
            if (userData.following.includes(idToFollow)) {
                setIsFollowed(true);
            } else setIsFollowed(false);
        }
    }, [userData, idToFollow]);

    return (
        <>
            {isFollowed && !isEmpty(userData) && (
                <span onClick={handleUnfollow} style={{ cursor: "pointer" }} >
                    {page === "post" && <PersonRemoveAlt1Sharp htmlColor="red" />}
                    {page !== "post" && <button>Following</button>}
                </span>
            )}
            {isFollowed === false && !isEmpty(userData) && (
                <span onClick={handleFollow} style={{ cursor: "pointer" }}>
                    {page === "post" && <PersonAddSharp htmlColor="green" />}
                    {page !== "post" && <button>Follow</button>}
                </span>
            )}
        </>
    );
};

export default FollowHandler;