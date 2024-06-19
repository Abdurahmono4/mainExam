import { GoogleAuthProvider } from "firebase/auth";
import { useRegister } from "../hooks/useRegister";
import { Link } from "react-router-dom";
import { Form } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
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
    dispatch(login({ email, password }));
    toast.success("You are successfully logged in!");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 relative">
      <Form
        method="post"
        onSubmit={handleLogin}
        className="card w-full sm:w-96 md:w-80 lg:w-96 p-8 shadow-lg rounded-lg flex flex-col gap-y-4 bg-gray-200/45 backdrop-blur-md"
      >
        <h4 className="text-center font-bold text-3xl">Login</h4>
        <input
          type="email"
          name="email"
          placeholder="yourgmail@gmail.com"
          className="input input-bordered w-full mt-2"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="********"
          className="input input-bordered w-full mt-2"
          required
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
          Are you already registered?
          <Link className="link text-cyan-700 ml-1" to="/register">
            Register
          </Link>
        </p>
      </Form>
    </div>
  );
}

export default Login;
