import React, { useState } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
  useUpdateProfile,
} from "react-firebase-hooks/auth";

import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import SocialLogin from "./SocialLogin";
import auth from "../firebase.init";

const Signup = () => {
  const [imgUrl, setImgUrl] = useState(
    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  );
  const [fromData, setFromData] = useState();

  const [createUserWithEmailAndPassword, CUser, cLoading, cError] =
    useCreateUserWithEmailAndPassword(auth);

  const [updateProfile, updating] = useUpdateProfile(auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const imageStorageKey = "e9638798533213a9040c701a88ef9635";

  const onImageChange = (e) => {
    const [file] = e.target.files;
    setImgUrl(URL.createObjectURL(file));

    const image = file;
    console.log(image);
    const formData = new FormData();
    formData.append("image", image);
    setFromData(formData);
  };

  const input = "input input-bordered input-accent w-full focus:outline-0";

  const onSubmit = async (data) => {
    if (data.password === data.confirm) {
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
              phoneNumber: data.phoneNumber,
              gender: data.gender,
              dateOfBirth: data.dateOfBirth,
            });
          } else {
            updateProfile({
              displayName: data.displayName,
              phoneNumber: data.phoneNumber,
              gender: data.gender,
              dateOfBirth: data.dateOfBirth,
            });
          }
        });
    }
  };

  // console.log(cError);
  return (
    <div className="lg:mx-auto my-10 mx-20 px-5 lg:w-6/12 border-2 shadow-2xl lg:px-10 py-5 rounded-lg">
      <div className=" ">
        <div className="mb-10">
          <h1 className=" text-center font-semibold text-green-600 text-3xl">
            Please SignUp
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/*  */}
          <div className="my-2">
            <div className="w-36 mb-8 mx-auto relative">
              <div className="avatar w-36 h-36 mx-auto ">
                <img
                  src={imgUrl}
                  className="rounded-full border-2 border-accent"
                  alt=""
                />
              </div>
              <div className="absolute bottom-14 right-1 w-16">
                <i className="fa-solid fa-camera ml-7 text-black-400 text-[32px] absolute"></i>
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
            <label htmlFor="name" className=" label">
              <span className="label-text text-base font-semibold text-slate-600">
                Full Name
              </span>
            </label>
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
            <label htmlFor="email" className="label ">
              <span className="label-text text-base font-semibold text-slate-600">
                Email
              </span>
            </label>
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

          <div className="my-2">
            {/*  */}
            <label htmlFor="phoneNumber" className="label ">
              <span className="label-text text-base font-semibold text-slate-600">
                Phone Number
              </span>
            </label>
            <input
              placeholder="Please Input phoneNumber"
              type="text"
              className={`${input}  ${errors.phoneNumber && " border-red-500"}`}
              {...register("phoneNumber", { required: true })}
            />
            <p>
              {" "}
              {errors.phoneNumber && (
                <span className=" ml-5 text-red-500">
                  Phone Number is required
                </span>
              )}
            </p>
          </div>

          {/*  */}
          <div className="my-2">
            <label htmlFor="email" className="label ">
              <span className="label-text text-base font-semibold text-slate-600">
                Date Of Birth
              </span>
            </label>
            <input
              placeholder="12/12/2023"
              type="text"
              className={`${input}  ${errors.dateOfBirth && " border-red-500"}`}
              {...register("dateOfBirth", { required: true })}
            />
            <p>
              {" "}
              {errors.dateOfBirth && (
                <span className=" ml-5 text-red-500">
                  dateOfBirth is required
                </span>
              )}
            </p>
          </div>

          <div className="my-3">
            <label className=" ">
              <span className="label-text text-base font-semibold text-slate-600">
                Gender
              </span>
            </label>

            {/*  */}
            <div className=" flex justify-between items-center">
              <div className="flex justify-start items-center">
                <input
                  value="male"
                  name="gender"
                  id="gender"
                  type="radio"
                  className={`  text-sm  ${errors.gender && " border-red-500"}`}
                  {...register("gender", { required: true })}
                />{" "}
                <label className="label">
                  <span className="label-text text-sm font-semibold text-slate-600">
                    Male
                  </span>
                </label>
              </div>

              <div className="flex justify-start items-center">
                {/*  */}
                <input
                  value="male"
                  name="gender"
                  id="gender"
                  type="radio"
                  className={`  text-sm  ${errors.gender && " border-red-500"}`}
                  {...register("gender", { required: true })}
                />
                <label className="label">
                  <span className="label-text text-sm font-semibold text-slate-600">
                    Female
                  </span>
                </label>
              </div>

              {/*  */}
              <div className="flex justify-start items-center">
                <input
                  value="male"
                  name="gender"
                  id="gender"
                  type="radio"
                  className={`  text-sm  ${errors.gender && " border-red-500"}`}
                  {...register("gender", { required: true })}
                />
                <label className="label">
                  <span className="label-text text-sm font-semibold text-slate-600">
                    Custom
                  </span>
                </label>
              </div>
            </div>
            <p>
              {" "}
              {errors.gender && (
                <span className=" ml-5 text-red-500">Gender is required</span>
              )}
            </p>
          </div>

          {/*  */}
          <div className="my-2">
            <label htmlFor="email" className="label ">
              <span className="label-text text-base font-semibold text-slate-600">
                Password
              </span>
            </label>
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
          <div className="my-2">
            <label htmlFor="email" className="label ">
              <span className="label-text text-base font-semibold text-slate-600">
                Confirm Password
              </span>
            </label>
            <input
              placeholder="Please Confirm password"
              type="password"
              className={`${input} ${errors.confirm && " border-red-500"}`}
              {...register("confirm", { required: true })}
            />
            {/*  */}
            <p>
              {" "}
              {errors.confirm && (
                <span className=" ml-5 text-red-500">
                  confirm Password is required
                </span>
              )}
            </p>
          </div>
          {/*  */}

          {cError ==
            "FirebaseError: Firebase: Error (auth/email-already-in-use)." && (
            <p className=" text-center font-medium ml-5 text-red-500">
              Already Have a Account.
            </p>
          )}
          {cError ==
            "FirebaseError: Firebase: Error (auth/user-not-found)." && (
            <p className=" text-center font-medium ml-5 text-red-500">
              User Not Found, Please input correct Email.
            </p>
          )}

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

      <div className=" text-center mt-5 text-3xl ">
        <SocialLogin />
      </div>
    </div>
  );
};

export default Signup;
