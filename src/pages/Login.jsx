import { GoogleAuthProvider } from "firebase/auth";
import { useRegister } from "../hooks/useRegister";
import { Link } from "react-router-dom";
import { Form } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import videoLog from "../video/fruit-cut.mp4";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";
import { toast } from "react-hot-toast";
function Login() {
  const dispatch = useDispatch();
  const { signWithGoogle } = useRegister();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    dispatch(login(email, password));
    toast.success("Your account has been");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r ">
      <video
        src={videoLog}
        className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto transform -translate-x-1/2 -translate-y-1/2 z-[-1]"
        muted
        autoPlay
        loop
      ></video>
      <Form
        method="post"
        onSubmit={handleLogin}
        className="card w-96 p-8shadow-lg rounded-lg flex flex-col gap-y-4 bg-gray-200/45 p-10"
      >
        <h4 className="text-center font-bold text-3xl">Login</h4>
        <input
          type="email"
          name="email"
          placeholder="yourgmail@gmail.com"
          className="input input-bordered w-full mt-2"
        />
        <input
          type="password"
          name="password"
          placeholder="********"
          className="input input-bordered w-full mt-2"
        />
        <button
          type="submit"
          className="btn btn-primary btn-block capitalize mt-4"
        >
          Login
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
          Are you alreadey registerad ?
          <Link className="link text-cyan-400" to="/register">
            Register
          </Link>
        </p>
      </Form>
    </div>
  );
}

export default Login;
