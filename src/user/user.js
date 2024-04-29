import React from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { useGetFindOneQuery, useGetUserByIdQuery } from "../app/_store"
import "./user.css";

function User({ 
	// nick, 
	// avatar, 
	_id, 
	login,
  createdAt,
	owner, 
	user, 
	children 
}) {
  // const [ updateNick, {isFetching, data}] = useSetUserNickMutation();
  const { isFetching: isFetchingFromBack, data: dataFromBack } = useGetUserByIdQuery(_id);
  const nick = dataFromBack?.UserFindOne?.nick
  const avatar = dataFromBack?.UserFindOne?.avatar?.url
  	// console.log("dataFromBack!", dataFromBack)

	const history = useHistory();

	const navigateToUserPage = (_id) => {
        history.push(`/${_id}`);
    };

    const handleUserClick = () => {
        navigateToUserPage(_id);
    };

  return (
    <div className="user">
      <div className="user__root" onClick={handleUserClick}>
        {avatar ? (
          	<img src={`http://hipstagram.node.ed.asmer.org.ua/${avatar}`} alt="logo" className="user__avatar" />
		) : (
				<Avatar className="user__Avatar" >{nick ? nick[0].toUpperCase() : login?.[0].toUpperCase()}</Avatar>
		)}
        <span className="user__name">{nick || login}</span>
      </div>
    </div>
  );
}

export default User;
