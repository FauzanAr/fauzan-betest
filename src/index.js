const Server = require('./app/server');
const config = require('./helpers/config');

const server = new Server();

server.init(config.port)