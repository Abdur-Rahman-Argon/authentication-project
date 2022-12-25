import React, { useState } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
  useUpdateProfile,
} from "react-firebase-hooks/auth";

import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import SocialLogin from "./SocialLogin";

const Signup = () => {
  const [imgUrl, setImgUrl] = useState(
    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  );
  const [fromData, setFromData] = useState();
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle();

  const [createUserWithEmailAndPassword, CUser, cLoading, cError] =
    useCreateUserWithEmailAndPassword();

  const [updateProfile, updating] = useUpdateProfile();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const imageStorageKey = "2380d2dfbb3a1a216d57453cbd4c3837";

  const onImageChange = (e) => {
    const [file] = e.target.files;
    setImgUrl(URL.createObjectURL(file));

    const image = file;
    console.log(image);
    const formData = new FormData();
    formData.append("image", image);
    setFromData(formData);
  };

  const input =
    "input input-bordered input-accent w-full max-w-xs focus:outline-0";

  const onSubmit = async (data) => {
    // event.preventDefault()
    await createUserWithEmailAndPassword(data.email, data.password);

    const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;

    await fetch(url, {
      method: "POST",
      body: fromData,
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("image", result);
        if ((result.status = 200)) {
          const photoURL = result.data.url;
          updateProfile({
            displayName: data.displayName,
            photoURL: photoURL,
          });
        } else {
          updateProfile({
            displayName: data.displayName,
            photoURL: undefined,
          });
        }
        //
      });
  };

  return (
    <div className="mx-auto my-10 w-96 border-2 shadow-2xl p-10 rounded-lg">
      <div className=" ">
        <div className="mb-8">
          <h1 className=" text-center font-semibold text-green-600 text-3xl">
            Please SignUp
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/*  */}
          <div className="my-2">
            <div class="w-36 mb-8 mx-auto relative">
              <div class="avatar w-36 h-36 mx-auto ">
                <img
                  src={imgUrl}
                  className="rounded-full border-2 border-accent"
                  alt=""
                />
              </div>
              <div className="absolute bottom-14 right-1 w-16">
                <i class="fa-solid fa-camera ml-7 text-black-400 text-[32px] absolute"></i>
                <input
                  type="file"
                  onChange={onImageChange}
                  className="absolute w-full lg:scale-150 opacity-0"
                />
              </div>
            </div>
          </div>

          {/*  */}
          <div className="my-2">
            {/*  */}
            <input
              placeholder="Please Input Name"
              type="text"
              className={`${input}  ${errors.displayName && " border-red-500"}`}
              {...register("displayName", { required: true })}
            />
            <p>
              {errors.displayName && (
                <span className=" ml-5 text-red-500">Name is required</span>
              )}
            </p>
          </div>

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
            value={"SignUp"}
            type="submit"
          />
        </form>
      </div>

      <p className=" text-center  font-semibold">
        Have A Account{" "}
        <Link to="/login" className="text-green-700">
          Login
        </Link>
      </p>

      <div className="divider">OR</div>

      <div className=" grid grid-cols-3 justify-around text-center mt-5 text-3xl ">
        <SocialLogin />
      </div>
    </div>
  );
};

export default Signup;
