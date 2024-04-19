import React, { useState } from "react";
import "./Signup.css";
import { useFullRegisterMutation, actionFullLogin } from "../app/_store";
import { useDispatch } from 'react-redux';



function Signup() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const dispatch = useDispatch()

    const [fullRegisterMutation, {isLoading, data}] = useFullRegisterMutation()  //
               // перерорбити реєстрацію
        ///
    // const dispatch = useDispatch()

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!login || !password || !confirmPassword) {
        alert("Будь ласка, заповніть усі поля");
        return;
      }
      if (password !== confirmPassword) {
        alert("Перевірочний пароль не співпадає зі створеним");
        return;
      }
      if (login.length < 3 || password.length < 3 || confirmPassword.length < 3) {
        alert("Логін та пароль повинні містити принаймні 3 символи");
        return;
      }

      
      const response = await fullRegisterMutation({ login: login, password: password });
      if (response.error) {
        console.error("Помилка під час реєстрації:", response.error);
        alert("Помилка під час реєстрації");
      } else {
        // Успішна реєстрація, встановлення стану автентифікації
        dispatch(actionFullLogin(login, password));
      }
    };
    


  return (
    <div className="signup">
    <div className="signup__logo">Реєстрація</div>

      <input
        onChange={(e) => setLogin(e.target.value)}
        type="text"
        placeholder="Створіть логін"
        value={login}
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Придумайте пароль"
        value={password}
      />
      <input
        onChange={(e) => setConfirmPassword(e.target.value)}
        type="password"
        placeholder="Повторіть пароль"
        value={confirmPassword}
      />

      <button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? "..." : "Зареєструватися"}
      </button>
    </div>
  );
}

export default Signup;