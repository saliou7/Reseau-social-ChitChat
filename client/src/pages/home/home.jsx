import React from 'react';
import Posts from '../../components/posts/Posts';
import Share from '../../components/share/share';
import "./home.scss"
const Home = () => {
    return (
        <div className="home">
            <Share />
            <Posts page="home" />
        </div>

    );
};

export default Home;