module.exports = {
    port: 3000,
    db: {
        development: {
            url: 'mongodb://localhost/apidevelopment',
            port: 5555
        },
        test: {
            url: 'mongodb://localhost/apitest',
            port: 5555
        },
        production: {
            url: 'mongodb://localhost/apiprod',
            port: 5300
        },
    },
    secretKey: 'customSecret2016?!*-89',
    apiRouteAuth: '/api/auth',
    apiRouteV1: '/api/v1/',
};
