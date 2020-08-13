import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputForm from "../misc/InputForm";

const Login = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const onFormSubmit = () => {};
  return (
    <div className="m-16 flex justify-center">
      <form
        onSubmit={onFormSubmit}
        className="bg-white shadow-md rounded-lg px-10 py-8"
        method="POST"
      >
        <div className="flex  justify-center mb-5">
          <h1 className="font-bold text-xl ">Login</h1>
        </div>
        <div className="flex flex-col justify-center ">
          <InputForm
            name="Username"
            type="text"
            id="username"
            value={data.username}
            setData={setData}
            data={data}
            placeholder="Type your username"
          ></InputForm>
          <InputForm
            name="Password"
            type="password"
            id="password"
            value={data.password}
            setData={setData}
            data={data}
            placeholder="Type your password"
          ></InputForm>

          <button
            className="transition duration-500 hover:bg-blue-700 focus:outline-none text-sm bg-blue-600 p-2 mb-3 rounded-full text-white"
            type="submit"
          >
            Login
          </button>
          <Link
            className="text-xs self-center text-blue-500 hover:text-blue-600"
            to="/register"
          >
            Dont have an account?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
