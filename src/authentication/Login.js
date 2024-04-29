import React, { useState } from "react";
import "./Login.css";
import { actionFullLogin, store } from "../app/_store"
import { useLoginMutation, authSlice } from "../app/_store";
import { useDispatch } from 'react-redux';


function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [{isLoading, data}] = useLoginMutation() // ?
  const dispatch = useDispatch()

  const handleLogin = () => {
    if (!login || !password) {
      alert("Будь ласка, заповніть усі поля");
      return;
    }
    if (login.length < 3 || password.length < 3) {
      alert("Логін та пароль повинні містити принаймні 3 символи");
      return;
    }
    dispatch(actionFullLogin(login, password));
  };

//   const handleLogin = async (username, password) => {
//     try {
//         const response = await actionFullLogin(username, password);
//         const token = response?.data?.token; // Використовуємо оператор безпечного доступу до властивості
//         if (token) {
//             localStorage.setItem('token', token);
//             dispatch(authSlice.actions.login(token));
//         } else {
//             console.error('Token is undefined or null');
//         }
//     } catch (error) {
//         console.error('Error logging in:', error);
//     }
// };
  

  // console.log('LOGIN FORM', isLoading, data)
  // console.log("store.getState", store.getState());
  
  return (
    <div className="login">
         <div className="login__logo">Вхід в аккаунт</div>
      <input
        onChange={(e) => setLogin(e.target.value)}
        type="text"
        placeholder="Ваш логін"
        value={login}
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Ваш пароль"
        value={password}
      />
      <button onClick={handleLogin} disabled={isLoading}>
        {isLoading ? "..." : "Авторизуватися"}
      </button>
    </div>
  );

 
}


export default Login;