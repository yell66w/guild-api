import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [menu, setMenu] = useState("hidden");
  const [hidden, setHidden] = useState(false);
  const toggleMenu = () => {
    setMenu(hidden ? "hidden" : "block");
    setHidden(!hidden);
  };
  return (
    <nav className="flex items-center justify-between flex-wrap bg-white p-5 shadow">
      <div className="transition duration-500 ease-in-out flex items-center flex-shrink-0 text-gray-900 mr-6 cursor-pointer transform hover:scale-110 ">
        <svg
          className=" fill-current h-8 w-8 mr-2 "
          width="54"
          height="54"
          viewBox="0 0 54 54"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
        </svg>
        <Link to="/" className="font-semibold text-xl tracking-tight">
          MAFIA
        </Link>
      </div>
      <div className="block lg:hidden">
        <label htmlFor="menu-toggle" className="cursor-pointer lg:hidden block">
          <svg
            className="fill-current text-gray-900 "
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <title>menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </label>
        <input
          className="hidden"
          type="checkbox"
          id="menu-toggle"
          onClick={toggleMenu}
        />
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div
          className={`transition duration-500 ease-in-out ${menu} lg:block text-sm lg:flex-grow`}
        >
          <Link
            to="/"
            className="block mt-4 lg:inline-block lg:mt-0 text-gray-900 hover:text-gray-900 mr-4"
          >
            Home
          </Link>
          <Link
            to="/attendance"
            className="block mt-4 lg:inline-block lg:mt-0 text-gray-900 hover:text-gray-900 mr-4"
          >
            Attendance
          </Link>
        </div>
        <div className={`transition duration-500 ease-in-out ${menu} lg:block`}>
          <Link
            to="/"
            className="inline-block text-sm lg:px-4 py-2 leading-none rounded text-gray-900 mt-4 lg:mt-0"
          >
            Raphael
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
