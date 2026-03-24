type NotFoundProps = {
  asset: (path: string) => string;
  theme?: "dark" | "light" | "system";
};

export function NotFound({ asset, theme }: NotFoundProps) {
  return (
    <>
      {"<!doctype html>"}
      <html lang="en" class={theme === "dark" ? "dark" : ""}>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <title>404 - Page Not Found | Rawfeed</title>
          <link rel="stylesheet" href={asset("/public/css/tailwind.css")} />
        </head>
        <body class="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <div class="min-h-screen flex items-center justify-center px-4">
            <div class="max-w-md w-full text-center">
              <div class="mb-8">
                <h1 class="text-9xl font-bold text-gray-300 dark:text-gray-600">
                  404
                </h1>
                <p class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-4">
                  Page Not Found
                </p>
                <p class="text-gray-600 dark:text-gray-400 mt-2">
                  The page you're looking for doesn't exist or has been moved.
                </p>
              </div>
              <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/"
                  class="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
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
