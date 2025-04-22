import { useState, useRef } from "react";
import checkValidData from "../Utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/userSlice";
import { BG_IMAGE, PROFILE_PIC } from "../Utils/constants";
import Header1 from "./Header";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignedIn, setisSignedIn] = useState(null);
  const [errMessage, seterrMessage] = useState(null);
  const dispatch = useDispatch();
  const Email = useRef(null);
  const Password = useRef(null);
  const FullName = useRef(null);
  const navigate = useNavigate();

  const handleSignIn = () => {
    setisSignedIn(!isSignedIn);
  };

  const handleClick = () => {
    const message = checkValidData(Email.current.value, Password.current.value);
    seterrMessage(message);
    if (message) return;

    if (!isSignedIn) {
      createUserWithEmailAndPassword(
        auth,
        Email.current.value,
        Password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: FullName.current.value,
            photoURL: PROFILE_PIC,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(addUser({ uid, email, displayName, photoURL }));
              navigate("/browse");
            })
            .catch((error) => seterrMessage(error.message));
        })
        .catch((error) => {
          seterrMessage(error.code + " - " + error.message);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        Email.current.value,
        Password.current.value
      )
        .then(() => navigate("/browse"))
        .catch((error) => {
          seterrMessage(error.code + " - " + error.message);
        });
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white">
      <Header1 />
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <img
          src={BG_IMAGE}
          alt="bg"
          className="object-cover w-full h-full opacity-60"
        />
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="relative bg-black bg-opacity-80 p-6 sm:p-10 rounded-lg w-full sm:w-3/4 md:w-2/3 lg:w-2/5 xl:w-1/3 mx-auto mt-20"
      >
        <h1 className="text-2xl sm:text-3xl font-bold py-4">
          {isSignedIn ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignedIn && (
          <input
            ref={FullName}
            type="text"
            placeholder="Full Name"
            className="p-3 sm:p-4 m-2 w-full rounded-lg bg-gray-800 placeholder-gray-300 border border-white"
          />
        )}
        <input
          ref={Email}
          type="text"
          placeholder="Email or mobile number"
          className="p-3 sm:p-4 m-2 w-full rounded-lg bg-gray-800 placeholder-gray-300 border border-white"
        />
        <input
          ref={Password}
          type="password"
          placeholder="Password"
          className="p-3 sm:p-4 m-2 w-full rounded-lg bg-gray-800 placeholder-gray-300 border border-white"
        />

        {errMessage && (
          <p className="text-red-500 text-sm py-2 font-semibold">
            {errMessage}
          </p>
        )}

        <button
          className="bg-red-600 hover:bg-red-700 p-3 sm:p-4 m-2 w-full rounded-lg font-bold transition"
          onClick={handleClick}
        >
          {isSignedIn ? "Sign In" : "Sign Up"}
        </button>

        <p
          className="text-sm text-center p-2 m-2 cursor-pointer hover:underline"
          onClick={handleSignIn}
        >
          {isSignedIn
            ? "New to bringit? Sign up now."
            : "Already registered? Sign in now."}
        </p>
      </form>
    </div>
  );
};

export default Login;
