import WorkerCard from "./WorkerCard";

const BestWorkers = () => {
  return (
    <section className="my-12">
      <h1 className="text-4xl font-bold text-center w-full mb-3">
        Our Best Workers
          </h1>
          <div className="grid grid-cols-4 gap-4">
              <WorkerCard />
              <WorkerCard />
              <WorkerCard />
              <WorkerCard />
              <WorkerCard />
        </div>
    </section>
  );
};

export default BestWorkers;
