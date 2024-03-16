import { zodiosApp } from "@zodios/express";
import { api } from "chat-api";
import { readFileSync } from "fs";
import levenshtein from "js-levenshtein";
import { z } from "zod";

export const app = zodiosApp(api);

const configSchema = z.array(
  z.object({
    id: z.string(),
    message: z.string(),
    replies: z
      .array(
        z.object({
          keywors: z.array(z.string()).min(1),
          nextNode: z.string(),
        })
      )
      .optional(),
  })
);

const nodes = configSchema.parse(
  JSON.parse(readFileSync("./config.json", { encoding: "utf-8" }))
);

console.log(nodes);

const startNode = nodes.find((node) => node.id === "start");

if (!startNode) throw new Error("kaputt");

app.post("/chat", (req, res) => {
  const { message, node } = req.body;

  const sendNode = (node: z.infer<typeof configSchema>[number]) => {
    const replies = node.replies?.map((reply) => reply.keywors[0]) ?? [];

    res.send({
      message: startNode.message,
      node: startNode.id,
      replies,
    });
  };

  const sendError = () => {
    res.send({
      message: "Es ist etwas schiefgelaufen! :(",
      node: "start",
      replies: [],
    });
  };

  if (!node) {
    sendNode(startNode);

    return;
  }

  console.log(`Received message: ${message}`);

  const currentNode = nodes.find((n) => n.id === node);

  if (!currentNode) {
    sendError();

    return;
  }

  if (!currentNode.replies?.length) {
    sendNode(startNode);

    return;
  }

  const replyNodeId = currentNode.replies
    .map((reply) => ({
      ...reply,
      distance: Math.min(
        ...reply.keywors
          .map((keyword) => levenshtein(message, keyword))
          .filter((distance) => distance < 5)
      ),
    }))
    .sort((a, b) => a.distance - b.distance)[0].nextNode;

  const replyNode = nodes.find((node) => node.id === replyNodeId);

  if (!replyNode) {
    sendError();

    return;
  }

  sendNode(replyNode);
});

if (import.meta.env.PROD) app.listen(3000);
