module.exports = async function (context, req) {

  context.log("Metrics API called");

  context.res = {
    status: 200,
    body: {
      visitors: 1,
      uptime: "99.99%",
      responseTime: "120ms",
      environment: "production",
      lastUpdate: new Date().toISOString()
    }
  };
};