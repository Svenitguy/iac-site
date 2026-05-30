import { app } from "@azure/functions";

app.http("metrics", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (request, context) => {

    context.log("metrics called");

    return {
      jsonBody: {
        visitors: 42,
        uptime: "99.99",
        responseTime: "120 ms",
        lastUpdate: new Date().toISOString()
      }
    };
  }
});