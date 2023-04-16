import React from 'react';
import "./allFriends.scss"
import DeleteIcon from '@mui/icons-material/Delete';
const AllFriends = () => {
    return (

        <div className="item_a">
            <div className="user">
                <div className="userInfo">
                    <img
                        src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                        alt=""
                    />
                    <span>Jane Doe</span>
                </div>
                <div className="delete">
                    <DeleteIcon htmlColor='red' />
                </div>
            </div>
            <div className="user">
                <div className="userInfo">
                    <img
                        src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                        alt=""
                    />
                    <span>Jane Doe</span>
                </div>
                <div className="delete">
                    <DeleteIcon htmlColor='red' />
                </div>

            </div>

        </div>
    );
};

export default AllFriends;