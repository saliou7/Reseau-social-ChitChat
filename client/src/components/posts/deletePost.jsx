import React from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../../actions/post.actions";
import { DeleteOutline } from "@mui/icons-material";
const DeleteCard = (props) => {
    const dispatch = useDispatch();

    const deleteQuote = () => dispatch(deletePost(props.id));

    return (
        <div
            onClick={() => {
                if (window.confirm("Voulez-vous supprimer cet article ?")) {
                    deleteQuote();
                }
            }}
        >
            <DeleteOutline />
        </div>
    );
};

export default DeleteCard;
