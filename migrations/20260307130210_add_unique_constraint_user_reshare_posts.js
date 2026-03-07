/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.alterTable("posts", function (table) {
    table.unique(["user_id", "reshare_id"], {
      indexName: "uq_posts_user_id_reshare_id",
    });
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.alterTable("posts", function (table) {
    table.dropUnique(["user_id", "reshare_id"], "uq_posts_user_id_reshare_id");
  });
};
