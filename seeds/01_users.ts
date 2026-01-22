import { Knex } from "knex";
import bcrypt from "bcryptjs";

export async function seed(knex: Knex): Promise<void> {
  const password = await bcrypt.hash("password123", 10);
  await knex("users").insert([
    { name: "Alice", email: "alice@example.com", password },
    { name: "Bob", email: "bob@example.com", password },
  ]);
}
