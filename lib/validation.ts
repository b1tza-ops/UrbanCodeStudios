import { z } from "zod";

export const leadUpdateSchema = z.object({
  status: z.enum(["NEW", "CONTACTED", "QUALIFIED", "WON", "LOST"]).optional(),
  ownerId: z.string().nullable().optional(),
});

export const noteCreateSchema = z.object({
  note: z.string().min(1, "Note cannot be empty").max(5000),
});

export const taskCreateSchema = z.object({
  leadId: z.string().nullable().optional(),
  assignedToId: z.string(),
  title: z.string().min(1, "Title is required").max(500),
  dueAt: z.string().datetime({ message: "Invalid date format" }),
});

export const taskUpdateSchema = z.object({
  status: z.enum(["OPEN", "DONE"]).optional(),
  assignedToId: z.string().optional(),
  title: z.string().min(1).max(500).optional(),
  dueAt: z.string().datetime().optional(),
});

export const userCreateSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100),
  email: z.string().email("Invalid email").max(254),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128),
  role: z.enum(["ADMIN", "SALES", "VIEWER"]),
});
