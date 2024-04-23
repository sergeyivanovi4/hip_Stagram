import React from 'react';
import UserBio from '../userBio/userBio';
import "./UserPage.css";
import { useDispatch, useSelector } from 'react-redux';


function UserPage({



}) {

	const user = useSelector(state => state.auth?.userInfo);
console.log("UserPageuseruser", user)
  return (
    <div className="userpage">
        <UserBio 
          avatar={user?.avatar.url}
          _id={user?._id}
          nick={user?.nick}
	        login={user?.login}
          followers={user?.followers}
          following={user?.following}
        />
    </div>
  )
}

export default UserPage