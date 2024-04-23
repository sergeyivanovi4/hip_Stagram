import React from 'react';
import UserBio from '../userBio/userBio';
import "./UserPage.css";
import { useDispatch, useSelector } from 'react-redux';
import { useGetFindOneQuery } from '../app/_store';


function UserPage({
	_id,
}) {


console.log("UserPage_id_id_id_id_id_id", _id)

const { data: response, error, isLoading } = useGetFindOneQuery(_id) // ?

  console.log("!!responsePageuseruser", response)

  const user = response?.UserFindOne
  console.log("UserPageuseruser", user)





  return (
    <div className="userpage">
        <UserBio 
          avatar={user?.avatar?.url}
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