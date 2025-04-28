import React from "react";

const JobCard = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center bg-white shadow-lg rounded-lg p-4 my-2 ">
        <img
          src="https://images.unsplash.com/photo-1709884735626-63e92727d8b6?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Job"
          className="w-full h-40 object-cover rounded-t-lg hover:scale-105 transition duration-300 ease-in-out"
        />
        <h2 className="text-xl font-semibold mt-4">Job Title</h2>
        <p className="text-gray-600 mt-2">Company Name</p>
        <p className="text-gray-500 mt-2">Location</p>
        <p className="text-gray-700 mt-2">Salary: $XX,XXX</p>
        <button className="bg-yellow-400 text-white px-4 py-2 rounded-md mt-4 hover:bg-yellow-500 transition duration-300 ease-in-out cursor-pointer">
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobCard;
