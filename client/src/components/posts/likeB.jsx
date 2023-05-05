import React, { useContext, useEffect, useState } from 'react';
import {
    FavoriteBorderOutlined, FavoriteOutlined
} from "@mui/icons-material";
import { UidContext } from "../../AppContext";
import { useDispatch } from "react-redux";
import { likePost, unlikePost } from "../../actions/post.actions";

const LikeButton = ({ post }) => {
    const [liked, setLiked] = useState(false);
    const userId = useContext(UidContext)
    const dispatch = useDispatch();


    useEffect(() => {
        if (post.likers?.includes(userId)) setLiked(true)
        else setLiked(false)
    }, [liked, post.likers, userId]);

    const like = () => {
        dispatch(likePost(post._id, userId))
        setLiked(true);
    }

    const unlike = () => {
        dispatch(unlikePost(post._id, userId))
        setLiked(false);
    }

    return (
        <div>
            {liked === true && <FavoriteOutlined htmlColor='red' onClick={unlike} />}
            {liked === false && <FavoriteBorderOutlined onClick={like} />}
        </div>
    );
};

export default LikeButton;
