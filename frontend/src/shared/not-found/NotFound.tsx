import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="grid min-h-full place-items-center bg-seashell px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-4xl font-semibold text-[#49263d]">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-[#49263d]">
          <span className="text-red-500">Oops!&nbsp;</span> Page not found
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            className="rounded-md bg-[#49263d] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#49263d]"
            to={""}
          >
            &larr; Go back
          </Link>
        </div>
      </div>
    </main>
  );
};
export default NotFound;
