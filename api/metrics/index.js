export default async function (context, req) {

  const connectionString = process.env.APPLICATIONINSIGHTS_CONNECTION_STRING;
  const apiKey = process.env.APPINSIGHTS_API_KEY;

  const appId = connectionString
    .split(";")
    .find(x => x.startsWith("ApplicationId="))
    ?.split("=")[1];

  const endpoint = `https://api.applicationinsights.io/v1/apps/${appId}/query`;

  const query = `
requests
| summarize 
    requests = count(),
    avgResponseTime = avg(duration),
    users = dcount(user_Id)
`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey
    },
    body: JSON.stringify({ query })
  });

  const data = await response.json();

  const row = data.tables?.[0]?.rows?.[0] || [];

  context.res = {
    status: 200,
    body: {
      visitors: row[2] || 0,
      requests: row[0] || 0,
      avgResponseTime: row[1] || 0,
      lastUpdate: new Date().toISOString()
    }
  };
}