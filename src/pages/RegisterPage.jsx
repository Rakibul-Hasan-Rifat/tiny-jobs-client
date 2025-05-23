import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "./../hooks/useAuth";
import { fileUpload } from "../utils/apis";
import bannerImg from "./../assets/banner-bg.jpg";

const RegisterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { register, updateUserInfo } = useAuth();
  const [image, setImage] = React.useState(null);
  const [imageUrl, setImageUrl] = React.useState(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.error("No file selected");
      return;
    }
    if (!file.type.startsWith("image/")) {
      console.error("Selected file is not an image");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      console.error("File size exceeds 5MB limit");
      return;
    }

    setImage(URL.createObjectURL(file));
    const urlFromImgbb = await fileUpload(file);

    urlFromImgbb
      ? setImageUrl(urlFromImgbb)
      : console.error("Error uploading image to imgbb");
  };

  const handleRegister = (e) => {
    // Handle registration logic here
    e.preventDefault();
    const formData = new FormData(e.target);
    const { name, email, password, role } = Object.fromEntries(
      formData.entries()
    );

    console.log(name, email, password, imageUrl, role);

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    register(email, password)
      .then((res) => {
        console.log(res.user);
        updateUserInfo(name, imageUrl).then(() => {
          fetch(`${import.meta.env.VITE_SERVER_URL}/users`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              name,
              email,
              role,
              image: imageUrl,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              if (data.acknowledged) {
                toast.success(
                  "After registration, user is created successfully",
                  {
                    position: "center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  }
                );
                navigate(location.state ? `${location.state}` : "/");
                e.target.reset();
              } else {
                toast.error(data.message, {
                  position: "center",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              }
            });
        });
      })
      .catch((err) => {
        console.log(err.message);
        toast.error(err.message, {
          position: "center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
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
        <div
          style={{
            background: "#fff",
            backdropFilter: "blur(30px)",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
          }}
          className="w-1/2 flex flex-col justify-center items-center p-8 rounded-lg shadow-lg"
        >
          <form
            onSubmit={handleRegister}
            className="w-full flex flex-col justify-center items-start "
          >
            <h1 className="text-2xl font-bold text-[#343a40]">
              Welcome Back! Please Register an account{" "}
            </h1>
            <p className="text-lg font-light text-[#343a40] mt-1">
              We are happy to see you here. Please register an account.
            </p>
            <div className="mt-4 w-full">
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
            <div className="mt-4 w-full">
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
                Role
              </label>
              <select
                required
                name="role"
                defaultValue={"default"}
                onChange={(e) => console.log(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-yellow-400/60"
              >
                <option defaultValue="default" disabled>
                  Select One
                </option>
                <option value="buyer">Buyer</option>
                <option value="worker">Worker</option>
              </select>
            </div>
            <div className="mt-4 w-full">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Photo URL
              </label>
              <div className="flex justify-between items-center gap-2">
                <input
                  required
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  placeholder="Choose your photo"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-yellow-400/60"
                />
                {image && (
                  <img
                    className="w-10 h-10 rounded-xl object-cover"
                    src={image}
                    alt="Selected"
                  />
                )}
              </div>
            </div>
            <button className="bg-yellow-400/60 hover:bg-yellow-400/80 text-cyan-800 hover:text-cyan-900 font-semibold px-8 py-2 rounded-md mt-4 transition duration-300 ease-in-out cursor-pointer w-full">
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
        <div className=" w-1/2 flex flex-col justify-center items-start">
          <img
            className="w-full rounded object-cover h-full"
            src="https://img.freepik.com/free-vector/business-people-writing-agreement-shaking-hands-tiny-man-with-magnifying-glass-researching-checklist-document-clipboard-paper-flat-vector-illustration-survey-paperwork-management-concept_74855-21676.jpg"
            alt=""
            style={{
              scale: "1.01",
              backgroundBlendMode: "multiply",
              clipPath:
                "polygon(0% 0%, 50% 10%, 100% 0%, 100% 100%, 50% 90%, 0% 100%, 10% 50%)",
              aspectRatio: "1/1.05",
              objectFit: "cover",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
