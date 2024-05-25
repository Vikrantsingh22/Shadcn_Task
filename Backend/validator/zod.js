// schemas.js
const { z } = require("zod");

const taskSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .trim()
    .min(1, { message: "Title Should not be empty" }),
  description: z
    .string({ required_error: "Description is required" })
    .trim()
    .min(1, { message: "Description Should not be empty" }),
  status: z.enum(["pending", "in-progress", "completed"], {
    required_error: "Status is required",
  }),
  dueDate: z.string({
    required_error: "A date is required.",
  }),
});

module.exports = { taskSchema };
