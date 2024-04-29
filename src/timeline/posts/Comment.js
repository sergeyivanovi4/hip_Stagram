import React from 'react';
import "./Comment.css";

function Comment({
    _id,
    text,
    name
}) {

  // console.log("name", name);

  return (
    <div className='comment'>
        <span className='comment__name'>{name}: </span>
        <span className='comment__text'>{text}</span>
    </div>
  )
}

export default Comment