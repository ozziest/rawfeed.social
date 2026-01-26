export const up = function (knex) {
  return knex.schema.alterTable("users", function (table) {
    table.string("custom_domain", 255).nullable().unique();
    table.string("domain_verification_token", 100).nullable();
    table
      .enum("domain_verification_status", ["pending", "verified", "failed"])
      .nullable();
    table.timestamp("domain_verified_at").nullable();

    table.index("custom_domain", "idx_users_custom_domain");
  });
};

export const down = function (knex) {
  return knex.schema.alterTable("users", function (table) {
    table.dropIndex("custom_domain", "idx_users_custom_domain");
    table.dropColumn("custom_domain");
    table.dropColumn("domain_verification_token");
    table.dropColumn("domain_verification_status");
    table.dropColumn("domain_verified_at");
  });
};
