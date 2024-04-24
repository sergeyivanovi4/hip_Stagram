import React from 'react';
import "./UserCardPhotos.css";
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useDispatch, useSelector } from "react-redux";
import { handleLikeToggle } from '../timeline/posts/Post'; 
import { useGetPostOneQuery } from '../app/_store';
import { addLikeToPost, removeLikeFromPost } from "../app/_store";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function UserCardPhotos({
  key,  _id, likes, like,avatar, postImage, comments,commentsText, likesId
}) {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    console.log("authid", auth)
    const { id } = auth.payload.sub;
    console.log("id", id)

    const Liked = likes.find((like) => like.owner._id === id);
    console.log("LikedLikedLikedLiked", Liked)
    console.log("likeslikeslikeslikeslikeslikeslikes", likes)

  const handleLikeToggle = () => {
    if (auth?.payload) {
        if (!Liked) {
            dispatch(addLikeToPost(_id));
        } else {
            const { _id } = Liked;
            console.log("else ==== id", _id)

            dispatch(removeLikeFromPost(_id));
        }
    }
};
  return (
    <div className='usercard'>
        <img src={`http://hipstagram.node.ed.asmer.org.ua/${postImage}`} alt="image" className='card__img'/>
        <div className='usercard__hover'/>
        <div className='usercard__icons'>
            <Checkbox 
                        {...label} 
                        icon={<FavoriteBorder />} 
                        checkedIcon={<Favorite />} 
                        className='usercard__icon' 
                        checked={Liked || false}
                        onChange={handleLikeToggle}
            />         
            <span className='usercard__num usercard__num__r'>{likes?.length || "0"}</span>

            <Checkbox 
                        {...label} 
                        icon={<ChatBubbleOutlineIcon />} 
                        checkedIcon={<ChatBubbleOutlineIcon />} 
                        className='usercard__icon' 
            />
            <span className='usercard__num'>{comments?.length || "0"}</span>
        </div>
    </div>
  )
}

export default UserCardPhotos