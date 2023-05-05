import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getPosts } from "../../actions/post.actions";
import { isEmpty, getTimeElapsed } from "../Utils";
import "./comments.scss";
import { Send } from "@mui/icons-material";
import { DeleteOutline, DriveFileRenameOutline } from "@mui/icons-material";
import { editComment, deleteComment } from "../../actions/post.actions";

const Comments = ({ post }) => {
    const [text, setText] = useState("");
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false);
    const [textEdit, setTextEdit] = useState("");
    const [commentEdit, setCommentEdit] = useState("");

    const handleComment = (e) => {
        e.preventDefault();

        if (text) {
            dispatch(addComment(post._id, userData._id, text, userData.pseudo))
                .then(() => dispatch(getPosts()))
                .then(() => setText(''));
        }
    };

    const handleEdit = () => {
        // console.log("text" + text);
        if (textEdit) {
            dispatch(editComment(post._id, commentEdit._id, textEdit));
        }
        setEdit(false);
        setCommentEdit("");
    };

    return (
        <div className="comments">
            {post.comments.map((comment) => {
                return (
                    (edit === false || comment._id !== commentEdit._id) &&
                    <div className="comment" key={comment._id}>
                        <img
                            src={
                                !isEmpty(usersData[0]) &&
                                usersData.map((user) => {
                                    if (user._id === comment.commenterId) return user.profile_picture;
                                    else return null;
                                }).join("")
                            }
                            alt="commenter-pic"
                        />
                        <div className="info">
                            <span>{comment.commenterPseudo}</span>
                            <p>{comment.text}</p>
                            {console.log(comment.text)}
                        </div>
                        {userData._id !== comment.commenterId && <span className="date">{getTimeElapsed(comment.timestamp)}</span>}
                        {userData._id === comment.commenterId && (
                            <div className="dataEditComment">
                                <span className="date">{getTimeElapsed(comment.timestamp)}</span>
                                <div className="editComment">
                                    <DriveFileRenameOutline
                                        fontSize="small"
                                        onClick={() => {
                                            setEdit(true);
                                            setTextEdit(comment.text);
                                            setCommentEdit(comment);
                                        }}
                                    />
                                    <DeleteOutline
                                        fontSize="small"
                                        onClick={() => {
                                            if (window.confirm("Voulez-vous supprimer ce commentaire ?")) {
                                                dispatch(deleteComment(post._id, comment._id))
                                                    .then(() => dispatch(getPosts()))
                                                    .then(() => setText(''));
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                )
            })}
            {edit ?
                <div className="write">
                    <img src={userData.profile_picture} alt="" />
                    <input
                        type="text"
                        name="textEdit"
                        onChange={(e) => setTextEdit(e.target.value)}
                        value={textEdit}
                        placeholder="write a comment"
                    />

                    <Send onClick={handleEdit} />
                </div> :
                <div className="write">
                    <img src={userData.profile_picture} alt="" />
                    <input
                        type="text"
                        name="text"
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                        placeholder="write a comment" />
                    <Send onClick={handleComment} />
                </div>
            }
        </div>
    );
};

export default Comments; 