// Post.js
import React, { useState, useSelector } from 'react';
import Avatar from '@mui/material/Avatar';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import TelegramIcon from '@mui/icons-material/Telegram';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useCreateLikesMutation, useGetAllLikesQuery } from "../../app/_store"
import './Post.css';
import Likes from "./Likes"
import UserBadge from '../../userBadge/UserBadge';
import Comment from './Comment';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function Post({
    owner, _id, likes, text, postImage, comments, user, likesCountProp
}) {
    const [isCommentsShown, setIsCommentsShown] = useState(false);

console.log("comments", comments);
console.log("postImage", postImage);
console.log("likes", likes);
console.log("owner", owner);
console.log("user", user);
console.log("likesCountProp", likesCountProp);

    const renderComments = () => {
        if (comments && comments.length > 2 && !isCommentsShown) {
            const commentCopy = [...comments];
            const commentForRender = commentCopy.splice(comments.length - 2, 2);
    
            return (
                <>
                    <span className='post__comment__title' onClick={() => setIsCommentsShown(true)}>
                        {`Переглянути всі коментарі: ${comments.length - commentForRender.length}`}
                    </span>
                    {commentForRender.map((comment) => <Comment key={comment._id} _id={comment._id} text={comment.text} />)}
                </>
            );
        }
    
        return (
            <>
                {comments && comments.map((comment) => <Comment key={comment._id} _id={comment._id} text={comment.text} />)}
    
                {isCommentsShown ? (
                    <span className='post__comment__title' onClick={() => setIsCommentsShown(false)}>Сховати коментарі</span>
                ) : null}
            </>
        );
    };
    
//
//

        const [commentValue, setCommentValue] = useState("");

        const handleCommentChange = (event) => {
            const value = event.target.value;
            if (value !== "Добавте ваш коментар") { 
                setCommentValue(value); 
            }
        };
        

        // const [isLiked, setIsLiked] = useState(likes);
        const [likesCount, setLikesCount] = useState(likesCountProp);
        const [createLikes] = useCreateLikesMutation();
        const { getAllLikes }  = useGetAllLikesQuery();
        
        const calculateNewLikesCount = (currentLikesCount, newLikeData) => {

            const currentCount = currentLikesCount || 0;
            if (newLikeData) {
                return currentCount +1 ;
            } else {
                return currentCount  ;
            }
        };

        const handleLikeToggle = async () => {

            try {
                const likeInput = { 
                    like: {
                        post: { _id }
                    }
                };
                const { data } = await createLikes({ like: likeInput });
                console.log("datahandleLikeToggle", data)

                if (data.LikeUpsert) {
                    // Оновлюємо кількість лайків, якщо відомі
                    const newLikesCount = calculateNewLikesCount(likesCount, data.LikeUpsert);
                    setLikesCount(newLikesCount);
                    console.log("newLikesCount", newLikesCount)
                }

            } catch (error) {
                console.error("Помилка при лайканні фото:", error);
            }
        };
        

    return (
        <div className='post'>
            <div className='post__header'>
                <div className='post__headerAuthor'>
                    <UserBadge user={user} />
                </div>
            </div>
            <div className='post__image'>
                <img src={`http://hipstagram.node.ed.asmer.org.ua/${postImage}`} alt='img' />
            </div>
            <div className='post__footer'>
                <div className='post__footerIcons'>
                    <div className='post__footerMain'>
                        <Checkbox 
                            {...label} 
                            icon={<FavoriteBorder />} 
                            checkedIcon={<Favorite />} 
                            className='postIcon' 
                            onChange={handleLikeToggle}
                            // checked={0}
                        />
                        <Checkbox {...label} icon={<ChatBubbleOutlineIcon />} checkedIcon={<ChatBubbleOutlineIcon />} className='postIcon' />
                        <Checkbox {...label} icon={<TelegramIcon />} checkedIcon={<TelegramIcon />} className='postIcon' />
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
                        Має {likes.length} вподобайку

                     Має <Likes likesCount={likesCountProp} likes={likes} /> вподобайку
                </div>
                <div className='post__comment'>
                    {renderComments()}
                </div>
                <textarea 
                    className='post__textarea' 
                    value={commentValue} 
                    onChange={handleCommentChange} 
                    // onClick={() => setActiveTextarea(_id)} 
                />
            </div>
        </div>
    );
}

export default Post;
