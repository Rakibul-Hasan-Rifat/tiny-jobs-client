import { useRef } from "react";
import { useLoaderData } from "react-router";
import useAuth from "../../../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";

const TaskDetails = () => {
  const taskData = useLoaderData();
  const { user } = useAuth();
  console.log(taskData);

  const ref = useRef();

  const handleSubmitTask = () => {
    // Handle task submission logic here
    console.log("Task submitted");
    const textareaValue = ref.current.value;
    console.log(textareaValue, new Date().toLocaleDateString());
    // all info except deadline with textarea value will be sent to the server
    const taskDetails = {
      task_id: taskData._id,
      task_title: taskData.task_title,
      task_image: taskData.task_image,
      payable_amount: taskData.task_payable_amount,
      task_status: "pending",
      task_completion_date: new Date().toLocaleDateString(),
      buyer: { ...taskData.buyer },
      worker: { name: user?.displayName, email: user?.email },
      submission_details: textareaValue,
    };
    console.log(taskDetails);

    fetch(`${import.meta.env.VITE_SERVER_URL}/submission`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          toast.success("Task submitted successfully!");
          ref.current.value = "";
        }
      })
      .catch((error) => {
        console.error("Error submitting task:", error);
      });
  };

  return (
    <>
      <Toaster />
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between">
          <img
            src={taskData.task_image}
            alt={taskData.task_title}
            className="w-full h-32 object-cover rounded-t-lg"
          />
          <h2 className="text-xl font-semibold mt-2">{taskData.task_title}</h2>
          <p className="text-gray-600">Deadline: {taskData.task_deadline}</p>
          <p className="text-gray-600">
            Payable Amount: ${taskData.task_payable_amount}
          </p>
          <p className="text-gray-600">
            Workers Count: {taskData.task_workers_count}
          </p>
          <p className="text-gray-600">Buyer: {taskData.buyer.name}</p>
          <p className="text-gray-600">
            Description: {taskData.task_description}
          </p>
          <textarea
            ref={ref}
            className="mt-4 w-full h-32 p-2 border border-gray-300 rounded"
            placeholder="Write your submission details here..."
          />
          <button
            onClick={handleSubmitTask}
            className="mt-4 bg-yellow-400/80 text-emerald-900 font-semibold py-2 px-4 rounded hover:bg-yellow-400 flex items-center justify-center cursor-pointer"
          >
            Submit Task
          </button>
        </div>
      </div>
    </>
  );
};

export default TaskDetails;
