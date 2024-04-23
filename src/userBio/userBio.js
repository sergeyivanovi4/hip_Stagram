import React from 'react';
import "./userBio.css";
import Avatar from "@mui/material/Avatar";
import UserCounter from '../userCounter/UserCounter';

function UserBio({
    nick, 
	avatar, 
	_id, 
	login,
    followers,
    following,

} 
) {
    console.log("avataravataravataravatar", avatar)
  return (
    <div className="userbio">
        <div>
            {avatar ? (
                    <img scr={`http://hipstagram.node.ed.asmer.org.ua/${avatar}`} alt='img' akt="logo" className="userbio__avatar" />
            ) : (
                    <Avatar className="userbio__avatar" >{login?.[0].toUpperCase()}</Avatar>
            )}
        </div>

        <div className='userbio__info'>
            <div className='userbio__main'>
                <span className='userbio__nick'>{nick}</span>
            </div>
            <div className='userbio__main'>
                <UserCounter count={5} text="Дописів" className='userbio__counter'/>
                <UserCounter count={followers.length} text="Читачів" className='userbio__counter'/>
                <UserCounter count={following.length} text="Стежить" className='userbio__counter'/>
            </div>
        </div>
    </div>
  )
}

export default UserBio