import React from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { useGetFindOneQuery } from "../app/_store"
import "./user.css";

function User({ 
	nick, 
	avatar, 
	_id, 
	login,
	owner, 
	user, 
	children 
}) {

	const history = useHistory();

	const navigateToUserPage = (_id) => {
        history.push(`/${_id}`);
    };

    const handleUserClick = () => {
        navigateToUserPage(_id);
    };

  return (
    <div>
      <div className="user__root" onClick={handleUserClick}>
        {avatar ? (
          	<img src={`http://hipstagram.node.ed.asmer.org.ua/${avatar}`} alt="logo" className="user__avatar" />
		) : (
				<Avatar className="user__Avatar" >{login?.[0].toUpperCase()}</Avatar>
		)}
        <span className="user__name">{nick || login}</span>
      </div>
    </div>
  );
}

export default User;
