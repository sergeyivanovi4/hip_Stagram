import React from 'react';
import "./userBio.css";
import Avatar from "@mui/material/Avatar";
import UserCounter from '../userCounter/UserCounter';
import { useGetPostFindsQuery } from '../app/_store';

function UserBio({
    nick, 
	avatar, 
	_id, 
	login,
    followers,
    following,
    createdAt,
    postCount,
} 
) {

    // const {data} = useGetPostFindsQuery(_id);
    // const {postCount} = data?.PostFind?._id;

    const date = new Date(parseInt(createdAt));
    const formattedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}року`;

    console.log("datedatedateavataravataravataravatar", createdAt)
    console.log("avataravataravataravatar", avatar)
  return (
    <div className="userbio">
        <div>
            {avatar ? (
                    <img src={`http://hipstagram.node.ed.asmer.org.ua/${avatar}`}  alt="logo" className="userbio__avatar" />
            ) : (
                    <Avatar className="userbio__avatar" >{login?.[0].toUpperCase()}</Avatar>
            )}
        </div>

        <div className='userbio__info'>
            <div className='userbio__main'>
                <span className='userbio__nick'>{nick}</span>
            </div>
            <div className='userbio__main'>
                <UserCounter count={postCount} text="Дописів" className='userbio__counter'/>
                <UserCounter count={followers?.length || 0} text="Читачів" className='userbio__counter'/>
                <UserCounter count={following?.length || 0} text="Стежить" className='userbio__counter'/>
            </div>
            <div className='userbio__main'>
                <span className='userbio__name'>Ваш логін: {login}</span>
            </div>
            <div className='userbio__main'>
                <span className='userbio__date'>Дата створення сторінки: {formattedDate}</span>
            </div>
        </div>
    </div>
  )
}

export default UserBio