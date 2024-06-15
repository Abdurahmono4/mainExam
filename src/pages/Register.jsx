import { useRegister } from "../hooks/useRegister";
import { Form } from "react-router-dom";
import { GoogleAuthProvider } from "firebase/auth";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice"; // Import the correct action
import { useState } from "react";
import videoLog from "../video/fruit-cut.mp4";

function Register() {
  const dispatch = useDispatch();
  const { signWithGoogle, isPending } = useRegister();

  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(login({ email, password, displayName, photoURL }));
    console.log(email, password, displayName, photoURL);
  };

  return (
    <div className="h-screen flex items-center justify-center  ">
      <video
        src={videoLog}
        className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto transform -translate-x-1/2 -translate-y-1/2 z-[-1] object-cover"
        muted
        autoPlay
        loop
      ></video>
      <Form
        method="post"
        onSubmit={handleRegister}
        className="card w-96 p-8 shadow-lg rounded-lg flex flex-col gap-y-4  bg-gray-100/50 "
      >
        <h4 className="text-center font-bold text-3xl text-gray-800">
          Register
        </h4>
        <input
          type="text"
          name="displayName"
          placeholder="User Name"
          className="input input-bordered w-full mt-2"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <input
          type="url"
          name="photoURL"
          placeholder="https://photoURL.com"
          className="input input-bordered w-full mt-2"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
        />
        <input
          type="email"
          name="email"
          placeholder="test@gmail.com"
          className="input input-bordered w-full mt-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="********"
          className="input input-bordered w-full mt-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="btn btn-primary btn-block capitalize mt-4"
          disabled={isPending}
        >
          Register
        </button>
        <button
          type="button"
          onClick={signWithGoogle}
          className="btn btn-outline w-full flex items-center justify-center gap-2 mt-2"
        >
          <FcGoogle className="text-2xl" />
          <span className="text-lg">Google</span>
        </button>
        <p className="text-center">
          Are you already registered?
          <Link className="link text-cyan-400" to="/login">
            Login
          </Link>
        </p>
      </Form>
    </div>
  );
}

export default Register;
