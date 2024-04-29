import React, { useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import TelegramIcon from '@mui/icons-material/Telegram';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { addLikeToPost, removeLikeFromPost, sendComment, useGetFindOneQuery } from "../../app/_store";
import Comment from './Comment';
import User from '../../user/user';
import PhotoModal from '../../photoModal/PhotoModal';
import Textarea from '../../Textareas/Textarea';
import ImageWithLoader from '../../imageWithLoader/ImageWithLoader';

import './Post.css';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function Post({
    owner, _id, likes, text, postImage, comments, user, likesCountProp, nick, login, name, createdAt, avatar

}) 
{
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth); 
    const [ isCommentsShown, setIsCommentsShown ] = useState(false);
    const [ comment, setComment ] = useState("")
    const [ isModalVisible, setIsModalVisibal ] = useState(false);

    const date = new Date(parseInt(createdAt));
    const formattedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}р.`;
  

// console.log("comments", comments);
// console.log("_idPostPostPostPost", _id);
// console.log("!authauthauthauthauthauthauthauth!", auth);
// console.log("comments", comments);
// console.log("postImage", postImage);
// console.log("likes", likes);
// console.log("likesCountProp", likesCountProp);

    const renderComments = () => {
        if (comments && comments.length > 2 && !isCommentsShown) {
            const commentCopy = [...comments];
            const commentForRender = commentCopy.splice(comments.length - 2, 2);
    
            return (
                <>
                    <span className='post__comment__title' onClick={() => setIsCommentsShown(true)}>
                        {`Переглянути щє ${comments.length - commentForRender.length} коментаря: `}
                    </span>
                    {commentForRender.map((comment) => 
                            <Comment key={comment._id} 
                                    _id={comment._id} 
                                    name={comment.owner?.nick ? comment.owner.nick : comment.owner?.login} 
                                    text={comment.text} 
                            />)}
                </>
            );
        }
    
        return (
            <>
                {comments && comments.map((comment) => 
                            <Comment 
                                key={comment._id} 
                                _id={comment._id} 
                                text={comment.text} 
                                name={comment.owner?.nick ? comment.owner.nick : comment.owner?.login} 
                            />)}
    
                {isCommentsShown ? (
                    <span className='post__comment__title' onClick={() => setIsCommentsShown(false)}>Сховати коментарі</span>
                ) : null}
            </>
        );
    };


        const { id } = auth.payload.sub;
        const Liked = likes.find((like) => like.owner._id === id);

// console.log("alreadyLiked  id ", Liked);
       
        const handleLikeToggle = () => {
            if (auth?.payload) {

                if (!Liked) {
                    dispatch(addLikeToPost( _id ));
                    // console.log("працює   dispatch(addLikeToPost(_id));");
                } else {
                    const { _id } = Liked
                    // console.log("LikedId  id ", _id);
                    dispatch(removeLikeFromPost(_id));
                    // console.log("працює    dispatch(removeLikeFromPost(_id, alreadyLiked._id));");
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

        const { data: response, error, isLoading } = useGetFindOneQuery(owner?._id) // ?
        // console.log("!!responsePageuseruser", response)
        const userId = response?.UserFindOne
        // console.log("UserPageuseruser", userId)


    const onCloseModal = () => {
        setComment("")
        setIsModalVisibal(false)
    }
    const onOpenModal = () => {
        setComment("")
        setIsModalVisibal(true)
    }

    return (
        <div className='post'>
            <div className='post__header'>
                <div className='post__headerAuthor' >               {/* onClick={handleUserClick} */}
                    <User 
                        key={userId?._id} 
                        _id={userId?._id} 
                        login={userId?.login}
                        avatar={userId?.avatar?.url}
                        nick={userId?.nick}
                        followers={userId?.followers}
                        following={userId?.following}
                        createdAt={createdAt}
                    />
                    <div className='post__date'>{formattedDate}</div>
                </div>
            </div>

            <ImageWithLoader 
                src={postImage} 
                alt={'img' } 
                className={'post__image'} 
            />

            <div className='post__footer'>
                <div className='post__footerIcons'>
                    <div className='post__footerMain'>
                        <Checkbox 
                            {...label} 
                            icon={<FavoriteBorder style={{ color: '#1aacd4' }} />} 
                            checkedIcon={<Favorite style={{ color: '#1aacd4' }} />} 
                            className='postIcon' 
                            checked={Liked || false}
                            onChange={handleLikeToggle}
                        />
                        <Checkbox 
                            {...label} 
                            icon={<ChatBubbleOutlineIcon style={{ color: '#1aacd4' }} />} 
                            checkedIcon={<ChatBubbleOutlineIcon style={{ color: '#1aacd4' }} />} 
                            className='postIcon' 
                            onChange={onOpenModal}
                            />
                        <Checkbox {...label} icon={<TelegramIcon />} checkedIcon={<TelegramIcon />} className='postIcon' style={{ color: '#1aacd4' }} />
                    </div>
                    <div className='post__footerSave'>
                        <Checkbox
                            {...label}
                            icon={<BookmarkBorderIcon />}
                            checkedIcon={<BookmarkIcon style={{ color: '#1aacd4' }} />}
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
                <Textarea
                        placeholder='Додайте коментар'
                        value={comment} 
                        onChange={setComment}
                        isLoading={isLoading}
                        onSubmit={onCommentSendClick}
                        buttonText="Опублікувати"
                    />

                <PhotoModal 
                    isOpen={isModalVisible}
                    onClose={onCloseModal}
                    nick={owner?.nick}
                    login={owner?.login}
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
        </div>
    );
}


export default Post;

