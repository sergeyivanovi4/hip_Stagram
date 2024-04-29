import React, { useState } from 'react';
import "./UserCardPhotos.css";
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useDispatch, useSelector } from "react-redux";
import { handleLikeToggle } from '../timeline/posts/Post'; 
import { sendComment, useGetPostOneQuery } from '../app/_store';
import { addLikeToPost, removeLikeFromPost } from "../app/_store";
import PhotoModal from '../photoModal/PhotoModal';
import ImageWithLoader from '../imageWithLoader/ImageWithLoader';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function UserCardPhotos({
   _id, likes, like, avatar, postImage, comments,commentsText, likesId, isLoading, login, nick,
}) {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
// console.log("nick1", nick)
    const { id } = auth.payload.sub;
// console.log("id", id)
    const Liked = likes.find((like) => like.owner._id === id);
// console.log("LikedLikedLikedLiked", Liked)
// console.log("likeslikeslikeslikeslikeslikeslikes", likes)

  const handleLikeToggle = () => {
    if (auth?.payload) {
        if (!Liked) {
            dispatch(addLikeToPost(_id));
        } else {
            const { _id } = Liked;
            // console.log("else ==== id", _id)
            dispatch(removeLikeFromPost(_id));
        }
    }
};

const onCommentSendClick = () => {
  if(comment) {
      dispatch(sendComment(  comment, _id));
      setComment("");
  } else {
      alert("Пустий коментар")
  }
}

  const [ isModalVisible, setIsModalVisibal ] = useState(false);
  const [ comment, setComment ] = useState("");


  return (
    <div className='usercard'>
		  <ImageWithLoader src={postImage} alt={"image"} className='useracrd__img'/>

    	<div className='usercard__hover'/>
        <div className='usercard__icons'>
            <Checkbox 
                        {...label} 
                        icon={<FavoriteBorder style={{ color: 'white' }} />} 
                        checkedIcon={<Favorite style={{ color: '#1aacd4' }} />} 
                        className='usercard__icon' 
                        checked={Liked || false}
                        onChange={handleLikeToggle}
            />         
            <span className='usercard__num usercard__num__r'>{likes?.length || "0"}</span>

            <Checkbox 
                        {...label} 
                        icon={<ChatBubbleOutlineIcon style={{ color: 'white' }} />} 
                        checkedIcon={<ChatBubbleOutlineIcon style={{ color: 'white' }} />} 
                        className='usercard__icon' 
                        onChange={() => setIsModalVisibal(true)}
            />
            <span className='usercard__num'>{comments?.length || "0"}</span>
        </div>
                <PhotoModal 
                    isOpen={isModalVisible}
                    onClose={() => setIsModalVisibal(false)}
                    nick={nick}
                    login={login}
                    comments={comments}
                    avatar={avatar}
                    commentValue={comment}
                    setCommentValue={setComment}
                    handleLikeToggle={handleLikeToggle}
                    onCommentSendClick={onCommentSendClick}
                    isLoading={isLoading}
                    postImage={postImage}
                    Liked={Liked}
                    likes={likes}
                />
    </div>
  )
}

export default UserCardPhotos