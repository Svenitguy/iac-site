export default async function (context, req) {

  const appId = process.env.APP_INSIGHTS_APP_ID;
  const apiKey = process.env.APP_INSIGHTS_API_KEY;

  const endpoint = `https://api.applicationinsights.io/v1/apps/${appId}/query`;

  async function query(kql) {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey
      },
      body: JSON.stringify({ query: kql })
    });

    return res.json();
  }

  const visitorsQuery = `
    AppPageViews
    | summarize visitors = dcount(ClientIP)
  `;

  const requestsQuery = `
    AppRequests
    | summarize requests = count()
  `;

  const responseTimeQuery = `
    AppRequests
    | summarize responseTime = avg(DurationMs)
  `;

  const [v, r, t] = await Promise.all([
    query(visitorsQuery),
    query(requestsQuery),
    query(responseTimeQuery)
  ]);

  const visitors = v.tables?.[0]?.rows?.[0]?.[0] || 0;
  const requests = r.tables?.[0]?.rows?.[0]?.[0] || 0;
  const responseTime = t.tables?.[0]?.rows?.[0]?.[0] || 0;

  context.res = {
    status: 200,
    body: {
      visitors,
      requests,
      responseTime: Math.round(responseTime),
      lastUpdate: new Date().toISOString(),
      environment: "production"
    }
  };
}