import "./post.scss";
import {
    DriveFileRenameOutline, Comment
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { isEmpty, getTimeElapsed } from "../Utils";
import FollowHandler from "../add";
import LikeButton from "./likeB";
import { useDispatch } from "react-redux";
import { updatePost } from "../../actions/post.actions";
import DeletePost from "./deletePost";
import Comments from "../comments/Comments";
//import { useState } from "react";

const Post = ({ post }) => {
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    const [isUpdated, setIsUpdated] = useState(false);
    const [text, setText] = useState(null);
    const dispatch = useDispatch();
    const [display, setDiplay] = useState(false);

    const updateItem = () => {
        if (text) {
            dispatch(updatePost(post._id, text));
        }
        setIsUpdated(false);
    };


    return (
        <div className="post">
            <div className="container">
                <div className="user">
                    <div className="userInfo">
                        {userData._id === post.posterId && (
                            <Link to="/profile" style={{ textDecoration: "none", color: "inherit" }}>
                                <img src={!isEmpty(usersData[0]) &&
                                    usersData.map((user) => {
                                        if (user._id === post.posterId) return user.profile_picture
                                    }).join("")}
                                    alt="" />
                            </Link>
                        )}
                        {userData._id !== post.posterId && (
                            <Link to={`/${post.posterId}`} style={{ textDecoration: "none", color: "inherit" }}>
                                <img src={!isEmpty(usersData[0]) &&
                                    usersData.map((user) => {
                                        if (user._id === post.posterId) return user.profile_picture
                                    }).join("")}
                                    alt="" />
                            </Link>
                        )}
                        <div className="details">
                            {userData._id === post.posterId && (
                                <Link to="/profile" style={{ textDecoration: "none", color: "inherit" }}>
                                    <span className="name">
                                        {!isEmpty(usersData[0]) &&
                                            usersData.map((user) => {
                                                if (user._id === post.posterId) return user.pseudo
                                            })}
                                    </span>
                                </Link>
                            )}
                            {userData._id !== post.posterId && (
                                <Link to={`/${post.posterId}`} style={{ textDecoration: "none", color: "inherit" }}>
                                    <span className="name">
                                        {!isEmpty(usersData[0]) &&
                                            usersData.map((user) => {
                                                if (user._id === post.posterId) return user.pseudo
                                            })}
                                    </span>
                                </Link>
                            )}
                            <span className="date">{getTimeElapsed(post.createdAt)}</span>
                        </div>
                    </div>
                    {post.posterId !== userData._id &&
                        (<FollowHandler idToFollow={post.posterId} page="post" />)}
                </div>
                <div className="content">
                    {isUpdated === false && <p>{post.message}</p>}
                    {isUpdated && (
                        <div className="updatePost">
                            <input type="text" defaultValue={post.message} onChange={(e) => setText(e.target.value)} />
                            <div >
                                <button onClick={updateItem}> valider </button>
                            </div>
                        </div>
                    )}
                    <img src={post.picture} alt="" />
                </div>
                <div className="info">
                    <div className="item">
                        <LikeButton post={post} />
                        {post.likers?.length}
                        <div className="Comment">
                            <Comment htmlColor="blue" onClick={() => setDiplay(!display)} />
                            {post.comments?.length}
                        </div>
                    </div>
                    <div className="item">
                        {userData._id === post.posterId && (
                            <>
                                <div onClick={() => setIsUpdated(!isUpdated)} className="btn" >
                                    <span><DriveFileRenameOutline /> </span>
                                </div>
                                <span><DeletePost id={post._id} /></span>
                            </>
                        )}
                    </div>
                </div>
                {display && <Comments post={post} />}
            </div>
        </div>
    );
};

export default Post;
