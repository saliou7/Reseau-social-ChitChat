import "./share.scss";
import "../posts/post.scss";
import Image from "../../assets/img.png";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../Utils";

import { addPost, getPosts } from "../../actions/post.actions";

const Share = () => {
    const [message, setMessage] = useState("");
    const [postPicture, setPostPicture] = useState(null);
    const [file, setFile] = useState();
    const userData = useSelector((state) => state.userReducer);
    const error = useSelector((state) => state.errorReducer.postError);
    const dispatch = useDispatch();

    const handlePost = async () => {
        if (message || postPicture) {
            const data = new FormData();
            data.append('posterId', userData._id);
            data.append('message', message);
            console.log(file)
            if (file) data.append("file", file);
            await dispatch(addPost(data));
            dispatch(getPosts());
            cancelPost();
        } else {
            alert("Veuillez entrer un message")
        }
    };

    const handlePicture = (e) => {
        setPostPicture(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
    };

    const cancelPost = () => {
        setMessage("");
        setPostPicture("");
        setFile("");
    };

    return (
        <div className="share">
            <div className="container">
                <div className="top">
                    <img
                        src={userData.profile_picture}
                        alt=""
                    />
                    <input type="text" placeholder={`What's on your mind ${userData.pseudo} `}
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                    />
                </div>
                <hr />

                {message || postPicture ? (
                    <div className="preview">
                        <div className="user">
                            <div className="userInfo">
                                <img src={userData.profile_picture} alt="user-pic" />
                                <div className="details">
                                    <span className="name">{userData.pseudo}</span>
                                </div>
                            </div>
                        </div>
                        <div className="content">
                            <p>{message}</p>
                            <img src={postPicture} alt="" />
                        </div>
                    </div>
                ) : null}

                <div className="bottom">
                    <div className="left">
                        <input
                            type="file" id="file"
                            accept=".jpg, .jpeg, .png"
                            onChange={(e) => handlePicture(e)}
                            style={{ display: "none" }} />
                        <label htmlFor="file">
                            <div className="item">
                                <img src={Image} alt="" />
                                <span>Add Image</span>
                            </div>
                        </label>

                        {!isEmpty(error.format) && <p>{error.format}</p>}
                        {!isEmpty(error.maxSize) && <p>{error.maxSize}</p>}

                    </div>
                    <div className="right">
                        {message || postPicture ? (
                            <button className="cancel" onClick={cancelPost}>cancel</button>
                        ) : null}
                        <button onClick={handlePost}>Share</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Share;
