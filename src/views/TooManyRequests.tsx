import { Head } from "./layouts/Head";

type TooManyRequestsProps = {
  waitTime: string;
  isProd: boolean;
};

export function TooManyRequests({ waitTime, isProd }: TooManyRequestsProps) {
  return (
    <>
      {"<!doctype html>"}
      <html lang="en">
        <Head
          title="429 - Too Many Requests | Rawfeed"
          description="Too many requests"
          keywords=""
          isProd={isProd}
        />
        <body class="bg-gray-100 text-gray-900">
          <div class="min-h-screen flex items-center justify-center px-4">
            <div class="max-w-lg w-full text-center">
              <div class="bg-white rounded-lg shadow-lg p-8">
                <h1 class="text-6xl font-bold text-gray-900 mb-4">429</h1>
                <h2 class="text-2xl font-semibold text-gray-900 mb-2">
                  Too Many Requests
                </h2>
                <p class="text-gray-600 mb-2">
                  You've made too many requests in a short period.
                </p>
                <p class="text-gray-700 font-medium mb-8" safe>
                  Please wait {waitTime} before trying again.
                </p>
                <a
                  href="/"
                  class="inline-block px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                >
                  Go Home
                </a>
              </div>
            </div>
          </div>
        </body>
      </html>
    </>
  );
}
