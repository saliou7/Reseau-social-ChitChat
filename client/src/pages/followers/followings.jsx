import React from 'react';
import AllFriends from '../../components/allFriends/allFriends';
import "./styleAllFriends.scss"

const Following = () => {
    return (
        <div className="followers" >
            <h1>All your Following</h1>
            <AllFriends page={"Following"} />
        </div>
    );
};

export default Following;