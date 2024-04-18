import React from 'react';
import "./Sugesstions.css";
import Avatar from '@mui/material/Avatar';
import UserBadge from "../userBadge/UserBadge"


function Sugesstions({
    nick,
    avatar,
    _id,
    user,
    children
}) {
    console.log("userSugesstions", user);

  return (
    <div className='sugesstion'>
        <div className='sugesstion__title'>
            for you
        </div>
        
        <UserBadge user={user} avatar={avatar} _id={_id}  className='sugesstion__title__userbadge'/>

        <div className='sugesstion__usernames'>
            <div className='sugesstion__username'>
                    <div className='sugesstion__username__left'>
                        <span className='avatar'>
                            <Avatar>R</Avatar>
                        </span>
                        <div className='username__info'>
                            <span className='username'>name</span>
                            <span className='username__relation'>new to hipstagram</span>
                        </div>
                    </div>
                    <div className='sugesstion__follow__btn'>
                        follow
                    </div>
            </div>
        </div>

        
        <div className='sugesstion__usernames'>
            <div className='sugesstion__username'>
                    <div className='sugesstion__username__left'>
                        <span className='avatar'>
                            <Avatar>R</Avatar>
                        </span>
                        <div className='username__info'>
                            <span className='username'>name</span>
                            <span className='username__relation'>new to hipstagram</span>
                        </div>
                    </div>
                    <div className='sugesstion__follow__btn'>
                        follow
                    </div>
            </div>
        </div>

        
        <div className='sugesstion__usernames'>
            <div className='sugesstion__username'>
                    <div className='sugesstion__username__left'>
                        <span className='avatar'>
                            <Avatar>R</Avatar>
                        </span>
                        <div className='username__info'>
                            <span className='username'>name</span>
                            <span className='username__relation'>new to hipstagram</span>
                        </div>
                    </div>
                    <div className='sugesstion__follow__btn'>
                        follow
                    </div>
            </div>
        </div>
    </div>
  )
}

export default Sugesstions