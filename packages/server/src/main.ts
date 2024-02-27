import { zodiosApp } from "@zodios/express";
import { api } from "chat-api";

export const app = zodiosApp(api);

app.post("/chat", (req, res) => {
  const { message } = req.body;

  console.log(`Received message: ${message}`);

  res.send({ message: `You said: ${message}` });
});

if (import.meta.env.PROD) app.listen(3000);
