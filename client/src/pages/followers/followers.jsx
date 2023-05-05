import React from 'react';
import AllFriends from '../../components/allFriends/allFriends';
import "./styleAllFriends.scss"

const Followers = () => {
    return (
        <div className="followers" >
            <h1>All your Followers</h1>
            <AllFriends page={"Followers"} />
        </div>
    );
};

export default Followers;