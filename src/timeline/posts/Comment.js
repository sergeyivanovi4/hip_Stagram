import React from 'react';
import "./Comment.css";

function Comment({
    user,
    text
}) {
  return (
    <div className='comment'>
        <span className='comment__name'>{user}: </span>
        <span >{text}</span>

    </div>
  )
}

export default Comment