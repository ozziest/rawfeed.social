export const up = function (knex) {
  return knex.schema.alterTable("users", function (table) {
    table.string("email_verification_token", 255).nullable();
    table.timestamp("email_verification_token_expires_at").nullable();

    table.index(
      "email_verification_token",
      "idx_users_email_verification_token",
    );
  });
};

export const down = function (knex) {
  return knex.schema.alterTable("users", function (table) {
    table.dropIndex(
      "email_verification_token",
      "idx_users_email_verification_token",
    );
    table.dropColumn("email_verification_token");
    table.dropColumn("email_verification_token_expires_at");
  });
};
