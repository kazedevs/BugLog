import { z } from "zod";

export const statuses = ["OPEN", "IN_PROGRESS", "CLOSED"] as const;

const statusEnum = z.enum(statuses);

export const CreateIssueSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(255, { message: "Title must be at most 255 characters long" }),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(255, { message: "Description must be at most 255 characters long" }),
  status: statusEnum,
});
