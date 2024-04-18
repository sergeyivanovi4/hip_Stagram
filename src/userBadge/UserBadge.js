import "./UserBadge.css";
import { useHistory } from "react-router-dom";
import Avatar from '@mui/material/Avatar';

import React from 'react'

function UserBadge({
    nick,
    avatar,
    _id,
    owner,
    user,
    children
}) {
    console.log("userUserBadge", user);
    const history = useHistory();

    const onUserBadgeClick = () => {
        history.push(`/${_id}`);
    }

  return (
    <div className="user__badge__root" onClick={onUserBadgeClick}>
        {
            avatar ? <img scr={avatar} akt="logo" className="user__badge__avatar" /> : <Avatar>{user?.[0].toUpperCase()}</Avatar>
        }
        <span className="user__badge__name">{user}</span>
    </div>
  )
}

export default UserBadge