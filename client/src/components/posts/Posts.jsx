import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/post.actions";
import Post from "./post"
import "./post.scss";
import { isEmpty } from "../Utils";


const Posts = ({ page, id }) => {

    const [loadPost, setLoadPost] = useState(true);
    const [count, setCount] = useState(5);
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.postReducer);
    console.log(posts);
    const loadMore = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1.5 > document.scrollingElement.scrollHeight) {
            setLoadPost(true);
        }
    }

    useEffect(() => {
        if (loadPost) {
            dispatch(getPosts(count));
            setLoadPost(false);
            setCount(count + 5);
        }

        window.addEventListener('scroll', loadMore);
        return () => window.removeEventListener('scroll', loadMore);
    }, [loadPost, dispatch, count]);

    return (
        <div className="posts">
            {!isEmpty(posts[0]) &&
                posts.map((post) => (
                    (page === "profile" && post.posterId === id) ? <Post key={post._id} post={post} /> :
                        (page === "home" && <Post key={post._id} post={post} />)
                ))
            }
        </div>
    );
};

export default Posts;
