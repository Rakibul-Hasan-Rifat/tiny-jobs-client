import { Link } from "react-router";
import bannerImg from "../../assets/banner-bg.jpg";

const Banner = () => {
  return (
    <section
      className="py-4 px-10 my-12 shadow-lg flex justify-between"
      style={{
        background: `linear-gradient(rgba(255, 255, 255, .88)), url(${bannerImg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "600px",
      }}
    >
      <div className="w-1/2 flex flex-col justify-center items-start">
        <h1 className="text-7xl font-bold text-[#343a40]">
          Make money. <br /> From anywhere, <br />
          anytime!
        </h1>
        <p className="text-2xl font-light text-[#343a40] mt-10">
          People are happier if they are more financially independent. We can
          help you achieve this. Join our strong community and earn money easily
          and safely from wherever you want.
        </p>
        <div>
          <Link to={"/register"}>
            <button className="bg-yellow-400/60 hover:bg-yellow-400/80 text-cyan-800 hover:text-cyan-900 font-semibold px-6 py-3 rounded-md mt-10 transition duration-300 ease-in-out cursor-pointer">
              Signup
            </button>
          </Link>
          <Link to={"/login"}>
            <button className="bg-white text-yellow-600 px-6 py-3 rounded-md mt-10 ml-4 border border-amber-400/60 hover:bg-yellow-400/80 font-semibold hover:text-cyan-900 transition duration-300 ease-in-out cursor-pointer">
              Login
            </button>
          </Link>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: "-80px",
          // flexGrow: 1,
          width: "50%",
          backgroundColor: "white",
          border: "1px solid #000",
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 40% 100%)",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1709884735626-63e92727d8b6?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
          alt=""
        />
      </div>
    </section>
  );
};

export default Banner;
