import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  //   const [user, loading, error] = useAuthState(auth);

  // console.log(user);

  const navMenu = (
    <>
      <li>
        <Link to="/">Home </Link>
      </li>

      <li>
        <Link to="/contact-us">Contact Us</Link>
      </li>

      <li tabIndex={0} className="">
        {/* {user ? (
          <>
            <div className="p-0">
              <img
                src={
                  user.photoURL ||
                  "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                }
                alt=""
                className=" w-12 mx-2 rounded-full border-4 border-green-300"
              />
            </div>

             profile dropdown 
            <ul className="p-2 bg-slate-700 menu menu-compact dropdown-content gap-2 mt-12 -left-3 lg:-left-5 lg:mt-0">
              {user.displayName && (
                <li className="">
                  <span className=" cursor-text">{user.displayName}</span>
                </li>
              )}

              <li>
                <Link to="" className="justify-between">
                  My Profile Info
                </Link>
              </li>
             
              
              <li>
                <Link to="">Settings</Link>
              </li>
              <li>
                <button onClick={() => signOut(auth)}>Logout</button>
              </li>
            </ul>
          </>
        ) : (
        )}*/}
        <Link to="login"> Login </Link>
      </li>
    </>
  );

  return (
    <div className="navbar bg-slate-700  text-green-500  px-2 lg:px-20 py-0">
      <div className="navbar-start">
        <Link
          to=""
          className="btn text-green-500 uppercase btn-ghost   text-lg"
        >
          <img
            src="https://icon-library.com/images/admin-login-icon/admin-login-icon-5.jpg"
            alt=""
            className=" w-8 mx-1"
          />{" "}
          Authentication
        </Link>
      </div>

      {/* Navbar End dropdown for mobile */}
      <div className="navbar-end  ">
        <div className="dropdown dropdown-end">
          <label tabIndex={1} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={1}
            className="menu menu-compact dropdown-content mt-1 p-2 gap-2 shadow bg-slate-700 rounded-box w-52"
          >
            {navMenu}
          </ul>
        </div>

        {/* Navbar End menu */}
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal gap-2 px-1 my-2 ">{navMenu}</ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
