import {
    FOLLOW_USER,
    GET_USER,
    UNFOLLOW_USER,
    UPLOAD_PICTURE,
    UPLOAD_COVER,
} from "../actions/user.actions";

const initialState = {};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            return action.payload;
        case UPLOAD_PICTURE:
            return {
                ...state,
                profile_picture: action.payload,
            };
        case UPLOAD_COVER:
            return {
                ...state,
                cover_picture: action.payload,
            };

        case FOLLOW_USER:
            return {
                ...state,
                following: [action.payload.idToFollow, ...state.following],
            };
        case UNFOLLOW_USER:
            return {
                ...state,
                following: state.following.filter(
                    (id) => id !== action.payload.idToUnfollow
                ),
            };
        default:
            return state;
    }
}
