import React from 'react';
import "./UserCounter.css";

function UserCounter({
    text, 
    count,
}) {
  return (
    <div>
        <span className='usercounter__count'>
            {count}
        </span>
        <span className='usercounter__text'>
            {text}
        </span>
    </div>
  )
}

export default UserCounter