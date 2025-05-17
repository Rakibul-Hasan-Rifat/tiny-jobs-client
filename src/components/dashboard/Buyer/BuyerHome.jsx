import React from "react";

const BuyerHome = () => {
  const [buyerTasks, setBuyerTasks] = React.useState([]);
  const [submission, setSubmission] = React.useState([]);

  React.useEffect(() => {
    const fetchBuyerTasks = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/buyer/tasks`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        setBuyerTasks(data);
      } catch (error) {
        console.error("Error fetching buyer tasks:", error);
      }
    };

    const fetchSubmission = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/buyer/submission`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        setSubmission(data);
      } catch (error) {
        console.error("Error fetching submission data:", error);
      }
    };

    fetchBuyerTasks();
    fetchSubmission();
  }, []);

  console.log(buyerTasks, submission);

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full">
        <div className="grid grid-cols-3 gap-4">
          <div className="w-full p-4 bg-white rounded-lg shadow-md text-center">
            <h2 className="text-lg font-semibold">Total Tasks</h2>
            <p className="text-3xl font-bold text-gray-700">
              {buyerTasks?.length}
            </p>
          </div>
          <div className="w-full p-4 bg-white rounded-lg shadow-md text-center">
            <h2 className="text-lg font-semibold">Pending Tasks</h2>
            <p className="text-3xl font-bold text-gray-700">
              {buyerTasks?.reduce(
                (total, task) => total + parseInt(task.task_workers_count),
                0
              )}
            </p>
          </div>
          <div className="w-full p-4 bg-white rounded-lg shadow-md text-center">
            <h2 className="text-lg font-semibold">Total Payments</h2>
            <p className="text-3xl font-bold text-gray-700">
              {buyerTasks?.reduce(
                (total, task) => total + parseInt(task.task_payable_amount),
                0
              )}
            </p>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white border border-gray-200 text-center">
          <thead>
            <tr>
              <th className="px-4 py-2 border border-gray-300">Worker</th>
              <th className="px-4 py-2 border border-gray-300">Task Name</th>
              <th className="px-4 py-2 border border-gray-300">
                Payable Amount
              </th>
              <th className="px-4 py-2 border border-gray-300">Submission</th>
              <th className="px-4 py-2 border border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {submission.length > 0 &&
              submission.map((task) => (
                <tr key={task._id}>
                  <td className="px-4 py-2 border border-gray-300">
                    {task?.worker.name.length > 12 ? task?.worker.name.slice(0, 11) + "..." : task?.worker.name}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {task.task_title.length > 15 ? task.task_title.slice(0, 14) + "..." : task.task_title}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {task.payable_amount}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    <button className="bg-yellow-400/60 text-xs font-semibold text-cyan-900 px-4 py-2 rounded cursor-pointer hover:bg-yellow-400/90 transition-all duration-300">
                      View Submission
                    </button>
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    <div className="flex items-center justify-center gap-2">
                      <button className="text-xs bg-green-400/60 font-semibold text-cyan-900 px-4 py-2 rounded cursor-pointer hover:bg-green-400/90 transition-all duration-300">
                        Approve
                      </button>
                      <button className="text-xs bg-red-400/60 font-semibold text-cyan-900 px-4 py-2 rounded cursor-pointer hover:bg-red-400/90 transition-all duration-300">
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BuyerHome;
