module.exports = async function (context, req) {
    context.res = {
        body: {
            visitors: 42,
            uptime: "99.99",
            responseTime: "120 ms",
            environment: "production"
        }
    };
};