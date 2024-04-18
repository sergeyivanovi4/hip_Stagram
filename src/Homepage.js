import React, { useEffect, useState } from "react";
import "./Homepage.css";
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import ChatIcon from '@mui/icons-material/Chat';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import {Router, Route, Link, Switch} from 'react-router-dom';
import createHistory from "history/createBrowserHistory";
import UserPage  from "./userPage/UserPage";
import PageMain from "./timeline/PageMain";
import User from "./user/user";
import { useDispatch, useSelector } from 'react-redux';
import { authSlice, useGetFindOneQuery } from "./app/_store";



const history = createHistory()

const Aside = () => {
	const dispatch = useDispatch()

	const { data: response, error, isLoading } = useGetFindOneQuery() // ?


	const handleLogout = () => {
		localStorage.removeItem('token');
		dispatch(authSlice.actions.logout());
		history.push(`/`);
	};

	const user = useSelector(state => state.auth.userInfo);
	console.log("userAside", user);

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
				<Link to="/news">Reels</Link>
			</button>
			<button className="sidenave__btn">
                <ChatIcon />
				<Link to="/pageabout">Чат</Link>
			</button>
            <button className="sidenave__btn">
                <FavoriteBorderIcon />
				<Link to="/pageabout">Сповіщення</Link>
			</button>
            <button className="sidenave__btn">
                <AddCircleOutlineIcon />
				<Link to="/pageabout">Створити</Link>
			</button>
			<button className="sidenave__btn">
				<User 
					key={user?._id} 
					_id={user?._id} 
					login={user?.login}
					avatar={user?.avatar}
				/>
			</button>
			
			{/* <li>
			    <Link to="/post/1">POST 1</Link>
			</li> */}
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

const Create = () => 
<>
	<h2>
		:_id
	</h2>
</>

const News = () => 
<>
	<h2>
		Новини
	</h2>
</>

const PageAbout = () => 
<>
	<h2>
		Мій профіль: 
	</h2>
	{/* <ProfileScreen name={'Serhii'} description={'cool_man'}  /> */}
</>


const Page404 = () =>
	<h1>Щось пішло не так</h1>


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
                            <Route path="/:_id" component = { UserPage } exact  />
                            <Route path="/news" component = { News } exact  />
                            <Route path="/pageabout" component = { PageAbout } exact  />
                            {/* <Route path="/post/:_id" component = { PagePost } /> */}
                            <Page404 />
                    </Switch>               
                </div>
            
            </div>
		</Router>
     
    )
}

export default Homepage;