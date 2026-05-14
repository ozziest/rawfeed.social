exports.up = async function (knex) {
  // Remove duplicate rows, keeping the lowest id per (notification_id, trigger_user_id) pair
  await knex.raw(`
    DELETE nt FROM notifications_triggers nt
    INNER JOIN notifications_triggers nt2
      ON nt.notification_id = nt2.notification_id
      AND nt.trigger_user_id = nt2.trigger_user_id
      AND nt.id > nt2.id
  `);

  return knex.schema.alterTable("notifications_triggers", (table) => {
    table.unique(["notification_id", "trigger_user_id"], {
      indexName: "uq_notification_trigger_user",
    });
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("notifications_triggers", (table) => {
    table.dropUnique(
      ["notification_id", "trigger_user_id"],
      "uq_notification_trigger_user",
    );
  });
};
