import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";

const Header = () => {
  const { isLoggedIn, toggleLogin } = useContext(AuthContext);

  return (
    <header className="flex items-center justify-between bg-red-600 p-4">
      <div className="text-xl font-bold text-white">Hive Post Evolution</div>
      <button
        onClick={toggleLogin}
        className="rounded bg-white px-4 py-2 font-semibold text-red-600 transition duration-300 hover:bg-red-100"
      >
        {isLoggedIn ? "Log out" : "Login"}
      </button>
    </header>
  );
};

export default Header;
