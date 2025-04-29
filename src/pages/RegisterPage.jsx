import React from "react";
import { Toaster } from "react-hot-toast";
import bannerImg from "./../assets/banner-bg.jpg";
import { Link } from "react-router";

const RegisterPage = () => {
  const handleRegister = (e) => {
    // Handle registration logic here
    e.preventDefault();
    const formData = new FormData(e.target);
    const { name, email, password, image } = formData;
    console.log(name, email, password, image);
  };

  return (
    <>
      <Toaster />
      <div
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          background: `linear-gradient(to bottom, rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.7)), url(${bannerImg})`,
        }}
        className="flex justify-between items-center gap-5 py-4 px-10 my-12 shadow-lg"
      >
        <div className="w-1/2 flex flex-col justify-center items-center bg-white p-8 rounded-lg shadow-lg">
          <form
            onSubmit={handleRegister}
            className="w-full flex flex-col justify-center items-start "
          >
            <h1 className="text-2xl font-bold text-[#343a40]">
              Welcome Back! <br /> Please Register to your account{" "}
            </h1>
            <p className="text-lg font-light text-[#343a40] mt-2">
              We are happy to see you here. Please register an account.
            </p>
            <div className="mt-6 w-full">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Name
              </label>
              <input
                required
                type="text"
                name="name"
                placeholder="Enter your name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-yellow-400/60"
              />
            </div>
            <div className="mt-6 w-full">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                required
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
                required
                type="password"
                name="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-yellow-400/60"
              />
            </div>
            <div className="mt-4 w-full">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Photo URL
              </label>
              <input
                required
                type="file"
                name="image"
                placeholder="Choose your photo"
                accept="image/*"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-yellow-400/60"
              />
            </div>
            <button className="bg-yellow-400/60 hover:bg-yellow-400/80 text-cyan-800 hover:text-cyan-900 font-semibold px-8 py-2 rounded-md mt-6 transition duration-300 ease-in-out cursor-pointer w-full">
              Register
            </button>
            <p className="w-full text-sm font-semibold text-gray-700 mt-4 text-right">
              Already have an account?{" "}
              <Link to="/login" className="text-yellow-400 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
        <div className="w-1/2 flex flex-col justify-center items-start">
          <img
            className="w-full rounded object-cover h-full"
            src="https://img.freepik.com/free-vector/business-people-writing-agreement-shaking-hands-tiny-man-with-magnifying-glass-researching-checklist-document-clipboard-paper-flat-vector-illustration-survey-paperwork-management-concept_74855-21676.jpg"
            alt=""
            style={
              {
                // clipPath:
                //   "polygon(0 0, 50% 10%, 100% 0%, 85% 50%, 100% 100%, 50% 90%, 0 100%)",
                // scale: "1.3",
              }
            }
          />
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
