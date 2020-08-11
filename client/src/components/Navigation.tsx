import React, { useState } from "react";

const Navigation = () => {
  const [menu, setMenu] = useState("hidden");
  const [hidden, setHidden] = useState(false);
  const toggleMenu = () => {
    setMenu(hidden ? "hidden" : "block");
    setHidden(!hidden);
  };
  return (
    <nav className="flex items-center justify-between flex-wrap bg-black p-5">
      <div className="transition duration-500 ease-in-out flex items-center flex-shrink-0 text-white mr-6 cursor-pointer hover:text-yellow-400 transform hover:scale-110 ">
        <svg
          className=" fill-current h-8 w-8 mr-2 "
          width="54"
          height="54"
          viewBox="0 0 54 54"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
        </svg>
        <span className="font-semibold text-xl tracking-tight ">MAFIA</span>
      </div>
      <div className="block lg:hidden">
        <label htmlFor="menu-toggle" className="cursor-pointer lg:hidden block">
          <svg
            className="fill-current text-white "
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
          <a
            href="/"
            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4"
          >
            Home
          </a>
          <a
            href="/"
            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4"
          >
            Attendance
          </a>
          <a
            href="/"
            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white"
          >
            Activities
          </a>
        </div>
        <div className={`transition duration-500 ease-in-out ${menu} lg:block`}>
          <a
            href="/"
            className="inline-block text-sm lg:px-4 py-2 leading-none rounded text-white mt-4 lg:mt-0"
          >
            Raphael
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
