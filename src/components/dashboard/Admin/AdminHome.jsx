import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { MdPayment } from "react-icons/md";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const AdminHome = () => {
  const {user} = useAuth();
  const [adminInfo, setAdminInfo] = useState({});
  const [adminWithdraw, setAdminWithdraw] = useState([]);
  console.log(adminWithdraw);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/admin`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setAdminInfo(data))
      .catch((err) => console.error(err));

    fetch(`${import.meta.env.VITE_SERVER_URL}/admin-withdraw`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setAdminWithdraw(data))
      .catch((err) => console.error(err));
  }, []);

  const handlePayment = (withdrawId) => {
    Swal.fire({
      title: "Are you sure to approve this payment?",
      showCancelButton: true,
      confirmButtonText: "Payment Approve",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_SERVER_URL}/admin-withdraw`, {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ withdrawId }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount > 0) {
              toast.success("Payment Success");
              fetch(`${import.meta.env.VITE_SERVER_URL}/users`, {
                method: "PUT",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email: user.email,
                  withdraw_amount: data.withdraw_amount,
                }),
              }).then((res) => res.json())
                .then((data) => {
                  console.log(data);
                })
                .catch((err) => console.error(err));
            }
          })
          .catch((err) => console.error(err));
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return (
    <>
      <Toaster />
      <div className="flex flex-col items-center justify-center w-full">
        <div className="grid grid-cols-3 gap-4">
          <div className="w-full p-4 bg-white rounded-lg shadow-md text-center">
            <h2 className="text-lg font-semibold">Total Workers</h2>
            <p className="text-3xl font-bold text-gray-700">
              {adminInfo.total_workers}
            </p>
          </div>
          <div className="w-full p-4 bg-white rounded-lg shadow-md text-center">
            <h2 className="text-lg font-semibold">Total Buyers</h2>
            <p className="text-3xl font-bold text-gray-700">
              {adminInfo.total_buyers}
            </p>
          </div>
          <div className="w-full p-4 bg-white rounded-lg shadow-md text-center">
            <h2 className="text-lg font-semibold">Total Coins</h2>
            <p className="text-3xl font-bold text-gray-700">
              {adminInfo.available_coins}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full mt-16">
        <h2 className="text-2xl font-semibold text-gray-700 my-8 border-b border-b-gray-400">
          Withdraw Requests
        </h2>
        <div className="overflow-x-auto w-full">
          {adminWithdraw.length > 0 ? (
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="px-4 py-2 border border-gray-400">User</th>
                  <th className="px-4 py-2 border border-gray-400">Amount</th>
                  <th className="px-4 py-2 border border-gray-400">Status</th>
                  <th className="px-4 py-2 border border-gray-400">Action</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {adminWithdraw.map((withdraw) => (
                  <tr key={withdraw._id}>
                    <td className="px-4 py-2 border-b border border-gray-300">
                      {withdraw.worker.name}
                    </td>
                    <td className="px-4 py-2 border-b border border-gray-300">
                      {withdraw.withdraw_amount}
                    </td>
                    <td className="px-4 py-2 border-b border border-gray-300">
                      {withdraw.withdraw_status}
                    </td>
                    <td className="px-4 py-2 border-b border border-gray-300 flex items-center justify-center gap-2">
                      {withdraw.withdraw_status === "pending" ? (
                        <button
                          onClick={() => handlePayment(withdraw._id)}
                          className="flex items-center gap-2 justify-between px-4 py-2 text-gray-700 hover:text-white font-semibold bg-yellow-400/30 hover:bg-yellow-400 rounded cursor-pointer transition-all duration-300"
                        >
                          <MdPayment />
                          <span>Payment Success</span>
                        </button>
                      ) : (
                        <span className="py-3 px-1 text-yellow-700 bg-amber-500/40 rounded-full">
                          Approved
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex items-center justify-center w-full bg-gray-100 rounded-lg shadow-md">
              <p className="text-gray-500 font-semibold">
                No Withdraw Requests
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminHome;
