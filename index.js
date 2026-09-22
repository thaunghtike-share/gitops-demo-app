"use strict";

const path = require("node:path");
const express = require("express");

const app = express();
const port = Number.parseInt(process.env.PORT || "8080", 10);
const host = process.env.HOST || "0.0.0.0";

app.disable("x-powered-by");

app.get("/", (_request, response) => {
  response.sendFile(path.join(__dirname, "index.html"));
});

app.get("/styles.css", (_request, response) => {
  response.sendFile(path.join(__dirname, "styles.css"));
});

app.get("/api", (_request, response) => {
  response.json({
    application: "gitops-demo-app",
    status: "running",
    environment: "production",
    version: process.env.APP_VERSION || "1.0.0"
  });
});

app.get("/health", (_request, response) => {
  response.type("text/plain").status(200).send("OK\n");
});

const server = app.listen(port, host, () => {
  console.log(`GitOps Demo App listening on http://${host}:${port}`);
});

function shutdown(signal) {
  console.log(`${signal} received; shutting down`);
  server.close((error) => {
    if (error) {
      console.error("Graceful shutdown failed", error);
      process.exit(1);
    }

    process.exit(0);
  });
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
