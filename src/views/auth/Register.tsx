/** @jsxImportSource @kitajs/html */
import type { BaseProps } from "../../types/views";
import { AuthLayout } from "../layouts/AuthLayout";
import { FlashMessages } from "../partials/FlashMessages";

type RegisterProps = BaseProps & { csrfToken: string };

export function Register(props: RegisterProps) {
  const { csrfToken, validation, state } = props;

  return (
    <AuthLayout {...props}>
      <div class="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div class="w-full max-w-md space-y-8">
          <FlashMessages state={props.state} />
          <div class="text-center">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900">
              Create your account
            </h2>
            <p class="mt-2 text-sm text-gray-600">Join rawfeed.social today</p>
          </div>

          <form class="mt-8 space-y-6" action="/auth/register" method="post">
            <input type="hidden" name="_csrf" value={csrfToken} />

            <div>
              <label
                for="username"
                class="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <div class="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                  placeholder="johndoe"
                  value={state?.username as string | undefined}
                />
              </div>
              <div>
                {validation?.username ? (
                  <div class="text-red-700 text-sm my-1" safe>
                    {validation.username}
                  </div>
                ) : null}
              </div>
            </div>

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
                  class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                  placeholder="you@example.com"
                  value={state?.email as string | undefined}
                />
              </div>
              <div>
                {validation?.email ? (
                  <div class="text-red-700 text-sm my-1" safe>
                    {validation.email}
                  </div>
                ) : undefined}
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
                  class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
              <div>
                {validation?.password ? (
                  <div class="text-red-700 text-sm my-1" safe>
                    {validation.password}
                  </div>
                ) : undefined}
              </div>
            </div>

            <div>
              <label
                for="confirmPassword"
                class="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div class="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
              <div>
                {validation?.confirmPassword ? (
                  <div class="text-red-700 text-sm my-1" safe>
                    {validation.confirmPassword}
                  </div>
                ) : undefined}
              </div>
            </div>

            <div>
              <button
                type="submit"
                class="group relative flex w-full justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
              >
                Create account
              </button>
            </div>

            <div class="text-center text-sm">
              <span class="text-gray-600">Already have an account?</span>
              <a
                href="/auth/login"
                class="font-medium text-black hover:text-gray-700 ml-1 underline"
              >
                Sign in
              </a>
            </div>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
}
