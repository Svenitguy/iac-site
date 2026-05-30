module.exports = async function (context, req) {
    context.res = {
        body: {
            visitors: 1,
            uptime: "99.9%",
            responseTime: "120ms",
            environment: "prod",
            lastUpdate: new Date().toISOString()
        }
    };
};