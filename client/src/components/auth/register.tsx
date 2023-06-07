import React, { FormEvent } from "react";
// import { input, Button } from "@mui/material";
import { useState } from "react";
import {  useAppDispatch } from "../../app/hooks";
import { registerUser } from "../../action/authAction";
import { TypeRegisterData } from "../../action/actionType";
import { useNavigate } from "react-router-dom";

const Register = () => {

  const [userdata, setuserdata] = useState<TypeRegisterData>({
    name: "",
    email: "",
    password: "",
    repassword: "",
  });
  const navigate=useNavigate();
  const dispatch = useAppDispatch();

  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setuserdata({ ...userdata, [e.target.name]: e.target.value });
  };

  const onsubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(registerUser(userdata));
    navigate("/login");
  };

  return (
    <div className="flex justify-center mt-20">
        <div className="card shadow-lg card-container w-[500px]  p-5  rounded-xl ">
          <div className=" w-full mb-1 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            <h2>Register</h2>
            <div className="flex justify-center mt-6">
              <img
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                alt="profile-img"
                className="profile-img-card w-24 h-24 rounded-full"
              />
            </div>
          </div>
            <form onSubmit={onsubmit}>
            <div className="w-full m-auto mt-52">
                <div className=" mb-3">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium leading-6 text-gray-900 flex mb-1"
                    >
                      User Name
                    </label>
                    <input
                      onChange={onchange}
                      name="name"
                      type="text"
                      placeholder="Username"
                      required
                      className="w-full rounded-md ps-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <div className=" mb-3">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium leading-6 text-gray-900 flex mb-1"
                    >
                    Email Address
                    </label>
                    <input
                      onChange={onchange}
                      name="email"
                      type="email"
                      placeholder="email"
                      required
                      className="w-full rounded-md ps-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <div className=" mb-3">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium leading-6 text-gray-900 flex mb-1"
                    >
                    Password
                    </label>
                    <input
                      onChange={onchange}
                      name="password"
                      type="password"
                      placeholder="password"
                      required
                      className="w-full rounded-md ps-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <div className=" mb-3">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium leading-6 text-gray-900 flex mb-1"
                    >
                    Confirm Password
                    </label>
                    <input
                      onChange={onchange}
                      name="repassword"
                      type="password"
                      placeholder="repassword"
                      required
                      className="w-full rounded-md ps-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <div className="btn_group flex justify-center">
                    <button
                      type="submit"
                      className="flex mb-3 justify-center mx-4 rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      <span className="text-white">Register</span>
                    </button>
                    <a href="/login">
                      <button
                        type="button"
                        className="flex  justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        To Login
                      </button>
                    </a>
                  </div>
              </div>
            </form>
        </div>
    </div>
  );
};

export default Register;
