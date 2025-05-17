import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useLoaderData } from "react-router";
import useAuth from "../../../hooks/useAuth";

const Withdraws = () => {
  const { user } = useAuth();
  const { submits, withdraw_total } = useLoaderData();
  const [coins, setCoins] = useState(0);
  const [amount, setAmount] = useState(0);

  console.log(submits, withdraw_total);

  const totalCoins = submits.reduce(
    (total, withdraw) => parseInt(withdraw.payable_amount) + total,
    0
  );
  const totalAmount = (totalCoins - withdraw_total) / 20;

  console.log(submits);

  const handleCoinsChange = (e) => {
    const value = e.target.value;
    console.log(value);
    if (isNaN(value) || value < 0) {
      setCoins(0);
      setAmount(0);
      return;
    }
    if (value > totalCoins) {
      toast.error("You cannot withdraw more than your total coins.");
      setCoins(coins);
      setAmount(coins / 20);
      return;
    }

    setCoins(value);
    setAmount(value / 20);
  };

  const handleWithdraw = (e) => {
    e.preventDefault();
    console.log("withdraw");
    if (amount < 10) {
      toast.error("Minimum withdraw amount is $10");
      return;
    }
    if (coins > totalCoins) {
      toast.error("You cannot withdraw more than your total coins.");
      return;
    }
    if (coins < 0) {
      toast.error("You cannot withdraw negative coins.");
      return;
    }

    const formData = new FormData(e.target);
    const { widthdraw_coins, withdraw_amount, payment_system, account_number } =
      Object.fromEntries(formData.entries());

    console.log(
      widthdraw_coins,
      withdraw_amount,
      payment_system,
      account_number
    );

    if (
      isNaN(widthdraw_coins) ||
      isNaN(withdraw_amount) ||
      !payment_system ||
      !account_number
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    if (widthdraw_coins < 0) {
      toast.error("You cannot withdraw negative coins.");
      return;
    }
    if (widthdraw_coins > totalCoins) {
      toast.error("You cannot withdraw more than your total coins.");
      return;
    }
    if (withdraw_amount < 10) {
      toast.error("Minimum withdraw amount is $10");
      return;
    }

    const withdrawData = {
      widthdraw_coins,
      withdraw_amount,
      payment_system,
      account_number,
      withdraw_status: "pending",
      withdraw_date: new Date().toLocaleDateString(),
      worker: { name: user?.displayName, email: user?.email },
    };

    fetch(`${import.meta.env.VITE_SERVER_URL}/withdraws`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(withdrawData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          toast.success("Withdraw request sent successfully.");
          e.target.reset();
        } else {
          toast.error("Failed to send withdraw request.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("An error occurred while sending the withdraw request.");
      });
  };

  return (
    <>
      <Toaster />
      <section className="flex flex-col items-center justify-center w-full h-full p-4">
        <div className="flex flex-col items-center justify-center w-full h-full p-4 rounded-xl">
          <h1 className="text-2xl font-bold text-gray-600">Total Earnings</h1>
          <div className="flex flex-col items-center justify-center w-full max-w-md mt-4">
            <div className="flex items-center justify-between w-full p-4 bg-white rounded-lg shadow-md">
              <div className="flex flex-col">
                <span className="text-lg font-semibold">Total Coins</span>
                <span className="text-2xl font-bold">{totalCoins - withdraw_total} </span>
              </div>
              <div className="h-16 border-l border-gray-300 mx-4"></div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold">Withdrawal Amount</span>
                <span className="text-2xl font-bold">{totalAmount} $</span>
              </div>
            </div>
          </div>
        </div>
        <div
          className="flex flex-col items-center justify-center w-full h-full p-4 rounded-xl shadow-lg mt-4"
          style={{
            clipPath:
              "polygon(0 0, 100% 0, 95% 10%, 92% 22%, 100% 20%, 88% 28%, 100% 33%, 91% 36%, 100% 40%, 94% 45%, 100% 46%, 100% 55%, 94% 55%, 100% 60%, 91% 64%, 100% 66%, 88% 72%, 100% 80%, 92% 78%, 95% 90%, 100% 100%, 0 120%, 20% 50%)",
            background: "linear-gradient(to bottom right, #fff, #fff)",
          }}
        >
          <h1 className="text-2xl font-bold text-gray-600">Withdraw Form</h1>
          <div className="w-full max-w-md mt-4">
            <form onSubmit={handleWithdraw} className="flex flex-col space-y-4">
              <input
                type="number"
                defaultValue={0}
                min={0}
                max={totalCoins}
                name="widthdraw_coins"
                placeholder="Coin To Withdraw"
                onChange={handleCoinsChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-yellow-400/60"
              />
              <input
                type="number"
                value={amount}
                name="withdraw_amount"
                placeholder="Withdraw Amount ($)"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-yellow-400/60"
                readOnly
              />
              <select
                name="payment_system"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-yellow-400/60"
              >
                <option value="">Select Payment System</option>
                <option value="bkash">Bkash</option>
                <option value="rocket">Rocket</option>
                <option value="nagad">Nagad</option>
                <option value="other">Other</option>
              </select>
              <input
                type="text"
                placeholder="Account Number"
                name="account_number"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-yellow-400/60"
              />
              {amount >= 10 ? (
                <button className="px-4 py-2 text-cyan-950 font-semibold bg-yellow-400/80 rounded hover:bg-amber-400 cursor-pointer transition duration-300 ease-in-out">
                  Withdraw
                </button>
              ) : (
                <p className="text-red-500 font-semibold">Insufficient Coin</p>
              )}
              {coins > totalCoins ? (
                <p className="text-red-500 font-semibold">
                  You cannot withdraw more than your total coins.
                </p>
              ) : (
                ""
              )}
              <p className="text-sm text-gray-500">
                Note: Minimum withdraw amount is $10. You can withdraw up to 200
                coins. [One dollar equals to 20 coins.]
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Withdraws;
