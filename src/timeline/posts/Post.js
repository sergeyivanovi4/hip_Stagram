import React from 'react';
import Avatar from '@mui/material/Avatar';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import TelegramIcon from '@mui/icons-material/Telegram';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import "./Post.css";
import UserBadge from "../../userBadge/UserBadge";
import Comment from "./Comment";
import { useState } from "react";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };




function Post({
    user, postImage, likes, text, imgUrl, comments, avatar
}) {

    const [isCommentsShown, setIsCommentsShown] = useState(false);


    const renderComments = () => {
        if (comments.length > 2 && !isCommentsShown) {
            const commentCopy = [...comments];
            const commentForRender = commentCopy.splice(comments.length - 2, 2);
    
            return (
                <>
                    <span className='post__comment__title' onClick={() => setIsCommentsShown(true)}> {`Переглянути всі коментарі: ${comments.length - commentForRender.length}`}</span>
                    {commentForRender.map((comment) => <Comment {...comment} />)}
                </>
            )
        }
    
        return (
            <>
                {comments.map((comment) => <Comment {...comment} />)}
                {isCommentsShown && (
                    <span className='post__comment__title' onClick={() => setIsCommentsShown(false)}>Сховати коментарі</span>
                )}
            </>
        );
    };

  return (
    <div className='post'>
        <div className='post__header'>
            <div className='post__headerAuthor'>
                <UserBadge nickName={"Я"} _id={"001"} avatar={avatar}/>

                {/* <Avatar>{user.charAt(0).toUpperCase()}</Avatar>
                {user} • <span>{text}</span> */}
            </div>
            {/* <MoreHorizIcon /> */}

        </div>
        <div className='post__image'>
            <img src={postImage} alt='img'/>
        </div>
        <div className='post__footer'>
            <div className='post__footerIcons'>
                <div className='post__footerMain'>
                    <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} className='postIcon'/>
                    <Checkbox {...label} icon={<ChatBubbleOutlineIcon />} checkedIcon={<ChatBubbleOutlineIcon />} className='postIcon'/>
                    <Checkbox {...label} icon={<TelegramIcon />} checkedIcon={<TelegramIcon />} className='postIcon'/>
                </div>
                <div className='post__footerSave'>
                <Checkbox
                    {...label}
                    icon={<BookmarkBorderIcon />}
                    checkedIcon={<BookmarkIcon />}
                    className='postIcon'
                />
                </div>
            </div>
            <div className='post__footer__likes'>
                Має {likes} вподобайку
            </div>

            <div className='post__comment'>
                {renderComments()}
            </div>

            <textarea className='post__textarea' value={"Додайте кoментар..."}/>
        </div>

    </div>
  )
}

export default Post