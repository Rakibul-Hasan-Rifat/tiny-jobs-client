import useTasks from "../../../hooks/useTasks";
import { FaTrash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";

const MyTasks = () => {
  const { tasks, refetch } = useTasks({type: "buyer", sortByDate: true});
  console.log(tasks);

  const handleDeleteTask = async (id) => {
    // const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_SERVER_URL}/tasks/${id}`,
            {
              method: "DELETE",
            }
          );
          const data = await response.json();
          if (data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "One task has been deleted.",
              icon: "success",
              timer: 1500,
            });
          } else {
            alert("Failed to delete task. Please try again.");
          }
        } catch (error) {
          console.error("Error deleting task:", error);
        }
      }
    });
  };

  return (
    <table className="w-full table-auto border-collapse border border-gray-300">
      <thead className="bg-gray-100">
        <tr>
          <th className="border border-gray-300 px-4 py-2">Idx</th>
          <th className="border border-gray-300 px-4 py-2">Image</th>
          <th className="border border-gray-300 px-4 py-2">Task Name</th>
          <th className="border border-gray-300 px-4 py-2">Status</th>
          <th className="border border-gray-300 px-4 py-2">Deadline</th>
          <th className="border border-gray-300 px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task, idx) => (
          <tr key={task._id}>
            <td className="text-center border border-gray-300 px-4 py-2">
              {idx + 1}
            </td>
            <td className="text-center border border-gray-300 px-4 py-2">
              <img
                src={task.task_image}
                alt=""
                className="block mx-auto w-10 h-10 object-cover rounded-xl"
              />
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {task.task_title}
            </td>
            <td className="border border-gray-300 px-4 py-2">{task.status}</td>
            <td className="text-center border border-gray-300 px-4 py-2">
              {task.task_deadline}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {/* Add action buttons here */}
              <div className="flex justify-center items-center gap-2">
                <button className="bg-green-300/60 p-2 rounded-full text-green-500 hover:underline cursor-pointer">
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteTask(task._id)}
                  className="bg-red-300/60 p-2 rounded-full text-red-500 hover:underline ml-2 cursor-pointer"
                >
                  <FaTrash className="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MyTasks;
