import React from "react";
import { fileUpload } from "../../../utils/apis";
import useAuth from "../../../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";

const AddTask = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [image, setImage] = React.useState(null);
  const [imageUrl, setImageUrl] = React.useState(null);

  const handleImage = async (e) => {
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

    urlFromImgbb && setImageUrl(urlFromImgbb);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { title, description, payable_amount, workers_count, deadline } =
      Object.fromEntries(formData.entries());

    const taskData = {
      task_title: title,
      task_description: description,
      task_image: imageUrl,
      task_payable_amount: payable_amount,
      task_workers_count: workers_count,
      task_deadline: deadline,
      buyer: {
        name: user?.displayName,
        email: user?.email,
      },
    };

    fetch(`${import.meta.env.VITE_SERVER_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.acknowledged) {
          e.target.reset();
          setImage(null);
          setImageUrl(null);
          toast.success("Task added successfully!");
          console.log(data)
        } else {
          console.log(data);
          toast.error(data.message);
          navigate("/dashboard/buy-coin");
        }
      })
      .catch((error) => {
        console.error("Error adding task:", error);
        toast.error("An error occurred while adding the task.");
      });
  };

  return (
    <>
      <Toaster />
      <div
        style={{
          background: "#fff",
          backdropFilter: "blur(30px)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
        }}
        className=" flex flex-col justify-center items-center p-8 rounded-lg shadow-lg"
      >
        <form
          onSubmit={handleAddTask}
          className="w-full flex flex-col justify-center items-start "
        >
          <h1 className="w-full text-2xl text-center font-bold text-[#343a40]">
            Welcome Back! Add a Task{" "}
          </h1>
          <div className="mt-4 w-full">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Task Title
            </label>
            <input
              required
              type="text"
              name="title"
              placeholder="Enter the task title"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-yellow-400/60"
            />
          </div>
          <div className="mt-4 w-full">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Task Description
            </label>
            <input
              required
              type="text"
              name="description"
              placeholder="Enter task description"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-yellow-400/60"
            />
          </div>
          <div className="flex gap-4 w-full">
            <div className="mt-4 w-full">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Required Workers
              </label>
              <input
                required
                type="number"
                name="workers_count"
                placeholder="Enter the number of workers"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-yellow-400/60"
              />
            </div>
            <div className="mt-4 w-full">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Payable Amount
              </label>
              <input
                required
                type="number"
                name="payable_amount"
                placeholder="Enter the amount to be paid to each worker"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-yellow-400/60"
              />
            </div>
          </div>
          <div className="flex gap-4 w-full">
            <div className="mt-4 w-full">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Completion Date
              </label>
              <input
                required
                type="date"
                name="deadline"
                placeholder="Enter the amount to be paid to workers"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-yellow-400/60"
              />
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
                  onChange={handleImage}
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
          </div>
          <button className="bg-yellow-400/60 hover:bg-yellow-400/80 text-cyan-800 hover:text-cyan-900 font-semibold px-8 py-2 rounded-md mt-4 transition duration-300 ease-in-out cursor-pointer w-full">
            Add Task
          </button>
        </form>
      </div>
    </>
  );
};

export default AddTask;
