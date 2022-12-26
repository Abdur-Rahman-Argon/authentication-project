import React from "react";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";

import { useForm } from "react-hook-form";

import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "./SocialLogin";
import auth from "../firebase.init";

const Login = () => {
  const [signInWithEmailAndPassword, LUuser, LLoading, LError] =
    useSignInWithEmailAndPassword(auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  if (user) {
    navigate("/");
  }

  const input = "input input-bordered input-accent w-full focus:outline-0";

  const onSubmit = (data) => {
    // event.preventDefault()
    signInWithEmailAndPassword(data.email, data.password);
  };
  // console.log(LError);

  return (
    <div className="lg:mx-auto my-10 mx-20 px-5 lg:w-6/12 border-2 shadow-2xl lg:px-10 py-5 rounded-lg">
      <div className=" ">
        <div className="mb-10">
          <h1 className=" text-center font-semibold text-green-600 text-3xl">
            Please Login Now
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-5">
            {/*  */}
            <input
              placeholder="Please Input Email"
              type="email"
              className={`${input}  ${errors.email && " border-red-500"}`}
              {...register("email", { required: true })}
            />
            <p>
              {" "}
              {errors.email && (
                <span className=" ml-5 text-red-500">Email is required</span>
              )}
            </p>
          </div>

          {/*  */}
          <div className="my-5">
            <input
              placeholder="Please Input password"
              type="password"
              className={`${input} ${errors.password && " border-red-500"}`}
              {...register("password", { required: true })}
            />
            {/*  */}
            <p>
              {" "}
              {errors.password && (
                <span className=" ml-5 text-red-500">Password is required</span>
              )}
            </p>
          </div>

          {/*  */}
          {LError ==
            "FirebaseError: Firebase: Error (auth/wrong-password)." && (
            <p className=" text-center font-medium ml-5 text-red-500">
              Wrong password, Please input correct password.
            </p>
          )}
          {LError ==
            "FirebaseError: Firebase: Error (auth/user-not-found)." && (
            <p className=" text-center font-medium ml-5 text-red-500">
              User Not Found, Please input correct Email.
            </p>
          )}

          <input
            className=" text-xl btn btn-primary my-3 w-full"
            value={"Login"}
            type="submit"
          />
        </form>
      </div>

      <p className=" text-center  font-semibold">
        Not Any Account{" "}
        <Link to="/signup" className="text-green-700">
          SignUp
        </Link>
      </p>

      <div className="divider">OR</div>

      <div className=" text-center mt-5 text-3xl ">
        <SocialLogin />
      </div>
    </div>
  );
};

export default Login;
