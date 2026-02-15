export function up(knex) {
  return knex.schema.createTable("data_exports", (table) => {
    table.uuid("id").primary();
    table.uuid("user_id").notNullable();
    table
      .enum("status", ["pending", "processing", "completed", "failed"])
      .notNullable()
      .defaultTo("pending");
    table.timestamp("requested_at").defaultTo(knex.fn.now());
    table.timestamp("completed_at").nullable();
    table.timestamp("expires_at").nullable();
    table.string("s3_key", 500).nullable();
    table.integer("file_size").nullable();
    table.text("error_message").nullable();

    table.foreign("user_id").references("users.id").onDelete("CASCADE");
    table.index("user_id");
    table.index("status");
    table.index("requested_at");
  });
}

export function down(knex) {
  return knex.schema.dropTable("data_exports");
}
