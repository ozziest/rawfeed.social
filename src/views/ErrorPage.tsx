type ErrorProps = {
  asset: (path: string) => string;
  statusCode: number;
  message: string;
  theme?: "dark" | "light" | "system";
};

export function ErrorPage({ asset, statusCode, message, theme }: ErrorProps) {
  return (
    <>
      {"<!doctype html>"}
      <html lang="en" class={theme === "dark" ? "dark" : ""}>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <title>{statusCode} - Error | Rawfeed</title>
          <link rel="stylesheet" href={asset("/public/css/tailwind.css")} />
        </head>
        <body class="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <div class="min-h-screen flex items-center justify-center px-4">
            <div class="max-w-lg w-full text-center">
              <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                <h1 class="text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  {statusCode}
                </h1>
                <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Error
                </h2>
                <p class="text-gray-600 dark:text-gray-400 mb-8" safe>
                  {message}
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
