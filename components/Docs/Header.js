import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = Cookies.get("loggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLoginLogout = () => {
    const newLoginState = !isLoggedIn;
    setIsLoggedIn(newLoginState);
    Cookies.set("loggedIn", newLoginState, { expires: 7 }); // cookie expires in 7 days
  };

  return (
    <header className="flex items-center justify-between bg-red-600 p-4">
      <div className="text-xl font-bold text-white">Hive Post Evolution</div>
      <button
        onClick={handleLoginLogout}
        className="rounded bg-white px-4 py-2 font-semibold text-red-600 transition duration-300 hover:bg-red-100"
      >
        {isLoggedIn ? "Log out" : "Login"}
      </button>
    </header>
  );
};

export default Header;
