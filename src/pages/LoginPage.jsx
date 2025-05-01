import bannerImg from "../assets/banner-bg.jpg";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  console.log(navigate, location);

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    login(email, password)
      .then((res) => {
        console.log(res.user);
        toast.success("Login successful", {
          position: "center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        e.target.reset();
        // Redirect to home page after successful login
        navigate(location.state ? `${location.state}` : "/");
      })
      .catch((err) => {
        console.log(err.message);
        toast.error(err.message);
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((res) => {
        console.log(res.user);
        toast.success("Login successful", {
          position: "top center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // Redirect to home page after successful login
        navigate(location.state ? `${location.state}` : "/");
      })
      .catch((err) => {
        console.log(err.message);
        toast.error(err.message);
      });
  };

  return (
    <>
      <Toaster />
      <div
        style={{
          background: `linear-gradient(to bottom, rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.7)), url(${bannerImg})`,
        }}
        className="flex justify-between items-center gap-5 py-4 px-10 my-12 shadow-lg"
      >
        <div className="w-1/2 flex flex-col justify-center items-start">
          <img
            className="w-full rounded "
            src="https://img.freepik.com/free-vector/sign-page-abstract-concept-illustration_335657-3875.jpg?"
            alt=""
            style={{
              clipPath:
                "polygon(0 0, 50% 10%, 100% 0%, 85% 50%, 100% 100%, 50% 90%, 0 100%)",
            }}
          />
        </div>
        <div className="w-1/2 flex flex-col justify-center items-center bg-white p-8 rounded-lg shadow-lg">
          <form
            onSubmit={handleLogin}
            className="w-full flex flex-col justify-center items-start "
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
          {/*divider*/}
          <div className="flex items-center justify-between w-full mt-4">
            <hr className="w-full border-gray-300" />
            <span className="text-gray-500 font-semibold px-2">OR</span>
            <hr className="w-full border-gray-300" />
          </div>
          {/* { google login button} */}
          <div className="flex justify-center items-center mt-4 w-full">
            <button
              onClick={handleGoogleLogin}
              className="bg-yellow-400/60 hover:bg-yellow-400/80 text-cyan-800 hover:text-cyan-900 font-semibold px-8 py-2 rounded-md transition duration-300 ease-in-out cursor-pointer flex justify-center items-center gap-2"
            >
              <FcGoogle className="text-2xl p-1 bg-white rounded-full" /> Login
              with Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
