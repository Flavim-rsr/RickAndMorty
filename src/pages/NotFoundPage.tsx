import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <p className="text-7xl font-extrabold tracking-tight text-green-500 sm:text-8xl">
        404
      </p>
      <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
        Wubba Lubba Dub Dub!
      </h1>
      <p className="mt-2 max-w-sm text-gray-500 dark:text-gray-400">
        Looks like this page got lost in another dimension.
      </p>
      <Link
        to="/"
        className="mt-6 rounded-lg bg-green-500 px-6 py-2 font-medium text-white transition hover:bg-green-600"
      >
        Back to home
      </Link>
    </div>
  );
}
