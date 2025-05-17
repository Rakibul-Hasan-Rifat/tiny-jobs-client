import toast from "react-hot-toast";
import { BiEdit, BiTrash } from "react-icons/bi";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const users = useLoaderData();

  const handleDeleteUser = (userId) => {
    Swal.fire({
      title: "Are you sure to delete the user?",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_SERVER_URL}/users`, {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              toast.success("User Deleted");
            }
          })
          .catch((err) => console.error(err));
      }
    });
  };

  return (
    <>
      <div className="w-full flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-800">Manage Users</h1>
        <div className="overflow-x-auto w-full mt-4">
          <table className="min-w-full bg-white border border-gray-300 text-center">
            <thead>
              <tr>
                <th className="px-4 py-2 border border-gray-300">Image</th>
                <th className="px-4 py-2 border border-gray-300">
                  Name | Email
                </th>
                <th className="px-4 py-2 border border-gray-300">Role</th>
                <th className="px-4 py-2 border border-gray-300">Coin</th>
                <th className="px-4 py-2 border border-gray-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="px-4 py-2 border border-gray-300 flex items-center justify-center">
                    <img
                      src={user.image}
                      alt=""
                      className="w-12 h-12 rounded-full object-fill"
                    />
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {user.name.length > 10
                      ? `${user.name.slice(0, 10)}...`
                      : user.name}{" "}
                    | {user.email.slice(0, -9)}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {user.role}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {user.coin}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 cursor-pointer"
                    >
                      <BiTrash />
                    </button>
                    <button className="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 cursor-pointer ml-2">
                      <BiEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ManageUsers;
