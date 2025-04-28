import React from "react";

import bannerImg from "../assets/banner-bg.jpg";
import { Link } from "react-router";
import useAuth from "../hooks/useAuth";

const LoginPage = () => {
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    
    login(email, password)
      .then((res) => {
        console.log(res.user);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div
      style={{
        background: `linear-gradient(to bottom, rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.7)), url(${bannerImg})`,
      }}
      className="flex justify-between items-center gap-5 py-4 px-10 my-12 shadow-lg"
    >
      <div className="w-1/2 flex flex-col justify-center items-start">
        <img
          className="w-full rounded "
          src="https://plus.unsplash.com/premium_photo-1700766408965-f73b16458fee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXV0aGVudGljYXRpb258ZW58MHx8MHx8fDA%3D"
          alt=""
          style={{
            clipPath: "polygon(0 0, 100% 0%, 100% 100%, 0 100%, 40% 50%)",
            transform: "scaleX(-1)",
          }}
        />
      </div>
      <form
        onSubmit={handleLogin}
        className="w-1/2 flex flex-col justify-center items-start bg-white p-8 rounded-lg shadow-lg"
      >
        <h1 className="text-2xl font-bold text-[#343a40]">
          Welcome Back! <br /> Please Login to your account{" "}
        </h1>
        <p className="text-lg font-light text-[#343a40] mt-2">
          We are happy to see you again. Please login to your account.
        </p>
        <div className="mt-6 w-full">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-yellow-400/60"
          />
        </div>
        <div className="mt-4 w-full">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-yellow-400/60"
          />
        </div>
        <button className="bg-yellow-400/60 hover:bg-yellow-400/80 text-cyan-800 hover:text-cyan-900 font-semibold px-8 py-2 rounded-md mt-6 transition duration-300 ease-in-out cursor-pointer w-full">
          Login
        </button>
        <p className="w-full text-sm font-semibold text-gray-700 mt-4 text-right">
          Don't have an account?{" "}
          <Link to="/register" className="text-yellow-400 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
