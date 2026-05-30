export default async function (context, req) {

  context.log("metrics called");

  return {
    status: 200,
    body: {
      ok: true,
      visitors: 1,
      uptime: "99.99%",
      responseTime: "120ms",
      environment: "production",
      lastUpdate: new Date().toISOString()
    }
  };
}