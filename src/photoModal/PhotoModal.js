import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Avatar, Checkbox } from '@mui/material';
import React, { useEffect } from 'react';
import Modal from "react-modal";
import Comment from '../timeline/posts/Comment';
import "./PhotoModal.css"
import Textarea from '../Textareas/Textarea';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


function PhotoModal({
    isOpen,
    onClose,
    avatar,
    nick,
    login,
    comments,
    postImage,
    Liked,
    likes,
    commentValue, setCommentValue, handleLikeToggle, isLoading, onCommentSendClick
}) {

    useEffect(() => {
        const body = document.querySelector("body");
        if (isOpen) {
            body.classList.add("body__overlay")
        } else {
            body.classList.remove("body__overlay")
        }
    }, [isOpen])


  return (
    <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        className="modal"
        overlayClassName="modal__overlay"
    >
        <div className='modal__main'>
            <div className='modal__main__image'>
                <img src={`http://hipstagram.node.ed.asmer.org.ua/${postImage}`} alt='img' className='modal__main__img'/>
            </div>
            <div className='modal__main__commentBlock'>
                <div>
                    <div className='modal__main__logo'>
                                {avatar ? (
                                    <img src={`http://hipstagram.node.ed.asmer.org.ua/${avatar}`} alt="logo" className="modal__main__logo__avatar" />
                                ) : (
                                        <Avatar className="modal__main__logo__Avatar" >{login?.[0].toUpperCase()}</Avatar>
                                )}
                                <span className="modal__main__logo__name">{nick || login}</span>
                    </div>
                    <div className='modal__main__comment'>
                        {comments?.map((comment) => <Comment
                            key={comment._id} 
                            _id={comment._id} 
                            text={comment.text} 
                            name={comment.owner?.nick ? comment.owner?.nick : comment.owner?.login} 
                            textColor="black"
                        />)}
                    </div>
                </div>
     

                <div className='modal__main__icons'>
                    
                    <div className='modal__main__likes'>
                        Має 
                        <Checkbox 
                                {...label} 
                                icon={<FavoriteBorder />} 
                                checkedIcon={<Favorite />} 
                                className='modal__icons__icon' 
                                checked={Liked || false}
                                onChange={handleLikeToggle}
                        />
                        
                        {likes.length} вподобайку
                    </div>
                    <Textarea
                        placeholder='Додайте коментар'
                        value={commentValue} 
                        onChange={setCommentValue}
                        buttonText="Опублікувати"
                        onSubmit={onCommentSendClick}
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </div>
    </Modal>
  )
}

export default PhotoModal