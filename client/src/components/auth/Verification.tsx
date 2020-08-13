import React from "react";
import { Link } from "react-router-dom";

const Verification = () => {
  return (
    <div className="m-16 flex justify-center">
      <div className="bg-white shadow-md rounded-lg px-10 py-8">
        <div className="flex  justify-center mb-2">
          <h1 className="font-bold text-xl ">Success!</h1>
        </div>
        <div className="flex flex-col justify-center text-center">
          <p className="text-sm">
            Please wait for the administrator's approval.
          </p>
          <Link className="text-sm text-blue-500 mt-3" to="/login">
            Go back to the login page.
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Verification;
