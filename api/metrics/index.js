export default async function (context, req) {

  context.res = {
    status: 200,
    body: {
      ok: true,
      connectionStringExists: !!process.env.APPLICATIONINSIGHTS_CONNECTION_STRING,
      apiKeyExists: !!process.env.APPINSIGHTS_API_KEY,
      timestamp: new Date().toISOString()
    }
  };
}