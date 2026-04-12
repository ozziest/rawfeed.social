import { v4 as uuidv4 } from "uuid";
import { getKnex } from "../db/connection";
import type { RssSuggestionRow, RssSuggestionStatus } from "../types/shared";

const TABLE_NAME = "rss_suggestions";

const PAGE_SIZE = 25;

const SELECT_COLS = [
  "rs.id",
  "rs.submitted_by",
  "rs.url",
  "rs.language",
  "rs.is_owner",
  "rs.status",
  "rs.rejection_reason",
  "rs.admin_notes",
  "rs.created_at",
  "rs.updated_at",
  "u.username as submitter_username",
  "u.email as submitter_email",
  "u.name as submitter_name",
] as const;

const create = async (data: {
  submitted_by: string;
  url: string;
  language: string;
  is_owner: boolean;
}): Promise<RssSuggestionRow> => {
  const id = uuidv4();
  const now = new Date();
  await getKnex().table(TABLE_NAME).insert({
    id,
    submitted_by: data.submitted_by,
    url: data.url,
    language: data.language,
    is_owner: data.is_owner,
    status: "pending",
    created_at: now,
    updated_at: now,
  });
  const row = await getById(id);
  return row!;
};

const getAll = async (
  cursor?: string,
  status?: string,
): Promise<RssSuggestionRow[]> => {
  let query = getKnex()
    .table(`${TABLE_NAME} as rs`)
    .select(...SELECT_COLS)
    .leftJoin("users as u", "u.id", "rs.submitted_by")
    .orderBy("rs.created_at", "desc")
    .orderBy("rs.id", "desc")
    .limit(PAGE_SIZE);

  if (status && ["pending", "accepted", "rejected"].includes(status)) {
    query = query.where("rs.status", status);
  }

  if (cursor) {
    const [timestamp, id] = cursor.split("_");
    query = query.where(function () {
      this.where("rs.created_at", "<", new Date(timestamp)).orWhere(
        function () {
          this.where("rs.created_at", "=", new Date(timestamp)).andWhere(
            "rs.id",
            "<",
            id,
          );
        },
      );
    });
  }

  return query;
};

export const nextSuggestionCursor = (
  rows: RssSuggestionRow[],
): string | null => {
  if (rows.length < PAGE_SIZE) return null;
  const last = rows[rows.length - 1];
  const ts =
    last.created_at instanceof Date
      ? last.created_at.toISOString()
      : new Date(last.created_at!).toISOString();
  return `${ts}_${last.id}`;
};

const getById = async (id: string): Promise<RssSuggestionRow | undefined> => {
  const row = await getKnex()
    .table(`${TABLE_NAME} as rs`)
    .select(...SELECT_COLS)
    .leftJoin("users as u", "u.id", "rs.submitted_by")
    .where("rs.id", id)
    .first();
  return row ?? undefined;
};

const hasPendingOrAccepted = async (url: string): Promise<boolean> => {
  const row = await getKnex()
    .table(TABLE_NAME)
    .where("url", url)
    .whereIn("status", ["pending", "accepted"])
    .first();
  return !!row;
};

const accept = async (id: string): Promise<void> => {
  await getKnex()
    .table(TABLE_NAME)
    .where({ id })
    .update({
      status: "accepted" as RssSuggestionStatus,
      updated_at: new Date(),
    });
};

const reject = async (
  id: string,
  reason: string,
  adminNotes: string,
): Promise<void> => {
  await getKnex()
    .table(TABLE_NAME)
    .where({ id })
    .update({
      status: "rejected" as RssSuggestionStatus,
      rejection_reason: reason,
      admin_notes: adminNotes || null,
      updated_at: new Date(),
    });
};

const getCounts = async (): Promise<{
  pending: number;
  accepted: number;
  rejected: number;
  total: number;
}> => {
  const rows = (await getKnex()
    .table(TABLE_NAME)
    .groupBy("status")
    .select("status")
    .count("* as count")) as { status: string; count: string | number }[];

  const map: Record<string, number> = {};
  for (const row of rows) {
    map[row.status] = Number(row.count);
  }
  return {
    pending: map.pending ?? 0,
    accepted: map.accepted ?? 0,
    rejected: map.rejected ?? 0,
    total: (map.pending ?? 0) + (map.accepted ?? 0) + (map.rejected ?? 0),
  };
};

export default {
  create,
  getAll,
  getCounts,
  getById,
  hasPendingOrAccepted,
  accept,
  reject,
};
