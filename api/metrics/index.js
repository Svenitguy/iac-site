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

  const lastQuery = `
    pageViews
    | top 1 by timestamp desc
    | project timestamp
  `;

  const [v, r, t, l] = await Promise.all([
    query(visitorsQuery),
    query(requestsQuery),
    query(responseQuery),
    query(lastQuery)
  ]);

  const visitors = v.tables?.[0]?.rows?.[0]?.[0] || 0;
  const requests = r.tables?.[0]?.rows?.[0]?.[0] || 0;
  const responseTime = t.tables?.[0]?.rows?.[0]?.[0] || 0;
  const lastUpdate = l.tables?.[0]?.rows?.[0]?.[0] || new Date().toISOString();

  context.res = {
    status: 200,
    body: {
      visitors,
      requests,
      responseTime: Math.round(responseTime),
      lastUpdate,
      environment: "production"
    }
  };
}