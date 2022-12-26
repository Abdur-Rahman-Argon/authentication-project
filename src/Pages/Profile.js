import React, { useEffect, useState } from "react";
import { useAuthState, useDeleteUser } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import useInfo from "../Components/useInfo";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";

const Profile = () => {
  const [user, loading, error] = useAuthState(auth);
  const [deleteUser] = useDeleteUser(auth);

  const [userData] = useInfo();

  return (
    <div className=" border px-2 md:px-10 py-5 my-10 rounded w-10/12 mx-auto bg-slate-100">
      <div className=" my-10 mx-auto flex flex-col justify-center items-center gap-10 lg:gap-20 md:flex-row">
        <div>
          <div className="avatar w-44 h-44 mx-auto ">
            <img
              src={
                user?.photoURL ||
                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              }
              className="rounded-full border-2 border-accent"
              alt=""
            />
          </div>
        </div>
        <div>
          <div className=" w-full px-2 text-slate-700">
            <div className="my-2 pr-4">
              <h1 className=" text-xl lg:text-3xl font-semibold py-1 border-b-2 border-slate-400 text-slate-700">
                <i class="fa-regular fa-user"></i> Profile Information
              </h1>
            </div>
            <div className="">
              <div>
                <h1 className="text-lg font-medium my-2">
                  Name:
                  <span className=" font-bold text-xl mx-3 ">
                    {user ? user?.displayName : "Information Empty"}
                  </span>
                </h1>
              </div>
              <div>
                <h1 className=" flex flex-col md:flex-row text-lg font-medium my-2">
                  Email:{" "}
                  <span className=" md:font-bold  md:text-xl ">
                    {user ? user?.email : "Information Empty"}
                  </span>{" "}
                </h1>
              </div>
              <div>
                <h1 className="text-lg font-medium my-2">
                  Phone Number:
                  <span className=" font-bold text-xl mx-3 ">
                    {user && userData ? userData?.phoneNumber : "Number Empty"}
                  </span>
                </h1>
              </div>
              <div>
                <h1 className="text-lg font-medium my-2">
                  Gender:{" "}
                  <span className=" font-bold text-xl mx-3 ">
                    {user && userData ? userData?.gender : "Information Empty"}
                  </span>
                </h1>
              </div>
              <div>
                <h1 className="text-lg font-medium my-2">
                  Date Of Birth:
                  <span className=" font-bold text-xl mx-3 ">
                    {user && userData
                      ? userData?.dateOfBirth
                      : "Information Empty"}
                  </span>
                </h1>
              </div>
            </div>
            {user ? (
              <>
                <div className=" flex flex-row justify-between my-8 items-center gap-10 ">
                  <div>
                    <button
                      className=" btn btn-success"
                      onClick={() => signOut(auth)}
                    >
                      Log Out
                    </button>
                  </div>

                  {/* <div>
                    <Link to="/update" className=" btn btn-primary">
                      Update Profile
                    </Link>
                  </div> */}

                  <div>
                    <label
                      htmlFor="my-modal-6"
                      className="btn text-black font-semibold btn-error"
                    >
                      Delete Account
                    </label>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-center my-10 text-lg">
            Are You Sure Delete Your Account
          </h3>

          <div className="modal-action justify-around">
            <label htmlFor="my-modal-6" className="btn">
              No
            </label>
            <label
              htmlFor="my-modal-6"
              onClick={async () => {
                const success = await deleteUser();
                if (success) {
                  alert("You have been deleted");
                }
              }}
              className="btn text-black font-semibold btn-error"
            >
              Yes Delete
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
