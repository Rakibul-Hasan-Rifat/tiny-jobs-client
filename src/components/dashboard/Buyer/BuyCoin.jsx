import { Toaster } from "react-hot-toast";

const BuyCoin = () => {
  const handleBuyCoin = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Toaster />
      <form
        onSubmit={handleBuyCoin}
        className="w-full flex flex-col justify-center items-start bg-white p-6 rounded-lg shadow-md"
      >
        <h1 className="text-2xl font-bold text-[#343a40]">
          Welcome Back! <br /> Buy Coins to Continue Adding Tasks
        </h1>
        <p className="text-lg font-light text-[#343a40] mt-2">
          We are happy to see you again. Please specify the coin amount.
        </p>
        <div className="mt-6 w-full">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Coin
          </label>
          <input
            required
            type="number"
            name="coin"
            placeholder="Enter how many coins you want to buy"
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
          Buy Coin
        </button>
      </form>
    </>
  );
};

export default BuyCoin;
