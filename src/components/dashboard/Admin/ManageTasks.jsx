import React from "react";
import toast from "react-hot-toast";
import { BiTrash } from "react-icons/bi";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";

const ManageTasks = () => {
  const tasks = useLoaderData();

  console.log(tasks);

  const handleDeleteTask = (taskId) => {
    Swal.fire({
      title: "Are you sure to delete the task?",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_SERVER_URL}/admin/tasks`, {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ taskId }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              toast.success("Task Deleted");
            }
          })
          .catch((err) => console.error(err));
      }
    });
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-gray-800">Manage Tasks</h1>
      <div className="overflow-x-auto w-full mt-4">
        <table className="min-w-full bg-white border border-gray-300 text-center rounded-2xl">
          <thead>
            <tr>
              <th className="px-4 py-2 border border-gray-300">Task Image</th>
              <th className="px-4 py-2 border border-gray-300">Task Title</th>
              <th className="px-4 py-2 border border-gray-300">Need Workers</th>
              <th className="px-4 py-2 border border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id}>
                <td className="px-4 py-2 border border-gray-300 flex items-center justify-center">
                  <img
                    src={task.task_image}
                    alt=""
                    className="w-12 h-12 rounded-full object-fill"
                  />
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {task.task_title.length > 15
                    ? task.task_title.slice(0, 15) + "..."
                    : task.task_title}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {task.task_workers_count}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 cursor-pointer"
                  >
                    <BiTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTasks;
