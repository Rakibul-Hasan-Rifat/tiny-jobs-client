const WorkerCard = () => {
  return (
    <div
      className="rounded-md"
      style={{
        background: `linear-gradient(to bottom, rgba(0, 0, 0, .7), rgba(0, 0, 0, .6)), url(https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWFufGVufDB8fDB8fHww)`,
          backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Worker Card */}
      <div className="flex flex-col justify-center items-center text-white shadow-md rounded-lg p-4 h-full">
        <h2 className="text-xl font-semibold">John Doe</h2>
        <p className="text-gray-200">Web Developer</p>
        <p className="text-gray-300 mt-2">Rating: 4.5/5</p>
        <button className="mt-4 bg-yellow-400/60 hover:bg-yellow-400/80 text-white font-semibold px-4 py-2 rounded-md transition duration-300 ease-in-out cursor-pointer">
          View Profile
        </button>
      </div>
    </div>
  );
};

export default WorkerCard;
