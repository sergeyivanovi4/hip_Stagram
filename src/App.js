import React, { useState, useEffect, useRef } from "react";

import "./App.css";
import {
  BrowserRouter,
  Routes,
  Router,
  Route,
  Link,
  Redirect,
  useParams,
  Switch,
} from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import Homepage from "./Homepage";
import Authenticate from "./authentication/Authenticate";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { authSlice } from "./app/_store";





const history = createHistory();

function App() {
  const dispatch = useDispatch()

  const user = useSelector(state => state.auth.token);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        dispatch(authSlice.actions.login(token));
    }
}, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
			  <Route>

          {user ? <Homepage /> : <Authenticate />}

        </Route>
			</BrowserRouter>
    </div>
  );
}

export default App;
