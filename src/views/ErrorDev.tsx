/** @jsxImportSource @kitajs/html */
type ErrorDevProps = {
  asset: (path: string) => string;
  error: {
    message: string;
    stack?: string;
    statusCode: number;
  };
};

export function ErrorDev({ asset, error }: ErrorDevProps) {
  return (
    <>
      {"<!doctype html>"}
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <title>{error.statusCode} - Error | Rawfeed</title>
          <link rel="stylesheet" href={asset("/public/css/tailwind.css")} />
        </head>
        <body class="bg-gray-900 text-gray-100">
          <div class="min-h-screen p-8">
            <div class="max-w-4xl mx-auto">
              <div class="bg-red-900 rounded-t-lg p-6 border-b-4 border-red-600">
                <h1 class="text-4xl font-bold text-white mb-2">
                  {error.statusCode} Error
                </h1>
                <p class="text-red-200 text-lg" safe>
                  {error.message}
                </p>
              </div>
              <div class="bg-gray-800 rounded-b-lg p-6">
                <h2 class="text-xl font-semibold mb-4 text-white">
                  Stack Trace:
                </h2>
                <pre
                  class="bg-gray-900 p-4 rounded overflow-x-auto text-sm text-gray-300 whitespace-pre-wrap"
                  safe
                >
                  {error.stack ?? "No stack trace available"}
                </pre>
              </div>
            </div>
          </div>
        </body>
      </html>
    </>
  );
}
