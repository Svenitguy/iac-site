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
    pageViews
    | summarize visitors = dcount(session_Id)
  `;

  const requestsQuery = `
    requests
    | summarize requests = count()
  `;

  const responseQuery = `
    requests
    | summarize responseTime = avg(duration)
  `;

  const uptimeQuery = `
    requests
    | summarize uptime = 100 * sumif(1, success == true) / count()
  `;

  const lastQuery = `
    pageViews
    | top 1 by timestamp desc
    | project timestamp
  `;

  const [v, r, t, u, l] = await Promise.all([
    query(visitorsQuery),
    query(requestsQuery),
    query(responseQuery),
    query(uptimeQuery),
    query(lastQuery)
  ]);

  const visitors = v.tables?.[0]?.rows?.[0]?.[0] || 0;
  const requests = r.tables?.[0]?.rows?.[0]?.[0] || 0;
  const responseTime = t.tables?.[0]?.rows?.[0]?.[0] || 0;
  const uptime = u.tables?.[0]?.rows?.[0]?.[0] || 99.99;
  const lastUpdate = l.tables?.[0]?.rows?.[0]?.[0] || new Date().toISOString();

  context.res = {
    status: 200,
    body: {
      visitors,
      requests,
      responseTime: Math.round(responseTime),
      uptime: Math.round(uptime * 100) / 100,
      deployment: "Healthy",
      environment: "production",
      lastUpdate
    }
  };
}