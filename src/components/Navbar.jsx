import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { clear } from "../features/userSlice";
import { Link } from "react-router-dom";
import Weather from "./Weather";

function Navbar() {
  const { user } = useSelector((state) => state.currentUser);
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [weatherCondition, setWeatherCondition] = useState("");
  const [sum, setSum] = useState(0);
  const totalAmount = useSelector((state) => state.products.totalAmount);
  const [theme, setTheme] = useState("light"); // Add theme state

  const logOut = () => {
    signOut(auth)
      .then(() => {
        toast.success("Signed out successfully");
        dispatch(clear());
      })
      .catch((error) => {
        console.log(error.message);
        toast.error(error.message);
      });
  };

  const getBackgroundImage = () => {
    switch (weatherCondition) {
      case "clear":
        return "url('https://example.com/clear-sky.jpg')";
      case "rain":
        return "url('https://example.com/rainy.jpg')";
      case "clouds":
        return "url('https://example.com/cloudy.jpg')";
      default:
        return "url('https://example.com/default-weather.jpg')";
    }
  };

  const calculateSum = () => {
    let summa = 0;
    if (products && products.length > 0) {
      for (let i = 0; i < products.length; i++) {
        summa += products[i].amount * products[i].price;
      }
    }
    setSum(summa);
  };

  const handleThemeToggle = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    document.body.className = theme === "light" ? "dark" : "light"; // Optional: Update body class for dark/light theme
  };

  useEffect(() => {
    if (weatherCondition) {
      document.querySelector(".navbar").style.backgroundImage =
        getBackgroundImage();
    }
    calculateSum();
  }, [weatherCondition, products]); // Ensure useEffect updates when products change

  return (
    <div
      className="container-class mx-auto"
      style={{ backgroundImage: getBackgroundImage(), backgroundSize: "cover" }}
    >
      <div className="navbar items-center text-center justify-between p-4">
        <div className="navbar-start flex items-center text-center ">
          <Link to="/">
            <span className="btn btn-ghost items-center text-2xl hidden lg:block mt-3">
              MyKitchen
            </span>
          </Link>
          <Weather
            className="font-medium w-96 justify-between "
            setWeatherCondition={setWeatherCondition}
          />
        </div>
        <div className="navbar-end flex items-center">
          <label className="swap swap-rotate mr-2">
            <input
              type="checkbox"
              className="theme-controller"
              onChange={handleThemeToggle}
            />
            {/* Toggle icons */}
          </label>
          <div className="flex gap-6">
            <Link to="/cartpage">
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle"
                >
                  <div className="indicator">
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
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span className="badge badge-sm indicator-item">
                      {products ? products.length : 0}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
            <p className="mr-4 hidden lg:block mt-2">
              {user && user.displayName ? user.displayName : "Guest"}
            </p>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="User avatar"
                    src={
                      user && user.photoURL
                        ? user.photoURL
                        : "https://via.placeholder.com/150"
                    }
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/chart" className="justify-between">
                    Chart
                  </Link>
                </li>
                <li>
                  <Link to="/create">Create Recipe</Link>
                </li>
                <li>
                  <button onClick={logOut}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
