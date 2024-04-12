import "./UserBadge.css";
import { useHistory } from "react-router-dom";

import React from 'react'

function UserBadge({
    nickName,
    avatar,
    _id,
    children
}) {

    const history = useHistory();

    const onUserBadgeClick = () => {
        history.push(`/${_id}`);
    }

  return (
    <div className="user__badge__root" onClick={onUserBadgeClick}>
        {
            avatar ? <img scr={avatar} akt="logo" className="user__badge__avatar" /> : <div className="user_badge_placeholder"/>
        }
        <img />
        <span className="user__badge__name">{nickName}</span>
    </div>
  )
}

export default UserBadge