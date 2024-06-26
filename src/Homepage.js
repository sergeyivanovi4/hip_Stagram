import React, { useEffect, useState } from "react";
import "./Homepage.css";
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import ChatIcon from '@mui/icons-material/Chat';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import {Router, Route, Link, Switch, useHistory } from 'react-router-dom';
import createHistory from "history/createBrowserHistory";
import UserPage  from "./userPage/UserPage";
import PageMain from "./timeline/PageMain";
import User from "./user/user";
import { useDispatch, useSelector } from 'react-redux';
import { authSlice, useCreateAvatarMutation, useGetFindOneQuery } from "./app/_store";
import AddPost from "./addPost/AddPost";



const history = createHistory()

const Aside = () => {
	const dispatch = useDispatch()
	const history = useHistory();
	const { data: response, error, isLoading } = useGetFindOneQuery() // ?
	// const {data: UserUpsert}  = useCreateAvatarMutation()
	// console.log("UserUpsert!", UserUpsert)
	// console.log("response!", response)
	
	const handleLogout = () => {
		localStorage.removeItem('token');
		dispatch(authSlice.actions.logout());
		history.push(`/`);
	};

	const user = useSelector(state => state.auth.userInfo);
	console.log("user!", user)

	if (isLoading) {
		return (
			<p className="pagemain__loading">Завантаження...</p>
		)
	}

	return (
		<aside>
		<div className="sidenave__logo">
			<Link to="/">hip_Stagram</Link>
		</div>

        <div className="sidenave__buttons">
            <button className="sidenave__btn">
                <HomeIcon />
				<Link to="/">Головна</Link>
			</button>
			<button className="sidenave__btn">
                <SearchIcon />
				<Link to="/search">Пошук</Link>
			</button>
			{/* <button className="sidenave__btn">
                <ExploreIcon />
				<Link to="/:_id">Дослідити</Link>
			</button> */}
			<button className="sidenave__btn">
                <SlideshowIcon />
				<Link to="/reels">Reels</Link>
			</button>
			<button className="sidenave__btn">
                <ChatIcon />
				<Link to="/chat">Чат</Link>
			</button>
            <button className="sidenave__btn">
                <FavoriteBorderIcon />
				<Link to="/favorit">Сповіщення</Link>
			</button>
            <button className="sidenave__btn">
                <AddCircleOutlineIcon />
				<Link to="/addPost">Створити</Link>
			</button>
			<button className="sidenave__btn">
				<User 
					key={user?._id} 
					_id={user?._id} 
					login={user?.login}
					avatar={user?.avatar?.url}
					nick={user?.nick}
					followers={user?.followers}
          			following={user?.following}
				/>
			</button>
			
        </div>

        <div className="sidenave__more">
                <button onClick={handleLogout} disabled={isLoading} className="sidenave__btn">
					Вихід
                <LogoutIcon />
            </button>    
		</div>
        
	</aside>
	)
}

	


const Search = () => 
<>
	<h2>
		Пошук
	</h2>
</>
const Favorit = () => 
<>
	<h2>
		Favorit...
	</h2>
</>

const Reels = () => 
<>
	<h2>
		Reels...
	</h2>
</>

const Chat = () => 
<>
	<h2>
		Chat...
	</h2>
</>


const Page404 = () => <h1>Щось пішло не так</h1>
	


function Homepage() {
    return (
        <Router history = {history}>
            <div className="homepage">
                
                <div className="homepage__nav">
                    <Aside />
                </div>

                <div className="homepage__timeline">
                    <Switch>
                            <Route path="/" component = { PageMain } exact />
                            <Route path="/search" component = { Search } exact  />
                            <Route path="/reels" component = { Reels } exact  />
                            <Route path="/chat" component = { Chat } exact  />
							<Route path="/addPost" component = { AddPost } />
							<Route path="/favorit" component = { Favorit } />
							<Route path="/:_id" render={(props) => <UserPage _id={props.match.params._id} />} exact />

                            <Page404 />
                    </Switch>               
                </div>
            
            </div>
		</Router>
     
    )
}

export default Homepage;