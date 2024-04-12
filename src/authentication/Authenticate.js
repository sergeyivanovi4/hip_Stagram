import React, { useState } from "react";
import "./Authenticate.css";
import Login from "./Login";
import Signup from "./Signup";

function Authenticate() {
  const [active, setActive] = useState("login");

  const handleChange = () => {
    setActive(active === "login" ? "signup" : "login");
  };

  return (
    <div className="authenticate">
      <div className="auth__left">
        <div className="auth__left__logo">hip_Stagram</div>
      </div>
      <div className="auth__right">
        {active === "login" ? <Login /> : <Signup />}

        <div className="auth__more">
          <span>
            {active === "login" ? (
              <>
                Немає облікового запису?{" "}
                <button onClick={handleChange}>Зареєструватися</button>
              </>
            ) : (
              <>
                Є обліковий запис?<button onClick={handleChange}>Авторизуватися</button>
              </>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Authenticate;