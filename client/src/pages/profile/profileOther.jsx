import React, { useState, useEffect } from 'react';
import './profile.scss';
import Posts from '../../components/posts/Posts';
import { useParams } from 'react-router-dom';
import FollowHandler from "../../components/add";
import axios from 'axios';


const ProfileOther = () => {
    const { id } = useParams();
    const [userData, setUserData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            await axios({
                method: "get",
                url: `${process.env.REACT_APP_API_URL}api/user/${id}`,
                withCredentials: true,
            })
                .then((res) => {
                    setUserData(res.data);
                    setLoading(false);
                })
                .catch((err) => console.log(err));
        };
        fetchUser();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='profile'>
            <div className='images'>
                <img src={userData.cover_picture} alt='' className='cover' />
                <img src={userData.profile_picture} alt='' className='profilePic' />
            </div>
            <div className='profileContainer'>
                <div className='uInfo'>
                    <div className='left'>
                        <span>{userData.pseudo}</span>
                        <div className='info'>
                            <p>following : {userData.following?.length}</p>
                            <p>followers : {userData.followers?.length} </p>
                        </div>
                    </div>
                    <div className='right'>
                        <FollowHandler idToFollow={id} />
                    </div>
                </div>
                <Posts page={'profile'} id={userData._id} />
            </div>
        </div>
    );
};

export default ProfileOther;
