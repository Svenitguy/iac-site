const { app } = require('@azure/functions');

app.http('metrics', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {

        return {
            jsonBody: {
                visitors: 42,
                uptime: "99.99",
                responseTime: "120 ms",
                environment: "production"
            }
        };
    }
});