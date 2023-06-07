import React, { FormEvent } from "react";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { logoutUser } from "../../action/authAction";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const Navbar = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };
  
  return (
    <>
      <nav className="navbar bg-gray-800 text-white  flex p-3">
        <div className="flex">
          <Link className="px-4 hover:text-white text-lg" to="/blog">
            All Blogs
          </Link>
          <Link className="px-4 hover:text-white text-lg" to="/myblog">
            My Blogs
          </Link>
        </div>
        <div className="flex">
          {auth.isauth ? (
            <div className="flex justify-between">
              <div>
            <Link className="px-4 hover:text-white text-lg" to="/blog">
              Blog
            </Link>
            <Link className="px-4 hover:text-white text-lg" to="/myblog">
              My Blog
            </Link>
            </div>

              <img
              src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
              alt="profile-img"
              className="profile w-8 h-8 m rounded-full me-3"/>
              {auth.user.name}
                <button className="px-4 hover:text-white text-lg" onClick={logout}>
                   Logout
                </button>
            </div>
          ) : (
            <>
              <Link className="px-4 hover:text-white text-lg" to="/login">
                Login
              </Link>
              <Link className="px-4 hover:text-white text-lg" to="/register">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
