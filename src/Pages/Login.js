import React from "react";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";

import { useForm } from "react-hook-form";
import auth from "../firebase.init";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [signInWithGoogle, GUser, loading, error] = useSignInWithGoogle(auth);
  const [signInWithEmailAndPassword, LUuser, LLoading, LError] =
    useSignInWithEmailAndPassword(auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [user] = useAuthState(auth);

  if (user) {
    navigate("/");
  }

  const input =
    "input input-bordered input-accent w-full max-w-xs focus:outline-0";

  const onSubmit = (data) => {
    // event.preventDefault()
    signInWithEmailAndPassword(data.email, data.password);
  };

  return (
    <div className="mx-auto my-10 w-96 border-2 shadow-2xl p-10 rounded-lg">
      <div className=" ">
        <div className="mb-8">
          <h1 className=" text-center font-semibold text-green-600 text-3xl">
            Please Login
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-2">
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
          <div className="my-2">
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

      <div className=" grid grid-cols-3 justify-around text-center mt-5 text-3xl ">
        <div className=" text-center">
          <button onClick={() => signInWithGoogle()}>
            <i className="fa-brands fa-google-plus-g text-center text-red-600"></i>
          </button>
        </div>
        <div className=" text-center">
          <i className="fa-brands fa-facebook text-center text-blue-500"></i>
        </div>
        <div className=" text-center">
          <i className="fa-brands fa-github text-center"></i>
        </div>
        <div>{/* <i className="fa-brands fa-linkedin-in"></i> */}</div>
      </div>
    </div>
  );
};

export default Login;
