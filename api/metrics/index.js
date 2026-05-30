module.exports = async function (context, req) {
  context.log("metrics called");

  context.res = {
    status: 200,
    body: {
      ok: true
    }
  };
};