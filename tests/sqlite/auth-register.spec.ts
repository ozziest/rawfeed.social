import { expect, test, type Page } from "@playwright/test";
import knex from "knex";

const PASSWORD = "password123";

type Credentials = {
  username: string;
  email: string;
};

const makeCredentials = (prefix: string): Credentials => {
  const timePart = Date.now().toString(36).slice(-6);
  const randomPart = Math.random().toString(36).slice(2, 7);
  const seed = `${timePart}${randomPart}`;
  return {
    username: `${prefix}${seed}`,
    email: `${prefix}+${seed}@example.com`,
  };
};

const openDb = () =>
  knex({
    client: "sqlite3",
    connection: {
      filename: process.env.DB_FILENAME || ".tmp/test.sqlite",
    },
    useNullAsDefault: true,
  });

const registerUser = async (page: Page, credentials: Credentials) => {
  await page.goto("/auth/register");

  await page.getByLabel("Username").fill(credentials.username);
  await page.getByLabel("Email address").fill(credentials.email);
  await page.getByLabel("Password", { exact: true }).fill(PASSWORD);
  await page.getByLabel("Confirm Password").fill(PASSWORD);

  await page.getByRole("button", { name: "Create account" }).click();

  await expect(page).toHaveURL(/\/auth\/registration-success$/);
  await expect(page.getByText("Registration Successful!")).toBeVisible();
};

const getVerificationToken = async (email: string) => {
  const db = openDb();
  try {
    const user = await db("users")
      .select("id", "email_verification_token")
      .where({ email })
      .first<{ id: string; email_verification_token: string | null }>();

    expect(user).toBeTruthy();
    expect(user?.email_verification_token).toBeTruthy();

    return {
      userId: user!.id,
      token: user!.email_verification_token!,
    };
  } finally {
    await db.destroy();
  }
};

const assertVerificationTokenCleared = async (userId: string) => {
  const db = openDb();
  try {
    const user = await db("users")
      .select("email_verification_token")
      .where({ id: userId })
      .first<{ email_verification_token: string | null }>();

    expect(user?.email_verification_token).toBeNull();
  } finally {
    await db.destroy();
  }
};

const loginUser = async (page: Page, email: string) => {
  await page.goto("/auth/login");
  await page.getByLabel("Email address").fill(email);
  await page.getByLabel("Password").fill(PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).click();
};

test.describe("auth/register", () => {
  test("registers and verifies email", async ({ page }) => {
    const credentials = makeCredentials("alice");

    await registerUser(page, credentials);

    const { userId, token } = await getVerificationToken(credentials.email);
    await page.goto(`/auth/verify-email?token=${token}`);
    await expect(page.getByText("Email Verified!")).toBeVisible();

    await assertVerificationTokenCleared(userId);
  });
});

test.describe("auth/login", () => {
  test("does not login when email is not verified", async ({ page }) => {
    const credentials = makeCredentials("bob");
    await registerUser(page, credentials);

    await loginUser(page, credentials.email);

    await expect(page).toHaveURL(/\/auth\/login$/);
    await expect(page.getByText("User not found")).toBeVisible();

    const cookies = await page.context().cookies();
    const accessTokenCookie = cookies.find(
      (cookie) => cookie.name === "accessToken",
    );
    expect(accessTokenCookie).toBeFalsy();
  });

  test("logs in after email verification", async ({ page }) => {
    const credentials = makeCredentials("charlie");
    await registerUser(page, credentials);

    const { token } = await getVerificationToken(credentials.email);
    await page.goto(`/auth/verify-email?token=${token}`);
    await expect(page.getByText("Email Verified!")).toBeVisible();

    await loginUser(page, credentials.email);

    await expect(page).toHaveURL(/\/$/);

    const cookies = await page.context().cookies();
    const accessTokenCookie = cookies.find(
      (cookie) => cookie.name === "accessToken",
    );
    const refreshTokenCookie = cookies.find(
      (cookie) => cookie.name === "refreshToken",
    );

    expect(accessTokenCookie).toBeTruthy();
    expect(refreshTokenCookie).toBeTruthy();
  });
});
