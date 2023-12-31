const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const host = process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0';
const port = 5000;

const init = async () => {
    const server = Hapi.server({
        host: host,
        port: port,
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    server.route(routes);

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
