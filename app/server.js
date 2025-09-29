const express = require("express");
const client = require("prom-client");
const app = express();
const port = 3000;

// Metrics registry
const register = new client.Registry();
client.collectDefaultMetrics({ register });

// Counter for requests
const httpRequests = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["route"],
});
register.registerMetric(httpRequests);

// Hello endpoint
app.get("/hello", (req, res) => {
  httpRequests.inc({ route: "/hello" });
  res.send("Hello World!");
});

// Metrics endpoint
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
