export default async function (context, req) {

  context.res = {
    status: 200,
    body: {
      test: "API werkt"
    }
  };
}

export default async function (context, req) {

  const connectionString = process.env.APPLICATIONINSIGHTS_CONNECTION_STRING;
  const apiKey = process.env.APPINSIGHTS_API_KEY;

  const appId = connectionString
    .split(";")
    .find(x => x.startsWith("ApplicationId="))
    ?.split("=")[1];

  const endpoint = `https://api.applicationinsights.io/v1/apps/${appId}/query`;

  const queries = {
    visitors: `requests | summarize visitors = dcount(user_Id)`,
    requests: `requests | summarize requests = count()`,
    responseTime: `requests | summarize avgResponseTime = avg(duration)`
  };

  async function run(query) {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey
      },
      body: JSON.stringify({ query })
    });

    return res.json();
  }

  const [v, r, t] = await Promise.all([
    run(queries.visitors),
    run(queries.requests),
    run(queries.responseTime)
  ]);

  const visitors = v.tables?.[0]?.rows?.[0]?.[0] || 0;
  const requests = r.tables?.[0]?.rows?.[0]?.[0] || 0;
  const responseTime = t.tables?.[0]?.rows?.[0]?.[0] || 0;

  context.res = {
    status: 200,
    body: {
      visitors,
      requests,
      responseTime,
      lastUpdate: new Date().toISOString()
    }
  };
}