// Post.js
import React, { useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import TelegramIcon from '@mui/icons-material/Telegram';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { addLikeToPost, removeLikeFromPost, updateLikesCountForPost } from "../../app/_store";
import './Post.css';
import Likes from "./Likes"
import UserBadge from '../../userBadge/UserBadge';
import Comment from './Comment';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function Post({
    owner, _id, likes, text, postImage, comments, user, likesCountProp
}) 
{
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth); 
    const [isCommentsShown, setIsCommentsShown] = useState(false);

   
console.log("comments", comments);
console.log("postImage", postImage);
console.log("likes", likes);
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
        

        // // const [isLiked, setIsLiked] = useState(likes);
        // const [likesCount, setLikesCount] = useState(likesCountProp);
        // const [createLikes] = useCreateLikesMutation();
        // const { getAllLikes }  = useGetAllLikesQuery();
       
        

        // const handleLikeToggle = () => {
        //     const alreadyLiked = likes.find((like) => like._id=== _id);
        //     if (alreadyLiked) {
        //         dispatch(removeLikeFromPost(_id, alreadyLiked._id));
        //     } else {
        //         dispatch(addLikeToPost(_id, { /* об'єкт з даними лайку */ }));
        //     }
        //     dispatch(updateLikesCountForPost(_id));
        // };
        const { id } = auth.payload.sub;
        const Liked = likes.find((like) => like.owner._id === id);

        console.log("alreadyLiked  id ", Liked);
        
       
        const handleLikeToggle = () => {

            if (auth?.payload) {

                if (!Liked) {
                    dispatch(addLikeToPost( _id ));
                    // setChecked(true);
                    console.log("працює   dispatch(addLikeToPost(_id));");
                } else {
                    const { _id } = Liked
                    console.log("LikedId  id ", _id);
                    dispatch(removeLikeFromPost(_id));
                    // setChecked(false);
                    console.log("працює    dispatch(removeLikeFromPost(_id, alreadyLiked._id));");
                }
                
                dispatch(updateLikesCountForPost(_id));
                console.log("працює   dispatch(updateLikesCountForPost(_id));");
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
                            checked={Liked || false}
                            onChange={handleLikeToggle}
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
                </div>
                <div className='post__comment'>
                    {renderComments()}
                </div>
                <textarea 
                    className='post__textarea' 
                    value={commentValue} 
                    onChange={handleCommentChange} 
                />
            </div>
        </div>
    );
}


export default Post;
