import React from "react";
import JobCard from "./JobCard";

const Jobs = () => {
  return (
    <section className="my-12 bg-amber-100/20">
      <h1 className="text-4xl font-bold text-center w-full mb-4">
        Find Your Dream Job
      </h1>
      <div className="grid grid-cols-4 gap-4">
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
      </div>
    </section>
  );
};

export default Jobs;
