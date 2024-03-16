import { makeApi } from "@zodios/core";
import { z } from "zod";

export const chatRequestSchema = z.object({
  message: z.string(),
  node: z.string().optional(),
});

export type ChatRequest = z.infer<typeof chatRequestSchema>;

export const chatResponseSchema = z.object({
  message: z.string(),
  node: z.string(),
  replies: z.array(z.string()),
});

export type ChatResponse = z.infer<typeof chatResponseSchema>;

export const api = makeApi([
  {
    method: "post",
    path: "/chat",
    alias: "chatHandler",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: chatRequestSchema,
      },
    ],
    response: chatResponseSchema,
  },
]);
