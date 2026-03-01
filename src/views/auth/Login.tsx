/** @jsxImportSource @kitajs/html */
import type { BaseProps } from "../../types/views";
import { AuthLayout } from "../layouts/AuthLayout";
import { FlashMessages } from "../partials/FlashMessages";

type LoginProps = BaseProps & { csrfToken: string };

export function Login(props: LoginProps) {
  const { csrfToken, validation, state } = props;

  return (
    <AuthLayout {...props}>
      <div class="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div class="w-full max-w-md space-y-8">
          <FlashMessages state={props.state} />
          <div class="text-center">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
            <p class="mt-2 text-sm text-gray-600">
              Welcome back to rawfeed.social
            </p>
          </div>

          <form class="mt-8 space-y-6" action="/auth/login" method="post">
            <input type="hidden" name="_csrf" value={csrfToken} />

            <div>
              <label
                for="email"
                class="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div class="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                  placeholder="you@example.com"
                  required
                  value={state?.email as string | undefined}
                />
              </div>
              <div safe>
                {validation?.email && (
                  <div class="text-red-700 text-sm my-1" safe>
                    {validation.email}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label
                for="password"
                class="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div class="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  required
                  class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
              <div safe>
                {validation?.password && (
                  <div class="text-red-700 text-sm my-1" safe>
                    {validation.password}
                  </div>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                class="group relative flex w-full justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
              >
                Sign in
              </button>
            </div>

            <div class="text-center text-sm">
              <span class="text-gray-600">Don't have an account?</span>
              <a
                href="/auth/register"
                class="font-medium text-black hover:text-gray-700 ml-1 underline"
              >
                Create account
              </a>
            </div>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
}
