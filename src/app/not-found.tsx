import Head from "next/head";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className=" h-[80vh] max-h-[500px] lg:max-h-fit flex justify-center items-center bg-white dark:bg-gray-900">
      <Head>
        <title>404 - Page Not Found</title>
        {/* robots means all crawler */}
        <meta name="robots" content="noindex, follow" />
      </Head>
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-yellow-600 dark:text-yellow-500">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
            Something&apos;s missing.
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            Sorry, we can&apos;t find that page. You&apos;ll find lots to
            explore on the home page.{" "}
          </p>
          <Link
            href="/index.html"
            className="inline-flex text-white bg-gray-600 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4  "
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
}
