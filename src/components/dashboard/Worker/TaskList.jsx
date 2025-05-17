import { BiDetail } from "react-icons/bi";
import useTasks from "../../../hooks/useTasks";
import { Link } from "react-router";

const TaskList = () => {
  const { tasks } = useTasks({ type: "worker" });
  console.log(tasks);

  return (
    // container for the task list cards
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between"
        >
          <img
            src={task.task_image}
            alt={task.task_title}
            className="w-full h-32 object-cover rounded-t-lg"
          />
          <h2 className="text-xl font-semibold mt-2">{task.task_title}</h2>
          <p className="text-gray-600">Deadline: {task.task_deadline}</p>
          <p className="text-gray-600">
            Payable Amount: ${task.task_payable_amount}
          </p>
          <p className="text-gray-600">
            Workers Count: {task.task_workers_count}
          </p>
          <p className="text-gray-600">
            Buyer: {task.buyer.name}
          </p>
          <Link
            to={`/dashboard/task-list/${task._id}`}
            className="mt-4 bg-yellow-400/80 text-emerald-900 font-semibold py-2 px-4 rounded hover:bg-yellow-400 flex items-center justify-center"
          >
            <BiDetail className="mr-2" />
            View Details
          </Link>
        </div>
      ))}
      {tasks.length === 0 && (
        <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center">
          <p className="font-semibold text-2xl text-gray-500">
            No tasks available.
          </p>
        </div>
      )}
    </div>
  );
};

export default TaskList;

// buyer: {name: 'RAKIBUL HASAN', email: 'rakibulhasan745101@gmail.com'}
// task_deadline
// task_description
// task_image
// "https://i.ibb.co.com/67tvFFkQ/Screenshot-5-5-2025-231538-helpdesk-programming-hero-com.jpg"
// task_payable_amount
// task_title
// task_workers_count
