import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import InputForm from "../misc/InputForm";
import { GuildAPI } from "../API/GuildAPI";
import { ToastContainer, toast } from "react-toastify";
import "../../css/main.css";

const Register = () => {
  const [data, setData] = useState({
    IGN: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [redirect, setRedirect] = useState(false);

  const onRegister = async (e: any) => {
    e.preventDefault();
    try {
      await GuildAPI.post("/auth/sign-up", data);
      setRedirect(true);
    } catch (error) {
      if (error.response) {
        if (typeof error.response.data.message === "string") {
          toast.error(error.response.data.message, {
            bodyClassName: "text-sm",
            progressClassName: "fancy-progress-bar",
          });
        } else if (typeof error.response.data.message === "object") {
          toast.error(error.response.data.message[0], {
            bodyClassName: "text-sm",
          });
        }

        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  if (redirect) return <Redirect to="/verification" />;

  return (
    <div className="m-16 flex justify-center flex-col items-center">
      <ToastContainer />

      <form
        onSubmit={(e) => onRegister(e)}
        className="bg-white shadow-md rounded-lg px-10 py-8 lg:w-1/3 flex flex-col items-center"
      >
        <div className="flex  justify-center mb-5">
          <h1 className="font-bold text-xl ">Register</h1>
        </div>
        <div className="flex flex-col justify-center ">
          <InputForm
            name="IGN"
            type="text"
            id="IGN"
            value={data.IGN}
            setData={setData}
            data={data}
            placeholder="Type your In-Game name"
          ></InputForm>
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
          <InputForm
            name="Confirm Password"
            type="password"
            id="confirmPassword"
            value={data.confirmPassword}
            setData={setData}
            data={data}
            placeholder="Type your password again"
          ></InputForm>
          <button
            className="transition duration-500 hover:bg-blue-700 focus:outline-none ease-in-out text-sm bg-blue-600 p-2 mb-3 rounded-full  text-white"
            type="submit"
          >
            Register
          </button>
          <Link
            className="text-xs self-center text-blue-500 hover:text-blue-600"
            to="/login"
          >
            Already have an account?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
