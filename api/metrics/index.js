export default async function (context, req) {

  context.log("🔥 metrics function reached");

  context.res = {
    status: 200,
    body: {
      ok: true,
      message: "function is alive"
    }
  };
}