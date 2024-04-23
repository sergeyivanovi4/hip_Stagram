import React from 'react';
import "./Comment.css";

function Comment({
    _id,
    text
}) {
  return (
    <div className='comment'>
        <span className='comment__name'>{_id}: </span>
        <span className='comment__text'>{text}</span>
    </div>
  )
}

export default Comment