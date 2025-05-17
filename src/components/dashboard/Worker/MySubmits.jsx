import React from "react";
import { useLoaderData } from "react-router";

const MySubmits = () => {
  const mySubmissions = useLoaderData();
  console.log(mySubmissions);
  return (
    // table for showing all the submissions with important details
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-xl">
        <thead>
          <tr>
            <th className="py-2 px-4 border border-gray-400">Task Title</th>
            <th className="py-2 px-4 border border-gray-400">
              Submission Details
            </th>
            <th className="py-2 px-4 border border-gray-400">
              Submission Date
            </th>
            <th className="py-2 px-4 border border-gray-400">Status</th>
          </tr>
        </thead>
        <tbody>
          {mySubmissions?.map((submission, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="py-2 px-4 border border-gray-400">
                {submission.task_title}
              </td>
              <td className="py-2 px-4 border border-gray-400">
                {submission.submission_details}
              </td>
              <td className="py-2 px-4 border border-gray-400">
                {submission.task_completion_date}
              </td>
              <td className="py-2 px-4 flex items-center justify-center border border-gray-400">
                <span
                  className={`px-4 py-1 font-semibold rounded-full ${
                    submission.task_status === "rejected" &&
                    "bg-red-400/30 text-red-700"
                  } ${
                    submission.task_status === "approved" &&
                    "bg-green-300/30 text-green-700"
                  }
                    ${
                      submission.task_status === "pending" &&
                      "bg-yellow-300/30 text-yellow-600"
                    }
                    `}
                >
                  {submission.task_status.toUpperCase()}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {mySubmissions.length === 0 && (
        <div className="text-center py-4">
          <p className="font-semibold text-2xl text-gray-500">
            No submissions available.
          </p>
        </div>
      )}
    </div>
  );
};

export default MySubmits;
